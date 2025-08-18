import { test, expect } from '@playwright/test';

const url = 'https://demoqa.com/buttons';

test('click me', async ({ page }) => {
  await page.goto(url);

  //Lo ideal sería poder identificarlo por un id, dataTestId o label o texto que contenga.
  //En este caso, se usa el texto exacto.
  await page.getByText('Click Me', {exact: true}).click();

  await expect(page.getByText(/You have done a dynamic click/i)).toBeVisible();
});

test('right click me', async ({ page }) => {
  await page.goto(url);

    //Right click is done by specifying the button option.
  await page.getByText('Right Click Me', {exact: true}).click({button: 'right'});

  await expect(page.getByText(/You have done a right click/i)).toBeVisible();
});

test('double click me', async ({ page }) => {
    await page.goto(url);
    
    //Doble click is done by specifying the clickCount option.
    await page.getByText('Double Click Me', {exact: true}).click({clickCount: 2});

  await expect(page.getByText(/You have done a double click/i)).toBeVisible();
  });