import { site } from "@/lib/site";

/** Join a path onto the canonical site origin. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Organization / MedicalBusiness schema — describes the company itself so
 * search engines can build a knowledge-panel entity (logo, contact, socials).
 * Rendered once, sitewide, in the root layout.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.poweredBy,
    url: site.url,
    logo: absoluteUrl("/brand/garbhatm.svg"),
    image: absoluteUrl("/brand/hero-bg.jpg"),
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "H.no: 2-56/2/19, Madhapur",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500081",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      telephone: site.phone,
    },
    sameAs: [site.socials.facebook, site.socials.instagram, site.socials.linkedin],
  };
}

/** WebSite schema — ties the domain to the brand name for site-name display. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** BreadcrumbList — helps Google render the page's position in the site tree. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage — makes eligible Q&A show as expandable rich results in search. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Article schema for blog posts — enables article rich results and dates. */
export function articleSchema(
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    cover?: string;
  },
  author?: { name: string; role: string; bio: string; url?: string },
) {
  const authorNode = author
    ? {
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        url: author.url ? absoluteUrl(author.url) : site.url,
      }
    : { "@type": "Organization", name: post.author, url: site.url };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: post.cover ? absoluteUrl(post.cover) : absoluteUrl("/brand/hero-bg.jpg"),
    author: authorNode,
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}
