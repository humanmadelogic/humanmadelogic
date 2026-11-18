const PUBLISH_PLACEHOLDER = '[DATE SET AT PUBLISH]';

export function guideUpdatedLine(publishedAt: string | undefined, copyLine: string): string {
  if (publishedAt) {
    const formatted = new Date(publishedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return `Last updated: ${formatted}`;
  }
  if (/\[TBC:/i.test(copyLine) || /pending the guides hub/i.test(copyLine)) {
    return `Last updated: ${PUBLISH_PLACEHOLDER}`;
  }
  return copyLine;
}

export function guideIsoDates(publishedAt?: string, updatedAt?: string): {
  datePublished?: string;
  dateModified?: string;
  lastReviewed?: string;
} {
  if (!publishedAt && !updatedAt) return {};
  const modified = updatedAt ?? publishedAt;
  const published = publishedAt ?? updatedAt;
  return {
    datePublished: published,
    dateModified: modified,
    lastReviewed: modified,
  };
}