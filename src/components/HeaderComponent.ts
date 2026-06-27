import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly logo: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('#header #logo a');
    this.logoutButton = page.locator('a[href*="logout.htm"]');
  }

  async navigateHome(): Promise<void> {
    await this.logo.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
