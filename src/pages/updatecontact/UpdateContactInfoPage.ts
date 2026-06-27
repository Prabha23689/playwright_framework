import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base/BasePage';

export class UpdateContactInfoPage extends BasePage {
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly updateProfileButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.address = page.locator('input[id="customer.address.street"]');
    this.city = page.locator('input[id="customer.address.city"]');
    this.state = page.locator('input[id="customer.address.state"]');
    this.zipCode = page.locator('input[id="customer.address.zipCode"]');
    this.phone = page.locator('input[id="customer.phoneNumber"]');
    this.updateProfileButton = page.locator('input[value="Update Profile"]');
    this.confirmationMessage = page.locator('#rightPanel .title');
  }

  async navigate(): Promise<void> {
    await this.goto('/parabank/updatecontact.htm');
  }

  async updateContactInfo(contact: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  }): Promise<void> {
    await this.fill(this.address, contact.address);
    await this.fill(this.city, contact.city);
    await this.fill(this.state, contact.state);
    await this.fill(this.zipCode, contact.zipCode);
    await this.fill(this.phone, contact.phone);
    await this.click(this.updateProfileButton);
  }

  async getConfirmationText(): Promise<string> {
    return this.getText(this.confirmationMessage);
  }
}
