import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { env, loadEnvironment } from '../../src/config/envConfig';

loadEnvironment();

test.describe('@negative Login', () => {
  test('should show an error for invalid credentials', async ({ page }) => {
    await page.goto(env.BASE_URL ?? 'https://parabank.parasoft.com');

    const loginPage = new LoginPage(page);
    await loginPage.login('invalid-user', 'wrong-password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('The username and password could not be verified.');
  });
});
