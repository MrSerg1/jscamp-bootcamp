import { test, expect } from "@playwright/test";

test("Verifies that there is a search input field on the page", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  const searchInput = await page.getByRole("searchbox");
  await expect(searchInput).toBeVisible();
});

test("verifies that the user can type in the search input field", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  const searchInput = await page.getByRole("searchbox");
  await searchInput.fill("JavaScript");
  await page.getByRole("button", { name: "Buscar" }).click();
  const jobCards = await page.locator(".jobs-listings");
  await expect(jobCards).toBeVisible();

  const jobTitles = await jobCards.first().locator("h3").first();
  await expect(jobTitles).toHaveText("Desarrollador de Software Senior");
});

test("verifies that the user can look for a job, click on the result and see the details, then can login and apply for the job", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  const searchInput = await page.getByRole("searchbox");
  await searchInput.fill("JavaScript");
  await page.getByRole("button", { name: "Buscar" }).click();
  await page.getByRole("link", { name: "Ver detalles" }).first().click();
  await page.getByRole("button", { name: "Iniciar Sesión" }).click();
  await page.getByRole("button", { name: "Aplicar" }).click();
  const applyButton = await page.getByRole("button", { name: "Aplicado" });
  await expect(applyButton).toHaveText("Aplicado");
});

test("verifies that the user can filter jobs by location and level", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  await page.getByRole("link", { name: "Empleos" }).click();

  const jobCards = await page.locator(".jobs-listings article");

  await expect(jobCards.first()).toBeVisible();

  await page.locator("#filter-location").selectOption("remoto");
  await expect(jobCards.first()).toBeVisible();

  let count = await jobCards.count();

  for (let i = 0; i < count; i++) {
    await expect(jobCards.nth(i).locator("small")).toContainText("Remoto");
  }

  await page.locator("#filter-experience-level").selectOption("senior");

  await expect(jobCards.first()).toBeVisible();
  let count2 = await jobCards.count();

  for (let i = 0; i < count2; i++) {
    await expect(jobCards.nth(i)).toHaveAttribute("data-nivel", "senior");
  }
});

test('verifies the pagination resutls', async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.getByRole("link", { name: "Empleos" }).click();

  const jobCards = await page.locator(".jobs-listings article");
  await expect(jobCards.first()).toBeVisible();
  const searchInput = await page.getByRole("searchbox");
  await searchInput.fill("Python");
  await page.getByRole("button", { name: "Buscar" }).click();
  await expect(jobCards.first()).toBeVisible();
  const paginationButtons = await page.locator("Pagination");
  await expect(paginationButtons).toBeVisible();

  await paginationButtons.nth(1).click();
}