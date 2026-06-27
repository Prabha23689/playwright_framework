import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class ForgotLoginPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('input[name="customerName"]');
    this.emailInput = page.locator('input[name="customerEmailAddress"]');
    this.submitButton = page.locator('input[value="Send me my login info"]');
    this.successMessage = page.locator('#rightPanel .title');
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/forgotlogin.htm');
  }

  async submitRecovery(name: string, email: string): Promise<void> {
    await this.fill(this.nameInput, name);
    await this.fill(this.emailInput, email);
    await this.click(this.submitButton);
  }

  async getSuccessMessage(): Promise<string> {
    return this.getText(this.successMessage);
  }
}
