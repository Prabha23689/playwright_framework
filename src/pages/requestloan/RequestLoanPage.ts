import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class RequestLoanPage extends BasePage {
  readonly loanAmount: Locator;
  readonly downPayment: Locator;
  readonly fromAccount: Locator;
  readonly applyNowButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loanAmount = page.locator('input[id="amount"]');
    this.downPayment = page.locator('input[id="downPayment"]');
    this.fromAccount = page.locator('select[id="fromAccountId"]');
    this.applyNowButton = page.locator('input[value="Apply Now"]');
    this.confirmationMessage = page.locator('#rightPanel .title');
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/requestloan.htm');
  }

  async requestLoan(request: {
    amount: string;
    downPayment: string;
    fromAccountId: string;
  }): Promise<void> {
    await this.fill(this.loanAmount, request.amount);
    await this.fill(this.downPayment, request.downPayment);
    await this.select(this.fromAccount, request.fromAccountId);
    await this.click(this.applyNowButton);
  }

  async getConfirmationText(): Promise<string> {
    return this.getText(this.confirmationMessage);
  }
}
