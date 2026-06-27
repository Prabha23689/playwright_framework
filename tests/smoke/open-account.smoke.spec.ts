import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { AccountsOverviewPage } from '../../src/pages/account/AccountsOverviewPage';
import { OpenNewAccountPage } from '../../src/pages/account/OpenNewAccountPage';
import { env, loadEnvironment } from '../../src/config/envConfig';

loadEnvironment();

test.describe('@smoke Open Account', () => {
  test('should open the account page after login', async ({ page }) => {
    await page.goto(env.BASE_URL ?? 'https://parabank.parasoft.com');

    const loginPage = new LoginPage(page);
    await loginPage.login('john', 'demo');

    const accountsOverviewPage = new AccountsOverviewPage(page);
    await expect(accountsOverviewPage.accountsTable).toBeVisible();

    const openNewAccountPage = new OpenNewAccountPage(page);
    await openNewAccountPage.navigate();

    await expect(openNewAccountPage.successMessage).toContainText('Open New Account');
  });
});
