'use client';

import Link from 'next/link';
import { homeV2Config, type HomeV2Kit } from '@/config/home-v2';
import { hasText, isKitPopulated, isKitsPopulated } from '@/lib/hml/homeV2';
import { useScrollReveal } from './useScrollReveal';

function KitTick() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="shrink-0 text-signalYellow">
      <path
        d="M4 10.5 8 14.5 16 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeKitsSection() {
  const { kits } = homeV2Config.content;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isKitsPopulated(homeV2Config.content)) return null;

  const populated: HomeV2Kit[] = kits.items.filter(isKitPopulated).slice(0, 3);

  return (
    <section
      ref={reveal.ref}
      className={`bg-paper px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 ${reveal.className}`}
      aria-labelledby={hasText(kits.heading) ? 'home-kits-heading' : undefined}
    >
      <div className="mx-auto max-w-editorial">
        {hasText(kits.heading) ? (
          <h2
            id="home-kits-heading"
            className="home-v2-display text-[clamp(3rem,7.2vw,6.5rem)] leading-[0.88] text-obsidian"
          >
            {kits.heading}
          </h2>
        ) : null}

        <div className="home-v2-snap-row mt-12 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0">
          {populated.map((kit, index) => {
            const inclusions = kit.inclusions?.filter((line) => hasText(line)) ?? [];
            return (
              <article
                key={kit.title || `kit-${index}`}
                className="home-v2-kit home-v2-snap-card flex min-w-[min(82vw,300px)] max-w-[calc(100vw-2.5rem)] shrink-0 flex-col border-t-[8px] border-obsidian bg-paper px-5 pb-6 pt-6 transition-colors duration-300 sm:min-w-[min(78vw,320px)] lg:min-w-0 lg:max-w-none"
              >
                <span className="home-v2-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-slate">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {hasText(kit.title) ? (
                  <h3 className="home-v2-display mt-4 min-h-[2.4em] text-[clamp(1.875rem,4vw,3.75rem)] leading-[0.92] text-obsidian">
                    {kit.title}
                  </h3>
                ) : null}
                {hasText(kit.bestFor) ? (
                  <p className="home-v2-body mt-4">{kit.bestFor}</p>
                ) : null}
                {inclusions.length > 0 ? (
                  <ul className="mt-6 space-y-3">
                    {inclusions.map((line) => (
                      <li key={line} className="flex gap-3 text-[15px] leading-snug text-obsidian sm:text-[16px]">
                        <KitTick />
                        <span className="min-w-0 flex-1">{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-8 flex grow items-end">
                  {hasText(kit.cta?.label) ? (
                    <Link
                      href={kit.cta?.href ?? '/contact'}
                      className="inline-flex min-h-[44px] items-center border-b-2 border-signalYellow pb-0.5 text-[15px] font-semibold text-obsidian"
                    >
                      {kit.cta?.label}
                      <span aria-hidden="true" className="ml-2">
                        →
                      </span>
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
