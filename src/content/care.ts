import type { IconName } from "@/content/compliance";

/**
 * Garbha Care — the consumer (B2C) fertility ecosystem. Copy comes from
 * "Garbha Care: B2C Ecosystem Roadmap, App Design and Developer Brief"
 * (v2, 3 Oct 2026). Only the public, consumer-facing parts are used here:
 * no revenue, competitor or internal-decision content.
 *
 * Rules from the brief that this page follows:
 * - every tool is educational only and ends with the free counsellor call;
 * - no diagnosis, no success percentages, no promise of pregnancy;
 * - "verified" always names the licence behind it;
 * - no ratings or success-rate rankings at launch;
 * - every number carries its source.
 */

export type Source = { label: string; href: string };

export const careDisclaimer =
  "Educational information, not medical advice. Tools, assistant answers and care programmes are signed off by a clinical advisor before launch.";

export const careStatus = {
  label: "Coming soon",
  city: "Hyderabad",
  languages: ["English", "Telugu"],
  next: "Hindi",
};

export const careSources = {
  registry: {
    label: "National ART & Surrogacy Registry — registered clinics",
    href: "https://registry.artsurrogacy.gov.in/clinic/list?type=register-clinic",
  },
  isar: {
    label: "The Diplomat — ISAR estimate of 27.5M infertile couples",
    href: "https://thediplomat.com/2018/05/indias-hidden-infertility-struggles/",
  },
  cycles: {
    label: "Omnicuris — India IVF cycles",
    href: "https://www.omnicuris.com/medshots/daily_updates/india-ivf-market-growth-regulatory-trends",
  },
  asrmNatural: {
    label: "ASRM — Optimizing natural fertility (2022)",
    href: "https://www.asrm.org/practice-guidance/practice-committee-documents/optimizing-natural-fertility-a-committee-opinion-2021/",
  },
  asrmEvaluation: {
    label: "ASRM — Fertility evaluation of infertile women (2021)",
    href: "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2021/",
  },
  who: {
    label: "WHO 6th edition semen reference values (summary)",
    href: "https://www.fertility-smart.net/knowledge-center/normal-semen-analysis-who-2021/",
  },
  cloudnine: {
    label: "Cloudnine — IVF cost in India",
    href: "https://www.cloudninefertility.com/blog/ivf-treatment-in-india-how-much-does-it-cost",
  },
  indira: {
    label: "Indira IVF — Egg freezing cost in India",
    href: "https://www.indiraivf.com/blog/egg-freezing-cost-in-india",
  },
  asrmOocyte: {
    label: "ASRM — Planned oocyte cryopreservation guideline (2021)",
    href: "https://www.asrm.org/practice-guidance/practice-committee-documents/evidence-based-outcomes-after-oocyte-cryopreservation-for-donor-oocyte-in-vitro-fertilization-and-planned-oocyte-cryopreservation-a-guideline-2021/",
  },
  artAct: {
    label: "ART (Regulation) Act 2021 — full text",
    href: "https://indiankanoon.org/doc/61852499/",
  },
  artRules: {
    label: "ART (Regulation) Rules 2022 — official text",
    href: "https://artsurrogacy.gov.in/public/fornt/assets/images/Notifications/rules/art-rules-2022.pdf",
  },
  pcpndt: {
    label: "PCPNDT Act 1994 — full text (sections 18 and 22)",
    href: "https://indiankanoon.org/doc/13125684/",
  },
  telemedicine: {
    label: "Telemedicine Practice Guidelines 2020",
    href: "https://nmcn.in/public/assets/pdf/Telemedicine%20Practice%20Guidelines.pdf",
  },
  drugsRules: {
    label: "Drugs Rules 1945 — rule 65 (licence, pharmacist, prescription)",
    href: "https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2022/drug_rules/Drugs%20Rules%201945_2024%2009.pdf",
  },
  fssai: {
    label: "FSSAI — advisory to e-commerce food businesses (3 Dec 2024)",
    href: "https://www.fssai.gov.in/upload/advisories/2024/12/674efa161d756Adobe%20Scan%203%20Dec%202024.pdf",
  },
  nabl: {
    label: "NABL — FAQ (accreditation is voluntary)",
    href: "https://nabl-india.org/faq/",
  },
  whatsapp: {
    label: "WhatsApp Business Messaging Policy",
    href: "https://whatsappbusiness.com/policy/",
  },
} satisfies Record<string, Source>;

/** 1.1 — the six stages of the journey. */
export const journey: {
  stage: string;
  who: string;
  worry: string;
  free: string;
  book: string;
}[] = [
  {
    stage: "Trying",
    who: "Couples trying naturally for 6–12+ months",
    worry: "“When is my fertile window?” “Is it normal it hasn’t happened yet?”",
    free: "Ovulation tracker; “Should we see a specialist?” checker",
    book: "Preconception care programme; a first consult",
  },
  {
    stage: "Worried",
    who: "First tests done (AMH, semen analysis)",
    worry: "“What does my report mean?”",
    free: "Report readers; the assistant; free counselling call",
    book: "Scans and tests; a doctor consult",
  },
  {
    stage: "Deciding",
    who: "Advised IUI or IVF",
    worry: "“How much will IVF cost?” “Which clinic is genuine?”",
    free: "Cost estimator; verified clinic finder; questions-to-ask checklist",
    book: "Consult at a verified IVF centre; second opinion",
  },
  {
    stage: "In treatment",
    who: "Mid-cycle patients",
    worry: "“What happens next?” “Where do I get these injections?”",
    free: "IVF timeline planner; medicine reminders",
    book: "Medicine delivery; IVF companion programme",
  },
  {
    stage: "After a cycle",
    who: "Failed cycle or planning another",
    worry: "“Why did it fail?” “Should we switch clinics?”",
    free: "Second-opinion counselling",
    book: "Second-opinion consult; repeat tests",
  },
  {
    stage: "Planning ahead",
    who: "People delaying parenthood",
    worry: "“Should I freeze my eggs?”",
    free: "Egg-freezing guide and planner",
    book: "Egg-freezing programme at a registered clinic",
  },
];

/** 1.3 — the four layers. */
export const layers: {
  name: string;
  holds: string;
  by: string;
  price: string;
  icon: IconName;
}[] = [
  {
    name: "Free",
    holds: "Ovulation tracker, fertility tools, the assistant, verified finder",
    by: "Garbha",
    price: "Free",
    icon: "heart",
  },
  {
    name: "Guided",
    holds: "First-level counselling; care programmes",
    by: "Garbha counsellors, with partners inside programmes",
    price: "Counselling free; programmes paid",
    icon: "chat",
  },
  {
    name: "Marketplace",
    holds: "Consults, scans and tests, egg freezing, IVF and IUI, medicines and supplements",
    by: "Verified sellers",
    price: "The seller’s price, shown in full before booking",
    icon: "building",
  },
  {
    name: "Trust",
    holds: "Licence checks, consent, payments, grievance desk",
    by: "Garbha",
    price: "Included",
    icon: "shield",
  },
];

/** 1.4 — free tools, P1 first. "Later" tools are not shown. */
export const tools: {
  name: string;
  gets: string;
  basis: string;
  source?: Source;
  priority: "At launch" | "Next";
  icon: IconName;
}[] = [
  {
    name: "Ovulation tracker",
    gets: "Period log, estimated fertile window and ovulation day, LH-test and symptom logging, reminders.",
    basis:
      "ASRM 2022: the fertile window is the 6 days ending on ovulation day. In a study of 949 women, calendar apps predicted ovulation day with at most 21% accuracy, so dates are shown as estimates and sharpened by LH tests.",
    source: careSources.asrmNatural,
    priority: "At launch",
    icon: "calendar",
  },
  {
    name: "“Should we see a specialist?” checker",
    gets: "A clear yes / not yet, with reasons.",
    basis:
      "ASRM 2021: evaluate after 12 months if under 35, 6 months if 35+, sooner if over 40 or with irregular cycles, endometriosis or known male factor.",
    source: careSources.asrmEvaluation,
    priority: "At launch",
    icon: "check",
  },
  {
    name: "Semen analysis report reader",
    gets: "Each value marked within or below the WHO reference.",
    basis:
      "WHO 6th ed. (2021) lower limits: volume 1.4 mL, concentration 16 M/mL, total 39 M, progressive motility 30%, morphology 4%.",
    source: careSources.who,
    priority: "At launch",
    icon: "doc",
  },
  {
    name: "IVF cost estimator",
    gets: "A likely range for your city and add-ons.",
    basis:
      "Cloudnine: ₹1.5–2.5L metro, ₹1–1.8L tier-2, ₹3.5–5L with ICSI, freezing or PGT.",
    source: careSources.cloudnine,
    priority: "At launch",
    icon: "scale",
  },
  {
    name: "Questions to ask your clinic",
    gets: "A printable checklist, including “Do you use AI embryo grading?”",
    basis: "Includes ART Act registration — check any clinic in the verified finder.",
    source: careSources.registry,
    priority: "At launch",
    icon: "list",
  },
  {
    name: "Medicine and appointment reminders",
    gets: "Discreet reminders for tablets, injections, scans and calls.",
    basis:
      "Set by you from your own prescription; the app gives no dosing advice.",
    priority: "At launch",
    icon: "clock",
  },
  {
    name: "Egg-freezing planner and cost guide",
    gets: "What freezing involves, what it costs, what to ask.",
    basis:
      "Indira IVF: ₹1–2.5L per cycle, storage ₹10,000–30,000 a year. ASRM 2021: outcomes appear better when eggs are frozen younger; there is not enough data to name a best age.",
    source: careSources.indira,
    priority: "Next",
    icon: "cell",
  },
  {
    name: "Eligibility checker",
    gets: "Whether you fall inside ART Act age limits.",
    basis:
      "ART Act s.21(g): women above 21 and below 50; men above 21 and below 55.",
    source: careSources.artAct,
    priority: "Next",
    icon: "users",
  },
  {
    name: "IVF timeline planner",
    gets: "A week-by-week view of a typical cycle.",
    basis: "Written by our clinical advisor.",
    priority: "Next",
    icon: "list",
  },
  {
    name: "AMH / ovarian reserve explainer",
    gets: "What the number means and what to ask next.",
    basis: "Written by our clinical advisor; no diagnosis.",
    priority: "Next",
    icon: "dna",
  },
];

/** 1.5 — the assistant: what it does and when it hands over. */
export const assistantJobs: { job: string; does: string; handover: string }[] = [
  {
    job: "Welcome",
    does: "Asks your stage and language; points to the right tool",
    handover: "You sound distressed or unsure where to start",
  },
  {
    job: "Answers",
    does: "Explains terms, reports and next steps from approved content, and shows its source",
    handover: "The question needs a diagnosis, a medicine or a personal prediction",
  },
  {
    job: "Reminders",
    does: "Fertile window, medicines, scans, calls and storage renewals",
    handover: "You reply with a medical question",
  },
  {
    job: "Booking help",
    does: "Finds a slot, reschedules, tracks an order",
    handover: "A partner has not confirmed in time",
  },
  {
    job: "Programme check-ins",
    does: "Weekly check-in and the next task",
    handover: "An answer suggests a red flag",
  },
];

export const assistantRules: string[] = [
  "Says it is automated in its first message, and keeps “Talk to a person” one tap away.",
  "Never diagnoses, counsels, prescribes or predicts chances — only a registered doctor may.",
  "Answers only from content our clinical advisor has approved. If nothing matches, it says so and offers a counsellor.",
  "Red-flag words, such as heavy bleeding or severe pain, trigger an urgent-care message and a call-back offer.",
  "On WhatsApp it needs your opt-in, and nothing is sold there — orders happen only in the app.",
];

/** 1.6 — the free counselling call. */
export const counsellingSteps: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Use a free tool or ask the assistant",
    text: "Get your answer first — no sign-up needed.",
    icon: "heart",
  },
  {
    title: "Book a free counselling call",
    text: "A short form on your phone: first name, mobile, city or PIN, both partners’ ages, how long you’ve been trying, where you are now, and your language and call time.",
    icon: "calendar",
  },
  {
    title: "Talk to a fertility counsellor",
    text: "They listen, explain your options in plain words and set the next step — never a diagnosis. Medical questions go to a registered doctor.",
    icon: "chat",
  },
  {
    title: "Book care only if you need it",
    text: "A programme or a booking with a verified partner. First-level counselling calls are always free.",
    icon: "check",
  },
];

/** 1.7 — care programmes. */
export const programmes: {
  name: string;
  for: string;
  bundles: string;
  by: string;
  icon: IconName;
}[] = [
  {
    name: "Preconception care",
    for: "Couples planning, or trying for under a year",
    bundles: "Cycle and lifestyle plan, counsellor calls, baseline tests, nutrition guidance",
    by: "Garbha counsellor; partner lab; nutritionist",
    icon: "heart",
  },
  {
    name: "Fertility check",
    for: "Couples who want to know where they stand",
    bundles: "AMH, scan and semen analysis with a doctor’s review",
    by: "Partner lab; IVF centre doctor",
    icon: "check",
  },
  {
    name: "PCOS and cycle health",
    for: "Irregular cycles",
    bundles: "Gynaecologist consult, tests, lifestyle plan, tracker coaching",
    by: "Partner doctor; Garbha counsellor",
    icon: "calendar",
  },
  {
    name: "Male fertility",
    for: "A semen report below reference",
    bundles: "Andrology consult, repeat test, lifestyle plan",
    by: "Partner doctor and lab",
    icon: "users",
  },
  {
    name: "IVF companion",
    for: "Couples in a treatment cycle",
    bundles: "Timeline, medicine reminders and delivery, counsellor support",
    by: "Garbha counsellor; partner pharmacy",
    icon: "clock",
  },
  {
    name: "Egg freezing",
    for: "People planning ahead",
    bundles: "Assessment (AMH and scan), counselling, the clinic package, storage reminders",
    by: "Registered Level 2 ART clinic",
    icon: "cell",
  },
  {
    name: "After a cycle",
    for: "A failed cycle",
    bundles: "Second-opinion consult, emotional support, a next-step plan",
    by: "Partner doctor; Garbha counsellor",
    icon: "message",
  },
];

/** 1.8 — marketplace services and the rule the app enforces. */
export const services: {
  name: string;
  gets: string;
  seller: string;
  rule: string;
  source: Source;
  icon: IconName;
}[] = [
  {
    name: "Consults",
    gets: "Video or in-clinic visit with a fertility doctor",
    seller: "Registered medical practitioners; IVF centres",
    rule: "The doctor’s name, qualification and registration number are shown.",
    source: careSources.telemedicine,
    icon: "chat",
  },
  {
    name: "Scans and tests",
    gets: "Blood tests with home collection; ultrasound at the centre",
    seller: "Diagnostic centres; IVF centres",
    rule: "Ultrasound only at PCPNDT-registered centres. No sex determination, ever.",
    source: careSources.pcpndt,
    icon: "doc",
  },
  {
    name: "Egg freezing",
    gets: "Assessment, freezing cycle and storage",
    seller: "Registered Level 2 ART clinics",
    rule: "Your own eggs only — no donor matching. Storage is normally up to ten years.",
    source: careSources.artRules,
    icon: "cell",
  },
  {
    name: "IVF and IUI",
    gets: "Consultation and treatment packages at the centre",
    seller: "Registered ART clinics",
    rule: "Only clinics on the national registry; women above 21 and below 50, men above 21 and below 55.",
    source: careSources.artAct,
    icon: "building",
  },
  {
    name: "Medicines",
    gets: "Prescribed fertility medicines delivered home",
    seller: "Licensed retail pharmacies",
    rule: "A valid prescription checked by the pharmacy’s registered pharmacist; the pharmacy’s own invoice with its licence number.",
    source: careSources.drugsRules,
    icon: "archive",
  },
  {
    name: "Supplements",
    gets: "Nutraceuticals delivered home",
    seller: "FSSAI-licensed vendors",
    rule: "FSSAI licence shown; “not for medicinal use”; no claim to treat or cure; at least 30% of shelf life or 45 days left at delivery.",
    source: careSources.fssai,
    icon: "inbox",
  },
];

/** 1.9 — what Garbha verifies, by seller type. */
export const verification: { type: string; sells: string; checks: string }[] = [
  {
    type: "IVF centres",
    sells: "Consults, scans, IUI and IVF, egg freezing",
    checks:
      "ART registration on the national registry (Level 1 or 2, valid five years); PCPNDT registration; each doctor’s medical council registration",
  },
  {
    type: "Diagnostic centres",
    sells: "Blood tests, semen analysis, ultrasound",
    checks:
      "State clinical-establishment registration; PCPNDT registration for ultrasound; NABL accreditation where held (it is voluntary)",
  },
  {
    type: "Pharmacies",
    sells: "Prescription medicines, delivered",
    checks:
      "Retail drug licence (Forms 20 and 21); registered pharmacist; cold storage for temperature-sensitive medicines",
  },
  {
    type: "Nutraceutical vendors",
    sells: "Supplements",
    checks: "FSSAI licence; each product’s label and claims",
  },
  {
    type: "Doctors and counsellors",
    sells: "Consults",
    checks:
      "Medical council registration number and qualification; certificates for counsellors and nutritionists",
  },
];

/** 1.9 — the six onboarding steps for partners. */
export const onboarding: { step: string; what: string; gate: string }[] = [
  {
    step: "Apply",
    what: "Fill the partner form: business, services, cities",
    gate: "Form complete; authorised signatory named",
  },
  {
    step: "Verify",
    what: "Garbha checks each licence against the issuing registry and records its expiry date",
    gate: "Every required licence valid",
  },
  {
    step: "Agree",
    what: "Partner agreement: full prices, service levels, data protection, no sex selection, no donor brokering",
    gate: "Agreement signed",
  },
  {
    step: "List",
    what: "Add services, prices and slots; Garbha reviews each listing and claim",
    gate: "Listings approved; a test order passes",
  },
  {
    step: "Go live",
    what: "Orders flow; payouts go through the payment aggregator",
    gate: "First orders reviewed by Garbha",
  },
  {
    step: "Monitor",
    what: "Fulfilment, turnaround and complaints are tracked; licences are re-checked before expiry",
    gate: "A lapsed licence pauses the listing automatically",
  },
];

/** 1.9 — finder labels. */
export const finderLabels: { label: string; meaning: string; tone: "registry" | "verified" | "ai" }[] = [
  {
    label: "ART registered",
    meaning: "On the National ART & Surrogacy Registry; links to its government certificate.",
    tone: "registry",
  },
  {
    label: "Verified partner",
    meaning: "Licences checked by Garbha; can be booked in the app.",
    tone: "verified",
  },
  {
    label: "Garbha AI–enabled",
    meaning: "A partner clinic that uses Garbha’s embryo-grading AI. When shown first, that placement is labelled.",
    tone: "ai",
  },
];

/** 2.1 / 3.4 — privacy and trust promises, as the member sees them. */
export const promises: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Free first",
    text: "Every tool shows its result before any sign-up. Tools and the tracker store nothing on our servers.",
    icon: "heart",
  },
  {
    title: "Private by default",
    text: "App lock, and discreet notifications: the lock screen shows only “Garbha: you have a reminder”. Tracker entries stay on your phone until you choose to back them up.",
    icon: "lock",
  },
  {
    title: "Your consent, per purpose",
    text: "Boxes are never pre-ticked; one purpose per box. Each share of a report with a partner needs its own consent, and can be time-limited. Withdraw any consent in one tap.",
    icon: "check",
  },
  {
    title: "Full price, no surprises",
    text: "The seller’s full price before booking; nothing added at checkout. No countdown timers or pre-added items.",
    icon: "scale",
  },
  {
    title: "Verified is visible",
    text: "Every seller shows the licence behind the word, with its number. Promoted listings are labelled, and the ranking is explained.",
    icon: "badge",
  },
  {
    title: "A person is one tap away",
    text: "A named grievance officer; complaints acknowledged within 48 hours and resolved within a month. Delete your account in the app or by a web link.",
    icon: "users",
  },
];

/** 3.4 — things Garbha Care never does. */
export const neverDo: string[] = [
  "Sex selection, or any mention of it",
  "Donor matching, or trade in eggs, sperm or embryos",
  "Diagnoses, prescriptions or success percentages from the app or the assistant",
  "A promise of pregnancy",
  "Selling medicines or health products on WhatsApp",
  "Health data used for advertising",
  "Accounts for under-18s",
  "Star ratings or success-rate rankings at launch",
];

export const careFaqs: { q: string; a: string }[] = [
  {
    q: "What is Garbha Care?",
    a: "An app-based fertility ecosystem for individuals and couples in India. Free tools — led by an ovulation tracker — and an assistant help you understand where you are; a free counselling call helps you decide the next step; and verified sellers (IVF centres, diagnostic centres, pharmacies and nutraceutical vendors) deliver consults, scans, care programmes, egg freezing and medicines that you can find, book and pay for in one place.",
  },
  {
    q: "Is it free?",
    a: "The tools, the tracker, the assistant, the verified clinic finder and first-level counselling calls are free. Care programmes and marketplace bookings are paid, at a price shown in full before you book.",
  },
  {
    q: "Does Garbha treat patients?",
    a: "No. Garbha does not treat, test or dispense. It guides, verifies, connects and collects payment. Care is delivered by licensed providers that Garbha has verified.",
  },
  {
    q: "What does “verified” mean?",
    a: "A seller goes live only after Garbha has checked its licences against the issuing registry — for example ART registration for IVF centres, PCPNDT registration for ultrasound, a retail drug licence for pharmacies, or an FSSAI licence for supplements. A lapsed licence pauses the listing automatically.",
  },
  {
    q: "Can the assistant tell me if I have a fertility problem?",
    a: "No. The assistant is automated and answers only from content approved by a clinical advisor. It never diagnoses, counsels, prescribes or predicts chances, and hands you to a counsellor whenever a question turns medical or you ask.",
  },
  {
    q: "Is the ovulation tracker a form of contraception?",
    a: "No. The tracker shows estimated dates — calendar methods alone are not accurate enough to pinpoint ovulation — and it must never be used as contraception.",
  },
  {
    q: "Where is my cycle data stored?",
    a: "On your phone. Tracker entries reach our servers only if you create an account and agree to back them up. Health data is never used for advertising.",
  },
  {
    q: "When and where does it launch?",
    a: "Garbha Care launches first in Hyderabad, in English and Telugu, with Hindi to follow. Consults and tests open first; medicine delivery comes last, after a legal review.",
  },
];
