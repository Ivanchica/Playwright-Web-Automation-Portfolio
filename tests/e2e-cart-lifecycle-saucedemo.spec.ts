import { test, expect } from '@playwright/test';

test('SauceDemo e2e - Should successfully add and clear items from the cart, and then checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
  
  await expect(page.locator('[data-test="item-2-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Onesie');
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('TestName');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('TestLastName');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('11000');

  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $0.00');

  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await expect(page.locator('[data-test="generate-pdf-order"]')).toBeVisible();
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});