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

export function guideIsoDates(publishedAt?: string): {
  datePublished?: string;
  dateModified?: string;
  lastReviewed?: string;
} {
  if (!publishedAt) return {};
  return {
    datePublished: publishedAt,
    dateModified: publishedAt,
    lastReviewed: publishedAt,
  };
}