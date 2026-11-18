import Image from 'next/image';
import Link from 'next/link';
import { indexableGuides } from '@/config/guides';
import { kitsAiVisibilityCta } from '@/config/kits-cta';
import { guideUpdatedLine } from '@/lib/hml/guideDates';
import { guideReadingMinutesLabel } from '@/lib/hml/guideReadingTime';
import type { GuideDefinition } from '@/config/guides/types';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { Breadcrumb } from './Breadcrumb';
import { HmlCtaBand } from './HmlCtaBand';

function guideCardImageSrc(slug: string, density: 1 | 2 = 1) {
  const suffix = density === 2 ? '@2x' : '';
  return `/images/hml/guides/card-guide-${slug}${suffix}.webp`;
}

export function GuidesHubView() {
  const copy = loadCopyMap('guides-hub.json');
  const guides = indexableGuides();

  return (
    <>
      <Breadcrumb trail={copy['GUIDES-BREADCRUMB']} />
      <section className="pb-12 pt-6">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h1 className="text-[10vw] leading-[0.95] tracking-[-0.05em] sm:text-[8vw] lg:text-[56px]">
            {copy['GUIDES-H1']}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{copy['GUIDES-INTRO']}</p>
        </div>
      </section>

      <section className="border-t border-obsidian/10 py-16" aria-labelledby="guides-pillars">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 id="guides-pillars" className="sr-only">
            Guide pillars
          </h2>
          <ul className="grid gap-8 md:grid-cols-2">
            {(['SEARCH', 'BRAND', 'ADS', 'LOCAL'] as const).map((key) => (
              <li key={key} className="rounded-[14px] border border-obsidian/10 p-6">
                <h2 className="text-[18px] font-medium tracking-[-0.02em]">{copy[`GUIDES-PILLAR-${key}-NAME`]}</h2>
                <p className="mt-2 text-[15px] leading-[1.6] text-slate">{copy[`GUIDES-PILLAR-${key}-INTRO`]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16" aria-labelledby="guides-cards">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 id="guides-cards" className="text-[11px] uppercase tracking-[0.2em] text-slate">
            Published guides
          </h2>
          <ul className="mt-10 grid gap-10 lg:grid-cols-2">
            {guides.map((guide) => {
              const cardKey = guide.hubCardKey;
              const updated = guideUpdatedLine(guide.publishedAt, copy[`GUIDES-CARD-${cardKey}-DATE`]);
              return (
                <li key={guide.slug} className="flex flex-col gap-5">
                  <Link href={`/guides/${guide.slug}`} className="block overflow-hidden rounded-[14px] border border-obsidian/10">
                    <Image
                      src={guideCardImageSrc(guide.cardImageSlug)}
                      alt=""
                      width={640}
                      height={360}
                      className="h-auto w-full"
                      sizes="(min-width: 1024px) 28vw, 100vw"
                    />
                  </Link>
                  <GuideCardMeta
                    guide={guide}
                    tag={copy[`GUIDES-CARD-${cardKey}-TAG`]}
                    title={copy[`GUIDES-CARD-${cardKey}-TITLE`]}
                    line={copy[`GUIDES-CARD-${cardKey}-LINE`]}
                    author={copy[`GUIDES-CARD-${cardKey}-AUTHOR`]}
                    updated={updated}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="rowan-blake" className="border-y border-obsidian/10 py-12">
        <div className="mx-auto max-w-editorial px-5 text-[15px] leading-[1.6] text-slate sm:px-8 lg:px-12">
          <p>
            <strong className="font-medium text-obsidian">Rowan Blake</strong> writes plain-English guides for founders at
            Human Made Logic, on being remembered, found and named. Rowan Blake is the pen name of our guides team.
          </p>
        </div>
      </section>

      <HmlCtaBand
        heading={copy['GUIDES-CTA-H2']}
        body={copy['GUIDES-CTA-BTN-NOTE']}
        primaryLabel={copy['GUIDES-CTA-BTN']}
        primaryHref={kitsAiVisibilityCta.href}
        checkNote={copy['GUIDES-CTA-BTN-NOTE']}
        checkLabel={copy['GUIDES-CTA-BTN']}
        footnote={copy['GUIDES-CTA-NOTE']}
      />
      <div className="bg-obsidian pb-16 text-center">
        <Link href="/contact" className="text-[15px] text-paper underline">
          {copy['GUIDES-CTA-LINK']}
        </Link>
      </div>
    </>
  );
}

function GuideCardMeta({
  guide,
  tag,
  title,
  line,
  author,
  updated,
}: {
  guide: GuideDefinition;
  tag: string;
  title: string;
  line: string;
  author: string;
  updated: string;
}) {
  const reading = guideReadingMinutesLabel(guide);
  const metaLine = [author, updated, reading].filter(Boolean).join(' · ');

  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.16em] text-slate">{tag}</p>
      <h3 className="mt-2 text-[22px] tracking-[-0.03em]">
        <Link href={`/guides/${guide.slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-[15px] leading-[1.6] text-slate">{line}</p>
      <p className="mt-4 text-[13px] text-slate">{metaLine}</p>
    </div>
  );
}