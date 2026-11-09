'use client';

import Link from 'next/link';
import { homeV2Config } from '@/config/home-v2';
import { isHeroPopulated, isPendingHomeImageAlt } from '@/lib/hml/homeV2';
import { HomeOptionalImage } from './HomeOptionalImage';
import { HomeV2Marker, splitDisplayLines } from './homeV2Typography';

export function HomeHeroSection() {
  const { hero } = homeV2Config.content;
  const { assets } = homeV2Config;

  if (!isHeroPopulated(homeV2Config.content) || !hero.h1.trim()) return null;

  const showHeroImage = !isPendingHomeImageAlt(hero.imageAlt);

  return (
    <section className="border-b border-obsidian/10 bg-paper">
      <div
        className={`mx-auto grid max-w-editorial gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:items-center lg:gap-10 lg:px-12 lg:py-20 ${
          showHeroImage ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]' : 'lg:grid-cols-1'
        }`}
      >
        <div className="order-1 min-w-0">
          {hero.eyebrow.trim() ? (
            <p className="home-v2-eyebrow flex items-center gap-2.5 text-obsidian">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-signalYellow" />
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className="home-v2-display home-v2-hero-h1 mt-6 max-w-[14ch] text-[clamp(3.5rem,8.9vw,8rem)] leading-[0.86] text-obsidian">
            {splitDisplayLines(hero.h1, 3).map((line) => (
              <span key={line} className="home-v2-hero-line block overflow-hidden pb-[0.06em]">
                {line.split(/\s+/).map((word, wi) => {
                  const lower = word.toLowerCase();
                  const isName = lower === 'name' || lower.startsWith('name');
                  return (
                    <span key={`${line}-${word}-${wi}`}>
                      {isName ? <HomeV2Marker className="home-v2-hero-marker">{word}</HomeV2Marker> : word}
                      {wi < line.split(/\s+/).length - 1 ? '\u00a0' : ''}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
          {hero.sub.trim() ? (
            <p className="home-v2-body-lg mt-6 max-w-[32ch] text-obsidian sm:max-w-[520px]">{hero.sub}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {hero.primaryCta.label.trim() ? (
              <Link href={hero.primaryCta.href} className="home-v2-btn home-v2-btn-primary">
                {hero.primaryCta.label}
              </Link>
            ) : null}
            {hero.secondaryCta.label.trim() ? (
              <Link href={hero.secondaryCta.href} className="home-v2-btn home-v2-btn-secondary">
                {hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        {showHeroImage ? (
          <div className="order-2 min-w-0">
            <div className="home-v2-img-reveal">
              <HomeOptionalImage
                src={assets.heroImage}
                alt={hero.imageAlt}
                width={assets.heroWidth}
                height={assets.heroHeight}
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
