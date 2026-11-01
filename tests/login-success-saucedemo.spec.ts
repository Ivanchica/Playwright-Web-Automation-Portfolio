import { test, expect } from '@playwright/test';

test('User can successfully log in and view dashboard', async ({ page }) => {
  // 1. Navigate to login
  await page.goto('https://www.saucedemo.com/');

  // 2. Fetch credentials safely from the environment
  const username = process.env.SAUCEDEMO_USERNAME;
  const password = process.env.SAUCEDEMO_PASSWORD_HAPPY_PATH;
  // Safety check to fail early
  if (!username || !password) {
    throw new Error('Missing environment variables for login credentials!');
  }

  // 3. Fill credentials
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(password);

  // 4. Click Login
  await page.locator('[data-test="login-button"]').click();
  
  // 5. Assert the happy path outcome
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Swag Labs')).toBeVisible();
});
