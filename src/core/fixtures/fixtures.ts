import { test as base, Browser, BrowserContext, Page } from '@playwright/test';
import { env, loadEnvironment } from '../config/envConfig';
import path from 'path';
import fs from 'fs';

loadEnvironment();

type TestFixtures = {
  browserName: string;
  storageStatePath: string | undefined;
};

export const test = base.extend<TestFixtures>({
  browserName: async ({ browserName }, use) => {
    await use(browserName);
  },
  storageStatePath: async ({}, use) => {
    const statePath = env.STORAGE_STATE ? path.resolve(process.cwd(), env.STORAGE_STATE) : undefined;
    if (statePath && fs.existsSync(statePath)) {
      await use(statePath);
    } else {
      await use(undefined);
    }
  },
});

export const expect = test.expect;
