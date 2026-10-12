import { site } from "@/lib/site";

/**
 * Protections shared by the public form endpoints (contact, Garbha Care call
 * requests). Server-only: imported by route handlers, never by components.
 */

/**
 * Per-IP rate limit, in memory. Guards a single server instance only; a
 * multi-instance host would need a shared store.
 */
export function createRateLimiter({
  windowMs = 10 * 60 * 1000,
  max = 5,
  maxTracked = 5000,
} = {}) {
  const hits = new Map<string, number[]>();
  return function isRateLimited(ip: string, now = Date.now()): boolean {
    // Keep memory bounded: drop expired entries once the map grows large.
    if (hits.size > maxTracked) {
      for (const [key, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(key);
      }
    }
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > max;
  };
}

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

/** Reject requests a browser marks as coming from another site. */
export function isCrossSite(request: Request): boolean {
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

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
