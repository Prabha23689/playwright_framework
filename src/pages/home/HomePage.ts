import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class HomePage extends BasePage {
  readonly registerLink: Locator;
  readonly forgotLoginLink: Locator;
  readonly openAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.registerLink = page.locator('a[href*="register.htm"]');
    this.forgotLoginLink = page.locator('a[href*="forgotlogin.htm"]');
    this.openAccountLink = page.locator('a[href*="openaccount.htm"]');
  }

  async navigate(): Promise<void> {
    await this.goto('/');
  }

  async openRegistration(): Promise<void> {
    await this.click(this.registerLink);
  }

  async openForgotLogin(): Promise<void> {
    await this.click(this.forgotLoginLink);
  }

  async openNewAccount(): Promise<void> {
    await this.click(this.openAccountLink);
  }
}
