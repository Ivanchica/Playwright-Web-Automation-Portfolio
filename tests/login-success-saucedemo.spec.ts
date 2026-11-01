import { test, expect } from '@playwright/test';

test('User can successfully log in and view dashboard', async ({ page }) => {
  // 1. Navigate to login
  await page.goto('https://www.saucedemo.com/');
  
  // 2. Fill credentials using safe environment variables
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(process.env.SAUCEDEMO_USER_NAME!);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(process.env.SAUCEDEMO_USER_PASSWORD_HAPPY_PATH!);

  // 3. Click Login
  await page.locator('[data-test="login-button"]').click();
  
  // 4. Assert the happy path outcome
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Swag Labs')).toBeVisible();
});
