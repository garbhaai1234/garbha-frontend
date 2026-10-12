import { expect, test } from "@playwright/test";
import { normaliseMobile, validateCallRequest } from "@/lib/care/callRequest";
import { createRateLimiter } from "@/lib/server/requestGuard";
import { POST } from "@/app/api/care-call/route";

const valid = {
  firstName: "Lakshmi",
  mobile: "+91 98765 43210",
  place: "Hyderabad 500081",
  age: "31",
  partnerAge: "34",
  trying: "1 to 2 years",
  stage: "Trying to conceive",
  language: "Telugu",
  callTime: "Evening (4–8pm)",
  email: "",
  consent: "yes",
  whatsapp: "",
  from: "ovulation",
};

test.describe("call request rules", () => {
  test("normalises Indian mobiles and rejects others", () => {
    expect(normaliseMobile("+91 98765-43210")).toBe("9876543210");
    expect(normaliseMobile("098765 43210")).toBe("9876543210");
    expect(normaliseMobile("919876543210")).toBe("9876543210");
    expect(normaliseMobile("12345 67890")).toBeNull();
    expect(normaliseMobile("98765")).toBeNull();
  });

  test("a complete request is valid; partner age and email are optional", () => {
    const r = validateCallRequest({ ...valid, partnerAge: "", email: "" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.mobile).toBe("9876543210");
      expect(r.data.partnerAge).toBeNull();
      expect(r.data.whatsapp).toBe(false);
    }
  });

  test("only first name, mobile, language and consent are required", () => {
    const r = validateCallRequest({ firstName: "Ravi", mobile: "9876543210", language: "English", consent: "yes" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.age).toBeNull();
      expect(r.data.place).toBe("");
      expect(r.data.callTime).toBe("");
    }
    const missing = validateCallRequest({ firstName: "Ravi", mobile: "9876543210", consent: "yes" });
    expect(missing).toMatchObject({ ok: false, malformed: false, errors: { language: expect.any(String) } });
  });

  test("consent is required", () => {
    const r = validateCallRequest({ ...valid, consent: "" });
    expect(r).toMatchObject({ ok: false, malformed: false, errors: { consent: expect.any(String) } });
  });

  test("each field reports its own error", () => {
    const r = validateCallRequest({
      ...valid,
      firstName: "",
      mobile: "123",
      age: "12",
      stage: "Something else",
      email: "not-an-email",
    });
    expect(r.ok).toBe(false);
    if (!r.ok && !r.malformed) {
      expect(Object.keys(r.errors).sort()).toEqual(["age", "email", "firstName", "mobile", "stage"]);
    }
  });

  test("wrong types and over-long values are malformed", () => {
    expect(validateCallRequest({ ...valid, age: 31 })).toEqual({ ok: false, malformed: true });
    expect(validateCallRequest({ ...valid, place: "x".repeat(81) })).toEqual({ ok: false, malformed: true });
    expect(validateCallRequest([])).toEqual({ ok: false, malformed: true });
  });

  test("unknown 'from' values are dropped", () => {
    const r = validateCallRequest({ ...valid, from: "<script>" });
    expect(r.ok && r.data.from).toBe("");
  });
});

test.describe("rate limiter", () => {
  test("allows 5 per window, refuses the 6th, resets after the window", () => {
    const limited = createRateLimiter({ windowMs: 1000, max: 5 });
    for (let i = 0; i < 5; i++) expect(limited("1.2.3.4", 0)).toBe(false);
    expect(limited("1.2.3.4", 10)).toBe(true);
    expect(limited("5.6.7.8", 10)).toBe(false);
    expect(limited("1.2.3.4", 2000)).toBe(false);
  });
});

test.describe("POST /api/care-call", () => {
  const env = process.env as Record<string, string | undefined>;
  const saved = { ...env };
  const realFetch = globalThis.fetch;
  let sent: { url: string; body: Record<string, unknown> }[] = [];
  let ip = 0;

  const call = (body: unknown, headers: Record<string, string> = {}) =>
    POST(
      new Request("http://localhost:3457/api/care-call", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://localhost:3457",
          host: "localhost:3457",
          "x-forwarded-for": `10.0.0.${++ip}`,
          ...headers,
        },
        body: typeof body === "string" ? body : JSON.stringify(body),
      }),
    );

  test.beforeEach(() => {
    sent = [];
    env.RESEND_API_KEY = "test-key";
    env.CONTACT_TO_EMAIL = "team@example.com";
    env.CONTACT_FROM_EMAIL = "site@example.com";
    globalThis.fetch = (async (url: string, init: RequestInit) => {
      sent.push({ url, body: JSON.parse(String(init.body)) });
      return new Response("{}", { status: 200 });
    }) as typeof fetch;
  });
  test.afterEach(() => {
    globalThis.fetch = realFetch;
    for (const k of Object.keys(env)) if (!(k in saved)) delete env[k];
    Object.assign(env, saved);
  });

  test("a valid request is emailed, escaped, and not echoed back", async () => {
    const res = await call({ ...valid, firstName: "Lakshmi", place: "<b>Hyd</b>" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sent).toHaveLength(1);
    expect(sent[0].url).toBe("https://api.resend.com/emails");
    expect(sent[0].body.to).toEqual(["team@example.com"]);
    expect(String(sent[0].body.html)).toContain("&lt;b&gt;Hyd&lt;/b&gt;");
    expect(String(sent[0].body.html)).not.toContain("<b>Hyd</b>");
    expect(String(sent[0].body.text)).toContain("Mobile: +91 98765 43210");
  });

  test("CARE_TO_EMAIL overrides the contact inbox", async () => {
    env.CARE_TO_EMAIL = "care@example.com";
    await call(valid);
    expect(sent[0].body.to).toEqual(["care@example.com"]);
  });

  test("field errors come back as 422 with the field names", async () => {
    const res = await call({ ...valid, mobile: "12" });
    expect(res.status).toBe(422);
    expect((await res.json()).errors).toHaveProperty("mobile");
    expect(sent).toHaveLength(0);
  });

  test("honeypot: pretends success, sends nothing", async () => {
    const res = await call({ ...valid, website: "spam.example" });
    expect(await res.json()).toEqual({ ok: true });
    expect(sent).toHaveLength(0);
  });

  test("cross-site posts, wrong content type, bad JSON and huge bodies are refused", async () => {
    expect((await call(valid, { origin: "https://evil.example" })).status).toBe(403);
    expect((await call(valid, { "content-type": "text/plain" })).status).toBe(415);
    expect((await call("{not json")).status).toBe(400);
    expect((await call({ ...valid, junk: "x".repeat(5000) })).status).toBe(413);
    expect(sent).toHaveLength(0);
  });

  test("the 6th request from one address in 10 minutes gets 429", async () => {
    const headers = { "x-forwarded-for": "10.9.9.9" };
    for (let i = 0; i < 5; i++) expect((await call(valid, headers)).status).toBe(200);
    const limited = await call(valid, headers);
    expect(limited.status).toBe(429);
    expect((await limited.json()).error).toContain("info@garbha.ai");
  });

  test("production without email settings refuses with the email address, never silently", async () => {
    delete env.RESEND_API_KEY;
    env.NODE_ENV = "production";
    const res = await call(valid);
    expect(res.status).toBe(503);
    expect((await res.json()).error).toContain("info@garbha.ai");
  });

  test("a provider failure is reported to the person", async () => {
    globalThis.fetch = (async () => new Response("down", { status: 500 })) as unknown as typeof fetch;
    const res = await call(valid);
    expect(res.status).toBe(502);
  });
});
