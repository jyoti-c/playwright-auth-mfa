import { test, expect } from '@playwright/test';

test('user is already logged in', async ({ page }) => {
  // Go directly to GitHub homepage
  await page.goto('/');

  // GitHub shows avatar button only when logged in
  const avatarButton = page.locator('img.avatar.circle');

  await expect(avatarButton).toBeVisible();

  // Optional: open the menu to make it obvious on video
  await avatarButton.click();

  await expect(
    page.locator('text=Your profile')
  ).toBeVisible();
});
