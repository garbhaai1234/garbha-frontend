import type { IconName } from "@/content/compliance";

/**
 * Garbha Care — the consumer fertility app, written for the person using it.
 * Facts come from "Garbha Care: B2C Ecosystem Roadmap, App Design and
 * Developer Brief" (v2, 3 Oct 2026); the wording is the patient's view, not
 * the brief's. No market figures, revenue, roadmap priorities or partner
 * onboarding detail on this page.
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
  "Educational information, not medical advice. Tools, assistant answers and care plans are checked by a clinical advisor before they go live.";

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
  artAct: {
    label: "ART (Regulation) Act 2021 — full text",
    href: "https://indiankanoon.org/doc/61852499/",
  },
  pcpndt: {
    label: "PCPNDT Act 1994 — full text",
    href: "https://indiankanoon.org/doc/13125684/",
  },
  telemedicine: {
    label: "Telemedicine Practice Guidelines 2020",
    href: "https://nmcn.in/public/assets/pdf/Telemedicine%20Practice%20Guidelines.pdf",
  },
  drugsRules: {
    label: "Drugs Rules 1945 — rule 65",
    href: "https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2022/drug_rules/Drugs%20Rules%201945_2024%2009.pdf",
  },
  fssai: {
    label: "FSSAI — advisory to e-commerce food businesses (3 Dec 2024)",
    href: "https://www.fssai.gov.in/upload/advisories/2024/12/674efa161d756Adobe%20Scan%203%20Dec%202024.pdf",
  },
} satisfies Record<string, Source>;

/** "Where are you right now?" — the six stages, as the person would say them. */
export const journey: {
  stage: string;
  feeling: string;
  helpNow: string;
  whenReady: string;
  icon: IconName;
}[] = [
  {
    stage: "We’ve just started trying",
    feeling: "“When is my fertile window? Is it normal that it hasn’t happened yet?”",
    helpNow: "The ovulation tracker, and a quick check on whether it’s time to see a specialist.",
    whenReady: "A preconception care plan, or a first consult.",
    icon: "calendar",
  },
  {
    stage: "We’ve had our first tests",
    feeling: "“What does my AMH or semen report actually mean?”",
    helpNow: "Plain-language report readers, the assistant, and a free call with a counsellor.",
    whenReady: "Scans, tests or a doctor’s consult.",
    icon: "doc",
  },
  {
    stage: "We’ve been told about IUI or IVF",
    feeling: "“How much will it cost? Which clinic can we trust?”",
    helpNow: "A cost estimator, a finder of government-registered clinics, and a checklist of questions to ask.",
    whenReady: "A consult at a verified IVF centre, or a second opinion.",
    icon: "building",
  },
  {
    stage: "We’re in treatment",
    feeling: "“What happens next? Where do I get these injections?”",
    helpNow: "A timeline of your cycle and discreet medicine reminders.",
    whenReady: "Medicines delivered home, and a companion plan with counsellor support.",
    icon: "clock",
  },
  {
    stage: "A cycle didn’t work",
    feeling: "“Why did it fail? Should we change clinics?”",
    helpNow: "A free counselling call to talk it through.",
    whenReady: "A second-opinion consult and repeat tests.",
    icon: "heart",
  },
  {
    stage: "I’m planning for later",
    feeling: "“Should I freeze my eggs? What does it involve?”",
    helpNow: "An egg-freezing guide and cost planner.",
    whenReady: "Egg freezing at a registered clinic.",
    icon: "cell",
  },
];

/** How it works, from the person’s side: three steps. */
export const howItWorks: { title: string; text: string; free: boolean; icon: IconName }[] = [
  {
    title: "Understand where you are",
    text: "Use the free tools or ask the assistant. You see your answer straight away, with no account and no forms.",
    free: true,
    icon: "heart",
  },
  {
    title: "Talk it through with a person",
    text: "Book a free call with a fertility counsellor, in your language, at a time that suits you. They explain your options in plain words and help you decide the next step.",
    free: true,
    icon: "chat",
  },
  {
    title: "Get care only if you need it",
    text: "Book a consult, a test or a care plan with a provider whose licences we have checked. You see the full price before you book, and nothing is added at checkout.",
    free: false,
    icon: "check",
  },
];

/** Free tools — what the person gets, then why they can trust it. */
export const tools: {
  name: string;
  gets: string;
  basis: string;
  source?: Source;
  later?: boolean;
  icon: IconName;
}[] = [
  {
    name: "Ovulation tracker",
    gets: "Log your period, see your likely fertile days, and add LH-test results and symptoms. Gentle reminders, nothing more.",
    basis:
      "Your fertile window is the six days ending on ovulation day. Calendar dates alone are often wrong, so we show them as estimates and sharpen them with LH tests.",
    source: careSources.asrmNatural,
    icon: "calendar",
  },
  {
    name: "Is it time to see a specialist?",
    gets: "Answer a few questions and get a clear “yes” or “not yet”, with the reasons.",
    basis:
      "Guidance suggests seeing a specialist after 12 months of trying if you are under 35, after 6 months if you are 35 or older, and sooner in some situations, such as irregular periods.",
    source: careSources.asrmEvaluation,
    icon: "check",
  },
  {
    name: "Semen report reader",
    gets: "Enter the numbers from your report and see, for each one, whether it is within the WHO reference range.",
    basis: "Uses the World Health Organization’s 2021 reference values.",
    source: careSources.who,
    icon: "doc",
  },
  {
    name: "IVF cost estimator",
    gets: "A likely cost range for your city, and what add-ons such as ICSI or embryo freezing do to it.",
    basis: "Based on published price ranges for Indian cities.",
    source: careSources.cloudnine,
    icon: "scale",
  },
  {
    name: "Questions to ask your clinic",
    gets: "A checklist to take to your consult, including whether the clinic is registered under the ART Act.",
    basis: "You can check any clinic’s registration in our clinic finder.",
    source: careSources.registry,
    icon: "list",
  },
  {
    name: "Medicine and appointment reminders",
    gets: "Discreet reminders for tablets, injections, scans and calls.",
    basis: "You set them from your own prescription. The app never suggests doses.",
    icon: "clock",
  },
  {
    name: "Egg-freezing guide",
    gets: "What egg freezing involves, what it typically costs, and what to ask.",
    basis:
      "Typical costs are ₹1–2.5 lakh per cycle plus yearly storage. Results tend to be better when eggs are frozen younger.",
    source: careSources.indira,
    later: true,
    icon: "cell",
  },
  {
    name: "IVF week-by-week planner",
    gets: "What usually happens in each week of an IVF cycle, so nothing comes as a surprise.",
    basis: "Written by our clinical advisor.",
    later: true,
    icon: "list",
  },
];

/** A sample assistant conversation, shown as a phone chat. */
export const sampleChat: { from: "you" | "garbha"; text: string }[] = [
  {
    from: "garbha",
    text: "Hi, I’m Garbha’s automated assistant. I can explain terms and reports, and set reminders. A real person is one tap away.",
  },
  { from: "you", text: "My AMH report says 1.1. Is that bad?" },
  {
    from: "garbha",
    text: "AMH gives an idea of your egg reserve. It doesn’t tell you whether you can get pregnant, and only a doctor can say what your number means for you. Here’s a short explainer. Would you like a free call with a counsellor?",
  },
];

export const assistantPromises: string[] = [
  "Tells you it’s automated, and always offers a real person.",
  "Answers only from content our clinical advisor has approved, and shows where the answer comes from.",
  "Never diagnoses, prescribes or tells you your chances. That is a doctor’s job.",
  "If you mention something urgent, such as heavy bleeding or severe pain, it tells you to get urgent care and offers a call back.",
  "On WhatsApp only if you ask for it, and never to sell you anything.",
];

/** The free counselling call, as the person experiences it. */
export const callSteps: { title: string; text: string }[] = [
  {
    title: "Tell us a little",
    text: "Your first name, mobile number, city, both partners’ ages, how long you’ve been trying, and when and in which language you’d like the call.",
  },
  {
    title: "A counsellor calls you",
    text: "They listen, explain your options in plain words, and help you work out the next step. Medical questions go to a registered doctor.",
  },
  {
    title: "You decide what happens next",
    text: "Maybe nothing yet. Maybe a test or a consult. You are never pushed to buy, and the first call is always free.",
  },
];

/** Care plans. */
export const programmes: {
  name: string;
  for: string;
  includes: string;
  icon: IconName;
}[] = [
  {
    name: "Preconception care",
    for: "If you’re planning, or have been trying for less than a year",
    includes: "A cycle and lifestyle plan, counsellor calls, baseline tests and nutrition guidance.",
    icon: "heart",
  },
  {
    name: "Fertility check",
    for: "If you want to know where you both stand",
    includes: "AMH, a scan and a semen analysis, reviewed with a doctor.",
    icon: "check",
  },
  {
    name: "PCOS and cycle health",
    for: "If your periods are irregular",
    includes: "A gynaecologist consult, tests, a lifestyle plan and help with tracking.",
    icon: "calendar",
  },
  {
    name: "Male fertility",
    for: "If a semen report came back below the reference range",
    includes: "An andrology consult, a repeat test and a lifestyle plan.",
    icon: "users",
  },
  {
    name: "IVF companion",
    for: "If you’re in a treatment cycle",
    includes: "Your cycle timeline, medicine reminders and delivery, and a counsellor to lean on.",
    icon: "clock",
  },
  {
    name: "Egg freezing",
    for: "If you’re planning for later",
    includes: "An assessment (AMH and scan), counselling, the clinic package and storage reminders.",
    icon: "cell",
  },
  {
    name: "After a cycle",
    for: "If a cycle didn’t work",
    includes: "A second-opinion consult, emotional support and a plan for what’s next.",
    icon: "message",
  },
];

/** What you can book, and what protects you when you do. */
export const services: {
  name: string;
  gets: string;
  protection: string;
  source: Source;
  icon: IconName;
}[] = [
  {
    name: "Doctor consults",
    gets: "A video call or a clinic visit with a fertility doctor.",
    protection: "You see the doctor’s name, qualification and registration number before you book.",
    source: careSources.telemedicine,
    icon: "chat",
  },
  {
    name: "Scans and tests",
    gets: "Blood tests with home collection; ultrasound at the centre.",
    protection: "Ultrasound only at centres registered under the PCPNDT Act. No sex determination, ever.",
    source: careSources.pcpndt,
    icon: "doc",
  },
  {
    name: "IVF, IUI and egg freezing",
    gets: "Consults and treatment packages at the centre.",
    protection: "Only clinics on the government’s national ART registry. Your own eggs only: we never arrange donors.",
    source: careSources.artAct,
    icon: "building",
  },
  {
    name: "Medicines",
    gets: "Your prescribed fertility medicines, delivered home.",
    protection: "Checked against your prescription by a registered pharmacist, with the pharmacy’s own invoice.",
    source: careSources.drugsRules,
    icon: "archive",
  },
  {
    name: "Supplements",
    gets: "Nutritional supplements, delivered home.",
    protection: "FSSAI-licensed sellers only, with no claims to treat or cure.",
    source: careSources.fssai,
    icon: "inbox",
  },
];

/** What "verified" means, in one line per provider type. */
export const verification: { type: string; checked: string }[] = [
  { type: "IVF centres", checked: "Registered on the national ART registry, and registered for ultrasound under the PCPNDT Act." },
  { type: "Doctors", checked: "Medical council registration number and qualification." },
  { type: "Diagnostic centres", checked: "State registration, PCPNDT registration for ultrasound, and NABL accreditation where they hold it." },
  { type: "Pharmacies", checked: "A retail drug licence, a registered pharmacist, and cold storage for medicines that need it." },
  { type: "Supplement sellers", checked: "An FSSAI licence, and every product’s label and claims." },
];

export const finderLabels: { label: string; meaning: string; tone: "registry" | "verified" | "ai" }[] = [
  {
    label: "ART registered",
    meaning: "On the government’s national ART registry, with a link to its certificate.",
    tone: "registry",
  },
  {
    label: "Verified partner",
    meaning: "We have checked its licences, and you can book it in the app.",
    tone: "verified",
  },
  {
    label: "Garbha AI–enabled",
    meaning: "Uses Garbha’s embryo-assessment AI. If it is shown first, that is labelled.",
    tone: "ai",
  },
];

/** Privacy and trust promises. */
export const promises: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Your cycle data stays on your phone",
    text: "Tracker entries are stored on your phone unless you choose to back them up. Your health data is never used for advertising.",
    icon: "lock",
  },
  {
    title: "Nobody can read your notifications",
    text: "Lock the app, and reminders on your lock screen just say “Garbha: you have a reminder”.",
    icon: "shield",
  },
  {
    title: "You choose what to share",
    text: "Nothing is ticked for you. Sharing a report with a clinic needs your consent each time, and you can take consent back in one tap.",
    icon: "check",
  },
  {
    title: "The full price, up front",
    text: "You see the full price before you book. No hidden extras, no countdown timers.",
    icon: "scale",
  },
  {
    title: "“Verified” is backed by a licence",
    text: "Every provider shows the licence behind the badge. Promoted listings are clearly labelled.",
    icon: "badge",
  },
  {
    title: "A person when you need one",
    text: "A named grievance officer replies within 48 hours. You can delete your account at any time.",
    icon: "users",
  },
];

export const neverDo: string[] = [
  "Help with choosing a baby’s sex, or even talk about it",
  "Arrange egg, sperm or embryo donors",
  "Give you a diagnosis, a prescription or your “chances” as a number",
  "Promise a pregnancy",
  "Sell you medicines on WhatsApp",
  "Use your health data for advertising",
];

export const careFaqs: { q: string; a: string }[] = [
  {
    q: "What is Garbha Care?",
    a: "An app to support you through trying to conceive and fertility treatment. Free tools and an assistant help you understand where you are, a free call with a counsellor helps you decide what to do next, and, if you need care, you can book consults, tests, care plans and medicines from providers whose licences we have checked.",
  },
  {
    q: "What does it cost?",
    a: "The tools, the ovulation tracker, the assistant, the clinic finder and your first counselling call are free. Care plans and bookings are paid, and you see the provider’s full price before you book.",
  },
  {
    q: "Is Garbha a clinic?",
    a: "No. Garbha does not treat, test or dispense medicines. We help you understand your options and connect you with licensed providers. Your care is always given by them.",
  },
  {
    q: "Can the assistant tell me if something is wrong?",
    a: "No. It explains terms and reports from content our clinical advisor has approved, but it never diagnoses or predicts your chances. Whenever a question needs a doctor, or whenever you ask, it puts you in touch with a person.",
  },
  {
    q: "Can I use the ovulation tracker as contraception?",
    a: "No. The tracker shows estimated dates, which are not accurate enough to prevent pregnancy.",
  },
  {
    q: "Who can see my information?",
    a: "Your tracker data stays on your phone unless you choose to back it up. A clinic sees your reports only if you agree to share them, and you can withdraw that consent at any time. Your health data is never used for advertising.",
  },
  {
    q: "How do I know a clinic is genuine?",
    a: "Our clinic finder lists every clinic on the government’s national ART registry, with a link to its certificate. Providers marked “Verified partner” have also had their licences checked by us. A provider whose licence lapses is paused automatically.",
  },
  {
    q: "When can I use it?",
    a: "Garbha Care opens first in Hyderabad, in English and Telugu, with Hindi to follow. Leave us your details on the contact page and we’ll let you know when it opens.",
  },
];
