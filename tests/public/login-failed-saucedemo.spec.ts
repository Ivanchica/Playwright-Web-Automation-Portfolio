import { test, expect } from '@playwright/test';

test('Customer login - Sad Path scenario', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const username = process.env.SAUCEDEMO_USERNAME;
  const password = process.env.SAUCEDEMO_PASSWORD_SAD_PATH;

  if (!username || !password) {
    throw new Error('Missing environment variables for login credentials!');
  }

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(password);

  await page.locator('[data-test="login-button"]').click();
  
  await expect(page).toHaveURL(/saucedemo\.com/);
  await expect(page).not.toHaveURL(/inventory\.html/);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('[data-test="error-button"]')).toBeVisible();
});
