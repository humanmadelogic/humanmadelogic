'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { serviceSlugs, services } from '@/config/services';
import { serviceHeroImage } from '@/lib/hml/serviceAssets';
import { hasText, isServiceCardsPopulated } from '@/lib/hml/homeV2';
import { useScrollReveal } from './useScrollReveal';

function ServiceCardImage({ slug, alt }: { slug: (typeof serviceSlugs)[number]; alt: string }) {
  const [missing, setMissing] = useState(false);
  const src = serviceHeroImage(slug);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[14px] bg-paper">
      {!missing ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 22vw, 78vw"
          className="object-cover"
          onError={() => setMissing(true)}
        />
      ) : null}
    </div>
  );
}

export function HomeServicesCardsSection() {
  const { serviceCards } = homeV2Config.content;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isServiceCardsPopulated(homeV2Config.content)) return null;

  return (
    <section
      ref={reveal.ref}
      className={`bg-paper py-16 sm:py-24 lg:py-28 ${reveal.className}`}
      aria-labelledby={hasText(serviceCards.heading) ? 'home-services-heading' : undefined}
    >
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        {hasText(serviceCards.heading) ? (
          <h2 id="home-services-heading" className="text-[30px] tracking-[-0.03em] sm:text-[36px]">
            {serviceCards.heading}
          </h2>
        ) : null}
        {hasText(serviceCards.lede) ? (
          <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.65] text-slate">{serviceCards.lede}</p>
        ) : null}

        <div className="home-v2-snap-row mt-12 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:pb-0">
          {serviceSlugs.map((slug) => {
            const service = services[slug];
            const copy = serviceCards.items[slug];
            const tags = copy.tags.filter((tag) => hasText(tag));
            const showCard =
              hasText(copy.oneLiner) || tags.length > 0 || hasText(service.title);

            if (!showCard) return null;

            return (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="home-v2-snap-card min-w-[min(78vw,360px)] shrink-0 overflow-hidden rounded-[14px] border border-obsidian/10 bg-paper transition-shadow hover:shadow-panel lg:min-w-0"
              >
                <ServiceCardImage slug={slug} alt={service.title} />
                <div className="p-5 sm:p-6">
                  <h3 className="text-[20px] tracking-[-0.03em] text-obsidian">{service.title}</h3>
                  {hasText(copy.oneLiner) ? (
                    <p className="mt-3 text-[16px] leading-[1.6] text-slate">{copy.oneLiner}</p>
                  ) : null}
                  {tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-obsidian/15 px-3 py-1 text-[13px] text-obsidian"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="mt-5 inline-flex min-h-11 items-center text-[15px] font-medium text-obsidian">
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

        {hasText(serviceCards.blurb) ? (
          <p className="mt-12 w-full max-w-[70ch] text-[16px] leading-[1.65] text-slate">
            {serviceCards.blurb}
          </p>
        ) : null}
      </div>
    </section>
  );
}
