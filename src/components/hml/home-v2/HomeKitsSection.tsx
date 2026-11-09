'use client';

import Link from 'next/link';
import { homeV2Config, type HomeV2Kit } from '@/config/home-v2';
import { hasText, isKitPopulated, isKitsPopulated } from '@/lib/hml/homeV2';
import { useScrollReveal } from './useScrollReveal';

export function HomeKitsSection() {
  const { kits } = homeV2Config.content;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isKitsPopulated(homeV2Config.content)) return null;

  const populated: HomeV2Kit[] = kits.items.filter(isKitPopulated).slice(0, 3);

  return (
    <section
      ref={reveal.ref}
      className={`bg-paper py-16 sm:py-24 lg:py-28 ${reveal.className}`}
      aria-labelledby={hasText(kits.heading) ? 'home-kits-heading' : undefined}
    >
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        {hasText(kits.heading) ? (
          <h2 id="home-kits-heading" className="text-[30px] tracking-[-0.03em] sm:text-[36px]">
            {kits.heading}
          </h2>
        ) : null}

        <div className="home-v2-snap-row mt-12 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0">
          {populated.map((kit, index) => {
            const inclusions = kit.inclusions?.filter((line) => hasText(line)) ?? [];
            return (
              <article
                key={kit.title || `kit-${index}`}
                className="home-v2-snap-card flex min-w-[min(82vw,300px)] max-w-[calc(100vw-2.5rem)] shrink-0 flex-col rounded-[14px] border border-obsidian/10 bg-paper p-5 sm:min-w-[min(78vw,320px)] sm:p-6 lg:min-w-0 lg:max-w-none"
              >
                {hasText(kit.title) ? (
                  <h3 className="break-words text-[17px] font-medium leading-snug tracking-[-0.02em] text-obsidian sm:text-[18px]">
                    {kit.title}
                  </h3>
                ) : null}
                {hasText(kit.bestFor) ? (
                  <p className="mt-3 break-words text-[15px] leading-[1.55] text-slate">{kit.bestFor}</p>
                ) : null}
                {inclusions.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-[15px] leading-[1.55] text-obsidian">
                    {inclusions.map((line) => (
                      <li key={line} className="flex gap-2 break-words">
                        <span aria-hidden="true" className="shrink-0 text-slate">
                          ·
                        </span>
                        <span className="min-w-0 flex-1">{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {hasText(kit.price) ? (
                  <p className="mt-4 break-words text-[16px] font-medium text-obsidian">{kit.price}</p>
                ) : null}
                <div className="mt-6 flex grow items-end">
                  {hasText(kit.cta?.label) ? (
                    <Link
                      href={kit.cta?.href ?? '/contact'}
                      className="inline-flex min-h-11 items-center break-words text-[15px] font-medium text-obsidian underline-offset-4 hover:underline"
                    >
                      {kit.cta?.label}
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
