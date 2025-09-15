const skus = [
    {
        sku: '502746',
        title: 'Smart TV UHD 4K Samsung 55" UN55DU7000GCZB',
        salePrice: '$719.999',
        available: true,
    },
    {   sku: '342559',
        title: 'Consola Sony PlayStation 5 PS5 con ASTRO BOT y Gran Turismo 7 Standar Bundle 2',
        salePrice: '$1.399.999',
        available: true,
    },
]

const urls = skus.map(product => `https://fravega.com/p/aaaa-${product.sku}`)

import { test, expect } from '@playwright/test';


test("mock purchase button response", async ({ page }) => {
  // Intercepta la ruta de la API en GraphQL
  await page.route('https://www.fravega.com/api/v1', async route => {
    const request = route.request();
    const postData = request.postDataJSON();

    // Filtrado por la query que se ejecuta
    if (postData.operationName === 'availability_Shopping') {
      const mockedResponse = {
        "data": {
            "availability": {
                "immediatePickup": false,
                "deferredPickup": false,
                "homeDelivery": false,
                "__typename": "AvailabilityType"
            }
        },
      };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedResponse),
      });
    } else {
      // El resto de las queries se ejecutan con normalidad
      await route.continue();
    }
  });

    await page.goto(urls[0]);
    await expect(page).toHaveTitle(skus[0].title);
    const purchaseButton = page.getByRole('button', {name: 'Comprar'}).first();
    //data-test-id="price-wrapper"
    expect(await purchaseButton.isEnabled()).toBe(skus[0].available);
    await purchaseButton.click()
    const infoProductNotAvailable = page.getByText("En este momento no es posible avanzar con la compra de este producto.")
    await expect(infoProductNotAvailable).toBeVisible()
  });