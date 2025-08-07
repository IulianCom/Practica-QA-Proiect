import { test, expect } from '@playwright/test';
import { EcommerceHelpers } from './helpers/EcommerceHelpers.js';

test.use({ 
  launchOptions: { 
    slowMo: 2000 // 2 secunde între fiecare acțiune (mai lent pentru a se înțelege)
  } 
});

test('Check empty fields validation in checkout form', async ({ page }) => {
  // Set test timeout to 120 seconds (mai mult timp pentru slowMo mai mare)
  test.setTimeout(120000);
  
  const helpers = new EcommerceHelpers(page);
  
  // Login and add product to cart
  await helpers.navigateToEcommerce();
  await helpers.verifyLoginForm();
  await helpers.login('admin@admin.com', 'admin123');
  await helpers.addProductToCart();
  await helpers.proceedToCheckout();
  
  // Verify checkout form fields are visible
  await helpers.verifyCheckoutForm();
  
  // Test empty field validations
  await helpers.testEmptyFieldValidations();
  
  // Logout
  await helpers.logout();
});