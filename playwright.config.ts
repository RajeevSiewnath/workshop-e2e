import { defineConfig } from "@playwright/test";

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
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
});
