/**
 * Content for the Technology & Credibility page (/technology).
 * Sourced from the Garbha × ESCO solution overview. The credibility badges and
 * partnership facts are also reused on the homepage and About page.
 */

export type ModuleStatus =
  | "Live in Clinics"
  | "In Validation"
  | "In Build"
  | "Roadmap";

export type TechModule = {
  no: string;
  name: string;
  status: ModuleStatus;
  flagship?: boolean;
  description: string;
};

export const techModules: TechModule[] = [
  {
    no: "01",
    name: "Sperm Quality Assessment",
    status: "In Validation",
    description:
      "Computer vision tracking velocity, linearity and morphology for objective ICSI candidate selection.",
  },
  {
    no: "02",
    name: "Oocyte Quality Assessment",
    status: "In Build",
    description:
      "Zona pellucida thickness, cytoplasm texture and polar-body morphology for automated maturity scoring.",
  },
  {
    no: "03",
    name: "EmbryoScore — AI Embryo Grading",
    status: "Live in Clinics",
    flagship: true,
    description:
      "Multi-stage CNN analysis from Day 1 to Day 5 — morphokinetic annotation, fragmentation index and live developmental scoring, with 93% embryo-selection accuracy. In active daily use across 11 partner clinics, running on time-lapse hardware including ESCO Medical incubators.",
  },
  {
    no: "04",
    name: "Garbha ERA",
    status: "In Build",
    description:
      "AI-powered endometrial receptivity analysis from standard ultrasound — a non-invasive alternative to surgical biopsy.",
  },
  {
    no: "05",
    name: "Non-Invasive PGT-A",
    status: "Roadmap",
    description:
      "Aneuploidy risk prediction and chromosomal-normalcy probability scores via image analysis — reducing reliance on invasive biopsy.",
  },
];

/** The three architectural pillars — Edge, Explainable, Multi-Modal. */
export const techPillars = [
  {
    key: "Edge AI",
    description:
      "Compressed models run on your incubator and microscope hardware. Real-time inference with no cloud dependency — data never has to leave the lab.",
  },
  {
    key: "Explainable AI",
    description:
      "Grad-CAM heatmaps and live morphokinetic annotation make every score auditable — for embryologists and regulators alike.",
  },
  {
    key: "Multi-Modal",
    description:
      "Image data fused with clinical history (age, hormone profiles, prior cycles) to move toward predicting cycle outcomes — researched with Universiti Malaya.",
  },
];

export const techBenefits = [
  {
    title: "Higher, more consistent outcomes",
    description:
      "Objective embryo selection at 93% accuracy helps prioritise the most viable embryo, supporting better implantation and live-birth rates.",
  },
  {
    title: "Removes subjectivity",
    description:
      "Manual embryo-grading agreement between experts is often only 50–70%. Garbha standardises scoring across embryologists, shifts and sites.",
  },
  {
    title: "Works with your hardware",
    description:
      "Runs as Edge AI on your existing time-lapse incubators, including ESCO Medical — no rip-and-replace, no new capital equipment.",
  },
  {
    title: "Your data stays in your lab",
    description:
      "On-device inference with no cloud dependency — supporting patient privacy and data-sovereignty requirements.",
  },
  {
    title: "Less invasive, where possible",
    description:
      "Image-based ERA and PGT-A insights reduce reliance on invasive biopsy, lowering cost, delay and risk to the embryo.",
  },
  {
    title: "Transparent & auditable",
    description:
      "Explainable heatmaps let your embryologists see and trust the reasoning — useful for training and quality review.",
  },
  {
    title: "Faster, less training-dependent",
    description:
      "Consistent results regardless of who is at the scope, easing pressure on scarce senior-embryologist time.",
  },
  {
    title: "Whole-cycle intelligence",
    description:
      "One platform across sperm, oocyte, embryo, endometrium and genetics — a single, compounding source of decision support.",
  },
  {
    title: "Built to global standards",
    description:
      "CDSCO Manufacturing Licence (India), ISO 13485 certified, ISO/IEC 42001 in progress — engineered for regulated clinical use.",
  },
];

/** Headline proof points, reused as badges on the homepage and About page. */
export const credibilityBadges = [
  { value: "93%", label: "Embryo-selection accuracy" },
  { value: "20", label: "Clinics live today" },
  { value: "36,000+", label: "Validated embryo dataset" },
  { value: "CDSCO", label: "Cleared · ISO 13485" },
];

export const credibilityPoints = [
  {
    title: "First & only in India",
    description:
      "The first AI-powered IVF solution to obtain a CDSCO Manufacturing Licence (Feb 2026).",
  },
  {
    title: "A serious data moat",
    description:
      "36,000+ validated embryo images — one of the largest embryologist-reviewed datasets globally.",
  },
  {
    title: "Live, not theoretical",
    description:
      "In active clinical use across 11 partner clinics, with EmbryoScore in daily operation.",
  },
];

export const partnerships = [
  {
    name: "ESCO Medical",
    kind: "Strategic",
    description:
      "Garbha's embryo-grading AI integrates directly with ESCO MiRI time-lapse incubators — the foundation of a single, integrated offering for embryology labs.",
  },
  {
    name: "Universiti Malaya",
    kind: "Academic",
    description:
      "Industry-initiated research combining clinical history with image-based models to improve live-birth prediction.",
  },
];

export const techFaqs = [
  {
    q: "Does Garbha.ai run on our existing incubators?",
    a: "Yes. Garbha runs as Edge AI on your existing time-lapse incubators, including the ESCO time-lapse device — no rip-and-replace and no new capital equipment.",
  },
  {
    q: "Does our patient data leave the lab?",
    a: "No. Inference runs on-device with no cloud dependency, so embryo images and patient data stay within your lab — supporting privacy and data-sovereignty requirements.",
  },
  {
    q: "Is the AI explainable, or a black box?",
    a: "It is fully explainable. Grad-CAM heatmaps and live morphokinetic annotation make every score auditable for embryologists and regulators alike.",
  },
  {
    q: "Is Garbha.ai regulatory-cleared?",
    a: "Garbha holds a CDSCO Manufacturing Licence (India) and is ISO 13485 certified, with ISO/IEC 42001 in progress — engineered for regulated clinical use.",
  },
  {
    q: "How accurate is EmbryoScore?",
    a: "EmbryoScore delivers 93% embryo-selection accuracy and is in active daily use across 11 partner clinics, validated on a dataset of 36,000+ embryo images.",
  },
];

export const pilotSteps = [
  {
    title: "Sign a mutual NDA",
    description:
      "So we can share technical detail and you can share case data — both protected.",
  },
  {
    title: "Sign a pilot MoU",
    description:
      "A short memorandum defining the 30-day scope, support and success criteria — no commercial commitment.",
  },
  {
    title: "We set you up",
    description:
      "Garbha is enabled on your time-lapse / lab setup, with onboarding for your embryologists.",
  },
  {
    title: "Run for 30 days",
    description:
      "Use Garbha on real cases alongside your existing workflow, with our team supporting throughout.",
  },
  {
    title: "Review together",
    description:
      "We assess outcomes and explainability with you, and you decide whether to continue.",
  },
];
