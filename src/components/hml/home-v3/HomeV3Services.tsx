'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { serviceSlugs, services } from '@/config/services';
import { serviceHeroImage } from '@/lib/hml/serviceAssets';
import { hasText, isServiceCardsPopulated } from '@/lib/hml/homeV2';
import { useMediaQuery } from '@/lib/hml/useMediaQuery';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

const PAIN = homeV2Config.assets.problemPainImages;
const INDEX: Record<(typeof serviceSlugs)[number], string> = {
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
  const [openMobile, setOpenMobile] = useState(0);

  if (!isServiceCardsPopulated(homeV2Config.content)) return null;

  const blurb = serviceCards.blurb;
  const aiIdx = blurb.indexOf('People make the calls.');

  return (
    <section ref={reveal.ref} className={`px-5 py-20 sm:px-8 lg:px-12 ${reveal.className}`}>
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
          <div
            className="mt-12 flex min-h-[420px] gap-2 overflow-hidden rounded-2xl border border-obsidian/15"
            onMouseLeave={() => setActive(0)}
          >
            {serviceSlugs.map((slug, index) => {
              const svc = services[slug];
              const copy = serviceCards.items[slug];
              const expanded = active === index;
              return (
                <article
                  key={slug}
                  tabIndex={0}
                  className="relative flex min-w-0 flex-col border-r border-obsidian/10 bg-paper transition-[flex] duration-500 ease-out last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ flex: expanded ? '3.2 1 0%' : '1 1 0%' }}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <div className="flex min-h-[44px] items-end p-4">
                    <span className="h3-display text-2xl text-slate">{INDEX[slug]}</span>
                    <h3
                      className={`h3-display ml-3 text-obsidian transition-all duration-500 ${
                        expanded ? 'text-[clamp(1.5rem,2vw,2.5rem)]' : 'text-[clamp(0.85rem,1.2vw,1.1rem)] [writing-mode:vertical-rl] rotate-180'
                      }`}
                    >
                      <H3Words text={svc.title} />
                    </h3>
                  </div>
                  {expanded ? (
                    <div className="flex flex-1 flex-col px-4 pb-6">
                      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                          src={serviceHeroImage(slug)}
                          alt={svc.title}
                          fill
                          className="object-cover"
                          sizes="40vw"
                          loading="lazy"
                        />
                      </div>
                      {PAIN[index] ? (
                        <div className="relative mb-3 aspect-[3/2] w-full max-w-[200px] overflow-hidden rounded-md">
                          <Image src={PAIN[index]} alt="" fill className="object-cover" sizes="200px" loading="lazy" />
                        </div>
                      ) : null}
                      {hasText(copy.oneLiner) ? <p className="h3-body text-sm">{copy.oneLiner}</p> : null}
                      <Link
                        href={`/services/${slug}`}
                        className="mt-auto inline-flex min-h-[44px] items-center border-b-2 border-signalYellow pt-4 text-[15px] font-semibold"
                      >
                        View service →
                      </Link>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 space-y-2">
            {serviceSlugs.map((slug, index) => {
              const svc = services[slug];
              const copy = serviceCards.items[slug];
              const isOpen = openMobile === index;
              return (
                <div key={slug} className="rounded-xl border border-obsidian/15">
                  <button
                    type="button"
                    className="flex min-h-[44px] w-full items-center justify-between gap-4 px-4 py-3 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpenMobile(isOpen ? -1 : index)}
                  >
                    <span className="h3-display text-xl text-obsidian">
                      {INDEX[slug]} {svc.title}
                    </span>
                    <span aria-hidden className="text-2xl text-slate">
                      {isOpen ? '×' : '+'}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="border-t border-obsidian/10 px-4 pb-4 pt-3">
                      <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                          src={serviceHeroImage(slug)}
                          alt={svc.title}
                          fill
                          className="object-cover"
                          sizes="90vw"
                          loading="lazy"
                        />
                      </div>
                      {hasText(copy.oneLiner) ? <p className="h3-body">{copy.oneLiner}</p> : null}
                      <Link href={`/services/${slug}`} className="mt-4 inline-flex min-h-[44px] items-center font-semibold underline">
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
