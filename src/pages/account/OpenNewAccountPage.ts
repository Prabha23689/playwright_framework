import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class OpenNewAccountPage extends BasePage {
  readonly accountTypeSelect: Locator;
  readonly fromAccountSelect: Locator;
  readonly openNewAccountButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.accountTypeSelect = page.locator('select[id="type"]');
    this.fromAccountSelect = page.locator('select[id="fromAccountId"]');
    this.openNewAccountButton = page.locator('input[value="Open New Account"]');
    this.successMessage = page.locator('h1.title', { hasText: 'Open New Account' });
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/openaccount.htm');
  }

  async openNewAccount(accountType: string, fromAccountId: string): Promise<void> {
    await this.select(this.accountTypeSelect, accountType);
    await this.select(this.fromAccountSelect, fromAccountId);
    await this.click(this.openNewAccountButton);
  }

  async getSuccessMessage(): Promise<string> {
    return this.getText(this.successMessage);
  }
}
