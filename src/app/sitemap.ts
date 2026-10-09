import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { solutions } from "@/content/solutions";
import { getAllPosts, getAllTags } from "@/lib/blog";

// Picks up scheduled blog posts once their publish time passes.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
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
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const solutionRoutes = solutions.map((s) => ({
    url: `${base}/solutions/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const tagRoutes = getAllTags().map((t) => ({
    url: `${base}/blog/tag/${t.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...solutionRoutes, ...blogRoutes, ...tagRoutes];
}
