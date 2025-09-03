import { test, expect } from '@playwright/test';
const url = 'https://demoqa.com/modal-dialogs';

test.describe('Modal dialogs tests', () => {
  test('Small modal', async ({ page }) => {
    await page.goto(url);
    const smallModalButton = page.getByRole('button', { name: 'Small modal' });
    await smallModalButton.click();

    await expect(page.getByText('Small Modal', {exact: true})).toHaveText('Small Modal');
    await expect(page.getByText('This is a small modal. It has very less content')).toBeVisible();

    const closeButtonModal = page.locator('button[type="button"]>span[aria-hidden="true"]')
    await expect(closeButtonModal).toBeVisible();
    await closeButtonModal.click();
  });
  
  test('Large modal', async ({ page }) => {
    
  });
})


