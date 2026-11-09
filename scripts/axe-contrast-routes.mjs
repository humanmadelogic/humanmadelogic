#!/usr/bin/env node
/**
 * axe colour-contrast on all sitemap routes (local server).
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

const IGNORE = [
  '#vercel-live-feedback',
  '[data-vercel-toolbar]',
  '#__vercel_toolbar',
  '[class*="vercel"]',
];

async function auditRoute(page, route) {
  const url = `${BASE}${route}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 120_000 });
  await page.evaluate(axeSource);
  const result = await page.evaluate(async (ignoreSelectors) => {
    // eslint-disable-next-line no-undef
    return axe.run(document, {
      runOnly: { type: 'rule', values: ['color-contrast'] },
      rules: {
        'color-contrast': { enabled: true },
      },
      exclude: ignoreSelectors.map((sel) => [sel]),
    });
  }, IGNORE);

  const violations = result.violations ?? [];
  return { route, violations };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  const all = [];
  for (const route of routes) {
    const { violations } = await auditRoute(page, route);
    all.push({ route, count: violations.length, violations });
    if (violations.length) {
      console.error(`FAIL ${route}: ${violations.length} contrast violation(s)`);
      for (const v of violations) {
        for (const node of v.nodes.slice(0, 8)) {
          console.error('  ', node.target?.join(' '), node.failureSummary);
        }
      }
    } else {
      console.log(`OK ${route}`);
    }
  }

  await browser.close();

  const failed = all.filter((r) => r.count > 0);
  const out = path.join(__dirname, '../.axe-contrast-report.json');
  fs.writeFileSync(out, JSON.stringify({ base: BASE, routes: all }, null, 2));
  console.log(`Wrote ${out}`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
