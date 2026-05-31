import { test as base } from "@playwright/test";
import { faker } from "@faker-js/faker";

export const test = base.extend<{
  projectName: string;
}>({
  projectName: async ({}, use) => {
    await use(faker.company.name());
  },
});

export { expect } from "@playwright/test";
