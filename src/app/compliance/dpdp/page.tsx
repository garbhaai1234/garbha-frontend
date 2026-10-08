import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ComplianceIcon,
  ExternalLink,
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
  dpdpGuide,
  dpdpPresentation,
  guideFaqs,
  rowsFor,
} from "@/content/compliance";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "DPDP Act & Rules 2025 Guide for IVF Clinics",
  description:
    "What the DPDP Act 2023 and DPDP Rules 2025 require of IVF clinics, and by when: notice, consent, security, logs, 72-hour breach reporting, rights requests and penalties.",
  alternates: { canonical: "/compliance/dpdp" },
};

const faqs = guideFaqs(dpdpGuide.rows, "DPDP Act and Rules");
const [penalties] = rowsFor(dpdpGuide.rows, ["Penalties"]);

function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-24">
      <Container className="py-10 sm:py-14">
        <SectionHeading
          eyebrow="Timeline"
          title="When the duties apply"
          description={dpdpGuide.intro}
        />
        <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Connector line: vertical on phones, horizontal from md. */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-brand-300 via-brand-200 to-accent-400/40 md:bottom-auto md:left-6 md:right-6 md:top-6 md:h-px md:w-auto md:bg-gradient-to-r"
          />
          {dpdpGuide.timeline.map((step, i) => (
            <li key={step.when} className="relative flex gap-5 md:block">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-display text-base font-bold text-white shadow-lg shadow-brand-500/25 ring-4 ring-white">
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm md:mt-6">
                <p className="flex items-center gap-2 font-display text-xl font-bold text-brand-700">
                  <ComplianceIcon name="clock" className="h-5 w-5" />
                  {step.when}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-700">{step.what}</p>
                <p className="mt-4 border-t border-ink-100 pt-4 text-xs text-ink-500">
                  Source: <ExternalLink source={step.source} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default function DpdpGuidePage() {
  const { groups, icons, highlights } = dpdpPresentation;
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

      <GuideHero
        pill="Compliance Hub · DPDP"
        title="DPDP guide for"
        accent="IVF clinics"
        description="A plain-language summary of what the Digital Personal Data Protection Act 2023 and DPDP Rules 2025 require of clinics, and by when — with a source for every point."
        chips={["Timeline", "10 requirements", "Sources linked"]}
        art="dpdp"
      >
        <JumpNav
          groups={[
            { id: "timeline", title: "Timeline", blurb: "", topics: [] },
            ...groups,
          ]}
        />
      </GuideHero>

      <HighlightStrip items={highlights} />

      <Timeline />

      {groups.map((group, i) => (
        <GroupSection
          key={group.id}
          group={group}
          index={i}
          rows={dpdpGuide.rows}
          icons={icons}
          tinted={i % 2 === 0}
        />
      ))}

      <section className="border-t border-ink-100">
        <Container className="py-10 sm:py-14">
          <div className="flex flex-col gap-5 rounded-2xl border border-ink-100 bg-ink-50/60 p-7 sm:flex-row sm:items-start sm:p-9">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 ring-1 ring-ink-200">
              <ComplianceIcon name="archive" className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
                Records and retention: ART vs DPDP
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-ink-700">
                {dpdpGuide.retentionNote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <PenaltyPanel row={penalties} />

      <GuideFaqs faqs={faqs} />

      <SourceList sources={dpdpGuide.sources} />

      <GuideCta
        other={{ href: "/compliance/art-act", title: "ART Act guide", icon: "building" }}
      />

      <HubFooter />
    </>
  );
}
