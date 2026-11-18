/**
 * Normalize optional blog post SEO frontmatter fields for manifest + checks.
 */

export function parseBlogFrontmatterYaml(yaml) {
  const data = {};
  for (const line of yaml.split('\n')) {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if (/^\d+$/.test(value)) value = Number(value);
    else if (value.startsWith('[') || value.startsWith('{')) {
      try {
        value = JSON.parse(value);
      } catch {
        /* keep string */
      }
    } else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return data;
}

export function parseBlogFrontmatterFromSource(source) {
  if (!source.startsWith('---\n')) return null;
  const end = source.indexOf('\n---\n', 4);
  if (end < 0) return null;
  return parseBlogFrontmatterYaml(source.slice(4, end));
}

export function normalizeKeyPoints(value) {
  if (!Array.isArray(value)) return [];
  return value.map((x) => String(x).trim()).filter(Boolean);
}

export function normalizeBlogFaqs(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((row) => {
      if (!row || typeof row !== 'object') return null;
      const q = String(row.q ?? row.question ?? '').trim();
      const a = String(row.a ?? row.answer ?? '').trim();
      if (!q || !a) return null;
      return { q, a };
    })
    .filter(Boolean);
}

export function normalizeRelatedLinks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((row) => {
      if (!row || typeof row !== 'object') return null;
      const href = String(row.href ?? '').trim();
      const label = String(row.label ?? '').trim();
      if (!href || !label) return null;
      return { href, label };
    })
    .filter(Boolean);
}

export function normalizeHmlOneLiner(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

export function blogSeoFieldsFromFrontmatter(data) {
  return {
    keyPoints: normalizeKeyPoints(data?.keyPoints),
    faqs: normalizeBlogFaqs(data?.faqs),
    relatedLinks: normalizeRelatedLinks(data?.relatedLinks),
    hmlOneLiner: normalizeHmlOneLiner(data?.hmlOneLiner),
  };
}