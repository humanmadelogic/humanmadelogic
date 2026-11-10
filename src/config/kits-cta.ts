import { contactHref } from '@/lib/hml/contactTopics';

/** Hub and kit pages: free check CTA targets contact until /ai-visibility-check ships approved copy. */
export const kitsAiVisibilityCta = {
  buttonLabel: 'Get a free AI visibility check',
  href: contactHref('Free AI visibility check'),
} as const;
