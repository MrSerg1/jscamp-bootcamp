import { test, expect } from '@playwright/test'

test('Verifies that there is a search input field on the page', async ({ page }) => {
    await page.goto('http://localhost:5173')
    const searchInput = await page.getByRole('searchbox')
    await expect(searchInput).toBeVisible()
})

test('verifies that the user can type in the search input field', async ({ page }) => {
    await page.goto('http://localhost:5173')
    const searchInput = await page.getByRole('searchbox')
    await searchInput.fill('React')
    await page.getByRole('button', { name: 'Buscar' }).click()
    const jobCards = await page.locator('.jobs-listings')
    await expect(jobCards).toBeVisible()
    
    const jobTitles = await jobCards.first().locator('h3').first()
    await expect(jobTitles).toHaveText('Desarrollador de Software Senior')
})