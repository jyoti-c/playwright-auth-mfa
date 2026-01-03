import { test, expect } from '@playwright/test';
import { time } from 'console';
import * as OTPAuth from 'otpauth';

test('github auth setup with MFA', async ({ page }) => {
  // Guardrails: fail fast if env vars are missing
  if (!process.env.GITHUB_USER ||
      !process.env.GITHUB_PASS ||
      !process.env.GITHUB_MFA_SECRET) {
    throw new Error('Required environment variables are missing');
  }

  // Step 1: Go to GitHub login
  await page.goto('https://github.com/login');

  let username = process.env.GITHUB_USER;
  let password = process.env.GITHUB_PASS;
  let mfaSecret = process.env.GITHUB_MFA_SECRET;

  // Step 2: Username + Password
  await page.locator('#login_field').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('input[type="submit"]').click();

  // Step 3: Generate OTP using shared secret
  const totp = new OTPAuth.TOTP({
    secret: mfaSecret,
    digits: 6,
    period: 30,
  });

  const code = totp.generate();

// Step 4: Enter OTP and verify
const otpInput = page.locator('#app_totp, input[name="otp"]');
await otpInput.waitFor({ timeout: 30000 });
await otpInput.fill(code);

  // Step 5: Verify login succeeded
  await expect(page).toHaveURL(/github\.com/);

  // Step 6: Save authenticated session
  await page.context().storageState({ path: 'auth.json' });
  // sleep for 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));
});
