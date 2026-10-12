# Search Console and Bing Webmaster Tools: setup

For whoever owns the garbha.ai Google account. About 15 minutes. Needed before any ranking,
impression or click can be measured. No change to how the site looks.

## Google Search Console

1. Go to https://search.google.com/search-console and sign in with the company Google account.
2. **Add property → URL prefix** → `https://garbha.ai/` (a Domain property needs a DNS record; use
   it instead if someone can add DNS TXT records at the domain registrar).
3. Choose **HTML tag**. Copy only the `content` value, e.g. from
   `<meta name="google-site-verification" content="AbC123…" />` copy `AbC123…`.
4. Put the value in `src/lib/site.ts` → `verification.google` (or set the env var
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` on the host), build and deploy.
5. Back in Search Console press **Verify**. Then **Sitemaps** → submit `sitemap.xml`.
6. Add the second owner/user who will read the reports (Settings → Users and permissions).

## Bing Webmaster Tools (also feeds ChatGPT search and Copilot)

1. https://www.bing.com/webmasters → sign in → **Import from Google Search Console** (fastest), or
   add `https://garbha.ai/` and choose **HTML meta tag**.
2. If using the meta tag: put the `content` value of `msvalidate.01` in `verification.bing`, deploy,
   verify, then submit `https://garbha.ai/sitemap.xml`.

## After verification

- Wait 2–4 days for data; the first 28 days are the traffic baseline (impressions, clicks, average
  position per query and page, indexed pages, Core Web Vitals field data).
- Check **Pages → Why pages aren't indexed** and **Experience → Core Web Vitals**.
- Record the numbers in `docs/seo/` as `baseline-traffic-YYYY-MM-DD.md`.
