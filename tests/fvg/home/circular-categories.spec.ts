import { test, expect } from "@playwright/test";

test("Count circular categories", async ({ page }, testInfo) => {
  await page.goto("https://fravega.com/");

  const isMobile = testInfo.project.name.includes("Mobile");

  if(isMobile) {
    const circularCategories = page.locator('div[data-testid="home-categorias-destacadas-element"]')
    .filter({ visible: true });
    const count = await circularCategories.count();
    expect(count).toBe(20);
  }
  else{
    const listCategories = await page.locator(
      '//*[@id="__next"]/div[2]/div[2]/div/div[1]/div[3]/div[1]/div/ul'
    );
    const count = await listCategories.getByRole("listitem").count();
    await expect(count).toBe(20);
  
    const divGeneral = page.locator('//*[@id="__next"]/div[2]/div[2]/div/div[1]/div[3]/div[1]/div');
    const nextButton = divGeneral.locator('[data-testid="chevron-path"]').last();
    const previewButton = divGeneral.locator('[data-testid="chevron-path"]').first();
  
    await expect(nextButton).toBeVisible();
    await expect(previewButton).toBeHidden();
    await nextButton.click();
  
    await expect(nextButton).toBeHidden();
    await expect(previewButton).toBeVisible();
    await previewButton.click();
  }
});
