import { test, expect,chromium } from '@playwright/test';

test('test', async ({  }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
  await page.goto('https://qa-practice.netlify.app/');
  await page.getByRole('link', { name: 'Ecommerce - Login, Add to' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
  await expect(page.locator('#prooood')).toContainText('SHOPPING CART');
  await expect(page.locator('#prooood')).toContainText('Apple iPhone 12, 128GB, Black');
  await expect(page.locator('#prooood')).toContainText('$905.99');
  await page.getByRole('spinbutton').fill('13');
});