import { test, expect } from '@playwright/test';
import { Navigation } from './Functii/Util/navigation';
import { Assertions } from './Functii/Util/assertions';
import { Login } from './Functii/Login/login';

test('test', async ({ page }) => {
  // Navigation
  await Navigation.goToLoginPage(page);
  
  // Assertions
  await Assertions.verifyLoginPageHeading(page);
  await Navigation.verifyURL(page, 'https://qa-practice.netlify.app/auth_ecommerce');
  
  // Login
  await Login.performLogin(page, 'admin@admin.com', 'admin123');
  
  // Final assertion
  await Assertions.verifyLoggedIn(page);
});