import { NextResponse } from "next/server";
import { callRequestRows, validateCallRequest } from "@/lib/care/callRequest";
import {
  clientIp,
  createRateLimiter,
  escapeHtml,
  isCrossSite,
} from "@/lib/server/requestGuard";
import { site } from "@/lib/site";

/**
 * POST /api/care-call: a free counsellor call request from /care.
 * The request is emailed to the team and not stored. Personal details are
 * never logged. Spec: docs/specs/garbha-care-redesign.md (REQ-CARE-01).
 */

const EMAIL_TIMEOUT_MS = 10_000;
const MAX_BODY_BYTES = 4_000;
const isRateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

const fail = (status: number, error: string, extra: object = {}) =>
  NextResponse.json({ ok: false, error, ...extra }, { status });

export async function POST(request: Request) {
  if (isCrossSite(request)) return fail(403, "Invalid request.");

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return fail(415, "Invalid request.");
  }

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return fail(413, "Invalid request.");

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return fail(400, "Invalid request.");
  }

  // Honeypot: a hidden field only bots fill. Answer as if it worked.
  if (raw && typeof raw === "object" && (raw as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return fail(429, `Too many requests from this connection. Please try again in a few minutes, or email us at ${site.email}.`);
  }

  const result = validateCallRequest(raw);
  if (!result.ok) {
    return result.malformed
      ? fail(400, "Invalid request.")
      : fail(422, "Please check the highlighted fields.", { errors: result.errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CARE_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error("[care-call] email delivery is not configured; request refused (details not logged).");
      return fail(503, `We couldn’t send your request just now. Please email us at ${site.email} instead.`);
    }
    // Development without email settings: accept, log only that it happened.
    console.info("[care-call] email delivery not configured (development): request accepted, not sent.");
    return NextResponse.json({ ok: true });
  }

  const rows = callRequestRows(result.data);
  const html =
    `<h2>Garbha Care: free call request</h2><table>` +
    rows.map(([k, v]) => `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v)}</td></tr>`).join("") +
    `</table><p>Health-related personal data, shared with consent for this call only. Do not forward.</p>`;
  const plain = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Garbha Care call request: ${result.data.place.replace(/[\r\n]+/g, " ")}`,
        html,
        text: plain,
        reply_to: result.data.email || undefined,
      }),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Email provider returned ${res.status}`);
  } catch (err) {
    console.error("[care-call] delivery failed:", err instanceof Error ? err.message : "unknown error");
    return fail(502, `We couldn’t send your request just now. Please try again, or email us at ${site.email}.`);
  }

  return NextResponse.json({ ok: true });
}
