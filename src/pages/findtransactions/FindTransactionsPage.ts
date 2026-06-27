import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class FindTransactionsPage extends BasePage {
  readonly accountId: Locator;
  readonly fromDate: Locator;
  readonly toDate: Locator;
  readonly amount: Locator;
  readonly findTransactionsButton: Locator;
  readonly resultsTable: Locator;

  constructor(page: Page) {
    super(page);
    this.accountId = page.locator('select[id="accountId"]');
    this.fromDate = page.locator('input[id="criteria.onDate"]');
    this.toDate = page.locator('input[id="criteria.toDate"]');
    this.amount = page.locator('input[id="criteria.amount"]');
    this.findTransactionsButton = page.locator('button', { hasText: 'Find Transactions' });
    this.resultsTable = page.locator('#transactionTable');
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/findtrans.htm');
  }

  async findTransactions(accountId: string, fromDate: string, toDate: string, amount: string): Promise<void> {
    await this.select(this.accountId, accountId);
    await this.fill(this.fromDate, fromDate);
    await this.fill(this.toDate, toDate);
    await this.fill(this.amount, amount);
    await this.click(this.findTransactionsButton);
  }

  async isResultsVisible(): Promise<boolean> {
    return this.isVisible(this.resultsTable);
  }
}
