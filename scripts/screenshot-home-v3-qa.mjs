import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const outDir = process.env.OUT_DIR ?? '/opt/cursor/artifacts';

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

async function shot(name, width, opts = {}) {
  await page.setViewportSize({ width, height: opts.height ?? 900 });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector(opts.scrollTo ?? '.home-v3', { timeout: 20000 });
  if (opts.scrollTo) {
    await page.locator(opts.scrollTo).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: Boolean(opts.fullPage) });
  console.log('wrote', file);
}

await shot('home-v3-how-1024', 1024, { scrollTo: '.h3-how', height: 1200 });
await shot('home-v3-how-1440', 1440, { scrollTo: '.h3-how', height: 1200 });
await shot('home-v3-services-1440-idle', 1440, { scrollTo: '.h3-services', height: 1100 });
await page.setViewportSize({ width: 1440, height: 1100 });
await page.goto(base, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.h3-services', { timeout: 20000 });
await page.locator('.h3-services').scrollIntoViewIfNeeded();
await page.locator('.h3-services button[role="tab"]').nth(2).hover();
await page.waitForTimeout(500);
await page.screenshot({
  path: path.join(outDir, 'home-v3-services-1440-hover.png'),
});
console.log('wrote', path.join(outDir, 'home-v3-services-1440-hover.png'));

await shot('home-v3-services-390', 390, { scrollTo: '.h3-services', fullPage: false, height: 844 });

const GUTTER_PX = 24;

for (const width of [1024, 1280, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1200 });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.h3-how', { timeout: 20000 });
  await page.locator('.h3-how').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const overlaps = await page.evaluate((gutter) => {
    const words = document.querySelectorAll('.h3-how__aside .h3-word');
    const rail = document.querySelector('.h3-how ol');
    if (!words.length || !rail) return { ok: false, reason: 'missing nodes' };
    let headingRight = 0;
    words.forEach((node) => {
      headingRight = Math.max(headingRight, node.getBoundingClientRect().right);
    });
    const railLeft = rail.getBoundingClientRect().left;
    const gap = railLeft - headingRight;
    return {
      ok: gap >= gutter,
      headingRight,
      railLeft,
      gapPx: Math.round(gap),
      requiredGap: gutter,
      width: window.innerWidth,
    };
  }, GUTTER_PX);
  console.log(`heading-rail-gutter-${width}:`, JSON.stringify(overlaps));
}

await browser.close();
