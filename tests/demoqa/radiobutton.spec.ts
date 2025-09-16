import { test, expect } from '@playwright/test';

const url = 'https://demoqa.com/radio-button';

test.describe('Radio button', () => {

  test('Yes', async ({ page, browserName }) => {
    await page.goto(url);
    //Buscas el input por XPATH
    //Si el dev agrega un div mas, se rompe
    //const inputYes = page.locator('//*[@id="app"]/div/div/div/div[2]/div[2]/div[2]');

    //Buscas todos los ancestros del input con id yesRadio y seleccionas el primero
    //const inputYes = page.locator('//input[@id="yesRadio"]/ancestor::div[1]');

    const inputYes = page.locator('//*[@id="yesRadio"]/ancestor::div[1]');

    //input[@name=\"installmentsFilter\"]/ancestor::label[1]
    await inputYes.click();
    
    
    /* const inputYes = await page.getByRole('radio', { name: 'Yes' });
    await inputYes.check(); */
    
    //const spanSuccess = page.locator('span[class="text-success"]');
    //const spanSuccess = page.locator('//*[@id="app"]/div/div/div/div[2]/div[2]/p/span');
    //const spanSuccess = page.locator('span.text-success', { hasText: 'Yes' });
    //const spanSuccess = page.locator('//span[@class="text-success" and text()="Yes"]');

    let spanSuccess;

    if (browserName === 'chromium') {
      // Selector específico para Chromium
      spanSuccess = page.locator('span.text-success');
    } else {
      // Selector más robusto
      spanSuccess = page.getByText('Yes', { exact: true });
    }

    await expect(spanSuccess).toHaveText("Yes");
  });
  
  test('Impressive', async ({ page }) => {
    await page.goto(url);
    const inputImpressive = page.locator('//input[@id="impressiveRadio"]/ancestor::div[1]');
    await inputImpressive.click();

    const spanSuccess = page.locator('//*[@id="app"]/div/div/div/div[2]/div[2]/p/span');
    await expect(spanSuccess).toHaveText("Impressive");

  });
  
  test('No', async ({ page }) => {
    await page.goto(url);
    const inputNo = page.locator('//input[@id="noRadio"]');
    await expect(inputNo).toBeDisabled();
  });
})
