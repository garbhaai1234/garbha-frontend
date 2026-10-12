/**
 * When each page's visible content last changed, for the sitemap's <lastmod>.
 * Search engines only trust lastmod that is accurate, so update a date only
 * when the page's content changes (not for code or structured-data tweaks).
 * Blog posts use their own `date`; the blog index uses the newest post.
 */
export const pageDates: Record<string, string> = {
  "": "2026-10-08",
  "/solutions": "2026-07-06",
  "/technology": "2026-09-28",
  "/about": "2026-07-27",
  "/partnership": "2026-07-05",
  "/contact": "2026-07-05",
  "/privacy": "2026-09-28",
  "/care": "2026-10-12",
  "/compliance": "2026-10-08",
  "/compliance/art-act": "2026-10-08",
  "/compliance/dpdp": "2026-10-08",
};

/** All solution pages share one template and one content file. */
export const solutionPagesDate = "2026-07-06";
