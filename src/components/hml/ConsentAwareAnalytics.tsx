'use client';

import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';
import { readConsent } from '@/lib/cookie-consent';

/**
 * Vercel Web Analytics is cookieless, but we still gate it behind analytics consent
 * so behaviour matches UK GDPR / PECR expectations for non-essential measurement.
 */
export function ConsentAwareAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => {
      const consent = readConsent();
      setEnabled(consent.decided && consent.analytics);
    };
    update();
    window.addEventListener('hml-consent-change', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('hml-consent-change', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}

/**
 * Future marketing tags (pixels) must mount only when consent.marketing is true.
 */
export function ConsentAwareMarketingScripts() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => {
      const consent = readConsent();
      setEnabled(consent.decided && consent.marketing);
    };
    update();
    window.addEventListener('hml-consent-change', update);
    return () => window.removeEventListener('hml-consent-change', update);
  }, []);

  if (!enabled) return null;
  return null;
}
