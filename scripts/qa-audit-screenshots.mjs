import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3010';
const outDir = process.env.OUT_DIR ?? '/opt/cursor/artifacts';

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

async function shot(file, width, height, setup) {
  await page.setViewportSize({ width, height: height ?? 900 });
  await setup();
  await page.waitForTimeout(400);
  const p = path.join(outDir, file);
  await page.screenshot({ path: p });
  console.log('wrote', p);
}

await shot('qa-contact-validation-390.png', 390, 844, async () => {
  await page.goto(`${base}/contact`, { waitUntil: 'domcontentloaded' });
  await page.locator('form').first().evaluate((form) => {
    form.requestSubmit();
  });
  await page.waitForTimeout(300);
});

await shot('qa-services-tab-focus-1440.png', 1440, 900, async () => {
  await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.h3-services');
  await page.locator('.h3-services').scrollIntoViewIfNeeded();
  const tab = page.locator('.h3-services button[role="tab"]').first();
  await tab.focus();
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(500);
});

await shot('qa-contrast-sample-1440.png', 1440, 900, async () => {
  await page.goto(`${base}/contact`, { waitUntil: 'domcontentloaded' });
  await page.locator('label[for="email"]').scrollIntoViewIfNeeded();
});

await browser.close();
