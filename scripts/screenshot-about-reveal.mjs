#!/usr/bin/env node
import fs from 'node:fs';
import puppeteer from 'puppeteer';

const BASE = process.env.SCREENSHOT_BASE_URL ?? 'http://127.0.0.1:3010';
const OUT = '/opt/cursor/artifacts';

const shots = [
  { name: 'about-390-50pct-after', width: 390, height: 844, fraction: 0.5 },
  { name: 'about-1440-50pct-after', width: 1440, height: 900, fraction: 0.5 },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  for (const s of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.width, height: s.height, deviceScaleFactor: s.width < 500 ? 2 : 1 });
    await page.goto(`${BASE}/about`, { waitUntil: 'networkidle2' });
    await page.evaluate((f) => {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo(0, Math.round(max * f));
    }, s.fraction);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: false });
    await page.close();
    console.log('saved', `${OUT}/${s.name}.png`);
  }
  await browser.close();
}

main();
