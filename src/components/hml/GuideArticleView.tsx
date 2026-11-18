import Link from 'next/link';
import type { GuideDefinition } from '@/config/guides/types';
import { kitsAiVisibilityCta } from '@/config/kits-cta';
import { contactHref } from '@/lib/hml/contactTopics';
import { guideUpdatedLine } from '@/lib/hml/guideDates';
import { guideFullArticle } from '@/lib/hml/guideFullArticle';
import { guideReadingMinutesLabel } from '@/lib/hml/guideReadingTime';
import { pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { Breadcrumb } from './Breadcrumb';
import { GuideArticleProse } from './GuideArticleProse';
import { HmlCtaBand } from './HmlCtaBand';
import { SeoAeoGeoHeadline } from './SeoAeoGeoHeadline';

type Props = { guide: GuideDefinition };

export function GuideArticleView({ guide }: Props) {
  const copy = loadCopyMap(guide.copyFile);
  const { prefix } = guide;
  const updated = guideUpdatedLine(guide.publishedAt, copy[`${prefix}-UPDATED`]);
  const article = guideFullArticle(guide.slug);
  const reading = guideReadingMinutesLabel(guide);

  if (!article) {
    throw new Error(`Missing full article artifact for guide slug "${guide.slug}". Run npm run parse:copy.`);
  }

  return (
    <>
      <Breadcrumb trail={copy[`${prefix}-BREADCRUMB`]} />
      <article className="pb-8 pt-6">
        <header className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h1
            data-guide-display-headline={guide.slug === 'seo-vs-aeo-vs-geo' ? '' : undefined}
            className="text-[10vw] leading-[0.98] tracking-[-0.05em] sm:text-[7vw] lg:text-[52px]"
          >
            {guide.slug === 'seo-vs-aeo-vs-geo' ? <SeoAeoGeoHeadline /> : copy[`${prefix}-H1`]}
          </h1>
          <p className="mt-6 text-[15px] text-obsidian">
            By{' '}
            <Link
              href="/guides#rowan-blake"
              id="rowan-blake"
              className="underline decoration-obsidian/25 underline-offset-2"
            >
              {copy[`${prefix}-BYLINE`]}
            </Link>
          </p>
          <p className="mt-1 text-[14px] text-slate">{copy[`${prefix}-REVIEWED`]}</p>
          <p className="mt-1 text-[14px] text-slate">{updated}</p>
          {reading ? <p className="mt-1 text-[14px] text-slate">{reading}</p> : null}
        </header>

        <div className="mx-auto mt-12 min-w-0 max-w-full px-5 sm:max-w-editorial sm:px-8 lg:px-12">
          <GuideArticleProse html={article.html} />
        </div>
      </article>

      <HmlCtaBand
        heading={copy[`${prefix}-CTA-H2`]}
        body={copy[`${prefix}-CTA-BTN-NOTE`]}
        primaryLabel={copy[`${prefix}-CTA-BTN`]}
        primaryHref={kitsAiVisibilityCta.href}
        checkNote={copy[`${prefix}-CTA-BTN-NOTE`]}
        checkLabel={copy[`${prefix}-CTA-BTN`]}
        footnote={copy[`${prefix}-CTA-NOTE`]}
      />
      {copy[`${prefix}-CTA-LINK`]?.trim() ? (
        <div className="bg-obsidian pb-16 text-center text-paper">
          <Link
            href={guide.slug === 'seo-vs-aeo-vs-geo' ? contactHref('Authority Kit') : '/contact'}
            className="text-[15px] underline"
          >
            {copy[`${prefix}-CTA-LINK`]}
          </Link>
        </div>
      ) : null}
    </>
  );
}

export function guideHeadlineForSchema(guide: GuideDefinition, copy: Record<string, string>) {
  const raw = copy[`${guide.prefix}-H1`];
  return pageTitleFromCopy(copy[`${guide.prefix}-META-TITLE`] ?? raw);
}