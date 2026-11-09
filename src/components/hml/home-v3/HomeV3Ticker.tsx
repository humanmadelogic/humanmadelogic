'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { serviceSlugs, services } from '@/config/services';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { H3HMark } from './h3Typography';

export function HomeV3Ticker() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const velocity = useRef(1);

  useEffect(() => {
    if (reduced) return;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(16, now - lastT);
      const speed = dy / dt;
      velocity.current = Math.min(2.2, Math.max(0.65, 1 + speed * 0.08));
      lastY = window.scrollY;
      lastT = now;
      if (track.current) {
        track.current.style.setProperty('--h3-ticker-dur', `${38 / velocity.current}s`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const items = serviceSlugs.map((slug) => ({
    name: services[slug].title.toUpperCase(),
    href: `/services/${slug}`,
  }));

  const row = items.map((item, index) => (
    <span key={item.href} className="inline-flex shrink-0 items-center gap-8 sm:gap-10">
      <Link
        href={item.href}
        className="h3-display inline-flex min-h-[44px] items-center px-1 text-[clamp(1.5rem,4vw,3rem)] text-white"
      >
        {item.name}
      </Link>
      {index < items.length - 1 ? <H3HMark className="hidden text-signalYellow sm:block" /> : null}
    </span>
  ));

  return (
    <section aria-label="Services" className="h3-ink-band h3-ticker overflow-hidden py-6">
      <div ref={track} className="h3-ticker-track items-center gap-8 px-5 sm:gap-10 sm:px-8">
        {row}
        <div aria-hidden className="flex shrink-0 items-center gap-8 sm:gap-10">
          {items.map((item, index) => (
            <span key={`dup-${item.href}`} className="inline-flex shrink-0 items-center gap-8 sm:gap-10">
              <span className="h3-display text-[clamp(1.5rem,4vw,3rem)] text-white">{item.name}</span>
              {index < items.length - 1 ? <H3HMark className="hidden text-signalYellow sm:block" /> : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
