import { Locator, Page } from '@playwright/test';

export class WaitHelper {
  static async waitForVisible(locator: string | Locator, page: Page, timeout = 10000): Promise<void> {
    const element = typeof locator === 'string' ? page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
  }

  static async waitForHidden(locator: string | Locator, page: Page, timeout = 10000): Promise<void> {
    const element = typeof locator === 'string' ? page.locator(locator) : locator;
    await element.waitFor({ state: 'hidden', timeout });
  }

  static async waitForEnabled(locator: string | Locator, page: Page, timeout = 10000): Promise<void> {
    const element = typeof locator === 'string' ? page.locator(locator) : locator;
    await element.waitFor({ state: 'attached', timeout });
    await element.isEnabled({ timeout });
  }

  static async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
