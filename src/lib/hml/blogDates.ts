function formatBritishDate(isoDate: string, month: 'short' | 'long') {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month,
    year: 'numeric',
  });
}

/** Visible publish line, e.g. Published 18 Nov 2026 */
export function blogPublishedLine(isoDate: string): string {
  return `Published ${formatBritishDate(isoDate, 'short')}`;
}

/** Visible update line, e.g. Last updated: 18 November 2026 */
export function blogUpdatedLine(isoDate: string): string {
  return `Last updated: ${formatBritishDate(isoDate, 'long')}`;
}

/** ISO 8601 for JSON-LD (date-only posts default to midday UTC). */
export function blogIsoDateTime(isoDate: string, timeZoneOffset = '+00:00'): string {
  return `${isoDate}T12:00:00${timeZoneOffset}`;
}

/** @deprecated Prefer blogPublishedLine / blogUpdatedLine */
export function blogDateLine(isoDate: string): string {
  return blogUpdatedLine(isoDate);
}