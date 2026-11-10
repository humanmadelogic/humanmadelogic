import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

function publicFiles(dir, prefix = '') {
  const out = new Set();
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = (prefix ? `${prefix}/${name}` : `/${name}`).replace(/\\/g, '/');
    if (statSync(full).isDirectory()) {
      publicFiles(full, rel).forEach((p) => out.add(p));
    } else {
      out.add(rel);
    }
  }
  return out;
}

const files = publicFiles(publicDir);
const ogPaths = new Set();

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|mjs)$/.test(name)) {
      const text = readFileSync(full, 'utf8');
      const re = /(?:ogImage:\s*['"]([^'"]+)['"]|images:\s*\[\s*['"]([^'"]+)['"])/g;
      let m;
      while ((m = re.exec(text))) {
        const p = m[1] || m[2];
        if (p.startsWith('/')) ogPaths.add(p);
      }
    }
  }
};

walk(path.join(root, 'src'));
ogPaths.add('/og/og-default.png');

const missing = [...ogPaths].filter((p) => !files.has(p));
if (missing.length > 0) {
  console.error('\n[og-images] Missing public files for metadata og:image paths:\n');
  missing.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}

console.log(`[og-images] ${ogPaths.size} og:image path(s) verified in public/.`);
