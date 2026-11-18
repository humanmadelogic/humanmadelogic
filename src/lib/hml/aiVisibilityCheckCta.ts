import { contactHref } from '@/lib/hml/contactTopics';

/**
 * Free AI visibility check CTA target. Switch `USE_DEDICATED_PAGE` when
 * `/ai-visibility-check` is approved for production traffic.
 */
const USE_DEDICATED_PAGE = true;

export const aiVisibilityCheckHref = USE_DEDICATED_PAGE
  ? '/ai-visibility-check'
  : contactHref('Free AI visibility check');