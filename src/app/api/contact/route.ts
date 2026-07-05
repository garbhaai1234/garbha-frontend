import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  firstName?: string;
  lastName?: string;
  designation?: string;
  clinic?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  message?: string;
  marketingConsent?: string;
  dataConsent?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Basic in-memory rate limit (per IP) -----------------------------------
// Note: in-memory only guards a single instance. For serverless/multi-instance
// production, back this with a shared store (e.g. Upstash Redis).
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

async function deliver(lead: Record<string, unknown>): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // If email delivery is configured, send via Resend's REST API (no SDK needed).
  if (apiKey && to && from) {
    const rows = Object.entries(lead)
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${String(v)}</td></tr>`)
      .join("");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New Garbha.ai enquiry — ${lead.name ?? "Contact form"}`,
        html: `<h2>New enquiry</h2><table>${rows}</table>`,
        reply_to: typeof lead.email === "string" ? lead.email : undefined,
      }),
    });
    if (!res.ok) {
      throw new Error(`Email provider returned ${res.status}`);
    }
    return;
  }

  // Fallback (unconfigured): log server-side so the form still works in dev.
  console.log("[contact] new message (email delivery not configured):", lead);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: if the hidden field is filled, it's a bot. Pretend success.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const name = (body.name?.trim() || `${firstName} ${lastName}`.trim()) ?? "";
  const email = body.email?.trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please provide your name and email." },
      { status: 422 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 },
    );
  }

  // Reject abusive / oversized input.
  const tooLong =
    name.length > 160 ||
    email.length > 254 ||
    (body.designation?.length ?? 0) > 160 ||
    (body.clinic?.length ?? 0) > 200 ||
    (body.phone?.length ?? 0) > 40 ||
    (body.message?.length ?? 0) > 5000;

  if (tooLong) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 422 },
    );
  }

  try {
    await deliver({
      name,
      designation: body.designation?.trim() ?? "",
      clinic: body.clinic?.trim() ?? "",
      email,
      phone: body.phone?.trim() ?? "",
      message: body.message?.trim() ?? "",
      marketingConsent: body.marketingConsent === "yes",
      dataConsent: body.dataConsent === "yes",
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
