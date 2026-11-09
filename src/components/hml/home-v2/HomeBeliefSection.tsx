'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isBeliefPopulated } from '@/lib/hml/homeV2';
import { useScrollReveal } from './useScrollReveal';

export function HomeBeliefSection() {
  const { belief } = homeV2Config.content;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isBeliefPopulated(homeV2Config.content)) return null;

  return (
    <section ref={reveal.ref} className={`border-y border-obsidian/10 bg-paper py-16 sm:py-24 ${reveal.className}`}>
      <div className="mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-4">
        {hasText(belief.quote) ? (
          <blockquote className="lg:col-span-7">
            <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.035em] text-obsidian">
              {belief.quote}
            </p>
          </blockquote>
        ) : null}
        {hasText(belief.body) ? (
          <p className="text-[16px] leading-[1.65] text-slate lg:col-span-5 lg:pt-2">
            {belief.body}
          </p>
        ) : null}
      </div>
    </section>
  );
}
