import { test, expect, chromium } from '@playwright/test';

test('test', async ({ }) => {
  const browser = await chromium.launch({ slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://qa-practice.netlify.app/');
  await page.getByRole('link', { name: 'Ecommerce - Login, Add to' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
  await expect(page.locator('.cart-item-title:not(.cart-header)')).toContainText('Apple iPhone 12, 128GB, Black');
  await expect(page.locator('.cart-price.cart-column:not(.cart-header)')).toContainText('$905.99');
  await page.getByRole('button', { name: 'ADD TO CART' }).nth(1).click();
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('12');
  await page.locator('.cart-total-title').click();
  await expect(page.locator('.cart-total')).toContainText('Total $3739.43');
});