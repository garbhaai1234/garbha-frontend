import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import {
  ExternalLink,
  GuideFaqs,
  GuideSection,
  HubFooter,
  RequirementList,
  ReviewedNote,
  SourceList,
} from "@/components/ComplianceGuide";
import { Container } from "@/components/Container";
import { dpdpGuide, guideFaqs } from "@/content/compliance";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "DPDP Act & Rules 2025 Guide for IVF Clinics",
  description:
    "What the DPDP Act 2023 and DPDP Rules 2025 require of IVF clinics, and by when: notice, consent, security, logs, 72-hour breach reporting, rights requests and penalties.",
  alternates: { canonical: "/compliance/dpdp" },
};

const faqs = guideFaqs(dpdpGuide.rows, "DPDP Act and Rules");

export default function DpdpGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compliance Hub", path: "/compliance" },
            { name: "DPDP guide", path: "/compliance/dpdp" },
          ]),
          faqSchema(faqs),
        ]}
      />
      <PageHeader
        eyebrow="Compliance Hub · DPDP"
        title="DPDP guide for IVF clinics"
        description="A plain-language summary of what the Digital Personal Data Protection Act 2023 and DPDP Rules 2025 require of clinics, and by when — with a source for every point."
      />
      <Container className="pt-6">
        <ReviewedNote />
      </Container>

      <GuideSection index="01" kicker="Timeline" title="When the duties apply">
        <p className="max-w-3xl text-lg leading-8 text-ink-600">
          {dpdpGuide.intro}
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {dpdpGuide.timeline.map((step) => (
            <li
              key={step.when}
              className="rounded-2xl border border-ink-200 bg-white p-6"
            >
              <p className="font-display text-xl font-bold text-brand-700">
                {step.when}
              </p>
              <p className="mt-2 text-ink-700">{step.what}</p>
              <p className="mt-3 text-sm text-ink-500">
                Source: <ExternalLink source={step.source} />
              </p>
            </li>
          ))}
        </ol>
      </GuideSection>

      <GuideSection
        index="02"
        kicker="Requirements"
        title={dpdpGuide.title}
        className="border-t border-ink-100 py-12 sm:py-16"
      >
        <RequirementList rows={dpdpGuide.rows} />
        <p className="mt-8 max-w-3xl rounded-2xl border border-brand-100 bg-brand-50 p-6 text-ink-700">
          <strong className="text-ink-900">Records and retention: </strong>
          {dpdpGuide.retentionNote}
        </p>
      </GuideSection>

      <GuideSection
        index="03"
        kicker="Questions"
        title="Common questions"
        className="border-t border-ink-100 py-12 sm:py-16"
      >
        <GuideFaqs faqs={faqs} />
      </GuideSection>

      <GuideSection
        index="04"
        kicker="Sources"
        title="Sources"
        className="border-t border-ink-100 py-12 sm:py-16"
      >
        <SourceList sources={dpdpGuide.sources} />
      </GuideSection>

      <HubFooter />
    </>
  );
}
