import { Page, expect } from '@playwright/test';

/**
 * Assertion helper functions
 */
export class Assertions {
  /**
   * Verify that the login page heading is visible
   * @param page - The Playwright page object
   */
  static async verifyLoginPageHeading(page: Page): Promise<void> {
    await expect(page.getByRole('heading', { name: 'Login - Shop' })).toBeVisible();
  }

  /**
   * Verify that the user is logged in by checking the navigation menu
   * @param page - The Playwright page object
   */
  static async verifyLoggedIn(page: Page): Promise<void> {
    await expect(page.getByText('Home Contact Log Out Shipping')).toBeVisible();
  }

  /**
   * Verify that the shopping cart page is visible
   * @param page - The Playwright page object
   */
  static async verifyShoppingCartPage(page: Page): Promise<void> {
    await expect(page.getByText('SHOPPING CART ITEM PRICE')).toBeVisible();
  }

  /**
   * Verify order confirmation
   * @param page - The Playwright page object
   * @param expectedAmount - The expected order amount (default: '$1142')
   */
  static async verifyOrderConfirmation(page: Page, expectedAmount: string = '$1142'): Promise<void> {
    await expect(page.getByText(`Congrats! Your order of ${expectedAmount}`)).toBeVisible();
  }
}
