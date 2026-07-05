/** Tiny classnames helper — joins truthy class values with a space. */
export function clsx(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
