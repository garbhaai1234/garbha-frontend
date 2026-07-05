import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { CountUp } from "@/components/CountUp";
import { TechHeroArt } from "@/components/TechHeroArt";
import { Check, ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Accordion } from "@/components/Accordion";
import { clsx } from "@/lib/clsx";
import { site } from "@/lib/site";
import { absoluteUrl, breadcrumbSchema, faqSchema } from "@/lib/seo";
import {
  techModules,
  techPillars,
  techBenefits,
  credibilityBadges,
  credibilityPoints,
  partnerships,
  pilotSteps,
  techFaqs,
  type ModuleStatus,
} from "@/content/technology";

export const metadata: Metadata = {
  title: "Technology — AI Embryo Grading & Edge AI for IVF",
  description:
    "Garbha.ai runs explainable Edge AI directly on time-lapse incubator hardware — 93% embryo-selection accuracy, 36,000+ validated embryo dataset, CDSCO-cleared and ISO 13485. See how AI supports every IVF decision.",
  keywords: [
    "AI embryo grading",
    "Edge AI IVF",
    "explainable AI embryology",
    "EmbryoScore",
    "time-lapse incubator AI",
    "ESCO Medical AI",
    "CDSCO IVF AI",
  ],
  alternates: { canonical: "/technology" },
  openGraph: {
    type: "website",
    title: "Technology — AI Embryo Grading & Edge AI for IVF | Garbha.ai",
    description:
      "Explainable Edge AI for the IVF lab: 93% embryo-selection accuracy, 36,000+ validated embryos, CDSCO-cleared and ISO 13485.",
    url: "/technology",
  },
};

const statusStyles: Record<ModuleStatus, string> = {
  "Live in Clinics": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "In Validation": "bg-amber-50 text-amber-700 ring-amber-200",
  "In Build": "bg-sky-50 text-sky-700 ring-sky-200",
  Roadmap: "bg-ink-100 text-ink-500 ring-ink-200",
};

const heroChips = ["Edge AI", "Explainable AI", "CDSCO-cleared", "ISO 13485"];

const pillarIcons: Record<string, "cpu" | "eye" | "layers"> = {
  "Edge AI": "cpu",
  "Explainable AI": "eye",
  "Multi-Modal": "layers",
};

function PillarIcon({
  name,
  className,
}: {
  name: "cpu" | "eye" | "layers";
  className?: string;
}) {
  const s = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths = {
    cpu: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1.5" {...s} />
        <rect x="10" y="10" width="4" height="4" rx="0.5" {...s} />
        <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" {...s} />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" {...s} />
        <circle cx="12" cy="12" r="3" {...s} />
      </>
    ),
    layers: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5Z" {...s} />
        <path d="M3 12l9 5 9-5" {...s} />
        <path d="M3 16l9 5 9-5" {...s} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}

function TechHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-50 [mask-image:radial-gradient(90%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-blob pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />
      <div
        className="animate-blob pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <Container className="pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Technology
            </span>

            <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              AI-powered <span className="italic text-brand-500">embryo grading</span>{" "}
              & decision support for your IVF lab
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-500">
              Garbha runs as Edge AI — directly on time-lapse incubator hardware,
              including the ESCO time-lapse device — so intelligence lives at the
              bench
              and your data stays in your lab.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {heroChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-ink-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-ink-600 backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="primary">
                Book a demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="secondary" className="bg-white">
                Start a free pilot
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="animate-float relative mx-auto w-full max-w-[360px] lg:ml-auto lg:mr-0">
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-brand-400/15 blur-2xl" />
              <div className="relative rounded-[2rem] bg-white/70 p-4 shadow-2xl shadow-brand-500/20 ring-1 ring-white/60 backdrop-blur-md">
                <TechHeroArt className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function TechnologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Garbha.ai Technology — AI Embryo Grading & Edge AI for IVF",
    description: metadata.description,
    image: absoluteUrl("/brand/hero-bg.jpg"),
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl("/technology"),
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Technology", path: "/technology" },
          ]),
          faqSchema(techFaqs),
        ]}
      />

      <TechHero />

      {/* Credibility badge strip */}
      <section className="border-b border-ink-100 bg-ink-50/60">
        <Container className="py-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {credibilityBadges.map((b) => (
              <Reveal key={b.label} className="text-center">
                <CountUp
                  value={b.value}
                  className="block font-display text-3xl font-bold tracking-tight text-brand-600 sm:text-4xl"
                />
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-500">
                  {b.label}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The solution — modules across every touchpoint */}
      <section>
        <Container className="py-10 sm:py-14">
          <SectionHeading
            eyebrow="The Solution"
            title="AI across every IVF touchpoint"
            description="Garbha places objective, explainable AI at each decision point of the IVF cycle — with EmbryoScore, our embryo-grading engine, as the proven core in clinical use today. The remaining modules extend that same intelligence across the full workflow."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {techModules.map((m) => (
              <Reveal
                key={m.no}
                className={clsx("h-full", m.flagship && "md:col-span-2")}
              >
                <div
                  className={clsx(
                    "group relative h-full overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-500/15",
                    m.flagship
                      ? "border-brand-300 ring-1 ring-brand-200"
                      : "border-ink-100 hover:border-brand-200",
                  )}
                >
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-100 bg-gradient-to-r from-brand-500 to-accent-500 transition-transform duration-500" />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 font-display text-sm font-bold text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      {m.no}
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      {m.name}
                    </h3>
                    {m.flagship && (
                      <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                        Flagship
                      </span>
                    )}
                    <span
                      className={clsx(
                        "ml-auto rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] ring-1 ring-inset",
                        statusStyles[m.status],
                      )}
                    >
                      {m.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink-500">
                    {m.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works — the three pillars */}
      <section className="border-t border-ink-100 bg-ink-50/60">
        <Container className="py-10 sm:py-14">
          <SectionHeading
            eyebrow="How It Works"
            title="Explainable intelligence, at the bench"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {techPillars.map((p) => (
              <Reveal key={p.key} className="h-full">
                <div className="group h-full rounded-2xl border border-ink-100 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/15">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <PillarIcon name={pillarIcons[p.key]} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                    {p.key}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-500">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section>
        <Container className="py-10 sm:py-14">
          <SectionHeading
            eyebrow="Why It Matters For Your Clinic"
            title="The benefits"
            description="Garbha is designed to raise outcomes while fitting into how your lab already works."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techBenefits.map((b) => (
              <Reveal key={b.title} className="h-full">
                <div className="group h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-ink-500">
                    {b.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Credibility + partnerships */}
      <section className="border-t border-ink-100 bg-ink-50/60">
        <Container className="py-10 sm:py-14">
          <SectionHeading
            eyebrow="Why Garbha"
            title="Proven, cleared, and backed by ESCO"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {credibilityPoints.map((c) => (
              <Reveal key={c.title} className="h-full">
                <div className="group h-full rounded-2xl border border-ink-100 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-500">
                    {c.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {partnerships.map((p) => (
              <Reveal key={p.name} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-br from-brand-50 to-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-200/40 blur-2xl" />
                  <div className="relative flex items-center gap-3">
                    <h3 className="font-display text-xl font-bold text-ink-900">
                      {p.name}
                    </h3>
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-brand-600 ring-1 ring-inset ring-brand-100">
                      {p.kind}
                    </span>
                  </div>
                  <p className="relative mt-3 text-sm leading-7 text-ink-600">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink-100">
        <Container className="py-10 sm:py-14">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            description="What clinics ask us most about running Garbha in the lab."
          />
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <Accordion items={techFaqs.map((f) => ({ q: f.q, a: f.a }))} />
          </Reveal>
        </Container>
      </section>

      {/* 30-day pilot CTA */}
      <section className="border-t border-ink-100">
        <Container className="py-10 sm:py-14">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-50 px-7 py-14 sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-brand opacity-70" />
            <div className="pointer-events-none absolute inset-3 -z-10 rounded-[1.6rem] ring-1 ring-inset ring-ink-200/70 sm:inset-4" />
            <div className="relative">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
                  Your Next Step
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                  Try Garbha free for 30 days
                </h2>
                <p className="mt-4 text-lg leading-8 text-ink-500">
                  Evaluate Garbha in your own lab, on your own cases — at no cost
                  and with no obligation to continue. Here is how we begin:
                </p>
              </div>

              <ol className="mt-10 space-y-4">
                {pilotSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 font-display text-sm font-bold text-brand-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-ink-900">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-500">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10">
                <Button href="/contact" variant="primary" className="group">
                  Start your free pilot
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
