import { expect, test } from "@playwright/test";
import { openTool, toolPanel as panel } from "./helpers";

/** Whole-page checks for /care (REQ-CARE-01 acceptance criteria 2, 6, 8, 9, 10). */

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 9, 12, 10, 0, 0));
  await page.addInitScript(() => localStorage.setItem("garbha.cookie-consent", "declined"));
});

test("every tool gives a working result", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/care");

  // Tool 1 asks nothing itself: it points to the hero, then shows the hero's answer.
  await openTool(page, "ovulation", isMobile);
  await expect(panel(page).getByText("Start with your last period")).toBeVisible();
  await panel(page).getByRole("link", { name: "Enter my date" }).click();
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await page.locator("#care-hero").getByLabel("First day of your last period").fill("2026-10-01");
  await openTool(page, "ovulation", isMobile);
  await expect(panel(page).getByText(/Most fertile: Sat, 10 Oct – Thu, 15 Oct/)).toBeVisible();

  await openTool(page, "specialist", isMobile);
  await panel(page).getByLabel("Age of the person trying to conceive").fill("36");
  await panel(page).getByLabel("Months you’ve been trying").fill("7");
  await expect(panel(page).getByText("Yes: it’s a good time to see a specialist")).toBeVisible();

  await openTool(page, "semen", isMobile);
  await panel(page).getByLabel("Semen volume").fill("2");
  await panel(page).getByLabel("Sperm concentration").fill("10");
  await expect(panel(page).getByText("2 values are below the WHO reference range")).toBeVisible();

  await openTool(page, "cost", isMobile);
  await expect(panel(page).getByText("Likely ₹1.5 lakh – ₹2.5 lakh")).toBeVisible();
  await panel(page).getByLabel("City").selectOption("Warangal");
  await expect(panel(page).getByText("Likely ₹1 lakh – ₹1.8 lakh")).toBeVisible();

  await openTool(page, "questions", isMobile);
  await panel(page).getByRole("checkbox").first().check();
  await expect(panel(page).getByText("1 of 14 answered")).toBeVisible();

  await openTool(page, "reminders", isMobile);
  await panel(page).getByLabel("What is it?").fill("Evening injection");
  await panel(page).getByRole("button", { name: "Add reminder" }).click();
  await expect(panel(page).getByText("Tablet: Evening injection")).toBeVisible();
  const download = page.waitForEvent("download");
  await panel(page).getByRole("button", { name: "Add to calendar" }).click();
  expect((await download).suggestedFilename()).toBe("garbha-reminder.ics");

  await openTool(page, "eggs", isMobile);
  await expect(panel(page).getByText("Likely ₹1.5 lakh – ₹4 lakh in total")).toBeVisible();

  await openTool(page, "ivf", isMobile);
  await expect(panel(page).getByText("Week 4")).toBeVisible();

  expect(errors).toEqual([]);
});

test("stage chips point to the matching tools", async ({ page, isMobile }) => {
  await page.goto("/care");
  await page.getByRole("button", { name: "Had our first tests" }).click();
  await expect(page.getByRole("button", { name: "Had our first tests" })).toHaveAttribute("aria-pressed", "true");
  if (isMobile) {
    await expect(page.locator("#card-semen")).toContainText("For you");
    await expect(page.locator("#card-specialist")).toContainText("For you");
    await expect(page.locator("#card-cost")).not.toContainText("For you");
    await expect(page.locator("dialog[open]")).toHaveCount(0);
  } else {
    await expect(page.locator("#tab-semen")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#tab-specialist")).toContainText("For you");
  }
});

test("phones: every tool is a visible card, the sheet opens and closes properly", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phones only");
  await page.goto("/care");
  for (const id of ["ovulation", "specialist", "semen", "cost", "questions", "reminders", "eggs", "ivf"]) {
    await expect(page.locator(`#card-${id}`)).toBeVisible();
  }
  await page.locator("#card-eggs").click();
  const sheet = page.getByRole("dialog", { name: /Tool 7: Egg-freezing planner/ });
  await expect(sheet).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
  await expect(page.locator("#card-eggs")).toBeFocused();
  await page.locator("#card-eggs").click();
  await sheet.getByRole("button", { name: "Close" }).click();
  await expect(sheet).toBeHidden();
  // A shared link opens the tool directly.
  await page.goto("/care#tool-ivf");
  await expect(page.getByRole("dialog", { name: /Tool 8/ })).toBeVisible();
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
  await page.locator("#card-ivf").scrollIntoViewIfNeeded();
  await expect(bar).toBeInViewport();
  await bar.getByRole("link", { name: "Free counsellor call" }).click();
  await expect(page.locator("#call form")).toBeInViewport();
  await expect(bar).not.toBeInViewport();
});
