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

test("user creates project", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("button", {
      name: "Create Project",
    })
    .click();

  await expect(page.getByText("Workshop Project")).toBeVisible();

  // ❌ Bad example:
  // await page.locator("body > div:nth-child(2) button").click();

  // ✅ Good example:
  // await page
  //   .getByRole("button", {
  //     name: "Create Project",
  //   })
  //   .click();

  // ❌ Bad example:
  // Hardcoded waits create flaky tests.
  //
  // await page.waitForTimeout(2000);

  // ✅ Good example:
  // Wait for actual outcome.
});
