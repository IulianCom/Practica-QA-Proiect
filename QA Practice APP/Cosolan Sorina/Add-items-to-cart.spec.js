import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.orangehrm.com/');
  await page.getByRole('button', { name: 'Start Your 30 Day Free Trial' }).click();
});