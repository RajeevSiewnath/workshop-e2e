import { test } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
});
