import { chromium, test, expect } from '@playwright/test';

test('Adăugare produse în coș cu slowMo', async () => {
  // Creează un browser cu slow motion de 500ms
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navighează și adaugă produse
  await page.goto('https://qa-practice.netlify.app/');
  await page.getByRole('link', { name: 'Products List - Shop' }).click();
  await page.getByText('Apple iPhone 12, 128GB, Black').click();
  await page.getByText('$905.99').click();
  await page.getByText('Huawei Mate 20 Lite, 64GB,').click();
  await page.getByText('$236.12').click();
  await page.getByText('Samsung Galaxy A32, 128GB,').click();
  await page.getByText('$286.99').click();
  await page.getByText('Apple iPhone 13, 128GB, Blue').click();
  await page.getByText('$918.99').click();
  await page.getByText('Nokia 105, Black').click();
  await page.getByText('$19.99').click();

  // Închide browserul după test
  await browser.close();
});
 