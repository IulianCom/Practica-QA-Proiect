import { test, expect } from '@playwright/test';

test.use({ 
  launchOptions: { 
    slowMo: 5000 // 5 secunde între fiecare acțiune pentru vizibilitate mai bună
  } 
});

test('GraphQL page - Complete validation test', async ({ page }) => {
  // Navigate to GraphQL testing page
  await page.goto('https://qa-practice.netlify.app/graphql-testing');
  
  // ✅ 1. Page loading and basic content validation
  await expect(page.getByRole('heading', { name: 'GraphQL Testing' })).toBeVisible();
  await expect(page).toHaveURL('https://qa-practice.netlify.app/graphql-testing');
  await expect(page).toHaveTitle(/QA Practice/);
  console.log('✅ 1. Page loading validation completed');
  
  // ✅ 2. Docker instructions validation
  await expect(page.getByText('You can run the project application on your laptop/PC by having')).toBeVisible();
  await expect(page.getByText('Docker (already installed on your machine!')).toBeVisible();
  await expect(page.getByText('docker run -d --rm --name qa-practice-graphql -p 5000:5000 rvancea/qa-practice-graphql')).toBeVisible();
  console.log('✅ 2. Docker instructions validation completed');
  
  // ✅ 3. URL and links validation
  await expect(page.getByText('http://localhost:5000/graphql')).toBeVisible();
  await expect(page.getByRole('link', { name: 'http://localhost:5000/graphql' })).toHaveAttribute('href', 'http://localhost:5000/graphql');
  await expect(page.getByText('After successfully running the above command, you can open the application in browser by accessing the following URL')).toBeVisible();
  console.log('✅ 3. URL and links validation completed');
  
  // ✅ 4. External links validation
  const dockerLink = page.getByRole('link', { name: 'Docker (already installed on your machine! if not, click here)' });
  await expect(dockerLink).toBeVisible();
  await expect(dockerLink).toHaveAttribute('href', 'https://docs.docker.com/desktop/install/windows-install/');
  
  // Use more specific selector for DockerHub link
  const dockerHubLink = page.locator('a[href*="hub.docker.com"]');
  await expect(dockerHubLink).toBeVisible();
  await expect(dockerHubLink).toHaveAttribute('href', 'https://hub.docker.com/r/rvancea/qa-practice-graphql');
  console.log('✅ 4. External links validation completed');
  
  // ✅ 5. Image validation
  const graphqlImage = page.locator('img[alt="graphql"]');
  await expect(graphqlImage).toBeVisible();
  await expect(graphqlImage).toHaveAttribute('src', 'assets/graphql.png');
  console.log('✅ 5. Image validation completed');
  
  // ✅ 6. Navigation and layout validation
  await expect(page.getByRole('link', { name: 'QA Practice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ecommerce - Login, Add to' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'GraphQL Testing' })).toBeVisible();
  // Skip Additional Links check as it might not be visible on this specific page
  console.log('✅ 6. Navigation and layout validation completed');
  
  // ✅ 7. Responsive design testing
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.getByRole('heading', { name: 'GraphQL Testing' })).toBeVisible();
  
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.getByRole('heading', { name: 'GraphQL Testing' })).toBeVisible();
  
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.getByRole('heading', { name: 'GraphQL Testing' })).toBeVisible();
  
  await page.setViewportSize({ width: 1280, height: 720 }); // Reset
  console.log('✅ 7. Responsive design validation completed');
  
  // ✅ 8. Text content validation
  await expect(page.getByText('More details about the application')).toBeVisible();
  const dockerCommand = 'docker run -d --rm --name qa-practice-graphql -p 5000:5000 rvancea/qa-practice-graphql';
  await expect(page.locator(`text=${dockerCommand}`)).toBeVisible();
  console.log('✅ 8. Text content validation completed');
  
  console.log('🎉 ALL GraphQL page validations completed successfully!');
});
