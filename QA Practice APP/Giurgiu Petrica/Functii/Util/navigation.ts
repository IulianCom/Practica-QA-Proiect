import { Page, expect } from '@playwright/test';

/**
 * Navigation helper functions
 */
export class Navigation {
  /**
   * Navigate to the login page
   * @param page - The Playwright page object
   */
  static async goToLoginPage(page: Page): Promise<void> {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');
  }

  /**
   * Verify we are on the correct URL
   * @param page - The Playwright page object
   * @param expectedUrl - The expected URL to verify
   */
  static async verifyURL(page: Page, expectedUrl: string): Promise<void> {
    await expect(page).toHaveURL(expectedUrl);
  }
}
