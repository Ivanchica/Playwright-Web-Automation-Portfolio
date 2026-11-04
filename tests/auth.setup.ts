import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(process.env.SAUCEDEMO_USERNAME!);
  await page.locator('[data-test="password"]').fill(process.env.SAUCEDEMO_PASSWORD_HAPPY_PATH!);
  await page.locator('[data-test="login-button"]').click();
  // Wait until the page receives the cookies.
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Swag Labs')).toBeVisible();
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
