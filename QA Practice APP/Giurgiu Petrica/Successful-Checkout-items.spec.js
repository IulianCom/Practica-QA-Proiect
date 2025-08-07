import { test, expect } from '@playwright/test';
import { Navigation } from './Functii/Util/navigation.ts';
import { Assertions } from './Functii/Util/assertions.ts';
import { Login } from './Functii/Login/login.ts';
import { Cart }  from './Functii/Util/cart.ts';

test('Successful-Checkout-items', async ({ page }) => {
  // Navigation and Login
  await Navigation.goToLoginPage(page);
  await Login.fillEmail(page, 'admin@admin.com');
  await Assertions.verifyLoginPageHeading(page);
  await Login.fillPassword(page, 'admin123');
  await Login.clickSubmit(page);
  
  // Shopping Cart Actions
  await Cart.addFirstItemToCart(page);
  await Cart.addSecondItemToCart(page);
  await Assertions.verifyShoppingCartPage(page);
  await Cart.proceedToCheckout(page);
  
  // Checkout Form
  const shippingDetails = {
    phone: '1',
    street: '1',
    city: 'London',
    country: 'Albania'
  };
  await Cart.fillCheckoutForm(page, shippingDetails);
  await Cart.submitOrder(page);
  
  // Final Verification
  await Assertions.verifyOrderConfirmation(page);
});