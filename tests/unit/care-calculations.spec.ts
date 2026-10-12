import { expect, test } from "@playwright/test";
import { lakh, parseDate, toInput } from "@/lib/care/dates";
import { currentCycleStart, currentPlan, cycleDay, cyclePlan, isIrregular, ringFromPlan } from "@/lib/care/ovulation";
import { specialistAdvice } from "@/lib/care/specialist";
import { evaluateSemen } from "@/lib/care/semen";
import { eggFreezingCost, ivfCost } from "@/lib/care/cost";
import { byWeek, ivfMilestones } from "@/lib/care/ivf";
import { DISCREET_TITLE, toIcs } from "@/lib/care/ics";

const ymd = (d: Date) => toInput(d);
const noFlags = { irregular: false, endo: false, male: false };

test.describe("dates", () => {
  test("parses local dates and rejects impossible ones", () => {
    expect(ymd(parseDate("2026-10-01")!)).toBe("2026-10-01");
    expect(parseDate("2026-02-31")).toBeNull();
    expect(parseDate("01/10/2026")).toBeNull();
  });
  test("formats lakh", () => {
    expect(lakh(150_000)).toBe("₹1.5 lakh");
    expect(lakh(200_000)).toBe("₹2 lakh");
  });
});

test.describe("ovulation tracker", () => {
  test("28-day cycle: ovulation on day 15, six-day window ending on it", () => {
    const p = cyclePlan({ start: "2026-10-01", cycle: 28, period: 5 })!;
    expect(ymd(p.ovulation)).toBe("2026-10-15");
    expect(ymd(p.windowStart)).toBe("2026-10-10");
    expect(ymd(p.next)).toBe("2026-10-29");
    expect(p.days.filter((d) => d.kind === "fertile")).toHaveLength(5);
    expect(p.days.filter((d) => d.kind === "ovulation")).toHaveLength(1);
    expect(p.days.filter((d) => d.kind === "period")).toHaveLength(5);
    expect(p.fromLh).toBe(false);
    expect(ymd(p.upcoming[0].period)).toBe("2026-10-29");
  });
  test("a positive LH test in the cycle moves ovulation to the next day", () => {
    const p = cyclePlan({ start: "2026-10-01", cycle: 28, period: 5, lh: "2026-10-12" })!;
    expect(ymd(p.ovulation)).toBe("2026-10-13");
    expect(p.fromLh).toBe(true);
  });
  test("an LH date outside the cycle is ignored", () => {
    const p = cyclePlan({ start: "2026-10-01", cycle: 28, period: 5, lh: "2026-11-20" })!;
    expect(p.fromLh).toBe(false);
  });
  test("no date gives no plan; cycle length is clamped to 20–45", () => {
    expect(cyclePlan({ start: "", cycle: 28, period: 5 })).toBeNull();
    expect(cyclePlan({ start: "2026-10-01", cycle: 90, period: 5 })!.cycle).toBe(45);
  });
  test("irregular only for real lengths outside 21–35", () => {
    expect(isIrregular(0)).toBe(false);
    expect(isIrregular(28)).toBe(false);
    expect(isIrregular(19)).toBe(true);
    expect(isIrregular(40)).toBe(true);
  });
  test("cycle day of today", () => {
    const p = cyclePlan({ start: "2026-10-01", cycle: 28, period: 5 })!;
    expect(cycleDay(p, parseDate("2026-10-11")!)).toBe(11);
    expect(cycleDay(p, parseDate("2026-11-30")!)).toBeNull();
  });
});

test.describe("specialist check", () => {
  test("under 35: not yet before 12 months", () => {
    const r = specialistAdvice(31, 8, noFlags)!;
    expect(r.yes).toBe(false);
    expect(r.limit).toBe(12);
    expect(r.left).toBe(4);
  });
  test("35 is the cut-off: 6 months is enough", () => {
    expect(specialistAdvice(34, 6, noFlags)!.yes).toBe(false);
    expect(specialistAdvice(35, 6, noFlags)!.yes).toBe(true);
  });
  test("40+, irregular periods, endometriosis or a semen result: yes now", () => {
    expect(specialistAdvice(40, 0, noFlags)!.yes).toBe(true);
    expect(specialistAdvice(28, 1, { ...noFlags, irregular: true })!.yes).toBe(true);
    expect(specialistAdvice(28, 1, { ...noFlags, endo: true })!.yes).toBe(true);
    expect(specialistAdvice(28, 1, { ...noFlags, male: true })!.yes).toBe(true);
  });
  test("missing answers give no result", () => {
    expect(specialistAdvice(null, 5, noFlags)).toBeNull();
    expect(specialistAdvice(30, null, noFlags)).toBeNull();
  });
});

test.describe("semen report reader (WHO 2021)", () => {
  const blank = { volume: null, conc: null, total: null, totalMot: null, prog: null, morph: null };
  test("values at the lower limit are within range, below are not", () => {
    const r = evaluateSemen({ ...blank, volume: 1.4, conc: 15.9, morph: 4 });
    expect(r.volume.status).toBe("within");
    expect(r.conc.status).toBe("below");
    expect(r.morph.status).toBe("within");
    expect(r.prog.status).toBe("none");
  });
  test("total sperm number is worked out from volume × concentration", () => {
    const r = evaluateSemen({ ...blank, volume: 2, conc: 10 });
    expect(r.total).toEqual({ n: 20, derived: true, status: "below" });
  });
  test("a reported total is not overwritten", () => {
    const r = evaluateSemen({ ...blank, volume: 2, conc: 10, total: 50 });
    expect(r.total).toEqual({ n: 50, derived: false, status: "within" });
  });
});

test.describe("cost estimates", () => {
  test("IVF by city tier and cycles", () => {
    const none = { icsi: false, freeze: false, pgt: false };
    expect(ivfCost("Hyderabad", none, 1).total).toEqual([150_000, 250_000]);
    expect(ivfCost("Warangal", none, 2).total).toEqual([200_000, 360_000]);
    expect(ivfCost("Hyderabad", { ...none, icsi: true }, 1).perCycle).toEqual([350_000, 500_000]);
  });
  test("egg freezing: cycles plus yearly storage", () => {
    expect(eggFreezingCost(1, 5)).toEqual([150_000, 400_000]);
    expect(eggFreezingCost(2, 1)).toEqual([210_000, 530_000]);
  });
});

test.describe("IVF planner", () => {
  test("fresh transfer ends with the pregnancy test in week 4", () => {
    const weeks = byWeek(ivfMilestones("fresh"));
    expect(weeks.map((w) => w.week)).toEqual([1, 2, 3, 4]);
    expect(weeks.at(-1)!.items.at(-1)!.title).toContain("Pregnancy blood test");
  });
  test("freeze-all has no transfer or pregnancy test", () => {
    const titles = ivfMilestones("frozen").map((m) => m.title);
    expect(titles).toContain("Embryos frozen");
    expect(titles.join()).not.toContain("Embryo transfer");
  });
});

test.describe("reminder calendar files", () => {
  const r = { id: "1-a", what: "Evening, injection", kind: "Injection" as const, date: "2026-10-12", time: "20:30", days: 10 };
  const now = new Date(Date.UTC(2026, 9, 12, 3, 50, 27));
  test("discreet mode hides what the reminder is for", () => {
    const ics = toIcs([r], true, now);
    expect(ics).toContain(`SUMMARY:${DISCREET_TITLE}`);
    expect(ics).not.toContain("injection");
    expect(ics).toContain("DTSTART:20261012T203000");
    expect(ics).toContain("DTSTAMP:20261012T035027Z");
    expect(ics).toContain("RRULE:FREQ=DAILY;COUNT=10");
    expect(ics.split("\r\n")[0]).toBe("BEGIN:VCALENDAR");
  });
  test("normal mode escapes commas", () => {
    expect(toIcs([{ ...r, days: 1 }], false, now)).toContain("SUMMARY:Injection: Evening\\, injection");
    expect(toIcs([{ ...r, days: 1 }], false, now)).not.toContain("RRULE");
  });
});

test.describe("hero ring", () => {
  test("an old logged period is rolled forward to the current cycle", () => {
    const r = currentCycleStart(parseDate("2026-08-10")!, 28, parseDate("2026-10-12")!)!;
    expect(ymd(r.start)).toBe("2026-10-05");
    expect(r.cyclesAhead).toBe(2);
    expect(currentCycleStart(parseDate("2026-10-05")!, 28, parseDate("2026-10-12")!)!.cyclesAhead).toBe(0);
    expect(currentCycleStart(parseDate("2026-10-20")!, 28, parseDate("2026-10-12")!)).toBeNull();
  });
  test("ring days from a plan", () => {
    const p = cyclePlan({ start: "2026-10-01", cycle: 28, period: 5 })!;
    expect(ringFromPlan(p, parseDate("2026-10-11")!)).toEqual({ length: 28, periodDays: 5, ovulationDay: 15, today: 11 });
    expect(ringFromPlan(p, null).today).toBeNull();
  });
});

test.describe("current plan (hero and Tool 1)", () => {
  const today = parseDate("2026-10-12")!;
  test("same cycle keeps the LH test", () => {
    const r = currentPlan({ start: "2026-10-01", cycle: 28, period: 5, lh: "2026-10-12" }, today)!;
    expect(r.projected).toBe(false);
    expect(ymd(r.plan.ovulation)).toBe("2026-10-13");
  });
  test("an older cycle is projected and drops the old LH test", () => {
    const r = currentPlan({ start: "2026-08-10", cycle: 28, period: 5, lh: "2026-08-20" }, today)!;
    expect(r.projected).toBe(true);
    expect(ymd(r.plan.start)).toBe("2026-10-05");
    expect(r.plan.fromLh).toBe(false);
  });
  test("no date or a future date gives nothing", () => {
    expect(currentPlan({ start: "", cycle: 28, period: 5 }, today)).toBeNull();
    expect(currentPlan({ start: "2026-10-20", cycle: 28, period: 5 }, today)).toBeNull();
  });
});
