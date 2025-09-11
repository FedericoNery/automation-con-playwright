import { test, expect } from '@playwright/test';

const url = 'https://demoqa.com/broken';

test('Valid image', async ({ page }) => {
  await page.goto(url);

  //const validImage = page.locator('img[src="/images/Toolsqa.jpg]"')
  //TUVE QUE USAR EL XPATH PORQUE NO ME ANDABA EL LOCATOR CON EL SRC
  const validImage = page.locator('//*[@id="app"]/div/div/div/div[2]/div[2]/img[1]')
  
  await expect(validImage).toBeVisible();
});

//HABRIA QUE HACER UN TEST QUE EFECTIVAMENTE TENGA UNA IMAGEN ROTA PARA QUE TENGA SENTIDO ESTE TEST
//ALGO ASI COMO QUE EL ANCHO DE LA IMAGEN SEA 0 o algún valor que indique que la imagen no se cargo bien.
test.skip('Broken image', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
