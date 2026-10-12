import { defineConfig, devices } from "@playwright/test";

/**
 * Two projects:
 * - unit: plain Node tests of src/lib (no browser, no server);
 * - e2e: the built site in the installed Chrome, phone and desktop.
 *
 *   npm test            unit tests only
 *   npm run test:e2e    build first (`npm run build`), then browser tests
 */
const port = Number(process.env.E2E_PORT ?? 3457);

export default defineConfig({
  testDir: "tests",
  reporter: "list",
  projects: [
    { name: "unit", testDir: "tests/unit" },
    {
      name: "phone",
      testDir: "tests/e2e",
      use: { ...devices["Pixel 7"], channel: "chrome", baseURL: `http://localhost:${port}` },
    },
    {
      name: "desktop",
      testDir: "tests/e2e",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        channel: "chrome",
        baseURL: `http://localhost:${port}`,
      },
    },
  ],
  webServer: process.env.E2E
    ? {
        command: `npx next start -p ${port}`,
        url: `http://localhost:${port}/care`,
        reuseExistingServer: true,
        timeout: 120_000,
      }
    : undefined,
});
