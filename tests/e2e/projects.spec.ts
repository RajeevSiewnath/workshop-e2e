import { test, expect } from "@playwright/test";
import { execSync } from "node:child_process";
import {
  test as myTest,
  expect as myExpect,
} from "../fixtures/project.fixture";

test.beforeEach(async ({ page }) => {
  execSync("npx rimraf ./apps/backend/data.json");
});

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

  await page.getByTestId("create-project").click();

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

test("project creation calls backend", async ({ page }) => {
  await page.goto("/");

  const responsePromise = page.waitForResponse(
    "http://localhost:3001/projects",
  );

  await page.getByTestId("create-project").click();

  const response = await responsePromise;

  expect(response.ok()).toBeTruthy();

  await expect(page.getByText("Workshop Project")).toBeVisible();
});

test("project list starts empty", async ({ page }) => {
  await page.goto("/");

  const responsePromise = page.waitForResponse(
    "http://localhost:3001/projects",
  );

  const response = await responsePromise;

  expect(response.ok()).toBeTruthy();

  // ❌ Surprise:
  // Sometimes fails because previous test created data.
  await expect(page.getByText("Workshop Project")).not.toBeVisible();
});

myTest("uses fixture", async ({ page, projectName }) => {
  await page.goto("/");

  console.log(projectName);

  // ❌ Bad example:
  // const projectName = `project-${Date.now()}`;

  // Repeated in every test.

  // ✅ Good example:
  // Centralized fixture.
});
