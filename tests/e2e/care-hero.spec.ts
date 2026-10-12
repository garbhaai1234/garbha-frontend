import { expect, test } from "@playwright/test";

/** The hero's fertile-day check, with the browser clock fixed to 12 Oct 2026. */

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 9, 12, 10, 0, 0));
  await page.addInitScript(() => localStorage.setItem("garbha.cookie-consent", "declined"));
});

test("one date gives the person's fertile days, ring and next steps", async ({ page, isMobile }) => {
  await page.goto("/care");
  const hero = page.locator("#care-hero");
  const ring = hero.getByRole("img", { name: /cycle/ });
  if (isMobile) await expect(ring).toBeHidden();
  else await expect(ring).toHaveAccessibleName(/^Sample cycle ring/);

  await hero.getByLabel("First day of your last period").fill("2026-10-01");
  await expect(hero.getByText("You’re in your fertile window")).toBeVisible();
  await expect(hero.getByText("Sat, 10 Oct – Thu, 15 Oct")).toBeVisible();
  await expect(hero.getByText("15 October 2026")).toBeVisible();
  await expect(ring).toBeVisible();
  await expect(ring).toHaveAccessibleName(/^Your estimated cycle of 28 days.*today is day 12/);
  await expect(hero.getByRole("link", { name: /Talk to a counsellor/ })).toHaveAttribute("href", "#request-call");
});

test("the date is shared with Tool 1 and survives a reload", async ({ page }) => {
  await page.goto("/care");
  await page.locator("#care-hero").getByLabel("First day of your last period").fill("2026-10-01");
  await page.reload();
  await expect(page.locator("#care-hero").getByLabel("First day of your last period")).toHaveValue("2026-10-01");
  await page.locator("#care-hero").getByRole("link", { name: /Day-by-day calendar/ }).click();
  const panel = page.locator("#care-tool-panel");
  await expect(panel.getByText(/Most fertile: Sat, 10 Oct – Thu, 15 Oct/)).toBeVisible();
  await expect(panel.getByLabel("First day of your last period")).toHaveValue("2026-10-01");
});

test("an old period is projected forward and says so", async ({ page }) => {
  await page.goto("/care");
  const hero = page.locator("#care-hero");
  await hero.getByLabel("First day of your last period").fill("2026-08-10");
  await expect(hero.getByText(/Projected from the period you logged on 10 August 2026/)).toBeVisible();
  // Current cycle starts 5 Oct: window 14–19 Oct.
  await expect(hero.getByText("Wed, 14 Oct – Mon, 19 Oct")).toBeVisible();
});

test("after this cycle's window it shows the next one", async ({ page }) => {
  await page.goto("/care");
  const hero = page.locator("#care-hero");
  await hero.getByLabel("First day of your last period").fill("2026-09-25");
  await hero.getByLabel("Usual cycle length").selectOption("30");
  await expect(hero.getByText("Next likely fertile days")).toBeVisible();
  await expect(hero.getByText(/This cycle’s window has passed/)).toBeVisible();
});
