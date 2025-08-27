import { test, expect } from '@playwright/test';

const url = 'https://demoqa.com/broken';

test('Valid image', async ({ page }) => {
  await page.goto(url);

  await page.locator('img')({ src: "/images/Toolsqa.jpg"  })
  await expect(page).toHaveTitle(/Playwright/);
});

test('Broken image', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
