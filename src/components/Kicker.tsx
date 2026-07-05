/**
 * Editorial section label — a numbered index, a short rule, and a tracked
 * uppercase kicker. Used across the site to introduce sections.
 */
export function Kicker({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
      {index && <span>{index}</span>}
      <span className="h-px w-8 bg-brand-300" />
      <span className="text-ink-400">{children}</span>
    </div>
  );
}
