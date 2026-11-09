'use client';

import Link from 'next/link';
import { serviceSlugs, services } from '@/config/services';
import { HomeV2HMark } from './homeV2Typography';

export function HomeServicesTicker() {
  const items = serviceSlugs.map((slug) => ({
    name: services[slug].title.toUpperCase(),
    href: `/services/${slug}`,
  }));

  const row = (
    <>
      {items.map((item, index) => (
        <span key={item.href} className="inline-flex shrink-0 items-center gap-8 sm:gap-[34px]">
          <Link
            href={item.href}
            className="home-v2-display inline-flex min-h-11 items-center text-[clamp(1.75rem,5vw,3.625rem)] text-white transition-opacity hover:opacity-90"
          >
            {item.name}
          </Link>
          {index < items.length - 1 ? (
            <HomeV2HMark className="hidden shrink-0 text-signalYellow sm:block" />
          ) : null}
        </span>
      ))}
    </>
  );

  return (
    <section aria-label="Services" className="home-v2-ink-band home-v2-ticker overflow-hidden py-5 sm:py-6">
      <div className="relative">
        <div className="home-v2-ticker-track flex w-max items-center gap-8 px-5 sm:gap-[34px] sm:px-8 lg:px-12">
          {row}
          <div aria-hidden="true" className="flex shrink-0 items-center gap-8 sm:gap-[34px]">
            {items.map((item, index) => (
              <span key={`dup-${item.href}`} className="inline-flex shrink-0 items-center gap-8 sm:gap-[34px]">
                <span className="home-v2-display text-[clamp(1.75rem,5vw,3.625rem)] text-white">{item.name}</span>
                {index < items.length - 1 ? (
                  <HomeV2HMark className="hidden shrink-0 text-signalYellow sm:block" />
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
