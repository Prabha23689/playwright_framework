import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class AdminPage extends BasePage {
  readonly userSearchInput: Locator;
  readonly searchButton: Locator;
  readonly resultsTable: Locator;

  constructor(page: Page) {
    super(page);
    this.userSearchInput = page.locator('input[name="searchTerm"]');
    this.searchButton = page.locator('button', { hasText: 'Search' });
    this.resultsTable = page.locator('#adminResults');
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/admin.htm');
  }

  async searchUser(username: string): Promise<void> {
    await this.fill(this.userSearchInput, username);
    await this.click(this.searchButton);
  }

  async isResultsVisible(): Promise<boolean> {
    return this.isVisible(this.resultsTable);
  }
}
