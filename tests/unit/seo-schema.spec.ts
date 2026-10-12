import { expect, test } from "@playwright/test";
import { articleSchema, organizationSchema, softwareSchema } from "@/lib/seo";
import { getAuthor } from "@/lib/authors";
import { solutions } from "@/content/solutions";

/** REQ-SEO-01 stage 1: structured data says what Garbha is, and nothing unverified. */

const UNVERIFIED = /CDSCO|ISO 13485|93%|94%|36,000|India['’]s first|best|guarantee/i;

test("the company is an Organization, not a medical business", () => {
  const org = organizationSchema();
  expect(org["@type"]).toBe("Organization");
  expect(JSON.stringify(org)).not.toMatch(/MedicalBusiness/);
  expect(org["@id"]).toBe("https://garbha.ai/#organization");
});

test("products are software with plain descriptions", () => {
  for (const s of solutions) {
    const d = softwareSchema({ name: s.name, description: s.schemaDescription, path: `/solutions/${s.slug}`, image: s.image });
    expect(d["@type"]).toBe("SoftwareApplication");
    expect(d.applicationCategory).toBe("MedicalApplication");
    expect(d.description, s.slug).not.toMatch(UNVERIFIED);
    expect(d.description.length, s.slug).toBeGreaterThan(40);
  }
});

test("a team byline is the organisation; a named person stays a Person", () => {
  const post = { slug: "x", title: "T", description: "D", date: "2026-10-01", author: "Garbha.ai Team" };
  expect(articleSchema(post, getAuthor("Garbha.ai Team")).author).toEqual({ "@id": "https://garbha.ai/#organization" });
  const named = articleSchema({ ...post, author: "Bharani Kumar Depuru" }, getAuthor("Bharani Kumar Depuru")).author;
  expect(named).toMatchObject({ "@type": "Person", name: "Bharani Kumar Depuru" });
});
