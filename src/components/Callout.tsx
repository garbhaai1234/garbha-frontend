import { clsx } from "@/lib/clsx";

/**
 * Editorial call-to-action panel. A calm cool-neutral surface with a crisp
 * inset hairline frame, a soft warm glow, and an asymmetric layout: message on
 * the left, actions set off by a vertical rule on the right. Coral appears only
 * as an italic serif accent and on the primary button — never as a heavy fill.
 */
export function Callout({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative isolate overflow-hidden rounded-[2rem] bg-ink-50 px-7 py-14 sm:px-14 sm:py-20",
        className,
      )}
    >
      {/* soft warm glow, top-centre — crisp gradient, not a blurred blob */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-brand opacity-70" />
      {/* editorial inset hairline frame */}
      <div className="pointer-events-none absolute inset-3 -z-10 rounded-[1.6rem] ring-1 ring-inset ring-ink-200/70 sm:inset-4" />

      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-500">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex flex-col gap-3 lg:border-l lg:border-ink-200/70 lg:pl-16">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
