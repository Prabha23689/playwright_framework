import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { AccountsOverviewPage } from '../../src/pages/account/AccountsOverviewPage';
import { TransferFundsPage } from '../../src/pages/transfer/TransferFundsPage';
import { env, loadEnvironment } from '../../src/config/envConfig';

loadEnvironment();

test.describe('@regression Transfer Funds', () => {
  test('should transfer funds between accounts successfully', async ({ page }) => {
    await page.goto(env.BASE_URL ?? 'https://parabank.parasoft.com');

    const loginPage = new LoginPage(page);
    await loginPage.login('john', 'demo');

    const accountsOverviewPage = new AccountsOverviewPage(page);
    await expect(accountsOverviewPage.accountsTable).toBeVisible();

    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();

    const fromAccountId = await page.locator('#fromAccountId option').first().getAttribute('value');
    const toAccountId = await page.locator('#toAccountId option').first().getAttribute('value');

    await transferFundsPage.transfer('100', fromAccountId ?? '13344', toAccountId ?? '13344');
    await expect(transferFundsPage.transferMessage).toContainText('Transfer Complete!');
  });
});
