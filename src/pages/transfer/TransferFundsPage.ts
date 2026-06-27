import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class TransferFundsPage extends BasePage {
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly transferButton: Locator;
  readonly transferMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.toAccountSelect = page.locator('select[name="toAccountId"]');
    this.transferButton = page.locator('input[value="Transfer"]');
    this.transferMessage = page.locator('#rightPanel .title');
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/transfer.htm');
  }

  async transfer(amount: string, fromAccount: string, toAccount: string): Promise<void> {
    await this.fill(this.amountInput, amount);
    await this.select(this.fromAccountSelect, fromAccount);
    await this.select(this.toAccountSelect, toAccount);
    await this.click(this.transferButton);
  }

  async getConfirmationText(): Promise<string> {
    return this.getText(this.transferMessage);
  }
}
