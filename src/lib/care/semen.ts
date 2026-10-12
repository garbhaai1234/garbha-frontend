/** Semen report values against the WHO 2021 (6th edition) lower reference limits. */

export const semenRows = [
  { key: "volume", label: "Semen volume", unit: "mL", min: 1.4 },
  { key: "conc", label: "Sperm concentration", unit: "million per mL", min: 16 },
  { key: "total", label: "Total sperm number", unit: "million per ejaculate", min: 39 },
  { key: "totalMot", label: "Total motility (PR + NP)", unit: "%", min: 42 },
  { key: "prog", label: "Progressive motility (PR)", unit: "%", min: 30 },
  { key: "morph", label: "Normal forms (morphology)", unit: "%", min: 4 },
] as const;

export type SemenKey = (typeof semenRows)[number]["key"];
export type SemenStatus = "none" | "within" | "below";

export type SemenResult = Record<
  SemenKey,
  { n: number | null; derived: boolean; status: SemenStatus }
>;

/**
 * Takes the entered numbers (null = blank). Total sperm number is worked out
 * as volume × concentration when it is not on the report.
 */
export function evaluateSemen(input: Record<SemenKey, number | null>): SemenResult {
  const out = {} as SemenResult;
  for (const r of semenRows) {
    out[r.key] = { n: input[r.key], derived: false, status: "none" };
  }
  if (out.total.n === null && out.volume.n !== null && out.conc.n !== null) {
    out.total = { n: Math.round(out.volume.n * out.conc.n * 10) / 10, derived: true, status: "none" };
  }
  for (const r of semenRows) {
    const n = out[r.key].n;
    out[r.key].status = n === null ? "none" : n < r.min ? "below" : "within";
  }
  return out;
}
