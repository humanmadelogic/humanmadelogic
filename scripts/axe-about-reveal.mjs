#!/usr/bin/env node
/**
 * About page colour-contrast while RevealText is mid-animation.
 * Scrolls to ~50% and samples axe during the word stagger window.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const axeSource = fs.readFileSync(path.join(__dirname, '../node_modules/axe-core/axe.min.js'), 'utf8');
const BASE = process.env.AXE_BASE_URL ?? 'http://127.0.0.1:3010';

const VIEWPORTS = [
  { name: '390', width: 390, height: 844, deviceScaleFactor: 2 },
  { name: '1440', width: 1440, height: 900, deviceScaleFactor: 1 },
];

const IGNORE = ['#vercel-live-feedback', '[data-vercel-toolbar]', '#__vercel_toolbar'];

async function runAxe(page) {
  await page.evaluate(axeSource);
  return page.evaluate(async (ignoreSelectors) => {
    // eslint-disable-next-line no-undef
    return axe.run(document, {
      runOnly: { type: 'rule', values: ['color-contrast'] },
      exclude: ignoreSelectors.map((sel) => [sel]),
    });
  }, IGNORE);
}

async function sampleAt(page, label) {
  const wordState = await page.evaluate(() => {
    const words = [...document.querySelectorAll('.hml-word')];
    const opacities = words.map((w) => parseFloat(getComputedStyle(w).opacity)).filter((n) => !Number.isNaN(n));
    return {
      count: words.length,
      minOpacity: opacities.length ? Math.min(...opacities) : null,
      maxOpacity: opacities.length ? Math.max(...opacities) : null,
    };
  });
  const result = await runAxe(page);
  const hmlNodes = result.violations.flatMap((v) =>
    v.nodes.filter((n) => (n.target ?? []).some((t) => String(t).includes('hml-word'))),
  );
  return { label, wordState, violationCount: result.violations.length, hmlNodes };
}

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const report = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.goto(`${BASE}/about`, { waitUntil: 'networkidle2', timeout: 120_000 });
    await page.evaluate(() => {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo(0, Math.round(max * 0.5));
    });
    await new Promise((r) => setTimeout(r, 200));

    // Poll through the typical reveal window (~1.2s staggered words).
    for (let i = 0; i < 12; i++) {
      const sample = await sampleAt(page, `${vp.name} t+${i * 100}ms`);
      report.push(sample);
      await new Promise((r) => setTimeout(r, 100));
    }

    const fails = report.filter((r) => r.label.startsWith(vp.name) && r.violationCount > 0);
    if (fails.length) {
      console.error(`FAIL ${vp.name}: ${fails.length} samples with contrast violations`);
      for (const f of fails.slice(0, 3)) {
        console.error(' ', f.label, f.hmlNodes[0]?.failureSummary?.split('\n')[0]);
      }
    } else {
      console.log(`OK ${vp.name}: 12 samples, no contrast violations (min word opacity ${report.find((r) => r.label.startsWith(vp.name))?.wordState?.minOpacity})`);
    }

    await page.close();
  }

  await browser.close();
  const out = '/opt/cursor/artifacts/axe-about-reveal-samples.json';
  fs.writeFileSync(out, JSON.stringify(report, null, 2));
  console.log(`Wrote ${out}`);
  const anyFail = report.some((r) => r.violationCount > 0);
  process.exit(anyFail ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
