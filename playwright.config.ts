import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: [
    // 1. Backend API Server
    {
      command: "pnpm --filter backend dev",
      url: "http://localhost:3001",
      timeout: 60 * 1000,
    },
    // 2. Frontend Server
    {
      command: "pnpm --filter frontend dev",
      url: "http://localhost:3000",
      timeout: 60 * 1000,
    },
  ],
  workers: 1,
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    trace: "on", // "on-first-retry",
    video: "on", // "retain-on-failure",
    screenshot: "on", // "only-on-failure",
  },
});
