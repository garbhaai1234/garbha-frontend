import Link from "next/link";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { ArrowRight } from "@/components/Icons";
import {
  complianceDisclaimer,
  complianceReview,
  type GuideRow,
  type Source,
} from "@/content/compliance";

/** Shown at the top and foot of every Compliance Hub page. */
export function ReviewedNote({ className }: { className?: string }) {
  return (
    <p className={className ?? "text-sm text-ink-500"}>
      {complianceDisclaimer} Last reviewed:{" "}
      <time dateTime={complianceReview.date}>{complianceReview.label}</time>.
    </p>
  );
}

export function ExternalLink({ source }: { source: Source }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-500"
    >
      {source.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Requirements as a definition list: one block per topic, stacked on
 * phones and laid out as a three-column table from md up. No horizontal
 * scrolling at 375 px.
 */
export function RequirementList({ rows }: { rows: GuideRow[] }) {
  return (
    <dl className="border-t border-ink-200">
      {rows.map((row) => (
        <div
          key={row.topic}
          className="grid gap-2 border-b border-ink-200 py-6 md:grid-cols-12 md:gap-8"
        >
          <dt className="font-display text-lg font-semibold text-ink-900 md:col-span-3">
            {row.topic}
            {row.section && (
              <span className="mt-1 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                {row.section}
              </span>
            )}
          </dt>
          <dd className="text-base leading-7 text-ink-700 md:col-span-6">
            {row.requirement}
          </dd>
          <dd className="text-sm leading-6 text-ink-500 md:col-span-3">
            Source: <ExternalLink source={row.source} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function GuideFaqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink-200 border-y border-ink-200">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 text-brand-700 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-ink-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {sources.map((s) => (
        <li key={s.href}>
          <ExternalLink source={s} />
        </li>
      ))}
    </ul>
  );
}

/** Standard section wrapper with a kicker and heading. */
export function GuideSection({
  index,
  kicker,
  title,
  children,
  className,
}: {
  index?: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className ?? "py-12 sm:py-16"}>
      <Container>
        <Kicker index={index}>{kicker}</Kicker>
        <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

/** Footer band on every Compliance Hub page. */
export function HubFooter() {
  return (
    <section className="border-t border-ink-100 bg-ink-50 py-8">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ReviewedNote />
        <Link
          href="/compliance"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          {/* SVG, not "←": that glyph pulls two extra font files. */}
          <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
          Compliance Hub
        </Link>
      </Container>
    </section>
  );
}
