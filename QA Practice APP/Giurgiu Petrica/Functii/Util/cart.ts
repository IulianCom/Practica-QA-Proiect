import { Page } from '@playwright/test';

/**
 * Interface for shipping details
 */
export interface ShippingDetails {
  phone: string;
  street: string;
  city: string;
  country: string;
}

/**
 * Cart and checkout helper functions
 */
export class Cart {
  /**
   * Add the first item to cart
   * @param page - The Playwright page object
   */
  static async addFirstItemToCart(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
  }

  /**
   * Add the second item to cart
   * @param page - The Playwright page object
   */
  static async addSecondItemToCart(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'ADD TO CART' }).nth(1).click();
  }

  /**
   * Add multiple items to cart
   * @param page - The Playwright page object
   * @param numberOfItems - Number of items to add (default: 2)
   */
  static async addMultipleItemsToCart(page: Page, numberOfItems: number = 2): Promise<void> {
    for (let i = 0; i < numberOfItems; i++) {
      await page.getByRole('button', { name: 'ADD TO CART' }).nth(i).click();
    }
  }

  /**
   * Proceed to checkout
   * @param page - The Playwright page object
   */
  static async proceedToCheckout(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
  }

  /**
   * Fill checkout form with shipping details
   * @param page - The Playwright page object
   * @param details - Shipping details object
   */
  static async fillCheckoutForm(page: Page, details: ShippingDetails): Promise<void> {
    await page.getByRole('textbox', { name: 'Enter phone number' }).click();
    await page.getByRole('textbox', { name: 'Enter phone number' }).fill(details.phone);
    
    await page.getByRole('textbox', { name: 'Little Streets' }).click();
    await page.getByRole('textbox', { name: 'Little Streets' }).fill(details.street);
    
    await page.getByRole('textbox', { name: 'London' }).click();
    await page.getByRole('textbox', { name: 'London' }).fill(details.city);
    
    await page.locator('#countries_dropdown_menu').selectOption(details.country);
  }

  /**
   * Submit the order
   * @param page - The Playwright page object
   */
  static async submitOrder(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'Submit Order' }).click();
  }
}
