/**
 * Blog author registry. Named authors get a role + bio (E-E-A-T signals that
 * matter for medical/health content). Unknown authors fall back to a sensible
 * default so a post never renders without a byline.
 */
export type Author = {
  name: string;
  role: string;
  bio: string;
  url?: string;
};

const AUTHORS: Record<string, Author> = {
  "Garbha.ai Team": {
    name: "Garbha.ai Team",
    role: "AI & Embryology Research",
    bio: "The Garbha.ai team builds explainable AI for the IVF lab — from embryo grading to personalised treatment — working alongside embryologists and fertility clinicians.",
    url: "/about",
  },
  "Bharani Kumar Depuru": {
    name: "Bharani Kumar Depuru",
    role: "CEO & Founder, Garbha.ai",
    bio: "Bharani leads Garbha.ai's mission to bring explainable, on-device AI to the IVF lab — making embryo selection more objective, consistent and accessible for clinics worldwide.",
    url: "/about",
  },
  "Dr. G. Buvaneswari": {
    name: "Dr. G. Buvaneswari",
    role: "Strategic Clinical Advisor",
    bio: "Dr. Buvaneswari is Clinical Lead & Medical Director at GBR Fertility Center and a strategic clinical advisor to Garbha.ai, guiding the clinical validation of its AI tools in real IVF practice.",
    url: "/about",
  },
  "Dr. V. Shekar": {
    name: "Dr. V. Shekar",
    role: "Medical Advisor",
    bio: "Dr. Shekar, Medical Director at Ravi Children's Hospital, advises Garbha.ai on reproductive medicine and the safe, evidence-based integration of AI into fertility care.",
    url: "/about",
  },
};

export function getAuthor(name: string): Author {
  return (
    AUTHORS[name] ?? {
      name,
      role: "Contributor",
      bio: `Articles by ${name}.`,
    }
  );
}

/** Initials for the avatar chip, e.g. "Garbha.ai Team" → "GT". */
export function authorInitials(name: string): string {
  const words = name.replace(/[^a-zA-Z\s]/g, "").trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
