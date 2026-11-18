/**
 * Free AI visibility check form: default off (fallback), no placeholder/approval copy.
 */
import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const path = '/ai-visibility-check';

const FORBIDDEN = [
  'PLACEHOLDER',
  "FOR JEFF'S PREVIEW",
  'APPROVED FORMAT',
  'pending approval',
  'Status:',
];

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
  const text = await page.evaluate(() => document.querySelector('main')?.innerText ?? '');
  const hasForm = (await page.locator('form').count()) > 0;

  let ok = true;
  for (const phrase of FORBIDDEN) {
    if (text.includes(phrase)) {
      console.error(`FAIL ${path} — page contains forbidden phrase: ${phrase}`);
      ok = false;
    }
  }

  await browser.close();
  if (process.env.AVC_FORM_ENABLED === 'true') {
    if (!hasForm) {
      console.error(`FAIL ${path} — expected form when AVC_FORM_ENABLED=true`);
      ok = false;
    }
  } else if (text.includes("If the form isn't working")) {
    console.log(`OK ${path} — fallback line shown, form off`);
  } else {
    console.error(`FAIL ${path} — expected fallback copy when form is off`);
    ok = false;
  }

  if (ok) console.log(`OK ${path} — AVC form check passed`);
  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});