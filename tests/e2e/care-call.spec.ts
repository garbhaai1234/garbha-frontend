import { expect, test } from "@playwright/test";
import { openTool } from "./helpers";

/** The free call request on /care. No real email is sent: the API is stubbed unless stated. */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("garbha.cookie-consent", "declined"));
});

const form = (page: import("@playwright/test").Page) => page.locator("#call form");

async function fillRequired(page: import("@playwright/test").Page) {
  await form(page).getByLabel("First name").fill("Lakshmi");
  await form(page).getByLabel("Mobile number").fill("98765 43210");
  await form(page).getByText("Telugu", { exact: true }).click();
}

test("only four answers are required; errors sit beside their fields", async ({ page }) => {
  await page.goto("/care#request-call");
  await form(page).getByLabel("First name").fill("Lakshmi");
  await form(page).getByLabel("Mobile number").fill("12345");
  await form(page).getByRole("button", { name: "Request my free call" }).click();
  await expect(form(page).getByText("Please enter a 10-digit Indian mobile number.")).toBeVisible();
  await expect(form(page).getByText("Please choose a language for the call.")).toBeVisible();
  await expect(form(page).getByText("We need your permission to call you.")).toBeVisible();
  await expect(form(page).getByLabel("Mobile number")).toBeFocused();
  await expect(form(page).getByLabel("Mobile number")).toHaveAttribute("aria-invalid", "true");
  await expect(form(page).getByLabel("First name")).toHaveValue("Lakshmi");
  // Optional questions are folded away and raise no error when blank.
  await expect(form(page).getByLabel(/City or PIN code/)).toBeHidden();
});

test("the required answers alone send the request, and the confirmation is honest", async ({ page }) => {
  let posted: Record<string, string> | null = null;
  await page.route("**/api/care-call", async (route) => {
    posted = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/care#request-call");
  await fillRequired(page);
  await form(page).getByLabel(/I agree that Garbha may call me/).check();
  await form(page).getByRole("button", { name: "Request my free call" }).click();
  const done = page.locator("#call [role=status]");
  await expect(done).toContainText("Thank you, Lakshmi");
  await expect(done).toContainText("+91 98••••3210");
  await expect(done).toContainText("Telugu");
  await expect(done).toContainText("when calls begin in Hyderabad");
  expect(posted).toMatchObject({ firstName: "Lakshmi", language: "Telugu", consent: "yes", place: "", age: "", website: "" });
});

test("a wrong optional answer opens the optional part and points to it", async ({ page }) => {
  await page.route("**/api/care-call", (route) => route.fulfill({ json: { ok: true } }));
  await page.goto("/care#request-call");
  await fillRequired(page);
  await form(page).getByText("Help your counsellor prepare").click();
  await form(page).getByLabel(/Your age/).fill("12");
  await form(page).getByText("Help your counsellor prepare").click(); // fold it again
  await form(page).getByLabel(/I agree that Garbha may call me/).check();
  await form(page).getByRole("button", { name: "Request my free call" }).click();
  await expect(form(page).getByText(/age between 18 and 60, or leave it blank/).first()).toBeVisible();
  await expect(form(page).getByLabel(/Your age/)).toBeFocused();
});

test("a server refusal is shown, and the answers are still there", async ({ page }) => {
  await page.route("**/api/care-call", (route) =>
    route.fulfill({ status: 429, json: { ok: false, error: "Too many requests from this connection." } }),
  );
  await page.goto("/care#request-call");
  await fillRequired(page);
  await form(page).getByLabel(/I agree that Garbha may call me/).check();
  await form(page).getByRole("button", { name: "Request my free call" }).click();
  await expect(form(page).getByRole("alert")).toContainText("Too many requests");
  await expect(form(page).getByLabel("First name")).toHaveValue("Lakshmi");
});

test("unstubbed: without email settings the person is told to email, never silently dropped", async ({ page }) => {
  test.skip(!!process.env.RESEND_API_KEY, "real email settings present: would send a real email");
  await page.goto("/care#request-call");
  await fillRequired(page);
  await form(page).getByLabel(/I agree that Garbha may call me/).check();
  await form(page).getByRole("button", { name: "Request my free call" }).click();
  await expect(form(page).getByRole("alert")).toContainText("info@garbha.ai");
});

test("tool context pre-fills 'where are you now'", async ({ page, isMobile }) => {
  await page.goto("/care#tool-eggs");
  if (isMobile) await page.keyboard.press("Escape");
  await form(page).getByLabel("First name").click();
  await form(page).getByText("Help your counsellor prepare").click();
  await expect(form(page).getByLabel(/Where are you now/)).toHaveValue("Planning ahead (egg freezing)");
});

test("the tool just used still pre-fills after a call button changes the address", async ({ page, isMobile }) => {
  await page.goto("/care");
  await openTool(page, "semen", isMobile);
  await page.locator("#care-tool-panel").getByRole("link", { name: /Talk to a fertility counsellor/ }).click();
  await expect(page).toHaveURL(/#request-call$/);
  await form(page).getByLabel("First name").click();
  await form(page).getByText("Help your counsellor prepare").click();
  await expect(form(page).getByLabel(/Where are you now/)).toHaveValue("Tests done, not sure what they mean");
});
