import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home/HomePage';
import { RegisterPage } from '../../src/pages/auth/RegisterPage';
import { RandomDataGenerator } from '../../src/utils/RandomDataGenerator';
import { loadEnvironment } from '../../src/config/envConfig';

loadEnvironment();

test.describe('@regression Registration', () => {
  test('should create a new ParaBank account successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.openRegistration();

    const registerPage = new RegisterPage(page);
    const username = `auto_${RandomDataGenerator.getAlphaNumeric(8)}`;
    await registerPage.register({
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1234567890',
      ssn: '123-45-6789',
      username,
      password: 'Password@123',
    });

    await expect(page.locator('#rightPanel .title')).toContainText('Welcome');
  });
});
