import { test, expect } from "@playwright/test";

const locales = {
  es: {
    title: "Listado de Países",
    description: "Nombres de países localizados según tu idioma",
  },
  fr: {
    title: "Liste des pays",
    description: "Noms des pays localisés selon votre langue",
  },
  en: {
    title: "Country List",
    description: "Localized country names based on your language",
  },
};

test.describe("Language Tests", () => {
  test("Frances", async ({ browser }) => {
    const context = await browser.newContext();

    /*
      Cuando hacés page.goto(...), Playwright crea una nueva página, pero si no usás context.newPage() después de agregar la cookie, 
      esa cookie no se aplica correctamente en la navegación inicial
    */

    //Playwright recomienda usar url para asegurar que la cookie se guarde correctamente
    await context.addCookies([
      {
        name: "locale",
        value: "fr",
        domain: "localhost",
        path: "/",
      },
    ]);
    const page = await context.newPage();
    await page.goto("localhost:3000/internacionalizacion");

    const title = page.getByText(locales["fr"].title, { exact: true });
    const subtitle = page.getByText(
        locales["fr"].description,
      { exact: true }
    );

    await expect(title).toBeVisible();
    await expect(subtitle).toBeVisible();
  });

  test("Español", async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies([
      {
        name: "locale",
        value: "es",
        domain: "localhost",
        path: "/",
      },
    ]);
    const page = await context.newPage();
    await page.goto("localhost:3000/internacionalizacion");

    const title = page.getByText(locales["es"].title, { exact: true });
    const subtitle = page.getByText(
        locales["es"].title,
      { exact: true }
    );

    await expect(title).toBeVisible();
    await expect(subtitle).toBeVisible();
  });

  test("Ingles", async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies([
      {
        name: "locale",
        value: "en",
        domain: "localhost",
        path: "/",
      },
    ]);

    const page = await context.newPage();
    await page.goto("localhost:3000/internacionalizacion");

    const title = page.getByText(locales["en"].title, { exact: true });
    const subtitle = page.getByText(
        locales["en"].description,
      { exact: true }
    );

    await expect(title).toBeVisible();
    await expect(subtitle).toBeVisible();
  });
});
