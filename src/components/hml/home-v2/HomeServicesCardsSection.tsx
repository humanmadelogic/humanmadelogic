'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { serviceSlugs, services } from '@/config/services';
import { serviceHeroImage } from '@/lib/hml/serviceAssets';
import { hasText, isServiceCardsPopulated } from '@/lib/hml/homeV2';
import { useScrollReveal } from './useScrollReveal';

const SLUG_INDEX: Record<(typeof serviceSlugs)[number], string> = {
  branding: '01',
  'seo-aeo-geo': '02',
  'performance-marketing': '03',
  'social-media': '04',
};

function ServiceCardImage({ slug, alt }: { slug: (typeof serviceSlugs)[number]; alt: string }) {
  const [missing, setMissing] = useState(false);
  const src = serviceHeroImage(slug);

  return (
    <div className="home-v2-card-img relative aspect-video w-full overflow-hidden border-b-[1.5px] border-obsidian bg-paper">
      {!missing ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 22vw, 78vw"
          className="object-cover object-center"
          onError={() => setMissing(true)}
        />
      ) : null}
    </div>
  );
}

function BlurbParagraph({ text }: { text: string }) {
  const needle = 'People make the calls.';
  const idx = text.indexOf(needle);
  if (idx < 0) {
    return <p className="home-v2-body mt-12 max-w-[70ch]">{text}</p>;
  }
  return (
    <p className="home-v2-body mt-12 max-w-[70ch]">
      {text.slice(0, idx)}
      <span className="home-v2-marker">{needle}</span>
    </p>
  );
}

export function HomeServicesCardsSection() {
  const { serviceCards } = homeV2Config.content;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isServiceCardsPopulated(homeV2Config.content)) return null;

  return (
    <section
      ref={reveal.ref}
      className={`border-t border-obsidian/10 bg-paper px-5 py-16 sm:px-8 sm:py-24 lg:px-12 ${reveal.className}`}
      aria-labelledby={hasText(serviceCards.heading) ? 'home-services-heading' : undefined}
    >
      <div className="mx-auto max-w-editorial">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-14">
          {hasText(serviceCards.heading) ? (
            <h2
              id="home-services-heading"
              className="home-v2-display text-[clamp(2.5rem,7.2vw,6.5rem)] leading-[0.88] text-obsidian"
            >
              {serviceCards.heading}
            </h2>
          ) : null}
          {hasText(serviceCards.lede) ? (
            <p className="home-v2-body-lg max-w-[48ch]">{serviceCards.lede}</p>
          ) : null}
        </div>

        <div className="home-v2-snap-row mt-12 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:pb-0">
          {serviceSlugs.map((slug) => {
            const service = services[slug];
            const copy = serviceCards.items[slug];
            const tags = copy.tags.filter((tag) => hasText(tag));

            return (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="home-v2-card home-v2-snap-card min-w-[min(78vw,312px)] shrink-0 overflow-hidden rounded-[18px] border-[1.5px] border-obsidian bg-paper lg:min-w-0"
              >
                <ServiceCardImage slug={slug} alt={service.title} />
                <div className="p-6 sm:p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="home-v2-display text-[30px] text-slate">{SLUG_INDEX[slug]}</span>
                    <h3 className="home-v2-display text-[clamp(1.75rem,4.2vw,3.625rem)] leading-[0.9] text-obsidian">
                      {service.title}
                    </h3>
                  </div>
                  {hasText(copy.oneLiner) ? (
                    <p className="home-v2-body mt-4 max-w-[34ch]">{copy.oneLiner}</p>
                  ) : null}
                  {tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-obsidian px-3 py-1.5 text-[13px] font-medium text-obsidian"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="mt-6 inline-flex min-h-[44px] items-center border-b-2 border-signalYellow pb-0.5 text-[15px] font-semibold text-obsidian">
                    View service
                    <span aria-hidden="true" className="ml-2">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {hasText(serviceCards.blurb) ? <BlurbParagraph text={serviceCards.blurb} /> : null}
      </div>
    </section>
  );
}
