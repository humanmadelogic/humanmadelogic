#!/usr/bin/env node
/**
 * axe colour-contrast on all sitemap routes (local server).
 * At 390 and 1440 widths, after scrolling to ~25%, ~50%, and bottom.
 * Ignores Vercel toolbar / deployment-protection nodes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const axePath = path.join(__dirname, '../node_modules/axe-core/axe.min.js');
const axeSource = fs.readFileSync(axePath, 'utf8');

const BASE = process.env.AXE_BASE_URL ?? 'http://127.0.0.1:3010';

const routes = [
  '/',
  '/services',
  '/about',
  '/contact',
  '/privacy',
  '/cookies',
  '/terms',
  '/accessibility',
  '/legal',
  '/services/branding',
  '/services/seo-aeo-geo',
  '/services/performance-marketing',
  '/services/social-media',
];

const VIEWPORTS = [
  { name: '390', width: 390, height: 844, deviceScaleFactor: 2 },
  { name: '1440', width: 1440, height: 900, deviceScaleFactor: 1 },
];

const SCROLL_STEPS = [
  { name: 'top', fraction: 0 },
  { name: '25%', fraction: 0.25 },
  { name: '50%', fraction: 0.5 },
  { name: 'bottom', fraction: 1 },
];

const IGNORE = [
  '#vercel-live-feedback',
  '[data-vercel-toolbar]',
  '#__vercel_toolbar',
  '[class*="vercel"]',
];

async function runAxe(page) {
  await page.evaluate(axeSource);
  return page.evaluate(async (ignoreSelectors) => {
    // eslint-disable-next-line no-undef
    return axe.run(document, {
      runOnly: { type: 'rule', values: ['color-contrast'] },
      rules: {
        'color-contrast': { enabled: true },
      },
      exclude: ignoreSelectors.map((sel) => [sel]),
    });
  }, IGNORE);
}

async function scrollToFraction(page, fraction) {
  await page.evaluate((f) => {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const y = f >= 1 ? max : Math.round(max * f);
    window.scrollTo({ top: y, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, fraction);
  await new Promise((r) => setTimeout(r, 400));
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const all = [];
  let failCount = 0;

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport(vp);

    for (const route of routes) {
      const url = `${BASE}${route}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120_000 });

      for (const step of SCROLL_STEPS) {
        await scrollToFraction(page, step.fraction);
        const result = await runAxe(page);
        const violations = result.violations ?? [];
        const key = `${vp.name} ${route} @${step.name}`;
        all.push({ viewport: vp.name, route, scroll: step.name, count: violations.length, violations });

        if (violations.length) {
          failCount += 1;
          console.error(`FAIL ${key}: ${violations.length} contrast violation(s)`);
          for (const v of violations) {
            for (const node of v.nodes.slice(0, 6)) {
              console.error('  ', node.target?.join(' '), node.failureSummary?.split('\n')[0]);
            }
          }
        } else {
          console.log(`OK ${key}`);
        }
      }
    }

    await page.close();
  }

  await browser.close();

  const out = path.join(__dirname, '../.axe-contrast-report.json');
  fs.writeFileSync(out, JSON.stringify({ base: BASE, results: all }, null, 2));
  console.log(`Wrote ${out}`);
  process.exit(failCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
