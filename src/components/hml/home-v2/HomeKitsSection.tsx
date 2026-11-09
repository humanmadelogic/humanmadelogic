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
                className="home-v2-snap-card flex min-w-[min(78vw,320px)] shrink-0 flex-col rounded-[14px] border border-obsidian/10 bg-paper p-5 sm:p-6 lg:min-w-0"
              >
                {hasText(kit.title) ? (
                  <h3 className="text-[18px] font-medium tracking-[-0.02em] text-obsidian">{kit.title}</h3>
                ) : null}
                {hasText(kit.body) ? (
                  <p className="mt-2 text-[15px] leading-[1.6] text-slate">{kit.body}</p>
                ) : null}
                {hasText(kit.bestFor) ? (
                  <p className="mt-3 text-[14px] leading-[1.5] text-slate">
                    <span className="font-medium text-obsidian">Best for: </span>
                    {kit.bestFor}
                  </p>
                ) : null}
                {inclusions.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-[15px] leading-[1.55] text-obsidian">
                    {inclusions.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span aria-hidden="true" className="text-slate">
                          ·
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {hasText(kit.price) ? (
                  <p className="mt-4 text-[16px] font-medium text-obsidian">{kit.price}</p>
                ) : null}
                <div className="mt-6 flex grow items-end">
                  {hasText(kits.linkLabel) ? (
                    <Link
                      href="/contact"
                      className="inline-flex min-h-11 items-center text-[15px] font-medium text-obsidian underline-offset-4 hover:underline"
                    >
                      {kits.linkLabel}
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
