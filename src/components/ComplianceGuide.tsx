import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight, ChevronDown } from "@/components/Icons";
import { clsx } from "@/lib/clsx";
import {
  complianceDisclaimer,
  complianceReview,
  rowsFor,
  type GuideGroup,
  type GuideRow,
  type Highlight,
  type IconName,
  type Source,
} from "@/content/compliance";

// Server components only: every Compliance Hub page renders fully without
// JavaScript (no Reveal wrappers; FAQ uses native <details>).

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const iconPaths: Record<IconName, React.ReactNode> = {
  building: (
    <>
      <path d="M4 21V5l8-3 8 3v16" {...stroke} />
      <path d="M9 21v-5h6v5M8 8h2M14 8h2M8 12h2M14 12h2M2 21h20" {...stroke} />
    </>
  ),
  archive: (
    <>
      <rect x="3" y="4" width="18" height="5" rx="1" {...stroke} />
      <path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4" {...stroke} />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" {...stroke} />
      <path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2" {...stroke} />
    </>
  ),
  message: (
    <path
      d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12ZM8.5 10.5h7M8.5 13.5h4.5"
      {...stroke}
    />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" {...stroke} />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6" {...stroke} />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" {...stroke} />
      <path d="M3 10h18M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" {...stroke} />
    </>
  ),
  chat: (
    <path
      d="M4 5h16v10H9l-5 4V5ZM8 9h8M8 12h5"
      {...stroke}
    />
  ),
  pen: (
    <>
      <path d="M14 4l6 6L9 21H3v-6L14 4Z" {...stroke} />
      <path d="M12 6l6 6" {...stroke} />
    </>
  ),
  cell: (
    <>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <circle cx="10" cy="10" r="2.5" {...stroke} />
      <circle cx="14.5" cy="14" r="2" {...stroke} />
    </>
  ),
  heart: (
    <path
      d="M12 20s-7.5-4.6-9.3-9.2A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 9.3 4.3C19.5 15.4 12 20 12 20Z"
      {...stroke}
    />
  ),
  dna: (
    <path
      d="M7 3c0 6 10 6 10 12s-10 3-10 6M17 3c0 6-10 6-10 12s10 3 10 6M8.5 7h7M8.5 17h7"
      {...stroke}
    />
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M5.6 5.6l12.8 12.8" {...stroke} />
    </>
  ),
  megaphone: (
    <path
      d="M3 10v4h4l9 5V5L7 10H3ZM7 14l1.5 6H11l-1-6M19 9a3 3 0 0 1 0 6"
      {...stroke}
    />
  ),
  scale: (
    <path
      d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7ZM19 7l-3 7a3 3 0 0 0 6 0l-3-7Z"
      {...stroke}
    />
  ),
  doc: (
    <>
      <path d="M6 2h9l5 5v15H6V2Z" {...stroke} />
      <path d="M14 2v6h6M9 13h8M9 17h6" {...stroke} />
    </>
  ),
  check: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" {...stroke} />
      <path d="M8 12l3 3 5-6" {...stroke} />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="6" r="3" {...stroke} />
      <path d="M12 9v6M8 12h8M9 21l3-6 3 6" {...stroke} />
    </>
  ),
  inbox: (
    <>
      <path d="M3 13l3-8h12l3 8v6H3v-6Z" {...stroke} />
      <path d="M3 13h5l1 3h6l1-3h5" {...stroke} />
    </>
  ),
  badge: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" {...stroke} />
      <circle cx="12" cy="10" r="2.5" {...stroke} />
      <path d="M8 17a4 4 0 0 1 8 0" {...stroke} />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3Z" {...stroke} />
      <path d="M8.5 12l2.5 2.5 4.5-5" {...stroke} />
    </>
  ),
  list: (
    <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" {...stroke} />
  ),
  link: (
    <path
      d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"
      {...stroke}
    />
  ),
  alert: (
    <>
      <path d="M12 3l10 18H2L12 3Z" {...stroke} />
      <path d="M12 10v4M12 17.5h.01" {...stroke} />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M12 7v5l3 2" {...stroke} />
    </>
  ),
};

export function ComplianceIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

/** Disclaimer + last legal review date, shown on every Hub page. */
export function ReviewedNote({ className }: { className?: string }) {
  return (
    <p className={className ?? "text-sm text-ink-500"}>
      {complianceDisclaimer} Last reviewed:{" "}
      <time dateTime={complianceReview.date}>{complianceReview.label}</time>.
    </p>
  );
}

export function ExternalLink({
  source,
  className,
}: {
  source: Source;
  className?: string;
}) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-500"
      }
    >
      {source.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const ctaBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

/**
 * Hub buttons. Same shape as the site Button, but brand-700 so white text
 * passes WCAG AA contrast (brand-500 does not).
 */
export function CtaLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        ctaBase,
        variant === "primary"
          ? "bg-brand-700 text-white shadow-sm hover:bg-brand-800"
          : "bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50",
      )}
    >
      {children}
    </Link>
  );
}

/** Page hero in the style of /technology: gradient, blobs, pill, chips. */
export function GuideHero({
  pill,
  title,
  accent,
  description,
  chips,
  icon,
  children,
}: {
  pill: string;
  title: string;
  /** Part of the title shown in the brand accent (rendered after `title`). */
  accent?: string;
  description: string;
  chips?: string[];
  icon: IconName;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-50 [mask-image:radial-gradient(90%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-blob pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />
      <div
        className="animate-blob pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <Container className="pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              {pill}
            </span>
            <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              {title}
              {accent && (
                <>
                  {" "}
                  {/* Upright and on its own line: the italic face loads late, and a
                      rewrap on font swap shifts the page (CLS). */}
                  <span className="block text-brand-500">{accent}</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-500">
              {description}
            </p>
            {chips && (
              <ul className="mt-8 hidden flex-wrap gap-2.5 sm:flex">
                {chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-ink-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-ink-600 backdrop-blur"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            )}
            {children}
            <ReviewedNote className="mt-8 text-sm text-ink-500" />
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <div className="animate-float relative mx-auto w-full max-w-[300px] lg:ml-auto lg:mr-0">
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-brand-400/15 blur-2xl" />
              <div className="relative flex aspect-square items-center justify-center rounded-[2rem] bg-white/70 shadow-2xl shadow-brand-500/20 ring-1 ring-white/60 backdrop-blur-md">
                <span className="flex h-36 w-36 items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/30">
                  <ComplianceIcon name={icon} className="h-20 w-20" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Headline figures strip (same look as the /technology badge strip). */
export function HighlightStrip({ items }: { items: Highlight[] }) {
  return (
    <section className="border-b border-ink-100 bg-ink-50/60">
      <Container className="py-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {items.map((h) => (
            <div key={h.label} className="flex flex-col-reverse text-center">
              <dt className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-500">
                {h.label}
              </dt>
              <dd className="font-display text-3xl font-bold tracking-tight text-brand-700 sm:text-4xl">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/** In-page jump links to each group; plain anchors, no JS. */
export function JumpNav({ groups }: { groups: GuideGroup[] }) {
  return (
    // One scrollable line on phones: wrapped pills change line count when the
    // web font swaps in, which shifted the page (CLS 0.1). Wraps from sm up.
    <nav
      aria-label="On this page"
      className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {groups.map((g, i) => (
        <a
          key={g.id}
          href={`#${g.id}`}
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          <span className="font-display text-xs font-bold text-brand-700">
            {String(i + 1).padStart(2, "0")}
          </span>
          {g.title}
        </a>
      ))}
    </nav>
  );
}

function RequirementCard({ row, icon }: { row: GuideRow; icon: IconName }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500">
          <ComplianceIcon name={icon} className="h-6 w-6" />
        </span>
        {row.section && (
          <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ink-600 ring-1 ring-inset ring-ink-200">
            {row.section}
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
        {row.topic}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-7 text-ink-600">
        {row.requirement}
      </p>
      <p className="mt-5 border-t border-ink-100 pt-4 text-xs text-ink-500">
        Source: <ExternalLink source={row.source} />
      </p>
    </article>
  );
}

/** One themed group of requirements as a card grid. */
export function GroupSection({
  group,
  index,
  rows,
  icons,
  tinted,
}: {
  group: GuideGroup;
  index: number;
  rows: GuideRow[];
  icons: Record<string, IconName>;
  tinted?: boolean;
}) {
  const groupRows = rowsFor(rows, group.topics);
  return (
    <section
      id={group.id}
      className={clsx(
        "scroll-mt-24 border-t border-ink-100",
        tinted && "bg-ink-50/60",
      )}
    >
      <Container className="py-10 sm:py-14">
        <div className="flex items-start gap-5">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 font-display text-lg font-bold text-white shadow-lg shadow-brand-500/25 sm:flex">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              {group.title}
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-500">
              {group.blurb}
            </p>
          </div>
        </div>
        <div
          className={clsx(
            "mt-10 grid gap-6 sm:grid-cols-2",
            groupRows.length >= 3 && "lg:grid-cols-3",
            groupRows.length === 4 && "xl:grid-cols-4",
          )}
        >
          {groupRows.map((row) => (
            <RequirementCard
              key={row.topic}
              row={row}
              icon={icons[row.topic] ?? "doc"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Penalties row, shown as a warning panel. */
export function PenaltyPanel({ row }: { row: GuideRow }) {
  return (
    <section className="border-t border-ink-100">
      <Container className="py-10 sm:py-14">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-7 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-brand-200/50 blur-3xl" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-500/30">
              <ComplianceIcon name="alert" className="h-7 w-7" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                  {row.topic}
                </h2>
                {row.section && (
                  <span className="rounded-full bg-white px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-brand-700 ring-1 ring-inset ring-brand-200">
                    {row.section}
                  </span>
                )}
              </div>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-700">
                {row.requirement}
              </p>
              <p className="mt-5 text-sm text-ink-500">
                Source: <ExternalLink source={row.source} />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** FAQ styled like the site Accordion, but native <details> (works without JS). */
export function GuideFaqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="border-t border-ink-100 bg-ink-50/60">
      <Container className="py-10 sm:py-14">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description="Each answer is the requirement as stated in the guide above."
        />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
          {faqs.map((f, i) => (
            <details key={f.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-base font-semibold text-ink-900 transition-colors group-open:text-brand-700 sm:text-lg">
                  {f.q}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="px-6 pb-6 text-sm leading-7 text-ink-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <section className="border-t border-ink-100">
      <Container className="py-10 sm:py-14">
        <SectionHeading eyebrow="Sources" title="Read the law yourself" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {sources.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-ink-600 ring-1 ring-ink-200 transition-colors group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500">
                  <ComplianceIcon name="doc" className="h-5 w-5" />
                </span>
                <span className="flex-1 text-sm font-semibold text-ink-900">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 -rotate-45 text-brand-700"
                />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Closing band: the other guide + talk to Garbha. */
export function GuideCta({
  other,
}: {
  other: { href: string; title: string; icon: IconName };
}) {
  return (
    <section className="border-t border-ink-100">
      <Container className="py-10 sm:py-14">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-50 px-7 py-12 sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-brand opacity-70" />
          <div className="pointer-events-none absolute inset-3 -z-10 rounded-[1.6rem] ring-1 ring-inset ring-ink-200/70 sm:inset-4" />
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Your next step
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                Need help closing the gaps?
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-ink-500">
                Talk to the Garbha.ai team about how your clinic handles
                records, consent and data.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/contact">
                  Talk to Garbha <ArrowRight className="h-4 w-4" />
                </CtaLink>
                <CtaLink href="/compliance" variant="secondary">
                  Back to Compliance Hub
                </CtaLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Link
                href={other.href}
                className="group flex items-center gap-5 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25">
                  <ComplianceIcon name={other.icon} className="h-7 w-7" />
                </span>
                <span className="flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                    Also read
                  </span>
                  <span className="mt-1 block font-display text-xl font-bold text-ink-900">
                    {other.title}
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 text-brand-700 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
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
