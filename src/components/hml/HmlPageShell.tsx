'use client';

import { useEffect } from 'react';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { usePointerVelocity } from '@/lib/hml/usePointerVelocity';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { ConsentAwareAnalytics, ConsentAwareMarketingScripts } from './ConsentAwareAnalytics';
import { CookieConsent } from './CookieConsent';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export function HmlPageShell({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();

  usePointerVelocity(finePointer && !reducedMotion);

  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  return (
    <SmoothScrollProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <div aria-hidden="true" className="fixed inset-0 z-0 bg-paper" />
      <main id="main" className="hml relative z-10">
        {children}
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
      <CookieConsent />
      <ConsentAwareAnalytics />
      <ConsentAwareMarketingScripts />
    </SmoothScrollProvider>
  );
}
