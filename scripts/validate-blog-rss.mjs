#!/usr/bin/env node
/**
 * Validate blog RSS 2.0 (empty channel is valid while there are no published posts).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

let xml;
try {
  xml = execFileSync(
    'npx',
  ['tsx', '-e', "import { buildBlogRssXml } from './src/lib/hml/blogRss.ts'; console.log(buildBlogRssXml());"],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 },
  ).trim();
} catch (err) {
  console.error('FAIL blog RSS: could not generate feed');
  console.error(err.stderr || err.message);
  process.exit(1);
}

let failed = 0;
if (!xml.startsWith('<?xml version="1.0"')) {
  console.error('FAIL blog RSS: missing XML declaration');
  failed += 1;
}
if (!/<rss version="2\.0">/.test(xml)) {
  console.error('FAIL blog RSS: missing rss@2.0 root');
  failed += 1;
}
if (!/<channel>[\s\S]*<\/channel>/.test(xml)) {
  console.error('FAIL blog RSS: missing channel element');
  failed += 1;
}
if (!/<link>https:\/\/humanmadelogic\.com\/blog<\/link>/.test(xml)) {
  console.error('FAIL blog RSS: channel link must be the blog hub');
  failed += 1;
}
if (/<item>/.test(xml) === false) {
  console.log('OK blog RSS: empty item list (no published posts)');
} else if (!/<guid isPermaLink="true">/.test(xml)) {
  console.error('FAIL blog RSS: items need guid isPermaLink="true"');
  failed += 1;
}

const blogHtml = path.join(ROOT, '.next/server/app/blog.html');
if (fs.existsSync(blogHtml)) {
  const html = fs.readFileSync(blogHtml, 'utf8');
  if (!/rel="alternate" type="application\/rss\+xml"/.test(html)) {
    console.error('FAIL blog RSS: /blog head missing rel=alternate application/rss+xml');
    failed += 1;
  } else {
    console.log('OK blog HTML: rel=alternate RSS link present');
  }
}

if (failed) process.exit(1);
console.log('OK blog RSS feed structure.');