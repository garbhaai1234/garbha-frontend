import { expect, test } from "@playwright/test";

/** Whole-page checks for /care (REQ-CARE-01 acceptance criteria 2, 6, 8, 9, 10). */

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 9, 12, 10, 0, 0));
  await page.addInitScript(() => localStorage.setItem("garbha.cookie-consent", "declined"));
});

const panel = (page: import("@playwright/test").Page) => page.locator("#care-tool-panel");

test("every module gives a working result", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/care");

  await page.locator("#tab-ovulation").click();
  await panel(page).getByLabel("First day of your last period").fill("2026-10-01");
  await expect(panel(page).getByText(/Most fertile: Sat, 10 Oct – Thu, 15 Oct/)).toBeVisible();

  await page.locator("#tab-specialist").click();
  await panel(page).getByLabel("Age of the person trying to conceive").fill("36");
  await panel(page).getByLabel("Months you’ve been trying").fill("7");
  await expect(panel(page).getByText("Yes: it’s a good time to see a specialist")).toBeVisible();

  await page.locator("#tab-semen").click();
  await panel(page).getByLabel("Semen volume").fill("2");
  await panel(page).getByLabel("Sperm concentration").fill("10");
  await expect(panel(page).getByText("2 values are below the WHO reference range")).toBeVisible();

  await page.locator("#tab-cost").click();
  await expect(panel(page).getByText("Likely ₹1.5 lakh – ₹2.5 lakh")).toBeVisible();
  await panel(page).getByLabel("City").selectOption("Warangal");
  await expect(panel(page).getByText("Likely ₹1 lakh – ₹1.8 lakh")).toBeVisible();

  await page.locator("#tab-questions").click();
  await panel(page).getByRole("checkbox").first().check();
  await expect(panel(page).getByText("1 of 14 answered")).toBeVisible();

  await page.locator("#tab-reminders").click();
  await panel(page).getByLabel("What is it?").fill("Evening injection");
  await panel(page).getByRole("button", { name: "Add reminder" }).click();
  await expect(panel(page).getByText("Tablet: Evening injection")).toBeVisible();
  const download = page.waitForEvent("download");
  await panel(page).getByRole("button", { name: "Add to calendar" }).click();
  expect((await download).suggestedFilename()).toBe("garbha-reminder.ics");

  await page.locator("#tab-eggs").click();
  await expect(panel(page).getByText("Likely ₹1.5 lakh – ₹4 lakh in total")).toBeVisible();

  await page.locator("#tab-ivf").click();
  await expect(panel(page).getByText("Week 4")).toBeVisible();

  expect(errors).toEqual([]);
});

test("stage chips open the matching module and mark the others", async ({ page }) => {
  await page.goto("/care");
  await page.getByRole("button", { name: "Planning for later" }).click();
  await expect(page.locator("#tab-eggs")).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", { name: "Had our first tests" }).click();
  await expect(page.locator("#tab-semen")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#tab-specialist")).toContainText("For you");
  await expect(page.getByRole("button", { name: "Had our first tests" })).toHaveAttribute("aria-pressed", "true");
});

test("no dead ends: every in-page link has a target, coming features are labelled", async ({ page }) => {
  await page.goto("/care");
  const hashes = await page.locator('main a[href^="#"], body a[href^="#"]').evaluateAll((as) =>
    [...new Set(as.map((a) => a.getAttribute("href")!))],
  );
  for (const h of hashes) {
    const id = h.slice(1);
    if (id.startsWith("tool-")) {
      await expect(page.locator(`#tab-${id.slice(5)}`), h).toHaveCount(1);
    } else {
      await expect(page.locator(`[id="${id}"]`), h).toHaveCount(1);
    }
  }
  const care = page.locator("#care");
  await expect(care.getByText("Coming", { exact: true })).toHaveCount(4);
  await expect(care.getByRole("link", { name: /Check a clinic’s registration/ })).toHaveAttribute(
    "href",
    /^https:\/\/registry\.artsurrogacy\.gov\.in\//,
  );
  // The old dead ends are gone.
  await expect(page.getByRole("link", { name: "Keep me posted" })).toHaveCount(0);
  await expect(page.locator('a[href="/contact"]')).toHaveCount(await page.locator('footer a[href="/contact"], header a[href="/contact"]').count());
});

test("one H1, FAQ structured data, no sideways scroll", async ({ page }) => {
  await page.goto("/care");
  await expect(page.locator("h1")).toHaveCount(1);
  const faq = await page.locator('script[type="application/ld+json"]').evaluateAll((s) =>
    s.map((x) => JSON.parse(x.textContent || "{}")).flat().find((d) => d["@type"] === "FAQPage"),
  );
  expect(faq.mainEntity).toHaveLength(8);
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `width ${width}`).toBeLessThanOrEqual(0);
  }
});

test("phone shortcut bar: hidden over the hero and the form, shown in between", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phones only");
  await page.goto("/care");
  const bar = page.getByRole("navigation", { name: "Garbha Care shortcuts" });
  await expect(bar).not.toBeInViewport();
  await page.locator("#tools").scrollIntoViewIfNeeded();
  await page.locator("#care-tool-panel").scrollIntoViewIfNeeded();
  await expect(bar).toBeInViewport();
  await bar.getByRole("link", { name: "Free counsellor call" }).click();
  await expect(page.locator("#call form")).toBeInViewport();
  await expect(bar).not.toBeInViewport();
});
