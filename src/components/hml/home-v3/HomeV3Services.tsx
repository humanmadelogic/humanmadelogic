'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { serviceSlugs, services } from '@/config/services';
import type { ServiceSlug } from '@/config/services';
import { serviceHeroImage } from '@/lib/hml/serviceAssets';
import { hasText, isServiceCardsPopulated } from '@/lib/hml/homeV2';
import { useMediaQuery } from '@/lib/hml/useMediaQuery';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

const INDEX: Record<ServiceSlug, string> = {
  branding: '01',
  'seo-aeo-geo': '02',
  'performance-marketing': '03',
  'social-media': '04',
};

export function HomeV3Services() {
  const { serviceCards } = homeV2Config.content;
  const reveal = useH3Reveal<HTMLElement>();
  const desktop = useMediaQuery('(min-width: 1024px)');
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = useCallback((index: number) => setActive(index), []);

  const focusTab = useCallback((index: number) => {
    const i = ((index % serviceSlugs.length) + serviceSlugs.length) % serviceSlugs.length;
    pick(i);
    requestAnimationFrame(() => tabRefs.current[i]?.focus());
  }, [pick]);

  if (!isServiceCardsPopulated(homeV2Config.content)) return null;

  const blurb = serviceCards.blurb;
  const aiIdx = blurb.indexOf('People make the calls.');
  const activeSlug = serviceSlugs[active] ?? serviceSlugs[0];
  const activeService = services[activeSlug];
  const activeCopy = serviceCards.items[activeSlug];

  return (
    <section ref={reveal.ref} className={`h3-services px-5 py-20 sm:px-8 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto max-w-editorial min-w-0">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          {hasText(serviceCards.heading) ? (
            <h2 className="h3-display text-[clamp(2rem,6vw,4.5rem)] text-obsidian">
              <H3Words text={serviceCards.heading} />
            </h2>
          ) : null}
          {hasText(serviceCards.lede) ? <p className="h3-body max-w-[48ch]">{serviceCards.lede}</p> : null}
        </div>

        {desktop ? (
          <div className="mt-12 grid min-h-[min(520px,70vh)] grid-cols-[minmax(0,11fr)_minmax(0,13fr)] gap-10 lg:gap-14">
            <ul
              className="flex min-w-0 flex-col"
              role="tablist"
              aria-label={hasText(serviceCards.heading) ? serviceCards.heading : 'Services'}
            >
              {serviceSlugs.map((slug, index) => {
                const svc = services[slug];
                const selected = active === index;
                return (
                  <li key={slug} className="border-b border-obsidian/12 first:border-t">
                    <button
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`h3-svc-tab-${slug}`}
                      aria-selected={selected}
                      aria-controls="h3-svc-preview"
                      tabIndex={selected ? 0 : -1}
                      className={`group flex min-h-[44px] w-full flex-col gap-1 py-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                        selected ? 'text-obsidian' : 'text-slate hover:text-obsidian'
                      }`}
                      onMouseEnter={() => pick(index)}
                      onFocus={() => pick(index)}
                      onClick={() => pick(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                          event.preventDefault();
                          focusTab(index + 1);
                        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                          event.preventDefault();
                          focusTab(index - 1);
                        } else if (event.key === 'Home') {
                          event.preventDefault();
                          focusTab(0);
                        } else if (event.key === 'End') {
                          event.preventDefault();
                          focusTab(serviceSlugs.length - 1);
                        }
                      }}
                    >
                      <span
                        className={`h3-display text-[clamp(2.5rem,4vw,4rem)] leading-none transition-colors ${
                          selected ? 'h3-accent-num' : 'text-slate group-hover:text-obsidian'
                        }`}
                      >
                        {INDEX[slug]}
                      </span>
                      <span
                        className={`h3-display text-[clamp(1.35rem,2.2vw,2.5rem)] leading-[0.95] transition-transform duration-300 ${
                          selected ? 'translate-x-1' : ''
                        }`}
                      >
                        <H3Words text={svc.title} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              id="h3-svc-preview"
              role="tabpanel"
              aria-labelledby={`h3-svc-tab-${activeSlug}`}
              className="relative min-w-0 self-stretch"
            >
              <div className="sticky top-32 flex min-h-[420px] flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-obsidian/10 bg-[var(--h3-tint)]">
                  <Image
                    key={activeSlug}
                    src={serviceHeroImage(activeSlug)}
                    alt={activeService.title}
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="(min-width:1024px) 42vw, 90vw"
                    priority={active === 0}
                    loading={active === 0 ? undefined : 'lazy'}
                  />
                </div>
                {hasText(activeCopy.oneLiner) ? (
                  <p className="h3-body mt-6 max-w-[48ch] font-medium text-obsidian">{activeCopy.oneLiner}</p>
                ) : null}
                {activeCopy.tags?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {activeCopy.tags.filter((t) => hasText(t)).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-obsidian/20 px-3 py-1.5 text-[13px] text-obsidian"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  href={`/services/${activeSlug}`}
                  className="mt-6 inline-flex min-h-[44px] w-fit items-center rounded-sm px-1 py-2.5 text-[15px] font-semibold text-obsidian underline decoration-signalYellow decoration-2 underline-offset-[6px]"
                >
                  View service →
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-3">
            {serviceSlugs.map((slug, index) => {
              const svc = services[slug];
              const copy = serviceCards.items[slug];
              const isOpen = openMobile === index;
              return (
                <div key={slug} className="overflow-hidden rounded-2xl border border-obsidian/15">
                  <button
                    type="button"
                    className="flex min-h-[44px] w-full items-center justify-between gap-4 px-4 py-4 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpenMobile(isOpen ? null : index)}
                  >
                    <span className="h3-display text-xl text-obsidian">
                      <span className="mr-2 h3-accent-num">{INDEX[slug]}</span>
                      {svc.title}
                    </span>
                    <span aria-hidden className="text-2xl text-slate">
                      {isOpen ? '×' : '+'}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="border-t border-obsidian/10 px-4 pb-5 pt-3">
                      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-[var(--h3-tint)]">
                        <Image
                          src={serviceHeroImage(slug)}
                          alt={svc.title}
                          fill
                          className="object-cover"
                          sizes="92vw"
                          loading="lazy"
                        />
                      </div>
                      {hasText(copy.oneLiner) ? <p className="h3-body">{copy.oneLiner}</p> : null}
                      <Link
                        href={`/services/${slug}`}
                        className="mt-4 inline-flex min-h-[44px] items-center font-semibold underline decoration-signalYellow"
                      >
                        View service
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}

        {hasText(blurb) ? (
          <p className="h3-body mt-12 max-w-[70ch]">
            {aiIdx >= 0 ? (
              <>
                {blurb.slice(0, aiIdx)}
                <span className="h3-marker">{blurb.slice(aiIdx, aiIdx + 'People make the calls.'.length)}</span>
                {blurb.slice(aiIdx + 'People make the calls.'.length)}
              </>
            ) : (
              blurb
            )}
          </p>
        ) : null}
      </div>
    </section>
  );
}
