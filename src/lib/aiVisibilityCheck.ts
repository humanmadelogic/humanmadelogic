export type AiVisibilityCheckErrors = Partial<Record<keyof AiVisibilityCheckFields, string>>;

export type AiVisibilityCheckFields = {
  name: string;
  email: string;
  brand: string;
  websiteUrl: string;
  markets: string[];
  cityOrArea: string;
  competitors: string;
  priority: string;
  seeds: string;
  source: string;
  gbpUrl: string;
  topic: string;
  servicesFollowUpOptIn: boolean;
};

const MARKET_OPTIONS = ['UK', 'Australia', 'Canada', 'Singapore'] as const;

export const AVC_MARKET_OPTIONS = MARKET_OPTIONS;

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
];

export function avcFormEnabled() {
  return process.env.AVC_FORM_ENABLED === 'true';
}

function isWorkEmail(email: string) {
  const normal = email.trim().toLowerCase();
  const at = normal.lastIndexOf('@');
  if (at < 1) return false;
  const domain = normal.slice(at + 1);
  return !FREE_EMAIL_DOMAINS.some((free) => domain === free || domain.endsWith(`.${free}`));
}

function isUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function buildAvcMessage(fields: AiVisibilityCheckFields): string {
  const lines = [
    `Website URL: ${fields.websiteUrl.trim()}`,
    `Markets: ${fields.markets.join(', ')}`,
    fields.cityOrArea.trim() ? `City or area: ${fields.cityOrArea.trim()}` : '',
    `Competitors:\n${fields.competitors.trim()}`,
    `Priority services or products:\n${fields.priority.trim()}`,
    fields.seeds.trim() ? `Customer questions:\n${fields.seeds.trim()}` : '',
    fields.source.trim() ? `How did you hear about us: ${fields.source.trim()}` : '',
    fields.gbpUrl.trim() ? `Google Business Profile / Maps URL: ${fields.gbpUrl.trim()}` : '',
  ].filter(Boolean);
  return lines.join('\n\n');
}

export function validateAiVisibilityCheck(fields: AiVisibilityCheckFields): AiVisibilityCheckErrors {
  const errors: AiVisibilityCheckErrors = {};

  if (!fields.name.trim()) errors.name = 'Enter your name.';
  const email = fields.email.trim();
  if (!email) errors.email = 'Enter your work email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  else if (!isWorkEmail(email)) errors.email = 'Use a work email on your company domain.';

  if (!fields.brand.trim()) errors.brand = 'Enter your company or brand name.';
  if (!fields.websiteUrl.trim()) errors.websiteUrl = 'Enter your website URL.';
  else if (!isUrl(fields.websiteUrl)) errors.websiteUrl = 'Enter a full URL starting with https://';

  const markets = fields.markets.filter(Boolean);
  if (markets.length === 0) errors.markets = 'Tick at least one market.';
  else if (!markets.every((m) => (MARKET_OPTIONS as readonly string[]).includes(m))) {
    errors.markets = 'Choose valid markets only.';
  }

  if (!fields.competitors.trim()) errors.competitors = 'Name three competitors.';
  if (!fields.priority.trim()) errors.priority = 'List up to three priority services or products.';

  if (fields.gbpUrl.trim() && !isUrl(fields.gbpUrl)) errors.gbpUrl = 'Enter a full URL starting with https://';

  return errors;
}