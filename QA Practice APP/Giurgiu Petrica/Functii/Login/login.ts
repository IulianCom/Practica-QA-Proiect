import { Page } from '@playwright/test';

/**
 * Login helper functions
 */
export class Login {
  /**
   * Perform complete login with email and password
   * @param page - The Playwright page object
   * @param email - The email address to use for login
   * @param password - The password to use for login
   */
  static async performLogin(page: Page, email: string, password: string): Promise<void> {
    await this.fillEmail(page, email);
    await this.fillPassword(page, password);
    await this.clickSubmit(page);
  }

  /**
   * Fill the email field
   * @param page - The Playwright page object
   * @param email - The email address to fill
   */
  static async fillEmail(page: Page, email: string): Promise<void> {
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
  }

  /**
   * Fill the password field
   * @param page - The Playwright page object
   * @param password - The password to fill
   */
  static async fillPassword(page: Page, password: string): Promise<void> {
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  /**
   * Click the submit button
   * @param page - The Playwright page object
   */
  static async clickSubmit(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'Submit' }).click();
  }
}
