'use client';

import Link from 'next/link';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isFinalCtaPopulated } from '@/lib/hml/homeV2';
import { HomeV2HMark } from './homeV2Typography';

function FinalHeading({ text }: { text: string }) {
  const lower = text.toLowerCase();
  const needle = 'ignore?';
  const idx = lower.lastIndexOf(needle);
  if (idx < 0) {
    return <span>{text}</span>;
  }
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-signalYellow">{text.slice(idx, idx + needle.length)}</span>
    </>
  );
}

export function HomeFinalCtaSection() {
  const { finalCta } = homeV2Config.content;

  if (!isFinalCtaPopulated(homeV2Config.content)) return null;

  return (
    <section className="home-v2-ink-band relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-8 opacity-[0.12] sm:right-12 sm:top-16"
      >
        <HomeV2HMark className="h-[min(42vw,22rem)] w-auto text-paper" />
      </div>
      <div className="relative mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        {hasText(finalCta.heading) ? (
          <h2 className="home-v2-display max-w-[12ch] text-[clamp(4rem,13.9vw,12.5rem)] leading-[0.86] text-paper">
            <FinalHeading text={finalCta.heading} />
          </h2>
        ) : null}
        {hasText(finalCta.body) ? (
          <p className="mt-8 max-w-[46ch] text-[16px] leading-[1.6] text-paper/65 sm:text-[17px]">
            {finalCta.body}
          </p>
        ) : null}
        {hasText(finalCta.button.label) ? (
          <Link href={finalCta.button.href} className="home-v2-btn home-v2-btn-y mt-12">
            {finalCta.button.label}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
        {hasText(finalCta.note) ? (
          <p className="mt-6 text-[15px] text-paper/50">{finalCta.note}</p>
        ) : null}
      </div>
    </section>
  );
}
