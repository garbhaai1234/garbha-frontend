# Spec: SEO and AI-search programme

- Requirement ID: REQ-SEO-01
- Status: Approved (2026-10-12: plan "approved"; decisions delegated: "take a call based on the best practice")
- Owner: Garbha.ai team
- Baseline: `docs/seo/baseline-2026-10-12.md`

## Problem

garbha.ai is technically sound but invisible: no garbha.ai page appeared for 23 relevant searches
and the brand name returns press releases. Trust signals that health searches and AI answer
engines weigh (verifiable claims, honest structured data, named authors and reviewers) are weak,
and nothing is measured.

## Decisions (best practice, on the user's behalf)

| Topic | Decision | Why |
|---|---|---|
| Order | Stage 0 measurement, 1 trust, 2 technical, then 3 links/content, 4 `/care` tool pages, 5 speed | Measure first; fix trust before adding content |
| Unverified claims (CDSCO, ISO 13485, 93/94%, clinic count, "India's first") | Not added to structured data; visible copy untouched; listed for confirmation | Never assert unverifiable medical/regulatory claims to machines; changing public company claims is the company's call |
| Company type | `Organization` only (not `MedicalBusiness`) | Garbha sells software; it is not a provider of care |
| Product type | `SoftwareApplication` (`applicationCategory: MedicalApplication`) | Describes what the product is; `MedicalTest` is a test performed on a patient |
| Blog author | The organisation as author until real people consent to be named | A team is not a `Person`; no invented people |
| Tag pages | Kept for visitors, `noindex, follow`, out of the sitemap | Thin pages dilute the index; links still pass |
| Metadata length | Titles ≤ 60 characters, descriptions ≤ 160, meaning unchanged | Full display in results; no rewriting of claims |
| Kit installation | A separate step later | No code change; the kit's rules apply now |
| Branch | `seo`, on top of `care-polish` | Shares the test setup; `/care` work deploys first |
| Production | Nothing pushed without the user's go | Push to `main` = live |

## Acceptance criteria

1. Stage 0: verification tags print only when a code is set; a repeatable crawl tool; a dated
   baseline; setup steps for the account owner.
2. Stage 1: structured data on every page parses, uses the types above, carries no unverified
   claim, and still includes the existing FAQ, Article and BreadcrumbList data.
3. Stage 2: tag pages `noindex, follow` and not in the sitemap; every sitemap URL has `lastmod`;
   titles ≤ 60 and descriptions ≤ 160 characters (before/after listed); og:image on every
   indexable page; heading order fixed where nothing visible changes.
4. Every stage: unit and browser tests pass; the crawl and Lighthouse are re-run and compared
   with the baseline; SEO and Accessibility scores do not drop.

## Not in scope until the inputs exist

Evidence for the claims above; named authors and medical reviewers; new `/care` tool URLs
(need a medical reviewer); product-page facts for stage 3; the `http://www` double redirect
(host setting, hand-off).

## Progress

| Stage | Status | Evidence |
|---|---|---|
| 0 Measurement | Built (fd09753). Waiting for the account owner: Search Console and Bing codes | Tags print only with a code (checked both ways); `tools/seo/crawl.py`; `docs/seo/baseline-2026-10-12.md` |
| 1 Trust (structured data) | Built (e6432a8) | Organization only; products SoftwareApplication; team bylines = organisation; breadcrumbs on 6 more pages; tests over every sitemap URL |
| 1 Trust (claims evidence) | Waiting for documents | CDSCO number, ISO 13485 certificate, accuracy source (93 vs 94%), clinic count (11 vs 20), "India's first" |
| 2 Technical | Built | Sitemap 33 → 23 URLs (tag pages noindex, follow), lastmod on every URL; all titles ≤ 60 and descriptions ≤ 160 (`docs/seo/stage-2-metadata-changes.md`); og:image on Technology and the 5 product pages; product-page heading order (pixel-identical). Lighthouse (local, phone): SEO 100; product accessibility 94 → 96 |
| 2 Technical, left | Not done | Blog "Key takeaways" h3 before the first h2 (fixing changes how it looks); `/blog` title "Blog — Garbha.ai" is weak (content call); `http://www` double redirect (host setting) |
