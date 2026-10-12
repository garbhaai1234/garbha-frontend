/** Date and number helpers shared by the Garbha Care modules. Local dates only. */

const DAY = 86_400_000;

/** "2026-10-12" -> local Date at midnight (avoids the UTC off-by-one of new Date(string)). */
export function parseDate(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  // Reject dates the browser rolled over, such as 2026-02-31.
  if (d.getMonth() !== Number(m[2]) - 1) return null;
  return d;
}

export function toInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / DAY);
}

export function startOfToday(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

export const fmt = (d: Date) =>
  d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

export const fmtLong = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** 150000 -> "₹1.5 lakh", 200000 -> "₹2 lakh". */
export function lakh(n: number): string {
  const v = n / 100_000;
  return `₹${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)} lakh`;
}

/** Form text -> number, or null when blank or not a number. */
export function num(v: string): number | null {
  if (v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
