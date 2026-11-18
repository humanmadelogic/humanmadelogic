/**
 * Blog post SEO scaffold checks (key points, FAQs, related links, one-liner).
 */

function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"');
}

export function extractBlogFaqFromStaticHtml(html) {
  const start = html.indexOf('id="blog-faq-heading"');
  if (start < 0) return [];
  const sectionEnd = html.indexOf('</section>', start);
  if (sectionEnd < 0) return [];
  const chunk = html.slice(start, sectionEnd);
  const items = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(chunk))) {
    const q = decodeHtmlEntities(m[1].replace(/<[^>]+>/g, '').trim());
    const a = decodeHtmlEntities(m[2].replace(/<[^>]+>/g, '').trim());
    if (q && a) items.push({ q, a });
  }
  return items;
}

export function extractFaqPageFromJsonLd(blocks) {
  for (const block of blocks) {
    const walk = (node) => {
      if (!node || typeof node !== 'object') return null;
      if (Array.isArray(node)) {
        for (const child of node) {
          const found = walk(child);
          if (found) return found;
        }
        return null;
      }
      if (node['@type'] === 'FAQPage' && Array.isArray(node.mainEntity)) {
        return node.mainEntity;
      }
      for (const v of Object.values(node)) {
        const found = walk(v);
        if (found) return found;
      }
      return null;
    };
    const entities = walk(block);
    if (entities) {
      return entities.map((entity) => ({
        q: String(entity.name ?? '').trim(),
        a: String(entity.acceptedAnswer?.text ?? '').trim(),
      }));
    }
  }
  return [];
}

export function faqListsMatch(visible, schema) {
  if (visible.length !== schema.length) return false;
  for (let i = 0; i < visible.length; i += 1) {
    if (visible[i].q !== schema[i].q || visible[i].a !== schema[i].a) return false;
  }
  return true;
}