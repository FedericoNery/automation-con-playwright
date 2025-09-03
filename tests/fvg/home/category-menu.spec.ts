import { test, expect, Page } from '@playwright/test';

const url = "https://www.fravega.com/"

const dataMenuCategories = {
  sections: [
    /* {
      label: "Categorías",
      //@ts-ignore
      type: "text",
      sections: [{
        type: "submenu",
        label: "TV y Audio",
        title: {
          type: "link",
          href: "/e/categorias/tv-audio-video/",
          label: "TV y Audio",
        },
        sections: [
          {
            label: "TV por marca",
            type: "submenu-head",
            href: "/l/tv-y-video/tv/",
            sections: [
              [
                {
                  label: "Philips",
                  type: "link",
                  href: "/l/tv-y-video/tv/?marcas=philips/",
                },
                {
                  label: "Samsung TV",
                  type: "link",
                  href: "/l/tv-y-video/tv/?marcas=samsung/",
                },
                {
                  label: "LG",
                  type: "link",
                  href: "/l/tv-y-video/tv/?marcas=lg/",
                },
                {
                  label: "TCL",
                  type: "link",
                  href: "/l/tv-y-video/tv/?marcas=tcl/",
                }
              ]
            ]
          },
        ]
      }
      ]
    }, */
/*     {
      label: "Más Vendidos",
      type: "link",
      highlighted: true,
      href: "/e/ofertas/mas-vendidos/",
    }, */
    {
      label: "Compra Internacional",
      type: "link",
      highlighted: false,
      href: "/e/compras-internacionales/",
    },
  ]
}



async function resolveText(section, page: Page) {
  if (section.type === "text") {
    const text = await page.getByText(section.label).first();
    await expect(text).toBeVisible();
  }
}

async function resolveLink(section, page: Page) {
  console.log("ENTRO LINK");
  console.log(section);
  if (section.type === "link") {
    //const link = await page.getByRole('link', { name: section.href }).first();
    const anchor = page.locator(`a[href="${section.href}"]`).first();
    const span = page.locator(`a[href="${section.href}"]>span`, {hasText: section.label}).first();
    console.log(section.href)
    console.log(section.label)
    //await expect(span).toBeVisible();
    console.log("anchor", anchor)

    await expect(anchor).toHaveAttribute('href', section.href);
    if (section.highlighted) {
      await expect(span).toHaveCSS('color', 'rgb(128, 29, 217)');
    } else {
      await expect(span).toHaveCSS('color', 'rgb(0, 0, 0)');
    }
  }
}

async function resolveSubMenu(section, page: Page) {
  if (section.type === "submenu") {
    const text = await page.getByText(section.label).first();
    const link = await page.getByRole('link', { name: section.label }).first();
    await expect(text).toBeVisible();
    await expect(link).toHaveAttribute('href', section.title.href);
  }
}

async function resolveStrategyCategoryMenu(section, page: Page) {
 await resolveText(section, page);
 await resolveLink(section, page);
 await resolveSubMenu(section, page);
}

async function resolveCategoryMenu(sections, page: Page) {
  sections.forEach(async (section) => {
    if (section?.sections) {
      await resolveCategoryMenu(section.sections, page);
    }
    else {
      await resolveStrategyCategoryMenu(section, page);
    }
  });
}




test.describe('Header Menu Categories', () => {
  test('navbar featured', async ({ page }) => {
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    await page.waitForTimeout(3000);
    const buttonCerrar = page.getByRole('button', { name: 'Cerrar' }).first();
    await buttonCerrar.click();
    await resolveCategoryMenu(dataMenuCategories.sections, page);
  });

  test('only mas vendidos', async ({ page }) => {
    await page.goto(url);
    const buttonCerrar = page.getByRole('button', { name: 'Cerrar' }).first();
    await buttonCerrar.click();

    const section = dataMenuCategories.sections[1];
    const anchor = page.locator(`a[href="${section.href}"]`).first();
    const span = page.locator(`a[href="${section.href}"]>span`, {hasText: section.label}).first();
    await expect(anchor).toHaveAttribute('href', section.href);
    if (section.highlighted) {
      await expect(span).toHaveCSS('color', 'rgb(128, 29, 217)');
    } else {
      await expect(span).toHaveCSS('color', 'rgb(0, 0, 0)');
    }
  });
  test('only compra internacional', async ({ page }) => {
    await page.goto(url);
    const buttonCerrar = page.getByRole('button', { name: 'Cerrar' }).first();
    await buttonCerrar.click();

    const section = dataMenuCategories.sections[2];
    const anchor = page.locator(`a[href="${section.href}"]`).first();
    const span = page.locator(`a[href="${section.href}"]>span`, {hasText: section.label}).first();
    await expect(anchor).toHaveAttribute('href', section.href);
    if (section.highlighted) {
      await expect(span).toHaveCSS('color', 'rgb(128, 29, 217)');
    } else {
      await expect(span).toHaveCSS('color', 'rgb(0, 0, 0)');
    }
  });
})




