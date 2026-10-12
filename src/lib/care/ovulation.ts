import { addDays, daysBetween, parseDate } from "./dates";

/**
 * Fertile-window estimate (ASRM: the six days ending on ovulation day).
 * Ovulation is estimated 14 days before the next period, or the day after a
 * positive LH test logged in this cycle. Estimates only, never contraception.
 */

export type DayKind = "period" | "fertile" | "ovulation" | "other";

export type CyclePlan = {
  start: Date;
  cycle: number;
  next: Date;
  ovulation: Date;
  windowStart: Date;
  fromLh: boolean;
  days: { date: Date; kind: DayKind; day: number }[];
  upcoming: { period: Date; from: Date; to: Date }[];
};

export const CYCLE_MIN = 20;
export const CYCLE_MAX = 45;

export function clampCycle(cycle: number): number {
  return Math.min(CYCLE_MAX, Math.max(CYCLE_MIN, Math.round(cycle || 28)));
}

/** Cycles shorter than 21 or longer than 35 days are worth a check. 0 = not entered. */
export function isIrregular(cycle: number): boolean {
  return cycle > 0 && (cycle < 21 || cycle > 35);
}

export function cyclePlan(input: {
  start: string;
  cycle: number;
  period: number;
  lh?: string;
}): CyclePlan | null {
  const start = parseDate(input.start);
  if (!start) return null;
  const cycle = clampCycle(input.cycle);
  const period = Math.min(10, Math.max(1, Math.round(input.period || 5)));
  const next = addDays(start, cycle);
  let ovulation = addDays(start, cycle - 14);
  let fromLh = false;
  const lh = input.lh ? parseDate(input.lh) : null;
  if (lh && lh >= start && lh < next) {
    // Ovulation usually follows a positive LH test within about a day.
    ovulation = addDays(lh, 1);
    fromLh = true;
  }
  const windowStart = addDays(ovulation, -5);
  const days = Array.from({ length: cycle }, (_, i) => {
    const date = addDays(start, i);
    const kind: DayKind =
      i < period
        ? "period"
        : daysBetween(date, ovulation) === 0
          ? "ovulation"
          : date >= windowStart && date < ovulation
            ? "fertile"
            : "other";
    return { date, kind, day: i + 1 };
  });
  const upcoming = [1, 2, 3].map((k) => {
    const s = addDays(start, cycle * k);
    const o = addDays(s, cycle - 14);
    return { period: s, from: addDays(o, -5), to: o };
  });
  return { start, cycle, next, ovulation, windowStart, fromLh, days, upcoming };
}

/** Where `today` falls in the plan: cycle day (1-based) or null if outside this cycle. */
export function cycleDay(plan: CyclePlan, today: Date): number | null {
  const d = daysBetween(plan.start, today);
  return d >= 0 && d < plan.cycle ? d + 1 : null;
}
