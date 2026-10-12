import type { Page } from "@playwright/test";

/** The open tool's panel: inline on desktop, inside the bottom sheet on phones. */
export const toolPanel = (page: Page) => page.locator("#care-tool-panel");

/** Opens a tool the way a person would: the side list on desktop, a card (bottom sheet) on phones. */
export async function openTool(page: Page, id: string, isMobile: boolean) {
  if (isMobile) {
    if (await page.locator("dialog[open]").count()) await page.keyboard.press("Escape");
    await page.locator(`#card-${id}`).click();
  } else {
    await page.locator(`#tab-${id}`).click();
  }
}
