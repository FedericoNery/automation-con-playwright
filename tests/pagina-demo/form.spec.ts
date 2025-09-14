import test, { expect } from "@playwright/test";

const url = 'localhost:3000/test'

test.describe('Formularios', () => {
    test('Rellenar formulario a', async ({ page }) => {
        await page.goto(url);
        const nameInput = page.getByPlaceholder('Nombre');
        const emailInput = page.getByPlaceholder('Email');
        await nameInput.fill('Juan Pérez');
        await emailInput.fill('example@example.com')
        
        const submitButton = page.getByRole('button', { name: "Enviar Formulario", exact: true });
        await submitButton.click();

        const outputName = page.getByText("Nombre: Juan Pérez", { exact: true });
        const outputInput = page.getByText('Email: example@example.com', { exact: true });
        await expect(outputName).toBeVisible();
        await expect(outputInput).toBeVisible();
    })

    test('Rellenar formulario b', async ({ page }) => {
        await page.goto(url);
        const nameInput = page.getByLabel('Nombre:');
        const emailInput = page.getByLabel('Email:');

        await nameInput.fill('Juan Pérez');
        await emailInput.fill('example@example.com')

        const submitButton = page.getByRole('button', { name: "Enviar Formulario b", exact: true });
        await submitButton.click();

        const outputName = page.getByText("Nombre: Juan Pérez", { exact: true });
        const outputInput = page.getByText('Email: example@example.com', { exact: true });
        await expect(outputName).toBeVisible();
        await expect(outputInput).toBeVisible();
    })

})