import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { solutions } from "@/content/solutions";
import { getAllPosts } from "@/lib/blog";
import { pageDates, solutionPagesDate } from "@/content/pageDates";

// Picks up scheduled blog posts once their publish time passes.
export const revalidate = 3600;

// Tag pages are left out on purpose: they are noindex (thin listing pages).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const posts = getAllPosts();
  const newestPost = posts.map((p) => p.date).sort().at(-1);
  const staticRoutes = [
    "",
    "/solutions",
    "/technology",
    "/blog",
    "/about",
    "/partnership",
    "/contact",
    "/privacy",
    "/care",
    "/compliance",
    "/compliance/art-act",
    "/compliance/dpdp",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: route === "/blog" ? newestPost : pageDates[route],
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const solutionRoutes = solutions.map((s) => ({
    url: `${base}/solutions/${s.slug}`,
    lastModified: solutionPagesDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...solutionRoutes, ...blogRoutes];
}
