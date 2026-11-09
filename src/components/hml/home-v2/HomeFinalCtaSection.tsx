'use client';

import Link from 'next/link';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isFinalCtaPopulated } from '@/lib/hml/homeV2';

export function HomeFinalCtaSection() {
  const { finalCta } = homeV2Config.content;

  if (!isFinalCtaPopulated(homeV2Config.content)) return null;

  return (
    <section className="relative overflow-hidden bg-obsidian text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 78% 18%, rgba(244,189,73,0.16) 0%, rgba(21,21,21,0) 70%)',
        }}
      />
      <div className="relative mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        {hasText(finalCta.heading) ? (
          <h2 className="max-w-[14ch] text-[clamp(2rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.04em]">
            {finalCta.heading}
          </h2>
        ) : null}
        {hasText(finalCta.body) ? (
          <p className="mt-8 max-w-[46ch] text-[16px] leading-[1.6] text-paper/70 sm:text-[18px]">
            {finalCta.body}
          </p>
        ) : null}
        {hasText(finalCta.button.label) ? (
          <Link
            href={finalCta.button.href}
            className="mt-12 inline-flex min-h-11 items-center gap-3 rounded-full bg-signalYellow px-7 text-[16px] font-medium text-obsidian transition-transform duration-300 hover:scale-[1.02] motion-reduce:transform-none"
          >
            {finalCta.button.label}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
        {hasText(finalCta.note) ? (
          <p className="mt-6 text-[15px] text-paper/55">{finalCta.note}</p>
        ) : null}
      </div>
    </section>
  );
}
