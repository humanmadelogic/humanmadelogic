'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { agency } from '@/config/agency';
import {
  getService,
  servicePage,
  serviceSlugs,
  servicesIndex,
  type ServiceDefinition,
  type ServiceSlug,
} from '@/config/services';
import {
  isFaqPopulated,
  isFinalCtaPopulated,
  isHeroPopulated,
  isHowItWorksPopulated,
  isHowWeUseAiPopulated,
  isPackageBandPopulated,
  isRelatedServicesPopulated,
  isWhatChangesPopulated,
  isWhatYouGetPopulated,
  isWhoItsForPopulated,
} from '@/lib/hml/serviceExpanded';
import {
  serviceFeatureImage,
  serviceHeroImage,
  servicePainImage,
  serviceStepIcon,
} from '@/lib/hml/serviceAssets';
import { RevealText } from './RevealText';
import { ServiceOptionalImage } from './service/ServiceOptionalImage';
import { ServiceMobileStickyCta } from './service/ServiceMobileStickyCta';

function OptionalStepIcon({ slug, index }: { slug: ServiceSlug; index: 1 | 2 | 3 | 4 }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <Image
      src={serviceStepIcon(slug, index)}
      alt=""
      width={40}
      height={40}
      className="h-10 w-10 shrink-0"
      aria-hidden
      onError={() => setHidden(true)}
    />
  );
}

type Props = { service: ServiceDefinition };

export function ServiceExpandedView({ service }: Props) {
  const e = service.expanded;
  const stickyLabel =
    e.hero.primaryCtaLabel.trim() || (isFinalCtaPopulated(e.finalCta) ? e.finalCta.ctaLabel : '');
  const stickyHref =
    e.hero.primaryCtaHref.trim() || (isFinalCtaPopulated(e.finalCta) ? e.finalCta.ctaHref : agency.cta.href);

  return (
  <>
    {isHeroPopulated(e.hero) ? (
      <section className="pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">
            {service.index} · {servicePage.eyebrowSuffix}
          </p>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <RevealText
                as="h1"
                immediate
                lines={[service.title]}
                className="text-[11vw] leading-[0.95] tracking-[-0.05em] sm:text-[8vw] lg:text-[64px]"
              />
              {e.hero.subline.trim() ? (
                <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-slate">{e.hero.subline}</p>
              ) : null}
              <div className="mt-10 flex flex-wrap gap-3">
                {e.hero.primaryCtaLabel.trim() && e.hero.primaryCtaHref.trim() ? (
                  <Link
                    href={e.hero.primaryCtaHref}
                    className="inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper transition-colors hover:bg-obsidian/85"
                  >
                    {e.hero.primaryCtaLabel}
                  </Link>
                ) : null}
                {e.hero.secondaryCtaLabel.trim() && e.hero.secondaryCtaHref.trim() ? (
                  <Link
                    href={e.hero.secondaryCtaHref}
                    className="inline-flex h-12 items-center rounded-full border border-obsidian/20 px-6 text-[15px] transition-colors hover:border-obsidian/45"
                  >
                    {e.hero.secondaryCtaLabel}
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="lg:col-span-5">
              <ServiceOptionalImage
                src={serviceHeroImage(service.slug)}
                alt={e.hero.imageAlt}
                width={1200}
                height={900}
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
    ) : null}

    {isWhoItsForPopulated(e.whoItsFor) ? (
      <section className="border-t border-obsidian/10 py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.whoItsFor.intro.trim() ? (
            <p className="max-w-[62ch] text-[17px] leading-[1.65] text-slate">{e.whoItsFor.intro}</p>
          ) : null}
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {([1, 2, 3] as const).map((n, idx) => {
              const point = e.whoItsFor.painPoints[idx];
              if (!point.title.trim() && !point.description.trim()) return null;
              return (
                <li key={n} className="flex flex-col gap-4 rounded-[14px] border border-obsidian/10 p-6">
                  <ServiceOptionalImage
                    src={servicePainImage(service.slug, n)}
                    alt={point.imageAlt}
                    width={800}
                    height={600}
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                  {point.title.trim() ? (
                    <h3 className="text-[20px] tracking-[-0.03em] text-obsidian">{point.title}</h3>
                  ) : null}
                  {point.description.trim() ? (
                    <p className="text-[15px] leading-[1.6] text-slate">{point.description}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ) : null}

    {isWhatYouGetPopulated(e.whatYouGet) ? (
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.whatYouGet.heading.trim() ? (
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate">{e.whatYouGet.heading}</h2>
          ) : null}
          {e.whatYouGet.intro.trim() ? (
            <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{e.whatYouGet.intro}</p>
          ) : null}
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {e.whatYouGet.deliverables.map((card, i) => {
                if (!card.title.trim() && !card.description.trim()) return null;
                return (
                  <li key={i} className="rounded-[14px] border border-obsidian/10 p-5">
                    {card.title.trim() ? (
                      <h3 className="text-[17px] font-medium tracking-[-0.02em] text-obsidian">{card.title}</h3>
                    ) : null}
                    {card.description.trim() ? (
                      <p className="mt-2 text-[15px] leading-[1.6] text-slate">{card.description}</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <div className="lg:col-span-5">
              <ServiceOptionalImage
                src={serviceFeatureImage(service.slug)}
                alt={e.whatYouGet.featureImageAlt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
    ) : null}

    {isHowItWorksPopulated(e.howItWorks) ? (
      <section className="border-y border-obsidian/10 py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.howItWorks.heading.trim() ? (
            <h2 className="text-[30px] tracking-[-0.03em] sm:text-[36px]">{e.howItWorks.heading}</h2>
          ) : null}
          <ol
            className={`relative mt-12 space-y-10 ${
              e.howItWorks.showTimeline ? 'border-l border-obsidian/10 pl-8 sm:pl-10' : ''
            }`}
          >
            {e.howItWorks.steps.map((step, idx) => {
              const n = (idx + 1) as 1 | 2 | 3 | 4;
              if (!step.title.trim() && !step.description.trim()) return null;
              return (
                <li key={n} className="relative">
                  <div className="flex gap-4">
                    <OptionalStepIcon slug={service.slug} index={n} />
                    <div>
                      <p className="text-[12px] tabular-nums tracking-[0.18em] text-slate">
                        {String(n).padStart(2, '0')}
                      </p>
                      {step.title.trim() ? (
                        <h3 className="mt-2 text-[22px] tracking-[-0.03em]">{step.title}</h3>
                      ) : null}
                      {step.description.trim() ? (
                        <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.65] text-slate">{step.description}</p>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    ) : null}

    {isWhatChangesPopulated(e.whatChanges) ? (
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.whatChanges.heading.trim() ? (
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate">{e.whatChanges.heading}</h2>
          ) : null}
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {e.whatChanges.outcomes.map((card, i) => {
              if (!card.title.trim() && !card.description.trim()) return null;
              return (
                <li key={i} className="rounded-[14px] border border-obsidian/10 p-6">
                  {card.title.trim() ? (
                    <h3 className="text-[18px] tracking-[-0.02em] text-obsidian">{card.title}</h3>
                  ) : null}
                  {card.description.trim() ? (
                    <p className="mt-3 text-[15px] leading-[1.6] text-slate">{card.description}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    ) : null}

    {isHowWeUseAiPopulated(e.howWeUseAi) ? (
      <section className="border-y border-obsidian/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.howWeUseAi.heading.trim() ? (
            <h2 className="text-[22px] tracking-[-0.03em] sm:text-[28px]">{e.howWeUseAi.heading}</h2>
          ) : null}
          {e.howWeUseAi.body.trim() ? (
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-slate">{e.howWeUseAi.body}</p>
          ) : null}
        </div>
      </section>
    ) : null}

    {isPackageBandPopulated(e.packageBand) ? (
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.packageBand.heading.trim() ? (
            <h2 className="text-[22px] tracking-[-0.03em]">{e.packageBand.heading}</h2>
          ) : null}
          {e.packageBand.body.trim() ? (
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-slate">{e.packageBand.body}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {e.packageBand.servicesLinkLabel.trim() ? (
              <Link
                href="/services"
                className="inline-flex h-11 items-center rounded-full border border-obsidian/20 px-5 text-[14px]"
              >
                {e.packageBand.servicesLinkLabel}
              </Link>
            ) : null}
            {e.packageBand.contactLinkLabel.trim() ? (
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-full bg-obsidian px-5 text-[14px] font-medium text-paper"
              >
                {e.packageBand.contactLinkLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    ) : null}

    {isFaqPopulated(e.faq) ? (
      <section className="border-t border-obsidian/10 py-20 sm:py-28" aria-labelledby={`${service.slug}-faq-heading`}>
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.faq.heading.trim() ? (
            <h2 id={`${service.slug}-faq-heading`} className="text-[30px] tracking-[-0.03em]">
              {e.faq.heading}
            </h2>
          ) : null}
          <div className="mt-10 divide-y divide-obsidian/10 border-y border-obsidian/10">
            {e.faq.items
              .filter((item) => item.question.trim() && item.answer.trim())
              .map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="cursor-pointer list-none text-[17px] font-medium tracking-[-0.02em] text-obsidian marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}
                      <span
                        aria-hidden="true"
                        className="text-slate transition-transform group-open:rotate-45 motion-reduce:transition-none motion-reduce:transform-none"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-slate">{item.answer}</p>
                </details>
              ))}
          </div>
        </div>
      </section>
    ) : null}

    {isRelatedServicesPopulated(e.relatedServices) ? (
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.relatedServices.heading.trim() ? (
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate">{e.relatedServices.heading}</h2>
          ) : null}
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {serviceSlugs
              .filter((slug) => slug !== service.slug)
              .map((slug) => {
                const related = getService(slug);
                if (!related) return null;
                return (
                  <li key={slug} className="rounded-[14px] border border-obsidian/10 p-6">
                    <p className="text-[12px] tabular-nums tracking-[0.18em] text-slate">{related.index}</p>
                    <h3 className="mt-3 text-[22px] tracking-[-0.03em]">
                      <Link href={`/services/${slug}`} className="hover:underline">
                        {related.title}
                      </Link>
                    </h3>
                    {related.summary.trim() ? (
                      <p className="mt-3 text-[15px] leading-[1.6] text-slate">{related.summary}</p>
                    ) : null}
                    <Link href={`/services/${slug}`} className="mt-6 inline-flex text-[14px] font-medium text-obsidian">
                      {servicesIndex.viewServiceLabel}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    ) : null}

    {isFinalCtaPopulated(e.finalCta) ? (
      <section className="relative overflow-hidden bg-obsidian py-20 text-paper sm:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {e.finalCta.heading.trim() ? (
            <h2 className="text-[9vw] leading-[1.02] tracking-[-0.04em] sm:text-[48px]">{e.finalCta.heading}</h2>
          ) : null}
          {e.finalCta.body.trim() ? (
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.6] text-paper/70">{e.finalCta.body}</p>
          ) : null}
          {e.finalCta.ctaLabel.trim() && e.finalCta.ctaHref.trim() ? (
            <Link
              href={e.finalCta.ctaHref}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-signalYellow px-6 text-[15px] font-medium text-obsidian"
            >
              {e.finalCta.ctaLabel}
            </Link>
          ) : null}
        </div>
      </section>
    ) : null}

    <ServiceMobileStickyCta href={stickyHref} label={stickyLabel} />
    <div className="h-16 md:hidden" aria-hidden="true" />
  </>
  );
}
