export function blogDateLine(isoDate: string): string {
  const formatted = new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return `Last updated: ${formatted}`;
}