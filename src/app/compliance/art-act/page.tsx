import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import {
  GuideFaqs,
  GuideSection,
  HubFooter,
  RequirementList,
  ReviewedNote,
  SourceList,
} from "@/components/ComplianceGuide";
import { Container } from "@/components/Container";
import { artGuide, guideFaqs } from "@/content/compliance";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "ART Act 2021 Guide for IVF Clinics",
  description:
    "What the ART (Regulation) Act 2021 requires of IVF clinics in India: registration, age limits, consent, donors, PGT, records, grievance and penalties — with sources.",
  alternates: { canonical: "/compliance/art-act" },
};

const faqs = guideFaqs(artGuide.rows, "ART Act");

export default function ArtActGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compliance Hub", path: "/compliance" },
            { name: "ART Act guide", path: "/compliance/art-act" },
          ]),
          faqSchema(faqs),
        ]}
      />
      <PageHeader
        eyebrow="Compliance Hub · ART Act"
        title="ART Act 2021 guide for IVF clinics"
        description="A plain-language summary of what the Assisted Reproductive Technology (Regulation) Act 2021 requires of clinics, with the section and source for every point."
      />
      <Container className="pt-6">
        <ReviewedNote />
      </Container>

      <GuideSection index="01" kicker="Requirements" title={artGuide.title}>
        <RequirementList rows={artGuide.rows} />
      </GuideSection>

      <GuideSection
        index="02"
        kicker="Questions"
        title="Common questions"
        className="border-t border-ink-100 py-12 sm:py-16"
      >
        <GuideFaqs faqs={faqs} />
      </GuideSection>

      <GuideSection
        index="03"
        kicker="Sources"
        title="Sources"
        className="border-t border-ink-100 py-12 sm:py-16"
      >
        <SourceList sources={artGuide.sources} />
      </GuideSection>

      <HubFooter />
    </>
  );
}
