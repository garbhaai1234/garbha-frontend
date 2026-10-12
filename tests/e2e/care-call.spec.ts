import { expect, test, type Page } from "@playwright/test";
import { openTool } from "./helpers";

/** The free call request on /care. No real email is sent: the API is stubbed unless stated. */

async function fillStep1(page: Page) {
  const form = page.locator("#call form");
  await form.getByLabel("First name").fill("Lakshmi");
  await form.getByLabel("Mobile number").fill("98765 43210");
  await form.getByLabel("City or PIN code").fill("Hyderabad");
  await form.getByLabel("Your age").fill("31");
  await form.getByLabel("How long have you been trying?").selectOption("1 to 2 years");
  await form.getByLabel("Where are you now?").selectOption("Trying to conceive");
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("garbha.cookie-consent", "declined"));
});

test("step 1 shows each error next to its field and keeps what was typed", async ({ page }) => {
  await page.goto("/care#call");
  const form = page.locator("#call form");
  await form.getByLabel("First name").fill("Lakshmi");
  await form.getByLabel("Mobile number").fill("12345");
  await form.getByRole("button", { name: "Next" }).click();
  await expect(form.getByText("Please enter a 10-digit Indian mobile number.")).toBeVisible();
  await expect(form.getByText("Please enter your city or PIN code.")).toBeVisible();
  await expect(form.getByLabel("Mobile number")).toBeFocused();
  await expect(form.getByLabel("First name")).toHaveValue("Lakshmi");
  await expect(form.getByLabel("Mobile number")).toHaveAttribute("aria-invalid", "true");
});

test("consent is required, then the request is sent and confirmed", async ({ page }) => {
  let posted: Record<string, string> | null = null;
  await page.route("**/api/care-call", async (route) => {
    posted = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/care#call");
  const form = page.locator("#call form");
  await fillStep1(page);
  await form.getByRole("button", { name: "Next" }).click();
  await expect(form.getByText("Step 2 of 2")).toBeVisible();

  await form.getByText("Telugu", { exact: true }).click();
  await form.getByText("Evening (4–8pm)").click();
  await form.getByRole("button", { name: "Request my free call" }).click();
  await expect(form.getByText("We need your permission to call you.")).toBeVisible();
  expect(posted).toBeNull();

  await form.getByLabel(/I agree that Garbha may call me/).check();
  await form.getByRole("button", { name: "Request my free call" }).click();
  const done = page.locator("#call [role=status]");
  await expect(done).toContainText("Thank you, Lakshmi");
  await expect(done).toContainText("+91 98••••3210");
  await expect(done).toContainText("Telugu");
  expect(posted).toMatchObject({ firstName: "Lakshmi", consent: "yes", whatsapp: "", website: "" });
});

test("a server refusal is shown, and the answers are still there", async ({ page }) => {
  await page.route("**/api/care-call", (route) =>
    route.fulfill({ status: 429, json: { ok: false, error: "Too many requests from this connection." } }),
  );
  await page.goto("/care#call");
  const form = page.locator("#call form");
  await fillStep1(page);
  await form.getByRole("button", { name: "Next" }).click();
  await form.getByText("English", { exact: true }).click();
  await form.getByText("Morning (9am–12pm)").click();
  await form.getByLabel(/I agree that Garbha may call me/).check();
  await form.getByRole("button", { name: "Request my free call" }).click();
  await expect(form.getByRole("alert")).toContainText("Too many requests");
  await form.getByRole("button", { name: "Back" }).click();
  await expect(form.getByLabel("First name")).toHaveValue("Lakshmi");
});

test("unstubbed: without email settings the person is told to email, never silently dropped", async ({ page }) => {
  test.skip(!!process.env.RESEND_API_KEY, "real email settings present: would send a real email");
  await page.goto("/care#call");
  const form = page.locator("#call form");
  await fillStep1(page);
  await form.getByRole("button", { name: "Next" }).click();
  await form.getByText("English", { exact: true }).click();
  await form.getByText("Morning (9am–12pm)").click();
  await form.getByLabel(/I agree that Garbha may call me/).check();
  await form.getByRole("button", { name: "Request my free call" }).click();
  await expect(form.getByRole("alert")).toContainText("info@garbha.ai");
});

test("tool context pre-fills 'where are you now'", async ({ page, isMobile }) => {
  await page.goto("/care#tool-eggs");
  if (isMobile) await page.keyboard.press("Escape");
  const form = page.locator("#call form");
  await form.getByLabel("First name").click();
  await expect(form.getByLabel("Where are you now?")).toHaveValue("Planning ahead (egg freezing)");
});

test("the tool just used still pre-fills after a call button changes the address", async ({ page, isMobile }) => {
  await page.goto("/care");
  await openTool(page, "semen", isMobile);
  await page.locator("#care-tool-panel").getByRole("link", { name: /Talk to a fertility counsellor/ }).click();
  await expect(page).toHaveURL(/#request-call$/);
  const form = page.locator("#call form");
  await form.getByLabel("First name").click();
  await expect(form.getByLabel("Where are you now?")).toHaveValue("Tests done, not sure what they mean");
});
