import { test, expect } from '@playwright/test';

test.use({ 
  launchOptions: { 
    slowMo: 1000 // 1 secundă între fiecare acțiune
  } 
});

test('Remove items from cart - Add 1 product and remove it', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://qa-practice.netlify.app/');
  await page.getByRole('link', { name: 'Ecommerce - Login, Add to' }).click();
  
  // Verify login form elements
  await expect(page.getByText('Email', { exact: true })).toBeVisible();
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  
  // Login with valid credentials
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Verify products are displayed
  await expect(page.locator('#prooood')).toContainText('Apple iPhone 12, 128GB, Black $905.99 ADD TO CART');
  
  // Add product (Apple iPhone 12) to cart
  await expect(page.getByRole('button', { name: 'ADD TO CART' }).first()).toBeVisible();
  await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
  
  // Wait a moment for the cart to update
  await page.waitForTimeout(2000);
  
  // Verify product is in cart - check for shopping cart section
  await expect(page.locator('#prooood')).toContainText('SHOPPING CART');
  
  // Verify the specific product appears in cart
  await expect(page.locator('#prooood')).toContainText('Apple iPhone 12, 128GB, Black');
  
  // Verify REMOVE button is present
  await expect(page.getByRole('button', { name: 'REMOVE' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'REMOVE' })).toHaveCount(1);
  
  // Remove product from cart
  await page.getByRole('button', { name: 'REMOVE' }).click();
  
  // Wait for cart to update after removal
  await page.waitForTimeout(1000);
  
  // Verify no REMOVE buttons remain (cart should be empty)
  await expect(page.getByRole('button', { name: 'REMOVE' })).toHaveCount(0);
  
  // Logout
  await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  await expect(page.locator('#logout')).toContainText('Log Out');
  await page.getByRole('link', { name: 'Log Out' }).click();
});