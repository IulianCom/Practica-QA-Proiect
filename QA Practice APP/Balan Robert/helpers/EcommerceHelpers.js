import { expect } from '@playwright/test';

export class EcommerceHelpers {
  constructor(page) {
    this.page = page;
  }

  async navigateToEcommerce() {
    await this.page.goto('https://qa-practice.netlify.app/');
    await this.page.getByRole('link', { name: 'Ecommerce - Login, Add to' }).click();
  }

  async verifyLoginForm() {
    await expect(this.page.getByText('Email', { exact: true })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Email' })).toBeEmpty();
    await expect(this.page.getByText('Password', { exact: true })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  }

  async login(email, password) {
    await this.page.getByRole('textbox', { name: 'Email' }).click();
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async addProductToCart() {
    await expect(this.page.locator('#prooood')).toContainText('Apple iPhone 12, 128GB, Black $905.99 ADD TO CART');
    await expect(this.page.getByRole('button', { name: 'ADD TO CART' }).first()).toBeVisible();
    await this.page.getByRole('button', { name: 'ADD TO CART' }).first().click();
    
    // Wait for cart to update
    await this.page.waitForTimeout(2000);
  }

  async proceedToCheckout() {
    await expect(this.page.locator('#prooood')).toContainText('PROCEED TO CHECKOUT');
    await this.page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
  }

  async verifyCheckoutForm() {
    await expect(this.page.locator('#shippingForm div').filter({ hasText: 'Phone number *' })).toBeVisible();
    await expect(this.page.locator('#shippingForm div').filter({ hasText: 'Street *' })).toBeVisible();
    await expect(this.page.locator('#shippingForm div').filter({ hasText: 'City *' })).toBeVisible();
    await expect(this.page.getByText('Country * Select a country')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Submit Order' })).toBeVisible();
  }

  async testEmptyFieldValidations() {
    // Test 1: Fill partial form and try to submit - missing phone number
    await this.page.getByRole('textbox', { name: 'Little Streets' }).click();
    await this.page.getByRole('textbox', { name: 'Little Streets' }).fill('123 Test Street');
    await this.page.getByRole('textbox', { name: 'London' }).click();
    await this.page.getByRole('textbox', { name: 'London' }).fill('Test City');
    await this.page.locator('#countries_dropdown_menu').selectOption('Australia');
    await this.page.getByRole('button', { name: 'Submit Order' }).click();
    
    // Add phone number and test empty street field
    await this.page.getByRole('textbox', { name: 'Enter phone number' }).click();
    await this.page.getByRole('textbox', { name: 'Enter phone number' }).fill('12345');
    await this.page.getByRole('textbox', { name: 'Little Streets' }).click();
    await this.page.getByRole('textbox', { name: 'Little Streets' }).fill('');
    await this.page.getByRole('button', { name: 'Submit Order' }).click();
    
    // Fix street and test empty city field
    await this.page.getByRole('textbox', { name: 'Little Streets' }).fill('123 Test Street');
    await this.page.getByRole('textbox', { name: 'London' }).click();
    await this.page.getByRole('textbox', { name: 'London' }).fill('');
    await this.page.getByRole('button', { name: 'Submit Order' }).click();
    
    // Fix city and test empty country
    await this.page.getByRole('textbox', { name: 'London' }).fill('Test City');
    await this.page.locator('#countries_dropdown_menu').selectOption('Select a country...');
    await this.page.getByRole('button', { name: 'Submit Order' }).click();
    
    // Fill all required fields and submit successfully
    await this.page.locator('#countries_dropdown_menu').selectOption('Australia');
    await this.page.getByRole('button', { name: 'Submit Order' }).click();
  }

  async logout() {
    await expect(this.page.locator('#logout')).toContainText('Log Out');
    await this.page.getByRole('link', { name: 'Log Out' }).click();
  }

  // Helper functions for Remove items from cart test
  async verifyProductInCart() {
    await expect(this.page.locator('#prooood')).toContainText('SHOPPING CART');
    await expect(this.page.locator('#prooood')).toContainText('Apple iPhone 12, 128GB, Black');
    await expect(this.page.getByRole('button', { name: 'REMOVE' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'REMOVE' })).toHaveCount(1);
  }

  async removeProductFromCart() {
    await this.page.getByRole('button', { name: 'REMOVE' }).click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByRole('button', { name: 'REMOVE' })).toHaveCount(0);
  }
}
