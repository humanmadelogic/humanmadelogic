'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isFinalCtaPopulated } from '@/lib/hml/homeV2';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

export function HomeV3FinalCta() {
  const { finalCta } = homeV2Config.content;
  const reveal = useH3Reveal<HTMLElement>();
  const heading = useRef<HTMLHeadingElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const node = heading.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - Math.min(1, Math.max(0, rect.top / vh));
      node.style.setProperty('--h3-fill', `${(p * 100).toFixed(1)}%`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  const onBtnMove = useCallback(
    (event: React.MouseEvent) => {
      if (!fine || reduced || !btn.current) return;
      const rect = btn.current.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
      btn.current.style.transform = `translate(${x}px, ${y}px)`;
    },
    [fine, reduced],
  );

  const onBtnLeave = useCallback(() => {
    if (btn.current) btn.current.style.transform = '';
  }, []);

  if (!isFinalCtaPopulated(homeV2Config.content)) return null;

  const lower = finalCta.heading.toLowerCase();
  const needle = 'ignore?';
  const idx = lower.lastIndexOf(needle);

  return (
    <section ref={reveal.ref} className={`h3-ink-band px-5 py-24 sm:px-8 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto max-w-editorial min-w-0 text-white">
        {hasText(finalCta.heading) ? (
          <h2
            ref={heading}
            className="h3-display text-[clamp(2.5rem,11vw,7.5rem)] leading-[0.9] [--h3-fill:0%]"
            style={
              {
                backgroundImage: `linear-gradient(90deg, var(--h3-y) 0%, var(--h3-y) var(--h3-fill), #fff var(--h3-fill), #fff 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              } as React.CSSProperties
            }
          >
            {idx >= 0 ? (
              <>
                {finalCta.heading.slice(0, idx)}
                <span className="h3-word">{finalCta.heading.slice(idx, idx + needle.length)}</span>
                {finalCta.heading.slice(idx + needle.length)}
              </>
            ) : (
              <H3Words text={finalCta.heading} />
            )}
          </h2>
        ) : null}
        {hasText(finalCta.body) ? <p className="mt-8 max-w-[46ch] text-white/85">{finalCta.body}</p> : null}
        {hasText(finalCta.button.label) ? (
          <Link
            ref={btn}
            href={finalCta.button.href}
            className="h3-btn h3-btn-y mt-10 inline-flex motion-reduce:transform-none"
            onMouseMove={onBtnMove}
            onMouseLeave={onBtnLeave}
          >
            {finalCta.button.label} →
          </Link>
        ) : null}
        {hasText(finalCta.note) ? <p className="mt-4 text-sm text-white/50">{finalCta.note}</p> : null}
      </div>
    </section>
  );
}
