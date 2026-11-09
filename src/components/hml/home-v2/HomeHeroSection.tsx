'use client';

import Link from 'next/link';
import { homeV2Config } from '@/config/home-v2';
import { isHeroPopulated } from '@/lib/hml/homeV2';
import { HomeOptionalImage } from './HomeOptionalImage';

type Props = {
  h1: string;
};

export function HomeHeroSection({ h1 }: Props) {
  const { hero } = homeV2Config.content;
  const { assets } = homeV2Config;

  if (!isHeroPopulated(homeV2Config.content) || !h1.trim()) return null;

  return (
    <section className="border-b border-obsidian/10 bg-paper">
      <div className="mx-auto grid max-w-editorial gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-12 lg:py-24">
        <div className="order-1 flex flex-col justify-center">
          {hero.eyebrow.trim() ? (
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-slate">
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.25rem,7vw,3.75rem)] leading-[1.02] tracking-[-0.04em] text-obsidian">
            {h1}
          </h1>
          {hero.sub.trim() ? (
            <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.65] text-slate sm:text-[17px]">
              {hero.sub}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-3">
            {hero.primaryCta.label.trim() ? (
              <Link
                href={hero.primaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-obsidian px-6 text-[16px] font-medium text-paper transition-opacity hover:opacity-90"
              >
                {hero.primaryCta.label}
              </Link>
            ) : null}
            {hero.secondaryCta.label.trim() ? (
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-obsidian/20 px-6 text-[16px] text-obsidian transition-colors hover:border-obsidian/45"
              >
                {hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="order-2">
          <HomeOptionalImage
            src={assets.heroImage}
            alt={hero.imageAlt}
            width={assets.heroWidth}
            height={assets.heroHeight}
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            reveal
          />
        </div>
      </div>
    </section>
  );
}
