'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { readConsent } from '@/lib/cookie-consent';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-861FT0TQN1';

function isProductionHmlHost(): boolean {
  if (typeof window === 'undefined') return false;
  if (process.env.NODE_ENV !== 'production') return false;
  const host = window.location.hostname;
  return host === 'humanmadelogic.com' || host === 'www.humanmadelogic.com';
}

/**
 * GA4 on the production apex/www host only. Gated on analytics cookie consent
 * (Consent Mode defaults deny storage until the visitor opts in).
 */
export function ProductionGoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isProductionHmlHost()) return;

    const sync = () => {
      const consent = readConsent();
      setEnabled(consent.decided && consent.analytics);
    };
    sync();
    window.addEventListener('hml-consent-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('hml-consent-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(isProductionHmlHost());
  }, []);

  if (!mount) return null;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {enabled ? (
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            gtag('consent', 'update', { analytics_storage: 'granted' });
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>
      ) : null}
    </>
  );
}
