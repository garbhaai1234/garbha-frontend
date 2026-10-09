export const site = {
  name: "Garbha.ai",
  tagline: "Transforming IVF Outcomes with the Power of AI",
  description:
    "At Garbha, we are revolutionizing IVF with AI-powered diagnostics, ensuring smarter, data-driven fertility treatments.",
  footerTagline: "Empowering IVF success with AI-driven embryo insights.",
  poweredBy: "B2LSPRY PVT LTD",
  // Canonical origin — override per environment with NEXT_PUBLIC_SITE_URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://garbha.ai").replace(
    /\/$/,
    "",
  ),
  email: "info@garbha.ai",
  phone: "+918977605360",
  address: "H.no: 2-56/2/19, Madhapur, Hyderabad, Telangana, India, 500081.",
  socials: {
    facebook: "https://www.facebook.com/ai.garbha",
    instagram: "https://www.instagram.com/garbha.ai/",
    linkedin: "https://www.linkedin.com/company/garbha-ai",
  },
} as const;

export const mainNav = [
  { label: "Technology", href: "/technology" },
  { label: "Garbha Care", href: "/care" },
  { label: "Compliance", href: "/compliance" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Partner with Us", href: "/partnership" },
] as const;

/** Footer "Quick Links" column — matches the live garbha.ai footer. */
export const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Partner with Us", href: "/partnership" },
  { label: "Strategic Overview", href: "/partnership" },
] as const;

/** Fun-fact counters — values and labels mirror the live homepage. */
export const stats = [
  { value: "50%", label: "Reduced Cost of Treatment" },
  { value: "25%", label: "Increase In Implantation Rate" },
  { value: "100%", label: "Objective Embryo Grading" },
  { value: "93%", label: "Accuracy Rate" },
] as const;
