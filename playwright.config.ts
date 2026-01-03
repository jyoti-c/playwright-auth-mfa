import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://github.com',
    trace: 'on-first-retry',
  },

  projects: [
    {
      // 🔐 Auth setup project (runs first)
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      workers: 1,
    },
    {
      // 🌐 Normal tests reuse logged-in state
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        storageState: 'auth.json',
      },
    },
  ],
});
