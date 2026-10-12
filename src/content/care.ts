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
 * - realistic: say what works today, and mark everything else as coming.
 */

export const careDisclaimer =
  "Educational information, not medical advice. Talk to a doctor about your own situation.";

export const careStatus = {
  label: "Coming soon",
  city: "Hyderabad",
  languages: ["English", "Telugu"],
  next: "Hindi",
};

/** The government's list of registered ART clinics, used by the clinic checklist. */
export const artRegistryUrl =
  "https://registry.artsurrogacy.gov.in/clinic/list?type=register-clinic";

export type CareToolId =
  | "ovulation"
  | "specialist"
  | "semen"
  | "cost"
  | "questions"
  | "reminders"
  | "eggs"
  | "ivf";

/** "Where are you right now?": filter chips above the modules. */
export const journey: { stage: string; tools: CareToolId[] }[] = [
  { stage: "Just started trying", tools: ["ovulation", "specialist"] },
  { stage: "Had our first tests", tools: ["semen", "specialist"] },
  { stage: "Told about IUI or IVF", tools: ["cost", "questions"] },
  { stage: "In treatment", tools: ["ivf", "reminders"] },
  { stage: "A cycle didn’t work", tools: ["questions", "specialist"] },
  { stage: "Planning for later", tools: ["eggs"] },
];


/** Free tools — what the person gets, then why they can trust it. */
export const tools: {
  id: CareToolId;
  name: string;
  /** One line on the phone card. */
  short: string;
  gets: string;
  basis: string;
  icon: IconName;
}[] = [
  {
    id: "ovulation",
    short: "Your likely fertile days",
    name: "Ovulation tracker",
    gets: "Enter your last period to see your likely fertile days for this cycle and the next three. Add a positive LH test to sharpen the estimate.",
    basis:
      "Your fertile window is the six days ending on ovulation day. Calendar dates alone are often wrong, so we show them as estimates and sharpen them with LH tests.",
    icon: "calendar",
  },
  {
    id: "specialist",
    short: "A clear yes or not yet",
    name: "Is it time to see a specialist?",
    gets: "Answer a few questions and get a clear “yes” or “not yet”, with the reasons.",
    basis:
      "Guidance suggests seeing a specialist after 12 months of trying if you are under 35, after 6 months if you are 35 or older, and sooner in some situations, such as irregular periods.",
    icon: "check",
  },
  {
    id: "semen",
    short: "Each value against WHO ranges",
    name: "Semen report reader",
    gets: "Enter the numbers from your report and see, for each one, whether it is within the WHO reference range.",
    basis: "Uses the World Health Organization’s 2021 reference values.",
    icon: "doc",
  },
  {
    id: "cost",
    short: "A likely range for your city",
    name: "IVF cost estimator",
    gets: "A likely cost range for your city, and what add-ons such as ICSI or embryo freezing do to it.",
    basis: "Based on published price ranges for Indian cities.",
    icon: "scale",
  },
  {
    id: "questions",
    short: "A checklist for your consult",
    name: "Questions to ask your clinic",
    gets: "A checklist to take to your consult, including whether the clinic is registered under the ART Act.",
    basis: "Tick questions as you get answers, add your own, and download the list to take with you.",
    icon: "list",
  },
  {
    id: "reminders",
    short: "Discreet, in your calendar",
    name: "Medicine and appointment reminders",
    gets: "Discreet reminders for tablets, injections, scans and calls.",
    basis: "You set them from your own prescription; we never suggest doses. Reminders go into your phone’s own calendar, so nothing is sent to us.",
    icon: "clock",
  },
  {
    id: "eggs",
    short: "Steps and cost over the years",
    name: "Egg-freezing planner",
    gets: "What egg freezing involves, and what it could cost you over the years you plan to store.",
    basis:
      "Typical costs are ₹1–2.5 lakh per cycle plus yearly storage. Results tend to be better when eggs are frozen younger.",
    icon: "cell",
  },
  {
    id: "ivf",
    short: "What happens each week",
    name: "IVF week-by-week planner",
    gets: "What usually happens in each week of an IVF cycle, so nothing comes as a surprise.",
    basis: "A typical cycle. Your clinic’s protocol decides the real dates, so treat these as a guide to plan work and travel around.",
    icon: "list",
  },
];



/** The free counselling call, as the person experiences it. */
export const callSteps: { title: string; text: string }[] = [
  {
    title: "Tell us a little",
    text: "Your first name, mobile number and the language you’d like. Anything else, such as your city or how long you’ve been trying, is optional.",
  },
  {
    title: "A counsellor calls you",
    text: "They listen, explain your options in plain words, and help you work out the next step. Medical questions go to a registered doctor.",
  },
  {
    title: "You decide what happens next",
    text: "Maybe nothing yet. Maybe a test or a consult. You are never pushed to buy, and the call is free.",
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
  icon: IconName;
}[] = [
  {
    name: "Doctor consults",
    gets: "A video call or a clinic visit with a fertility doctor.",
    protection: "You see the doctor’s name, qualification and registration number before you book.",
    icon: "chat",
  },
  {
    name: "Scans and tests",
    gets: "Blood tests with home collection; ultrasound at the centre.",
    protection: "Ultrasound only at centres registered under the PCPNDT Act. No sex determination, ever.",
    icon: "doc",
  },
  {
    name: "IVF, IUI and egg freezing",
    gets: "Consults and treatment packages at the centre.",
    protection: "Only clinics on the government’s national ART registry. Your own eggs only: we never arrange donors.",
    icon: "building",
  },
  {
    name: "Medicines",
    gets: "Your prescribed fertility medicines, delivered home.",
    protection: "Checked against your prescription by a registered pharmacist, with the pharmacy’s own invoice.",
    icon: "archive",
  },
  {
    name: "Supplements",
    gets: "Nutritional supplements, delivered home.",
    protection: "FSSAI-licensed sellers only, with no claims to treat or cure.",
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


/** Privacy and trust promises. */
export const promises: { title: string; text: string; icon: IconName }[] = [
  {
    title: "What you enter stays on your device",
    text: "The tools save your answers in this browser only. Nothing you type into them is sent to Garbha.",
    icon: "lock",
  },
  {
    title: "Reminders nobody else can read",
    text: "Calendar reminders can say just “Garbha: you have a reminder”, never what they are for.",
    icon: "shield",
  },
  {
    title: "We call only if you ask",
    text: "Your call request needs your permission, WhatsApp is a separate choice, and nothing is ticked for you.",
    icon: "check",
  },
  {
    title: "No diagnosis, no chances as a number",
    text: "The tools explain and estimate. They never diagnose, prescribe or promise a pregnancy.",
    icon: "heart",
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
    a: "Garbha Care is a fertility support service from Garbha.ai, opening first in Hyderabad. Today you can use eight free tools on this page and request a free call with a fertility counsellor. When it opens, you will also be able to book consults, tests, care plans and medicines from providers whose licences Garbha has checked.",
  },
  {
    q: "What does it cost?",
    a: "The tools on this page and the counselling call are free. When bookings open, care plans and bookings will be paid, and you will see the provider’s full price before you book, with nothing added at checkout.",
  },
  {
    q: "Is Garbha a clinic?",
    a: "No. Garbha does not treat, test or dispense medicines. We help you understand your options and connect you with licensed providers. Your care is always given by them.",
  },
  {
    q: "Can the tools tell me if something is wrong?",
    a: "No. They explain and estimate using published guidance, such as the World Health Organization’s 2021 semen reference values, and published Indian price ranges. They never give a diagnosis or your chances as a number. A doctor can tell you what your results mean for you.",
  },
  {
    q: "Can I use the ovulation tracker as contraception?",
    a: "No. The tracker shows estimated dates, which are not accurate enough to prevent pregnancy.",
  },
  {
    q: "Who can see my information?",
    a: "What you enter in the tools stays in this browser on your device and is not sent to Garbha. If you request a call, your answers are emailed to our team only to arrange that call, and are never shared with a clinic without your permission. Email info@garbha.ai to have them deleted.",
  },
  {
    q: "How do I check that a clinic is genuine?",
    a: "Look it up on the government’s National ART & Surrogacy Registry. When Garbha Care opens, every IVF centre we list will be on that registry, and we will check each provider’s licences before it can take a booking.",
  },
  {
    q: "When can I use it?",
    a: "The tools work now, on this page. Counsellor calls and bookings start in Hyderabad, in English and Telugu, with Hindi to follow. Request a free call on this page and a counsellor will call you when they begin.",
  },
];
