import test, { expect } from "@playwright/test";
const url = 'https://demoqa.com/books';

//Petición HTTP https://demoqa.com/BookStore/v1/Books

test.describe("Book Store", () => {
    test("Assert search filter with words 'G'", async ({ page }) => {
        await page.goto(url);
        const searchBar = page.getByPlaceholder("Type to search");
        await searchBar.click();
        await searchBar.fill("G");
        const results = page.locator('.rt-tr-group');
        const titles = results.locator('.action-buttons span');
        const count = await titles.count();
        expect(count).toBe(6)

        for (let i = 0; i < count; i++) {
            const titleText = await titles.nth(i).textContent();
            expect(titleText?.toLowerCase()).toContain('g');
        }
    })
    test.skip("Assert search filter with words 'Gi'", async ({ page }) => {


    })
    test("Assert search filter with words by name author 'Richard'", async ({ page }) => {
        await page.goto(url);
        const searchBar = page.getByPlaceholder("Type to search");
        await searchBar.click();
        await searchBar.fill("Richard");
        const results = page.locator('.rt-tr-group');
        const authors = results.locator('.rt-td');
        const authorSearched = authors.filter({hasText: "Richard"});
        const count = await authorSearched.count();
        expect(count).toBe(1)
        expect(await authorSearched.textContent()).toContain('Richard E. Silverman')
    })
})