import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight } from "@/components/Icons";
import {
  ComplianceIcon,
  CtaLink,
  GuideHero,
  HighlightStrip,
  HubFooter,
} from "@/components/ComplianceGuide";
import { artGuide, dpdpGuide, type IconName } from "@/content/compliance";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compliance Hub for IVF Clinics — ART Act & DPDP",
  description:
    "Plain-language guides for IVF clinics in India on the ART (Regulation) Act 2021 and the DPDP Act 2023 and DPDP Rules 2025, with sources for every requirement.",
  alternates: { canonical: "/compliance" },
};

const guides: {
  href: string;
  law: string;
  title: string;
  summary: string;
  icon: IconName;
  topics: string[];
}[] = [
  {
    href: "/compliance/art-act",
    law: "ART (Regulation) Act 2021",
    title: "ART Act guide",
    summary:
      "What the ART (Regulation) Act 2021 requires of clinics: registration, eligibility and age limits, consent, donors, genetic testing, records, grievance and penalties.",
    icon: "building",
    topics: artGuide.rows.map((r) => r.topic),
  },
  {
    href: "/compliance/dpdp",
    law: "DPDP Act 2023 · DPDP Rules 2025",
    title: "DPDP guide",
    summary:
      "What the DPDP Act 2023 and DPDP Rules 2025 require of clinics, and by when: notice, consent, security, logs, breach reporting and rights requests.",
    icon: "shield",
    topics: dpdpGuide.rows.map((r) => r.topic),
  },
];

const selfCheckSteps: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Pick your level",
    text: "Level 1 (IUI) or Level 2 (IVF). You only see the questions that apply to you.",
    icon: "building",
  },
  {
    title: "Answer about your processes",
    text: "Yes, Partly, No or Not applicable — with why each question matters and what counts as evidence.",
    icon: "check",
  },
  {
    title: "Get your score and gap list",
    text: "A score per area, the gaps sorted by severity with fixes and sources, and a downloadable report.",
    icon: "list",
  },
];

export default function ComplianceHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Compliance Hub", path: "/compliance" },
        ])}
      />

      <GuideHero
        pill="Compliance Hub"
        title="Compliance Hub for"
        accent="IVF clinics"
        description="Plain-language guides to the two laws every IVF clinic in India works under — the ART (Regulation) Act 2021 and the DPDP Act 2023 with the DPDP Rules 2025."
        chips={["ART Act 2021", "DPDP Act 2023", "DPDP Rules 2025"]}
        icon="scale"
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/compliance/art-act">
            Read the ART Act guide <ArrowRight className="h-4 w-4" />
          </CtaLink>
          <CtaLink href="/compliance/dpdp" variant="secondary">
            Read the DPDP guide
          </CtaLink>
        </div>
      </GuideHero>

      <HighlightStrip
        items={[
          { value: "2", label: "Laws covered" },
          {
            value: String(artGuide.rows.length + dpdpGuide.rows.length),
            label: "Requirements explained",
          },
          { value: "31", label: "Self-check questions" },
          { value: "~10 min", label: "To complete the self-check" },
        ]}
      />

      <section>
        <Container className="py-10 sm:py-14">
          <SectionHeading
            eyebrow="The guides"
            title="Know what the law asks of your clinic"
            description="Each guide lists the requirements in plain language, with the section and a source link for every point."
          />
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {guides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:p-9"
                >
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                      <ComplianceIcon name={g.icon} className="h-7 w-7" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                      {g.law}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                    {g.title}
                  </h2>
                  <p className="mt-3 text-ink-600">{g.summary}</p>
                  <ul className="mt-6 flex flex-1 flex-wrap content-start gap-2">
                    {g.topics.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600 ring-1 ring-inset ring-ink-200"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Read the guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink-100 bg-ink-50/60">
        <Container className="py-10 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Coming soon"
              title="Free compliance self-check"
              description="A 31-question, ~10-minute check of your clinic's processes. It never asks for patient data."
            />
            <ul className="flex flex-wrap gap-2" aria-label="Answer options">
              {["Yes", "Partly", "No", "Not applicable"].map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-600"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {selfCheckSteps.map((s, i) => (
              <li
                key={s.title}
                className="relative h-full rounded-2xl border border-ink-100 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <ComplianceIcon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl font-bold text-ink-200"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-ink-100">
        <Container className="py-10 sm:py-14">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-50 px-7 py-12 text-center sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-brand opacity-70" />
            <div className="pointer-events-none absolute inset-3 -z-10 rounded-[1.6rem] ring-1 ring-inset ring-ink-200/70 sm:inset-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              Your next step
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Want to talk through your clinic&apos;s compliance?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-ink-500">
              Get in touch with the Garbha.ai team.
            </p>
            <div className="mt-8">
              <CtaLink href="/contact">
                Talk to Garbha <ArrowRight className="h-4 w-4" />
              </CtaLink>
            </div>
          </div>
        </Container>
      </section>

      <HubFooter />
    </>
  );
}
