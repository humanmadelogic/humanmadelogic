#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (manual only — not run on build or deploy).
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs [/blog /blog/foo ...]
 *
 * Defaults to /blog, the five published blog slugs from manifest, and /sitemap.xml.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const HOST = 'humanmadelogic.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

function readIndexNowKey() {
  const publicDir = path.join(ROOT, 'public');
  const matches = fs
    .readdirSync(publicDir)
    .filter((name) => /^[a-f0-9]{32}\.txt$/i.test(name));
  if (matches.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file public/<32-hex>.txt, found ${matches.length}`,
    );
  }
  const file = matches[0];
  const key = file.replace(/\.txt$/i, '').toLowerCase();
  const body = fs.readFileSync(path.join(publicDir, file), 'utf8').trim();
  if (body !== key) {
    throw new Error(`IndexNow key file ${file} body must equal the key (${key})`);
  }
  return key;
}

function defaultPaths() {
  const manifestPath = path.join(ROOT, 'src/config/blog/manifest.json');
  const paths = ['/blog', '/sitemap.xml'];
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    for (const post of manifest.posts ?? []) {
      if (!post.draft && post.slug) paths.push(`/blog/${post.slug}`);
    }
  }
  return [...new Set(paths)];
}

const key = readIndexNowKey();
const relativePaths = process.argv.slice(2).length > 0 ? process.argv.slice(2) : defaultPaths();
const urlList = relativePaths.map((p) => {
  const path = p.startsWith('/') ? p : `/${p}`;
  return `https://${HOST}${path}`;
});

const payload = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${key}.txt`,
  urlList,
};

const res = await fetch(INDEXNOW_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});
const text = await res.text();
console.log(`[indexnow] ${urlList.length} URL(s)`);
console.log(`[indexnow] HTTP ${res.status} ${text.slice(0, 200)}`);
if (!res.ok) process.exit(1);