import { defineConfig, devices } from '@playwright/test';
import { loadEnvironment, env } from './src/config/envConfig';

loadEnvironment();

const browserArgs = env.BROWSER_ARGS ? env.BROWSER_ARGS.split(',') : [];

export default defineConfig({
  testDir: './tests',
  outputDir: './reports/playwright',
  globalTimeout: parseInt(env.GLOBAL_TIMEOUT ?? '900000', 10),
  timeout: parseInt(env.TEST_TIMEOUT ?? '60000', 10),
  expect: {
    timeout: parseInt(env.EXPECT_TIMEOUT ?? '10000', 10),
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? parseInt(env.CI_RETRIES ?? '2', 10) : parseInt(env.LOCAL_RETRIES ?? '0', 10),
  workers: process.env.CI ? parseInt(env.CI_WORKERS ?? '2', 10) : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/html-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit/results.xml' }],
    ['json', { outputFile: 'test-results/json/report.json' }],
  ],
  use: {
    actionTimeout: parseInt(env.ACTION_TIMEOUT ?? '30000', 10),
    baseURL: env.BASE_URL ?? 'https://parabank.parasoft.com',
    headless: env.HEADLESS !== 'false',
    viewport: {
      width: parseInt(env.VIEWPORT_WIDTH ?? '1280', 10),
      height: parseInt(env.VIEWPORT_HEIGHT ?? '720', 10),
    },
    trace: (env.TRACE as any) ?? 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: env.IGNORE_HTTPS === 'true',
    locale: env.LOCALE ?? 'en-US',
    timezoneId: env.TIMEZONE ?? 'America/New_York',
    permissions: env.PERMISSIONS ? env.PERMISSIONS.split(',') : [],
    launchOptions: {
      slowMo: parseInt(env.SLOW_MO ?? '0', 10),
      args: [],
      proxy: env.PROXY ? { server: env.PROXY } : undefined,
    },
    storageState: env.STORAGE_STATE || undefined,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], launchOptions: { args: browserArgs } },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge', launchOptions: { args: browserArgs } },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', launchOptions: { args: browserArgs } },
    },
    {
      name: 'api',
      use: {
        baseURL: env.BASE_URL,
      },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
