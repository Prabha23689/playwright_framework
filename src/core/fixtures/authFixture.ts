import { test as base, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';
import { env, loadEnvironment } from '../config/envConfig';

loadEnvironment();

export const authTest = base.extend<{
  authPage: LoginPage;
  authenticatedContext: BrowserContext;
}>({
  authPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  authenticatedContext: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: env.STORAGE_STATE || undefined });
    await use(context);
    await context.close();
  },
});
