import { expect } from '@playwright/test';

export class AssertUtil {
  static async softExpectToBeVisible(locator: string, page: any): Promise<void> {
    await expect(page.locator(locator)).toBeVisible();
  }

  static async expectTextContains(locator: string, text: string, page: any): Promise<void> {
    await expect(page.locator(locator)).toContainText(text);
  }

  static async expectTitleContains(page: any, text: string): Promise<void> {
    await expect(page).toHaveTitle(new RegExp(text, 'i'));
  }
}
