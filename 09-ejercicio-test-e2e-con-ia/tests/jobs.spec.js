import { test, expect } from '@playwright/test'

test('Verifies that there is a search input field on the page', async ({ page }) => {
    await page.goto('http://localhost:5173')
    const searchInput = await page.getByRole('searchbox')
    await expect(searchInput).toBeVisible()
})