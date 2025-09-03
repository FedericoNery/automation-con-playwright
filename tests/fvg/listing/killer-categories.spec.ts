const baseUrl = 'https://fravega.com'
const listados = [
    { 
        url: '/l/celulares/celulares-liberados',
        title: 'Celulares Liberados'
    },
    { 
        url: '/l/lavado/',
        title: 'Lavado'
    },
    { 
        url: '/l/tv-y-video/tv/',
        title: 'Tv'
    },
    { 
        url: '/l/heladeras-freezers-y-cavas/',
        title: 'Heladeras Freezers Y Cavas'
    },
    { 
        url: '/l/hogar/colchones-y-sommiers/',
        title: 'Colchones Y Sommiers'
    },
    { 
        url: '/l/pequenos-electrodomesticos/cocina/',
        title: 'Cocina'
    },
    { 
        url: '/l/cocina/',
        title: 'Cocina'
    },
    { 
        url: '/l/pequenos-electrodomesticos/cocina/freidoras/',
        title: 'Freidoras'
    },
    { 
        url: '/l/informatica/notebooks/',
        title: 'Notebooks'
    },
    { 
        url: '/l/climatizacion/',
        title: 'Climatizacion'
    }
]


import { test, expect } from '@playwright/test';

test.describe('Killer Categories', () => {
    test('Access to all listing', async ({ page }) => {
        for (const listado of listados) {
            await page.goto(baseUrl + listado.url, {waitUntil: 'domcontentloaded'});
            const textH1 = await page.getByRole('heading', { level: 1 }).innerText();
            await expect(textH1).toBe(listado.title);
            // const productsList = page.getByRole('list');
            // const countedElements = await productsList.count()
            // await expect(countedElements).toBeGreaterThan(12);
            //ALGO PARA CORROBORAR EL PAGINADO
        }
    });

    test('Access to one url', async ({ page }) => {
            await page.goto(baseUrl + listados[0].url, {waitUntil: 'domcontentloaded'});
            const textH1 = await page.getByRole('heading', { level: 1 }).innerText();
            await expect(textH1).toBe(listados[0].title);
            const productsList = page.getByRole('list');
            const countedElements = await productsList.count()
            console.log(countedElements)
            //VER SI ESTAMOS CONTANDO REALMENTE LOS PRODUCTOS
            await expect(countedElements).toBeGreaterThan(12);
            //LO IDEAL EN ESTE CASO SERIA HACER UN REQUEST A LA API PARA VERIFICAR QUE LA CANTIDAD DE PRODUCTOS SEA LA MISMA
            //ALGO PARA CORROBORAR EL PAGINADO
    });
})
