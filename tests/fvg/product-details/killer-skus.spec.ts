const skus = [
    {
        sku: '502746',
        title: 'Smart TV UHD 4K Samsung 55" UN55DU7000GCZB',
        salePrice: '$859.999',
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


test.describe('Killer Skus', () => {
    test('has price, title and purchase button is available', async ({ page }) => {
        await page.goto(urls[0]);
      
        await expect(page).toHaveTitle(skus[0].title);
        const purchaseButton = page.getByRole('button', {name: 'Comprar'});
        expect(await purchaseButton.isEnabled()).toBe(skus[0].available);
        
        //Acá tenemos el problema de que como utilizamos el mismo componente para mostrar el precio, no sabemos si es el primero o el segundo o tercer elemento, en el cual tenemos que hacer el assert
        const salePrice = page.locator('div[data-test-id="price-wrapper"]>span').first();
        await expect(salePrice).toHaveText(skus[0].salePrice);
    });
});

