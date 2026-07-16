import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'

/**
 * Prices QC Playwright config — run from this folder:
 *   npx playwright test test/ --workers=1 --headed
 *
 * Artifacts: ./test-results/ and ./playwright-report/
 * Vite/dev server is started from the repo root (webServer.cwd).
 */

const qcDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(qcDir, '../../..')

/** Slow-mo delay per Playwright action (ms). Set to 0 to disable. CLI has no --slow-mo. */
const SLOW_MO_MS = 0

const launchOptions =
  SLOW_MO_MS > 0 ? { launchOptions: { slowMo: SLOW_MO_MS } } : {}

export default defineConfig({
  testDir: './test',
  testMatch: ['**/*.spec.ts'],
  testIgnore: ['**/node_modules/**', '**/test-results/**', '**/playwright-report/**'],
  outputDir: path.join(qcDir, 'test-results'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: path.join(qcDir, 'playwright-report') }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...launchOptions,
  },
  webServer: {
    command: 'npm run dev',
    cwd: repoRoot,
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...launchOptions },
    },
  ],
})
