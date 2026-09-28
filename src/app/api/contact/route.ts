import { NextResponse } from "next/server";
import { site } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fields the form may send, with max lengths. Anything else is ignored.
const FIELD_LIMITS = {
  name: 160,
  firstName: 80,
  lastName: 80,
  designation: 160,
  clinic: 200,
  email: 254,
  phone: 40,
  message: 5000,
  marketingConsent: 10,
  dataConsent: 10,
  company: 200, // honeypot
} as const;

type Field = keyof typeof FIELD_LIMITS;

const EMAIL_TIMEOUT_MS = 10_000;

// --- Basic in-memory rate limit (per IP) -----------------------------------
// Note: in-memory only guards a single instance. For serverless/multi-instance
// production, back this with a shared store (e.g. Upstash Redis).
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Keep memory bounded: drop expired entries once the map grows large.
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

/** Reject requests a browser marks as coming from another site. */
function isCrossSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (origin) {
    let originHost: string;
    try {
      originHost = new URL(origin).host;
    } catch {
      return true;
    }
    const allowed = new Set([new URL(site.url).host]);
    const host = request.headers.get("host");
    if (host) allowed.add(host);
    return !allowed.has(originHost);
  }
  return request.headers.get("sec-fetch-site") === "cross-site";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function deliver(lead: Record<string, string | boolean>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // If email delivery is configured, send via Resend's REST API (no SDK needed).
  if (apiKey && to && from) {
    const rows = Object.entries(lead)
      .map(
        ([k, v]) =>
          `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(String(v))}</td></tr>`,
      )
      .join("");
    const subjectName = String(lead.name).replace(/[\r\n]+/g, " ");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New Garbha.ai enquiry — ${subjectName || "Contact form"}`,
        html: `<h2>New enquiry</h2><table>${rows}</table>`,
        reply_to: typeof lead.email === "string" ? lead.email : undefined,
      }),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });
    if (!res.ok) {
      throw new Error(`Email provider returned ${res.status}`);
    }
    return;
  }

  // Fallback (unconfigured): log server-side so the form still works in dev.
  // In production this means leads are NOT emailed — make that loud in logs.
  if (process.env.NODE_ENV === "production") {
    console.error(
      "[contact] EMAIL DELIVERY NOT CONFIGURED — lead only logged, not emailed:",
      lead,
    );
    return;
  }
  console.log("[contact] new message (email delivery not configured):", lead);
}

export async function POST(request: Request) {
  if (isCrossSite(request)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Accept only known string fields; any wrong type is a malformed request.
  const body: Partial<Record<Field, string>> = {};
  for (const field of Object.keys(FIELD_LIMITS) as Field[]) {
    const value = (raw as Record<string, unknown>)[field];
    if (value === undefined || value === null) continue;
    if (typeof value !== "string") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    body[field] = value.trim();
  }

  // Honeypot: if the hidden field is filled, it's a bot. Pretend success.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const tooLong = (Object.keys(body) as Field[]).some(
    (field) => (body[field]?.length ?? 0) > FIELD_LIMITS[field],
  );
  if (tooLong) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 422 },
    );
  }

  const name = body.name || `${body.firstName ?? ""} ${body.lastName ?? ""}`.trim();
  const email = body.email ?? "";

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please provide your name and email." },
      { status: 422 },
    );
  }

  if (name.length > FIELD_LIMITS.name) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 422 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 },
    );
  }

  // Mirror the form's required fields so direct API calls can't skip them.
  if (!body.designation || !body.clinic || !body.phone) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 422 },
    );
  }

  if (body.dataConsent !== "yes") {
    return NextResponse.json(
      { error: "Please agree to let us store and process your data." },
      { status: 422 },
    );
  }

  try {
    await deliver({
      name,
      designation: body.designation,
      clinic: body.clinic,
      email,
      phone: body.phone,
      message: body.message ?? "",
      marketingConsent: body.marketingConsent === "yes",
      dataConsent: true,
    });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
