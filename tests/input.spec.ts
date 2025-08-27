import { test, expect } from '@playwright/test';
const url = 'https://demoqa.com/text-box';


test.describe('Input', () => {

  test('Full name', async ({ page }) => {
    await page.goto(url);

    const fullNameInput = await page.getByPlaceholder("Full name");
    await fullNameInput.fill('John Doe');

    await expect(fullNameInput).toBeVisible();
    await expect(fullNameInput).toHaveValue('John Doe');
  });

  test('email', async ({ page }) => {
    await page.goto(url);

    const emailInput = await page.getByPlaceholder("name@example.com");
    await emailInput.fill('fedegnery@gmail.com');

    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveValue('fedegnery@gmail.com');
  });

  test('current address', async ({ page }) => {
    await page.goto(url);

    const currentAddressInput = await page.getByPlaceholder("Current Address");
    await currentAddressInput.fill('Brandsen 787, Buenos Aires, Argentina');

    await expect(currentAddressInput).toBeVisible();
    await expect(currentAddressInput).toHaveValue('Brandsen 787, Buenos Aires, Argentina');
  });

  test('permanent address', async ({ page }) => {
    await page.goto(url);

    const permanentAddressInput = await page.locator('textarea[id="permanentAddress"]');
    await permanentAddressInput.fill('Brandsen 787, Buenos Aires, Argentina');

    await expect(permanentAddressInput).toBeVisible();
    await expect(permanentAddressInput).toHaveValue('Brandsen 787, Buenos Aires, Argentina');
  });


  test('submit', async ({ page }) => {
    await page.goto(url);

    const fullNameValue = 'John Doe';
    const fullNameInput = await page.getByPlaceholder("Full name");
    await fullNameInput.fill(fullNameValue);

    const emailValue = 'fedegnery@gmail.com'
    const emailInput = await page.getByPlaceholder("name@example.com");
    await emailInput.fill(emailValue);

    const addressValue = 'Brandsen 787, Buenos Aires, Argentina';
    const currentAddressInput = await page.getByPlaceholder("Current Address");
    await currentAddressInput.fill(addressValue);

    const permanentAddressInput = await page.locator('textarea[id="permanentAddress"]');
    await permanentAddressInput.fill(addressValue);
    await page.getByText('Submit', {exact: true}).click();

    const paragraphName = await page.locator('p[id="name"]');
    const paragraphEmail = await page.locator('p[id="email"]')
    const paragraphCurrentAddress = await page.locator('p[id="currentAddress"]')
    const paragraphPermanentAddress = await page.locator('p[id="permanentAddress"]')
    await expect(paragraphName.innerText()).toBe(`Name:${fullNameValue}`)
    await expect(paragraphEmail.innerText()).toBe(`Email:${emailValue}`);
    await expect(paragraphCurrentAddress.innerText()).toBe(`Current Address :${addressValue}`);
    await expect(paragraphPermanentAddress.innerText()).toBe(`Permananet Address :${addressValue}`);

  });
});