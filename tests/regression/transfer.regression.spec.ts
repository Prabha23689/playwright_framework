import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { TransferFundsPage } from '../../src/pages/transfer/TransferFundsPage';
import { env, loadEnvironment } from '../../src/config/envConfig';

loadEnvironment();

test.describe('@regression Transfer Funds', () => {
  test('should transfer funds between accounts successfully', async ({ page }) => {
    await page.goto(env.BASE_URL ?? 'https://parabank.parasoft.com');

    const loginPage = new LoginPage(page);
    await loginPage.login('john', 'demo');

    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();
    await transferFundsPage.transfer('100', '12345', '54321');

    await expect(transferFundsPage.transferMessage).toContainText('Transfer Complete!');
  });
});
