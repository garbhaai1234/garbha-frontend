import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { ArrowRight } from "@/components/Icons";
import { HubFooter, ReviewedNote } from "@/components/ComplianceGuide";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compliance Hub for IVF Clinics — ART Act & DPDP",
  description:
    "Plain-language guides for IVF clinics in India on the ART (Regulation) Act 2021 and the DPDP Act 2023 and DPDP Rules 2025, with sources for every requirement.",
  alternates: { canonical: "/compliance" },
};

const guides = [
  {
    href: "/compliance/art-act",
    law: "ART (Regulation) Act 2021",
    title: "ART Act guide",
    summary:
      "What the ART (Regulation) Act 2021 requires of clinics: registration, eligibility and age limits, consent, donors, genetic testing, records, grievance and penalties.",
  },
  {
    href: "/compliance/dpdp",
    law: "DPDP Act 2023 · DPDP Rules 2025",
    title: "DPDP guide",
    summary:
      "What the DPDP Act 2023 and DPDP Rules 2025 require of clinics, and by when: notice, consent, security, logs, breach reporting and rights requests.",
  },
] as const;

export default function ComplianceHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Compliance Hub", path: "/compliance" },
        ])}
      />
      <PageHeader
        eyebrow="Compliance Hub"
        title="Compliance Hub for IVF clinics"
        description="Plain-language guides to the two laws every IVF clinic in India works under — the ART (Regulation) Act 2021 and the DPDP Act 2023 with the DPDP Rules 2025."
      />
      <Container className="pt-6">
        <ReviewedNote />
      </Container>

      <section className="py-12 sm:py-16">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {guides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-7 transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:p-9"
                >
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {g.law}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                    {g.title}
                  </h2>
                  <span className="mt-3 flex-1 text-ink-600">{g.summary}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Read the guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-dashed border-ink-300 p-7 sm:p-9">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              Coming soon
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink-900">
              Free compliance self-check
            </h2>
            <p className="mt-3 max-w-2xl text-ink-600">
              A 31-question, ~10-minute check of your clinic&apos;s processes —
              it never asks for patient data. You&apos;ll get a score, a list of gaps with fixes, and a
              downloadable report.
            </p>
          </div>
        </Container>
      </section>

      <HubFooter />
    </>
  );
}
