import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home/HomePage';
import { env, loadEnvironment } from '../../src/config/envConfig';

loadEnvironment();

test.describe('@smoke Open Account', () => {
  test('should open a new account successfully', async ({ page }) => {
    await page.goto(env.BASE_URL ?? 'https://parabank.parasoft.com');

    const homePage = new HomePage(page);
    await homePage.openNewAccount();

    await expect(page.locator('#rightPanel .title')).toContainText('Open New Account');
  });
});
