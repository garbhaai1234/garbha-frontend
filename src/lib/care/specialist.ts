/**
 * "Is it time to see a specialist?" (ASRM fertility evaluation guidance):
 * after 12 months of trying under 35, after 6 months from 35, without waiting
 * from 40 or with irregular periods, endometriosis or a semen result below range.
 */

export type SpecialistFlags = { irregular: boolean; endo: boolean; male: boolean };

export type SpecialistAdvice = {
  yes: boolean;
  reasons: string[];
  limit: 6 | 12;
  left: number;
};

export function specialistAdvice(
  age: number | null,
  months: number | null,
  flags: SpecialistFlags,
): SpecialistAdvice | null {
  if (age === null || months === null || age <= 0 || months < 0) return null;
  const reasons: string[] = [];
  if (age >= 40) reasons.push("You are 40 or older: guidance suggests seeing a specialist without waiting.");
  if (flags.irregular) reasons.push("Irregular or absent periods are a reason to be checked straight away.");
  if (flags.endo) reasons.push("Known or suspected endometriosis is a reason to be checked straight away.");
  if (flags.male) reasons.push("A semen report below the reference range is a reason to see a specialist together now.");
  const limit = age >= 35 ? 6 : 12;
  if (months >= limit)
    reasons.push(
      age >= 35
        ? `You have been trying for ${months} months. From 35, guidance suggests a check after 6 months.`
        : `You have been trying for ${months} months. Under 35, guidance suggests a check after 12 months.`,
    );
  return { yes: reasons.length > 0, reasons, limit, left: Math.max(0, limit - months) };
}
