import { test, expect } from '@playwright/test';

// * generated with Codegen *
test('should successfully add and clear items from the cart', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/');
  await page.getByRole('link', { name: 'Catalog' }).click();
  await page.getByRole('link', { name: 'Black heels Black heels £' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.locator('#cart-target-desktop')).toContainText('(2)');
  await page.getByRole('link', { name: 'Check Out' }).click();
  await expect(page.locator('#cart #updates_611942549')).toHaveValue('2');
  await expect(page.locator('#cart').getByText('£90.00', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'x' }).click();
  await expect(page.locator('#cart')).toContainText('It appears that your cart is currently empty! Continue Shopping.');
  await expect(page.getByText('It appears that your cart is')).toBeVisible();
});