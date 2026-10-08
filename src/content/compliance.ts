/**
 * Compliance Hub guide content.
 *
 * Source: docs/compliance/COMPLIANCE_HUB_SPEC.md §2 (legal review 29 Sep 2026).
 * The requirement text is copied verbatim from the spec — do not edit it here
 * without a new legal review; update the spec first, then this file.
 */

export const complianceReview = {
  /** Last legal review of the guide content (ISO date). */
  date: "2026-09-29",
  label: "29 Sep 2026",
} as const;

export const complianceDisclaimer =
  "Educational information, not legal advice.";

export type Source = { label: string; href: string };

export type GuideRow = {
  topic: string;
  requirement: string;
  /** Statutory section, where the spec gives one. */
  section?: string;
  /** Which entry in the guide's sources backs this row. */
  source: Source;
};

const artSources = {
  act: {
    label: "ART Act text — Indian Kanoon",
    href: "https://indiankanoon.org/doc/61852499/",
  },
  sec22: {
    label: "Sec 22 — Indian Kanoon",
    href: "https://indiankanoon.org/doc/147282120/",
  },
  prs: {
    label: "PRS summary",
    href: "https://prsindia.org/billtrack/prs-products/issues-for-consideration",
  },
  registry: {
    label: "National ART & Surrogacy Registry",
    href: "https://registry.artsurrogacy.gov.in/clinic/list?type=register-clinic",
  },
} satisfies Record<string, Source>;

export const artGuide = {
  title: "ART (Regulation) Act 2021 — what clinics must do",
  rows: [
    {
      topic: "Registration",
      requirement:
        "Every ART clinic and bank must register with the National ART & Surrogacy Registry; registration is valid for 5 years",
      section: "Sec 16",
      source: artSources.act,
    },
    {
      topic: "Eligibility",
      requirement:
        "Screen commissioning couple, woman and gamete donors for eligibility",
      section: "Sec 21",
      source: artSources.act,
    },
    {
      topic: "Age limits",
      requirement:
        "Woman above 21 and below 50; man above 21 and below 55",
      section: "Sec 21",
      source: artSources.act,
    },
    {
      topic: "Embryo transfer",
      requirement:
        "Not more than three oocytes or embryos placed in the uterus in a treatment cycle",
      section: "Sec 21",
      source: artSources.act,
    },
    {
      topic: "Counselling",
      requirement: "Professional counselling on all implications and chances",
      section: "Sec 21",
      source: artSources.act,
    },
    {
      topic: "Consent",
      requirement:
        "Written informed consent of all parties; 12-month insurance for oocyte donors; cryopreservation needs written instructions for death or incapacity; either partner can withdraw consent before transfer",
      section: "Sec 22",
      source: artSources.sec22,
    },
    {
      topic: "Oocyte donors",
      requirement:
        "Aged 23–35; donate only once in life; not more than seven oocytes retrieved",
      section: "Sec 27",
      source: artSources.act,
    },
    {
      topic: "Genetic testing",
      requirement:
        "PGT only to screen for known, pre-existing, heritable or genetic diseases",
      section: "Sec 25",
      source: artSources.act,
    },
    {
      topic: "Sex selection",
      requirement: "Must not offer a child of pre-determined sex",
      section: "Sec 26",
      source: artSources.act,
    },
    {
      topic: "Advertising",
      requirement:
        "No advertisement of sex-selective ART in any manner, including the internet (5–10 years' imprisonment or ₹10–25 lakh fine)",
      section: "Sec 32",
      source: artSources.act,
    },
    {
      topic: "Records",
      requirement:
        "Detailed records kept for at least 10 years; share information with the National Registry",
      section: "Sec 21",
      source: artSources.act,
    },
    {
      topic: "Confidentiality",
      requirement:
        "Information on couple, woman and donor kept confidential",
      section: "Sec 21",
      source: artSources.act,
    },
    {
      topic: "Grievance",
      requirement: "Maintain a grievance cell",
      section: "Sec 21",
      source: artSources.act,
    },
    {
      topic: "Penalties",
      requirement:
        "First contravention: ₹5–10 lakh fine. Later: 3–8 years' imprisonment and ₹10–20 lakh fine",
      section: "Sec 33",
      source: artSources.act,
    },
  ] satisfies GuideRow[],
  sources: Object.values(artSources),
};

const dpdpSources = {
  sec8: {
    label: "DPDP Act Sec 8 — Indian Kanoon",
    href: "https://indiankanoon.org/doc/186118625/",
  },
  pibNotified: {
    label: "PIB — DPDP Rules notified",
    href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655&reg=48&lang=2",
  },
  pibRules: {
    label: "PIB — DPDP Rules 2025",
    href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&reg=3&lang=2",
  },
  privacyWorld: {
    label: "Privacy World — Rules summary (timeline, security, 72 hours)",
    href: "https://www.privacyworld.blog/2025/11/india-passes-the-digital-personal-data-protection-rules-ushering-in-a-new-digital-age-in-india/",
  },
} satisfies Record<string, Source>;

export const dpdpGuide = {
  title: "DPDP Act 2023 and DPDP Rules 2025 — what clinics must do",
  intro:
    "An IVF clinic that collects patient data is a Data Fiduciary under the DPDP Act.",
  timeline: [
    {
      when: "14 Nov 2025",
      what: "DPDP Rules notified; Data Protection Board set up.",
      source: dpdpSources.pibNotified,
    },
    {
      when: "~Nov 2026 (12 months)",
      what: "Consent Manager registration opens.",
      source: dpdpSources.privacyWorld,
    },
    {
      when: "~May 2027 (18 months)",
      what: "Main duties apply: notices, consent, security safeguards, breach reporting, rights requests.",
      source: dpdpSources.privacyWorld,
    },
  ],
  rows: [
    {
      topic: "Notice",
      requirement:
        "Standalone, clear notice: itemised data collected, purpose, and a link to withdraw consent, exercise rights and complain to the Board",
      source: dpdpSources.pibNotified,
    },
    {
      topic: "Consent",
      requirement: "Free, specific, recorded; can be withdrawn at any time",
      source: dpdpSources.pibNotified,
    },
    {
      topic: "Processors",
      requirement:
        "Use vendors that process personal data only under a valid contract (Act Sec 8(2))",
      source: dpdpSources.sec8,
    },
    {
      topic: "Contact",
      requirement:
        "Display contact details of a designated officer or Data Protection Officer (Act Sec 8(9))",
      source: dpdpSources.sec8,
    },
    {
      topic: "Rights requests",
      requirement:
        "Respond to access, correction and erasure requests within 90 days",
      source: dpdpSources.pibNotified,
    },
    {
      topic: "Security",
      requirement:
        "Reasonable safeguards: encryption or masking, access control, access logging and monitoring, backups, ways to detect and investigate unauthorised access",
      source: dpdpSources.privacyWorld,
    },
    {
      topic: "Logs",
      requirement: "Keep logs for at least one year",
      source: dpdpSources.privacyWorld,
    },
    {
      topic: "Breach",
      requirement:
        "Inform affected people without delay in plain language; report to the Data Protection Board within 72 hours",
      source: dpdpSources.privacyWorld,
    },
    {
      topic: "Children",
      requirement:
        "Verifiable parental consent for under-18s, with exemptions including healthcare",
      source: dpdpSources.pibNotified,
    },
    {
      topic: "Penalties",
      requirement:
        "Up to ₹250 crore (security failure); up to ₹200 crore (breach not reported, or children's data); up to ₹50 crore (other)",
      source: dpdpSources.pibRules,
    },
  ] satisfies GuideRow[],
  retentionNote:
    "ART's 10-year record rule and DPDP's storage limitation must be reconciled — keep ART records 10 years, delete other data when its purpose ends.",
  sources: Object.values(dpdpSources),
};

/**
 * Presentation only: how the guide rows are grouped on the page, an icon per
 * topic, and headline figures. Every figure is quoted from a row above.
 */
export type IconName =
  | "building"
  | "archive"
  | "lock"
  | "message"
  | "users"
  | "calendar"
  | "chat"
  | "pen"
  | "cell"
  | "heart"
  | "dna"
  | "ban"
  | "megaphone"
  | "scale"
  | "doc"
  | "check"
  | "child"
  | "inbox"
  | "badge"
  | "shield"
  | "list"
  | "link"
  | "alert"
  | "clock";

export type GuideGroup = {
  id: string;
  title: string;
  blurb: string;
  topics: string[];
};

export type Highlight = { value: string; label: string };

export const artPresentation = {
  icons: {
    Registration: "building",
    Eligibility: "users",
    "Age limits": "calendar",
    "Embryo transfer": "cell",
    Counselling: "chat",
    Consent: "pen",
    "Oocyte donors": "heart",
    "Genetic testing": "dna",
    "Sex selection": "ban",
    Advertising: "megaphone",
    Records: "archive",
    Confidentiality: "lock",
    Grievance: "message",
    Penalties: "scale",
  } satisfies Record<string, IconName>,
  groups: [
    {
      id: "clinic",
      title: "Running the clinic",
      blurb: "Registration, records, confidentiality and a way to raise complaints.",
      topics: ["Registration", "Records", "Confidentiality", "Grievance"],
    },
    {
      id: "patients",
      title: "Patients and consent",
      blurb: "Who can be treated, and what they must be told and agree to.",
      topics: ["Eligibility", "Age limits", "Counselling", "Consent"],
    },
    {
      id: "lab",
      title: "Treatment and the lab",
      blurb: "Limits on transfers, donors and genetic testing.",
      topics: ["Embryo transfer", "Oocyte donors", "Genetic testing", "Sex selection"],
    },
    {
      id: "advertising",
      title: "Advertising",
      blurb: "What a clinic may never promote, online or offline.",
      topics: ["Advertising"],
    },
  ] satisfies GuideGroup[],
  highlights: [
    { value: "5 years", label: "Registration validity" },
    { value: "10 years", label: "Minimum record keeping" },
    { value: "3", label: "Max oocytes or embryos per transfer" },
    { value: "₹5–10 lakh", label: "Fine for a first contravention" },
  ] satisfies Highlight[],
};

export const dpdpPresentation = {
  icons: {
    Notice: "doc",
    Consent: "check",
    Processors: "link",
    Contact: "badge",
    "Rights requests": "inbox",
    Security: "shield",
    Logs: "list",
    Breach: "alert",
    Children: "child",
    Penalties: "scale",
  } satisfies Record<string, IconName>,
  groups: [
    {
      id: "notice-consent",
      title: "Notice and consent",
      blurb: "Tell patients what you collect and why, and record their choice.",
      topics: ["Notice", "Consent", "Children"],
    },
    {
      id: "rights",
      title: "Rights and accountability",
      blurb: "Someone to contact, and answers to requests on time.",
      topics: ["Contact", "Rights requests", "Processors"],
    },
    {
      id: "security",
      title: "Security and breaches",
      blurb: "Protect the data, keep logs, and act fast when something goes wrong.",
      topics: ["Security", "Logs", "Breach"],
    },
  ] satisfies GuideGroup[],
  highlights: [
    { value: "72 hours", label: "To report a breach to the Board" },
    { value: "90 days", label: "To answer rights requests" },
    { value: "1 year", label: "Minimum log retention" },
    { value: "₹250 crore", label: "Maximum penalty (security failure)" },
  ] satisfies Highlight[],
};

/** Rows of a guide in the order of its groups. */
export function rowsFor(rows: GuideRow[], topics: string[]): GuideRow[] {
  return topics.map((t) => {
    const row = rows.find((r) => r.topic === t);
    if (!row) throw new Error(`Unknown compliance topic: ${t}`);
    return row;
  });
}

/**
 * Visible FAQ (and FAQPage schema) built only from the guide rows: the
 * question names the topic, the answer is the row's requirement unchanged.
 */
export function guideFaqs(
  rows: GuideRow[],
  law: string,
): { q: string; a: string }[] {
  return rows.map((row) => ({
    q: `What does the ${law} say about ${row.topic.toLowerCase()}?`,
    a: row.section
      ? `${row.requirement} (${row.section}).`
      : `${row.requirement}.`,
  }));
}
