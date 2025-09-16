import { test, expect } from '@playwright/test';
const url = 'https://demoqa.com/text-box';


test.describe('Input', () => {

  test('Full name', async ({ page }) => {
    await page.goto(url);

    const fullNameInput = page.getByPlaceholder("Full name");
    await fullNameInput.fill('John Doe');

    await expect(fullNameInput).toBeVisible();
    await expect(fullNameInput).toHaveValue('John Doe');
  });

  test('email', async ({ page }) => {
    await page.goto(url);

    const emailInput = page.getByPlaceholder("name@example.com");
    await emailInput.fill('fedegnery@gmail.com');

    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveValue('fedegnery@gmail.com');
  });

  test('current address', async ({ page }) => {
    await page.goto(url);

    const currentAddressInput = page.getByPlaceholder("Current Address");
    await currentAddressInput.fill('Brandsen 787, Buenos Aires, Argentina');

    await expect(currentAddressInput).toBeVisible();
    await expect(currentAddressInput).toHaveValue('Brandsen 787, Buenos Aires, Argentina');
  });

  test('permanent address', async ({ page }) => {
    await page.goto(url);

    const permanentAddressInput = page.locator('textarea[id="permanentAddress"]');
    await permanentAddressInput.fill('Brandsen 787, Buenos Aires, Argentina');

    await expect(permanentAddressInput).toBeVisible();
    await expect(permanentAddressInput).toHaveValue('Brandsen 787, Buenos Aires, Argentina');
  });


  test('submit', async ({ page }) => {
    await page.goto(url);

    const fullNameValue = 'John Doe';
    const fullNameInput = page.getByPlaceholder("Full name");
    await fullNameInput.fill(fullNameValue);

    const emailValue = 'fedegnery@gmail.com'
    const emailInput = page.getByPlaceholder("name@example.com");
    await emailInput.fill(emailValue);

    const addressValue = 'Brandsen 787, Buenos Aires, Argentina';
    const currentAddressInput = page.getByPlaceholder("Current Address");
    await currentAddressInput.fill(addressValue);

    const permanentAddressInput = page.locator('textarea[id="permanentAddress"]');
    await permanentAddressInput.fill(addressValue);
    await page.getByText('Submit', {exact: true}).click();
    
    const paragraphName = page.locator('p[id="name"]');
    const paragraphEmail = page.locator('p[id="email"]')
    const paragraphCurrentAddress = page.locator('p[id="currentAddress"]')
    const paragraphPermanentAddress = page.locator('p[id="permanentAddress"]')
    expect(await paragraphName.innerText()).toBe(`Name:${fullNameValue}`)
    expect(await paragraphEmail.innerText()).toBe(`Email:${emailValue}`);
    expect(await paragraphCurrentAddress.innerText()).toBe(`Current Address :${addressValue}`);
    expect(await paragraphPermanentAddress.innerText()).toBe(`Permananet Address :${addressValue}`);

  });
});