import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading")).toHaveText("Projects");

  // ❌ Bad example:
  // Checks implementation details.
  //
  // expect(await page.content())
  //   .toContain("Projects");

  // ✅ Good example:
  // Checks what the user sees.
});
