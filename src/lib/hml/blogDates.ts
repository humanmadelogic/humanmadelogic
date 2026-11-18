const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const MONTH_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** Deterministic British date from `YYYY-MM-DD` (no runtime locale / timezone drift). */
function formatBritishDate(isoDate: string, month: 'short' | 'long') {
  const [y, m, d] = isoDate.split('-').map((part) => Number.parseInt(part, 10));
  if (!y || !m || !d || m < 1 || m > 12) {
    return isoDate;
  }
  const monthLabel = month === 'short' ? MONTH_SHORT[m - 1] : MONTH_LONG[m - 1];
  return `${d} ${monthLabel} ${y}`;
}

/** Visible publish line, e.g. Published 18 Nov 2026 */
export function blogPublishedLine(isoDate: string): string {
  return `Published ${formatBritishDate(isoDate, 'short')}`;
}

/** Visible update line, e.g. Last updated: 18 November 2026 */
export function blogUpdatedLine(isoDate: string): string {
  return `Last updated: ${formatBritishDate(isoDate, 'long')}`;
}

/** Default publish instant for blog posts (IST, afternoon go-live). */
export const BLOG_PUBLISH_TZ_OFFSET = '+05:30';
const BLOG_PUBLISH_TIME = '15:00:00';

/** ISO 8601 for JSON-LD, sitemap and RSS (full timestamp with offset). */
export function blogIsoDateTime(isoDate: string, timeZoneOffset = BLOG_PUBLISH_TZ_OFFSET): string {
  return `${isoDate}T${BLOG_PUBLISH_TIME}${timeZoneOffset}`;
}

export function blogInstantFromDate(isoDate: string): Date {
  return new Date(blogIsoDateTime(isoDate));
}

const RFC_WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/** RFC 822 pubDate at the fixed blog publish clock (15:00 +0530), not locale-dependent. */
export function blogRssPubDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map((part) => Number.parseInt(part, 10));
  if (!y || !m || !d || m < 1 || m > 12) {
    return blogInstantFromDate(isoDate).toUTCString();
  }
  const instant = blogInstantFromDate(isoDate);
  const wd = RFC_WEEKDAY[instant.getUTCDay()];
  const mon = MONTH_SHORT[m - 1];
  return `${wd}, ${d} ${mon} ${y} ${BLOG_PUBLISH_TIME} +0530`;
}

/** @deprecated Prefer blogPublishedLine / blogUpdatedLine */
export function blogDateLine(isoDate: string): string {
  return blogUpdatedLine(isoDate);
}