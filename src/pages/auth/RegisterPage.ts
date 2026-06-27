import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class RegisterPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('input[id="customer.firstName"]');
    this.lastName = page.locator('input[id="customer.lastName"]');
    this.address = page.locator('input[id="customer.address.street"]');
    this.city = page.locator('input[id="customer.address.city"]');
    this.state = page.locator('input[id="customer.address.state"]');
    this.zipCode = page.locator('input[id="customer.address.zipCode"]');
    this.phone = page.locator('input[id="customer.phoneNumber"]');
    this.ssn = page.locator('input[id="customer.ssn"]');
    this.username = page.locator('input[id="customer.username"]');
    this.password = page.locator('input[id="customer.password"]');
    this.confirmPassword = page.locator('input[id="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
    this.successMessage = page.locator('#rightPanel .title');
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/register.htm');
  }

  async register(user: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
  }): Promise<void> {
    await this.fill(this.firstName, user.firstName);
    await this.fill(this.lastName, user.lastName);
    await this.fill(this.address, user.address);
    await this.fill(this.city, user.city);
    await this.fill(this.state, user.state);
    await this.fill(this.zipCode, user.zipCode);
    await this.fill(this.phone, user.phone);
    await this.fill(this.ssn, user.ssn);
    await this.fill(this.username, user.username);
    await this.fill(this.password, user.password);
    await this.fill(this.confirmPassword, user.password);
    await this.click(this.registerButton);
  }

  async getSuccessMessage(): Promise<string> {
    return this.getText(this.successMessage);
  }
}
