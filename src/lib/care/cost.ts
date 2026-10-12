/**
 * Cost ranges from published Indian price lists: IVF per cycle by city tier,
 * one combined range when ICSI, embryo freezing or PGT is added, and egg
 * freezing at ₹1–2.5 lakh per cycle plus ₹10,000–30,000 a year of storage.
 */

export type CityTier = "metro" | "tier2";

export const cities: { name: string; tier: CityTier }[] = [
  { name: "Hyderabad", tier: "metro" },
  { name: "Bengaluru", tier: "metro" },
  { name: "Chennai", tier: "metro" },
  { name: "Mumbai", tier: "metro" },
  { name: "Delhi NCR", tier: "metro" },
  { name: "Pune", tier: "metro" },
  { name: "Kolkata", tier: "metro" },
  { name: "Visakhapatnam", tier: "tier2" },
  { name: "Vijayawada", tier: "tier2" },
  { name: "Warangal", tier: "tier2" },
  { name: "Another smaller city", tier: "tier2" },
];

export const ivfRanges = {
  metro: [150_000, 250_000],
  tier2: [100_000, 180_000],
  addOns: [350_000, 500_000],
} as const;

export type AddOns = { icsi: boolean; freeze: boolean; pgt: boolean };

export function ivfCost(city: string, addOns: AddOns, cycles: number) {
  const tier = cities.find((c) => c.name === city)?.tier ?? "metro";
  const withAddOns = addOns.icsi || addOns.freeze || addOns.pgt;
  const [lo, hi] = withAddOns ? ivfRanges.addOns : ivfRanges[tier];
  return { perCycle: [lo, hi] as const, total: [lo * cycles, hi * cycles] as const, withAddOns };
}

export const eggFreezing = {
  perCycle: [100_000, 250_000],
  storagePerYear: [10_000, 30_000],
} as const;

export function eggFreezingCost(cycles: number, years: number): readonly [number, number] {
  return [
    cycles * eggFreezing.perCycle[0] + years * eggFreezing.storagePerYear[0],
    cycles * eggFreezing.perCycle[1] + years * eggFreezing.storagePerYear[1],
  ];
}
