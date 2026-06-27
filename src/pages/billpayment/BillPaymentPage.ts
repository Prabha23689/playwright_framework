import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class BillPaymentPage extends BasePage {
  readonly payeeName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly accountNumber: Locator;
  readonly verifyAccount: Locator;
  readonly amount: Locator;
  readonly fromAccount: Locator;
  readonly sendPaymentButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.payeeName = page.locator('input[name="payee.name"]');
    this.address = page.locator('input[name="payee.address.street"]');
    this.city = page.locator('input[name="payee.address.city"]');
    this.state = page.locator('input[name="payee.address.state"]');
    this.zipCode = page.locator('input[name="payee.address.zipCode"]');
    this.phone = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumber = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccount = page.locator('input[name="verifyAccount"]');
    this.amount = page.locator('input[name="amount"]');
    this.fromAccount = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.locator('input[value="Send Payment"]');
    this.confirmationMessage = page.locator('#rightPanel .title');
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/billpay.htm');
  }

  async payBill(payment: {
    payeeName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    accountNumber: string;
    verifyAccount: string;
    amount: string;
    fromAccountId: string;
  }): Promise<void> {
    await this.fill(this.payeeName, payment.payeeName);
    await this.fill(this.address, payment.address);
    await this.fill(this.city, payment.city);
    await this.fill(this.state, payment.state);
    await this.fill(this.zipCode, payment.zipCode);
    await this.fill(this.phone, payment.phone);
    await this.fill(this.accountNumber, payment.accountNumber);
    await this.fill(this.verifyAccount, payment.verifyAccount);
    await this.fill(this.amount, payment.amount);
    await this.select(this.fromAccount, payment.fromAccountId);
    await this.click(this.sendPaymentButton);
  }

  async getConfirmationText(): Promise<string> {
    return this.getText(this.confirmationMessage);
  }
}
