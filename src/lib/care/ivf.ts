/** A typical IVF cycle by day (day 0 = first day of the period). Clinics' protocols vary. */

export type Transfer = "fresh" | "frozen";
export type Milestone = { day: number; title: string; text: string; key?: boolean };

export function ivfMilestones(transfer: Transfer): Milestone[] {
  const base: Milestone[] = [
    { day: 0, title: "Day 1 of your period", text: "Call the clinic to tell them your period has started.", key: true },
    { day: 1, title: "Baseline scan and blood test", text: "Usually on day 2 or 3. If all is well, the injections start." },
    { day: 2, title: "Daily injections begin", text: "Hormone injections at about the same time each day, for roughly 8–12 days." },
    { day: 6, title: "Monitoring scans", text: "Every 2–3 days the clinic checks how the follicles are growing and may adjust the dose." },
    { day: 7, title: "A second injection is often added", text: "It stops ovulation happening too early." },
    { day: 11, title: "Trigger injection", text: "Given at an exact time when the follicles are ready. Note the time the clinic gives you.", key: true },
    { day: 13, title: "Egg collection", text: "About 34–36 hours after the trigger, under sedation. The partner gives a semen sample the same day. Plan to rest.", key: true },
    { day: 14, title: "Fertilisation call", text: "The embryology lab tells you how many eggs fertilised." },
  ];
  if (transfer === "fresh") {
    return [
      ...base,
      { day: 18, title: "Embryo transfer", text: "Usually 3 or 5 days after collection. A short procedure, no sedation needed.", key: true },
      { day: 27, title: "Pregnancy blood test (beta-hCG)", text: "About two weeks after egg collection. Keep taking any support medicines until the clinic tells you.", key: true },
    ];
  }
  return [
    ...base,
    { day: 18, title: "Embryos frozen", text: "Embryos that reach day 5 are frozen. The transfer happens in a later cycle, often after your next period.", key: true },
  ];
}

/** Milestones grouped into weeks 1, 2, … */
export function byWeek(ms: Milestone[]): { week: number; items: Milestone[] }[] {
  const weeks = Array.from(new Set(ms.map((m) => Math.floor(m.day / 7))));
  return weeks.map((w) => ({ week: w + 1, items: ms.filter((m) => Math.floor(m.day / 7) === w) }));
}
