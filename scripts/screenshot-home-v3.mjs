import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const outDir = process.env.OUT_DIR ?? '/opt/cursor/artifacts';

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [name, width, height] of [
  ['home-v3-1440-full', 1440, 900],
  ['home-v3-1440-hero', 1440, 900],
  ['home-v3-390-full', 390, 844],
  ['home-v3-390-hero', 390, 844],
]) {
  await page.setViewportSize({ width, height });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  if (name.includes('hero')) {
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({
    path: file,
    fullPage: name.includes('full'),
  });
  console.log('wrote', file);
}

await browser.close();
