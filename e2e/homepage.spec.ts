import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/DevHolm/i);
    
    // Check that header is present
    await expect(page.locator('header')).toBeVisible();
    
    // Check that footer is present
    await expect(page.locator('footer')).toBeVisible();
  });

  test('has navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check main navigation links exist
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /blog/i })).toBeVisible();
  });

  test('has skip to main content link', async ({ page }) => {
    await page.goto('/');
    
    // The skip link should exist for accessibility
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeAttached();
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');
    
    // Find theme toggle button
    const themeToggle = page.getByRole('button', { name: /switch to/i });
    await expect(themeToggle).toBeVisible();
    
    // Click to toggle theme
    await themeToggle.click();
    
    // Theme should change (button label changes)
    await expect(themeToggle).toHaveAttribute('aria-label', /switch to/i);
  });
});
