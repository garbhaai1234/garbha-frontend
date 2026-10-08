import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  GroupSection,
  GuideCta,
  GuideFaqs,
  GuideHero,
  HighlightStrip,
  HubFooter,
  JumpNav,
  PenaltyPanel,
  SourceList,
} from "@/components/ComplianceGuide";
import {
  artGuide,
  artPresentation,
  guideFaqs,
  rowsFor,
} from "@/content/compliance";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "ART Act 2021 Guide for IVF Clinics",
  description:
    "What the ART (Regulation) Act 2021 requires of IVF clinics in India: registration, age limits, consent, donors, PGT, records, grievance and penalties — with sources.",
  alternates: { canonical: "/compliance/art-act" },
};

const faqs = guideFaqs(artGuide.rows, "ART Act");
const [penalties] = rowsFor(artGuide.rows, ["Penalties"]);

export default function ArtActGuidePage() {
  const { groups, icons, highlights } = artPresentation;
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

      <GuideHero
        pill="Compliance Hub · ART Act"
        title="ART Act 2021 guide for"
        accent="IVF clinics"
        description="A plain-language summary of what the Assisted Reproductive Technology (Regulation) Act 2021 requires of clinics, with the section and source for every point."
        chips={["14 requirements", "Section references", "Sources linked"]}
        art="art"
      >
        <JumpNav groups={groups} />
      </GuideHero>

      <HighlightStrip items={highlights} />

      {groups.map((group, i) => (
        <GroupSection
          key={group.id}
          group={group}
          index={i}
          rows={artGuide.rows}
          icons={icons}
          tinted={i % 2 === 1}
        />
      ))}

      <PenaltyPanel row={penalties} />

      <GuideFaqs faqs={faqs} />

      <SourceList sources={artGuide.sources} />

      <GuideCta
        other={{ href: "/compliance/dpdp", title: "DPDP guide", icon: "shield" }}
      />

      <HubFooter />
    </>
  );
}
