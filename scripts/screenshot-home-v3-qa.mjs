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
  await page.goto(base, { waitUntil: 'networkidle' });
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
await page.goto(base, { waitUntil: 'networkidle' });
await page.locator('.h3-services').scrollIntoViewIfNeeded();
await page.locator('.h3-services button[role="tab"]').nth(2).hover();
await page.waitForTimeout(500);
await page.screenshot({
  path: path.join(outDir, 'home-v3-services-1440-hover.png'),
});
console.log('wrote', path.join(outDir, 'home-v3-services-1440-hover.png'));

await shot('home-v3-services-390', 390, { scrollTo: '.h3-services', fullPage: false, height: 844 });

for (const width of [1024, 1280, 1440]) {
  await page.setViewportSize({ width, height: 1200 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.h3-how').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const overlaps = await page.evaluate(() => {
    const aside = document.querySelector('.h3-how aside h2');
    const firstNum = document.querySelector('.h3-how ol li p.text-signalYellow, .h3-how ol li .text-signalYellow');
    const rail = document.querySelector('.h3-how ol > span');
    if (!aside || !firstNum) return { ok: false, reason: 'missing nodes' };
    const a = aside.getBoundingClientRect();
    const n = firstNum.getBoundingClientRect();
    const r = rail?.getBoundingClientRect();
    const hitNum = !(a.right < n.left || a.left > n.right || a.bottom < n.top || a.top > n.bottom);
    const hitRail =
      r && !(a.right < r.left || a.left > r.right || a.bottom < r.top || a.top > r.bottom);
    return { ok: !hitNum && !hitRail, hitNum, hitRail, width: window.innerWidth };
  });
  console.log(`overlap-check-${width}:`, JSON.stringify(overlaps));
}

await browser.close();
