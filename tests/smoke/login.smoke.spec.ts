import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { AccountsOverviewPage } from '../../src/pages/account/AccountsOverviewPage';
import { env, loadEnvironment } from '../../src/config/envConfig';

loadEnvironment();

test.describe('@smoke Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.BASE_URL ?? 'https://parabank.parasoft.com');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('john', 'demo');

    const accountsOverviewPage = new AccountsOverviewPage(page);
    await expect(accountsOverviewPage.accountsTable).toBeVisible();
  });
});
