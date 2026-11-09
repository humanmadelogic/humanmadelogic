import fs from 'fs';
import path from 'path';
import type { ServiceSlug } from '@/config/services';

export function resolveServiceOgImage(slug: ServiceSlug, fallback: string, override = '') {
  const trimmed = override.trim();
  if (trimmed) return trimmed;
  const servicesDir = path.join(process.cwd(), 'public', 'og', 'services', `og-${slug}.png`);
  if (fs.existsSync(servicesDir)) return `/og/services/og-${slug}.png`;
  const flat = path.join(process.cwd(), 'public', 'og', `og-${slug}.png`);
  if (fs.existsSync(flat)) return `/og/og-${slug}.png`;
  return fallback;
}
