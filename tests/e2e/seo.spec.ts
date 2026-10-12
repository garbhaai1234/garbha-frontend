import { expect, test } from "@playwright/test";

/**
 * Site-wide SEO checks over every sitemap URL (REQ-SEO-01). Desktop only: the
 * checks read server HTML, which is the same for phones.
 */

type Page = { path: string; html: string };

async function sitemapPages(request: import("@playwright/test").APIRequestContext): Promise<Page[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
  return Promise.all(paths.map(async (path) => ({ path, html: await (await request.get(path)).text() })));
}

const jsonLd = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

function types(node: unknown, out = new Set<string>()): Set<string> {
  if (Array.isArray(node)) node.forEach((n) => types(n, out));
  else if (node && typeof node === "object") {
    const t = (node as Record<string, unknown>)["@type"];
    if (t) (Array.isArray(t) ? t : [t]).forEach((x) => out.add(String(x)));
    Object.values(node).forEach((v) => types(v, out));
  }
  return out;
}

test.describe("SEO, every sitemap page", () => {
  test.skip(({ isMobile }) => isMobile, "server HTML is the same for phones");

  test("structured data parses and describes Garbha honestly", async ({ request }) => {
    for (const p of await sitemapPages(request)) {
      const data = jsonLd(p.html);
      const t = types(data);
      expect(t.has("Organization"), p.path).toBe(true);
      expect(t.has("MedicalBusiness"), p.path).toBe(false);
      expect(t.has("MedicalTest"), p.path).toBe(false);
      if (p.path.startsWith("/solutions/")) expect(t.has("SoftwareApplication"), p.path).toBe(true);
      if (/^\/blog\/(?!tag\/)[^/]+$/.test(p.path)) {
        expect(t.has("Article"), p.path).toBe(true);
        const article = data.flat().find((d: Record<string, unknown>) => d["@type"] === "Article");
        // A team byline is never typed as a person: either the organisation, or a named Person.
        const a = article.author as Record<string, string>;
        if (a["@type"] === "Person") expect(a.name, p.path).not.toMatch(/team/i);
        else expect(a, p.path).toEqual({ "@id": "https://garbha.ai/#organization" });
      }
      if (["/technology", "/care", "/compliance/art-act", "/compliance/dpdp"].includes(p.path)) {
        expect(t.has("FAQPage"), p.path).toBe(true);
      }
      if (p.path !== "/") expect(t.has("BreadcrumbList"), p.path).toBe(true);
    }
  });

  test("one H1, a self canonical and a title on every page", async ({ request }) => {
    for (const p of await sitemapPages(request)) {
      expect(p.html.match(/<h1[\s>]/g)?.length, p.path).toBe(1);
      const canonical = p.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      expect(canonical, p.path).toBe(`https://garbha.ai${p.path === "/" ? "" : p.path}`);
      expect(p.html, p.path).toMatch(/<title>[^<]{10,}<\/title>/);
    }
  });
});

test.describe("SEO stage 2: index hygiene", () => {
  test.skip(({ isMobile }) => isMobile, "server HTML is the same for phones");

  test("sitemap: no tag pages, and every URL has a lastmod", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    expect(entries.length).toBeGreaterThan(15);
    for (const e of entries) {
      const loc = e.match(/<loc>([^<]+)<\/loc>/)![1];
      expect(loc, "tag pages are noindex").not.toContain("/blog/tag/");
      expect(e, loc).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}/);
    }
  });

  test("tag pages stay reachable but are noindex, follow", async ({ request }) => {
    const html = await (await request.get("/blog/tag/ivf")).text();
    expect(html).toMatch(/<meta name="robots" content="noindex, follow"/);
  });

  test("titles ≤ 60, descriptions ≤ 160, a share image on every page", async ({ request }) => {
    for (const p of await sitemapPages(request)) {
      const title = p.html.match(/<title>([^<]*)<\/title>/)![1].replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'");
      const desc = (p.html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'");
      expect(title.length, `${p.path} title: ${title}`).toBeLessThanOrEqual(60);
      expect(desc.length, `${p.path} description`).toBeGreaterThan(50);
      expect(desc.length, `${p.path} description: ${desc}`).toBeLessThanOrEqual(160);
      expect(p.html, `${p.path} og:image`).toMatch(/<meta property="og:image" content="https:\/\/garbha\.ai\/[^"]+"/);
    }
  });

  test("product pages: the steps sit under an h2", async ({ request }) => {
    const html = await (await request.get("/solutions/embryo-scoring")).text();
    const order = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
    for (let i = 1; i < order.length; i++) expect(order[i] - order[i - 1], `heading ${i}`).toBeLessThanOrEqual(1);
  });
});
