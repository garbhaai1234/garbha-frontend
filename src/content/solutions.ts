export type Solution = {
  slug: string;
  name: string;
  shortName: string; // compact label used in nav + footer (matches live site)
  tagline: string;
  summary: string;
  image: string; // path under /public
  overview: string;
  benefits: string[];
  howItWorks: { title: string; description: string }[];
  faqs?: { q: string; a: string }[];
};

// Order + short labels mirror the live garbha.ai Solutions menu / footer:
// EmbryoScore, Sperm, Oocyte, ERA, Smart IVF.
export const solutions: Solution[] = [
  {
    slug: "embryo-scoring",
    name: "Garbha AI™ – EmbryoScore",
    shortName: "Garbha AI™ – EmbryoScore",
    tagline: "Smarter embryo selection",
    summary:
      "AI-driven grading identifies the best embryos, enhancing IVF success. India's first AI-powered scoring platform supporting clinical decision-making.",
    image: "/brand/Garbha-website-Icons-03.png",
    overview:
      "Transforming IVF with India's First AI-Powered Scoring Platform. The platform leverages cutting-edge Artificial Intelligence to support clinical decision-making, giving embryologists a consistent, reproducible score that complements their expertise and reduces inter-observer variability.",
    benefits: [
      "Standardised, reproducible grading across embryologists",
      "Prioritises embryos with the highest implantation potential",
      "Built on one of the most extensive image datasets assembled",
      "Integrates with existing time-lapse imaging workflows",
    ],
    howItWorks: [
      { title: "Capture", description: "Embryo images from your incubator or microscope are securely ingested." },
      { title: "Analyse", description: "The model evaluates morphological and morphokinetic features frame by frame." },
      { title: "Rank", description: "Each embryo receives an interpretable score to support transfer decisions." },
    ],
  },
  {
    slug: "sperm-selection",
    name: "Garbha AI™ – Sperm Quality & Selection",
    shortName: "Garbha AI™ – Sperm",
    tagline: "Identify the most viable sperm",
    summary:
      "AI-powered analysis identifies the healthiest sperm, improving fertilization outcomes for ICSI.",
    image: "/brand/Garbha-website-Icons-01-1.png",
    overview:
      "Garbha AI™ – Sperm Quality & Selection is an advanced AI-driven platform that identifies and selects the most viable sperm. It evaluates motility, morphology, and vitality in real time, helping embryologists make faster, more objective selections for intracytoplasmic sperm injection (ICSI).",
    benefits: [
      "Objective motility and morphology assessment",
      "Faster candidate identification during ICSI",
      "Reduced manual screening fatigue",
      "Consistent selection criteria across cases",
    ],
    howItWorks: [
      { title: "Observe", description: "Live microscopy footage is analysed for motion and shape features." },
      { title: "Score", description: "Each candidate is graded on viability and morphology indicators." },
      { title: "Select", description: "Top candidates are surfaced to the embryologist for injection." },
    ],
    faqs: [
      {
        q: "What is the Garbha AI™ – Sperm Quality & Selection test?",
        a: "Garbha AI™ – Sperm Quality & Selection is an advanced AI-powered system that evaluates sperm morphology, motility, and DNA integrity to identify the healthiest sperm for fertilization, enhancing IVF success rates through intelligent, data-driven analysis.",
      },
      {
        q: "How does Garbha AI™ – Sperm Quality & Selection improve IVF outcomes?",
        a: "By identifying and ranking the most viable sperm, the platform ensures optimal fertilization potential, resulting in improved embryo quality, higher implantation rates, and better overall IVF outcomes.",
      },
      {
        q: "What technology is used in the test?",
        a: "The system utilizes high-resolution imaging, deep learning algorithms, and morphokinetic pattern recognition to assess sperm characteristics objectively and accurately in real time.",
      },
      {
        q: "How is AI used in Garbha AI™ – Sperm Quality & Selection?",
        a: "Artificial Intelligence analyzes each sperm's motility, structure, and genetic integrity to generate a comprehensive sperm quality score, assisting embryologists in making precise and objective selections during ICSI or IVF.",
      },
      {
        q: "Who should consider this test?",
        a: "This solution is ideal for couples experiencing male-factor infertility, recurrent IVF/ICSI failures, or unexplained infertility, where advanced sperm analysis can improve fertilization and embryo development outcomes.",
      },
    ],
  },
  {
    slug: "oocyte-selection",
    name: "Garbha AI™ – Oocyte Quality & Selection",
    shortName: "Garbha AI™ – Oocyte",
    tagline: "Quality insight before fertilisation",
    summary:
      "AI-based evaluation pinpoints the most viable oocytes, boosting embryo development potential.",
    image: "/brand/Garbha-website-Icons-02.png",
    overview:
      "Garbha AI™ – Oocyte Quality & Selection is an advanced AI-powered assessment that evaluates oocyte morphology and vitality. It gives clinics an additional, objective data point when planning fertilisation and cryopreservation strategies.",
    benefits: [
      "Non-invasive, image-based quality indicators",
      "Supports fertilisation and freezing decisions",
      "Complements existing lab protocols",
      "Helps counsel patients with clearer data",
    ],
    howItWorks: [
      { title: "Image", description: "High-resolution oocyte images are captured and ingested." },
      { title: "Evaluate", description: "Maturity and morphology indicators are computed automatically." },
      { title: "Advise", description: "Results inform maturation, fertilisation, and freezing plans." },
    ],
  },
  {
    slug: "endometrial-receptivity",
    name: "Garbha AI™ – ERA",
    shortName: "Garbha AI™ – ERA",
    tagline: "Precision implantation timing",
    summary:
      "Garbha AI™ – ERA identifies the optimal embryo transfer window using gene expression mapping and AI optimization.",
    image: "/brand/Garbha-website-Icons-04.png",
    overview:
      "Garbha AI™ – ERA employs sophisticated gene expression mapping and Artificial Intelligence optimization to accurately reveal your unique implantation window, helping clinicians personalise the timing of frozen embryo transfer and improve the chances of successful implantation.",
    benefits: [
      "Personalised window-of-implantation guidance",
      "Reduces guesswork in transfer scheduling",
      "Particularly valuable in recurrent implantation failure",
      "Data-driven, patient-specific recommendations",
    ],
    howItWorks: [
      { title: "Sample", description: "Endometrial and cycle data are collected per your clinical protocol." },
      { title: "Model", description: "Gene expression signals are analysed to locate the implantation window." },
      { title: "Schedule", description: "A personalised transfer window is recommended for the patient." },
    ],
  },
  {
    slug: "smart-ivf",
    name: "Garbha AI™ – Smart IVF",
    shortName: "Garbha AI™ – Smart IVF",
    tagline: "Real-time IVF analytics",
    summary:
      "Turning real-time data and intelligent communication into smoother, more coordinated IVF treatments.",
    image: "/brand/ivf-2.png",
    overview:
      "Garbha AI™ – Smart IVF turns real-time data and intelligent communication into smoother treatments. It connects lab and clinic workflows with live analytics, keeping every step of the IVF journey coordinated, transparent, and data-driven for clinicians and patients alike.",
    benefits: [
      "Real-time analytics across the treatment cycle",
      "Smoother, clearer patient communication",
      "Coordinated lab-and-clinic workflow",
      "Faster, better-informed clinical decisions",
    ],
    howItWorks: [
      { title: "Connect", description: "Lab and clinic data sources are unified into one live view." },
      { title: "Analyse", description: "Real-time analytics surface trends and next-best actions." },
      { title: "Coordinate", description: "Teams and patients stay aligned with timely, intelligent updates." },
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
