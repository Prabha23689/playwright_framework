import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class AccountsOverviewPage extends BasePage {
  readonly accountsTable: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.accountsTable = page.locator('#accountTable');
    this.logoutLink = page.locator('a[href*="logout.htm"]');
  }

  async isAccountsTableVisible(): Promise<boolean> {
    return this.isVisible(this.accountsTable);
  }

  async logout(): Promise<void> {
    await this.click(this.logoutLink);
  }
}
