'use client';

import Link from 'next/link';
import { serviceSlugs, services } from '@/config/services';

export function HomeServicesTicker() {
  const items = serviceSlugs.map((slug) => ({
    name: services[slug].title,
    href: `/services/${slug}`,
  }));

  const track = (
    <div className="flex shrink-0 items-center gap-10">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="inline-flex min-h-11 items-center whitespace-nowrap text-[15px] font-medium tracking-[-0.02em] text-obsidian/80 transition-colors hover:text-obsidian"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Services"
      className="home-v2-ticker border-y border-obsidian/10 bg-paper py-3"
    >
      <div className="relative overflow-hidden">
        <div className="home-v2-ticker-track flex w-max gap-10 px-5 sm:px-8 lg:px-12">
          {track}
          <div aria-hidden="true" className="flex shrink-0 items-center gap-10">
            {items.map((item) => (
              <span
                key={`dup-${item.href}`}
                className="whitespace-nowrap text-[15px] font-medium tracking-[-0.02em] text-obsidian/80"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
