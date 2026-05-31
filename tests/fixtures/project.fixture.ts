import { test as base } from "@playwright/test";

export const test = base.extend<{
  projectName: string;
}>({
  projectName: async ({}, use) => {
    await use(`project-${Date.now()}`);
  },
});

export { expect } from "@playwright/test";
