/**
 * Editorial section label — a numbered index, a short rule, and a tracked
 * uppercase kicker. Used across the site to introduce sections.
 * `as="h2"` makes it the section's heading (same look: the reset removes
 * heading styles) where a section would otherwise start at h3.
 */
export function Kicker({
  index,
  as: Tag = "div",
  children,
}: {
  index?: string;
  as?: "div" | "h2";
  children: React.ReactNode;
}) {
  const heading = Tag !== "div";
  return (
    <Tag className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
      {index && <span aria-hidden={heading || undefined}>{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-brand-300" />
      <span className="text-ink-400">{children}</span>
    </Tag>
  );
}
