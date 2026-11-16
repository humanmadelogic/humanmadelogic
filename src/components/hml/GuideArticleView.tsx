import Link from 'next/link';
import { g1SupplementaryCopy } from '@/config/guides/seo-vs-aeo-vs-geo';
import { g2SupplementaryCopy } from '@/config/guides/cited-by-chatgpt';
import { g1NextBodyLinks, g2NextBodyLinks } from '@/config/guideCopyLinks';
import type { GuideDefinition } from '@/config/guides/types';
import { kitsAiVisibilityCta } from '@/config/kits-cta';
import { contactHref } from '@/lib/hml/contactTopics';
import { CopyRichText } from '@/lib/hml/copyRichText';
import { guideUpdatedLine } from '@/lib/hml/guideDates';
import { faqItemsFromCopy, pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { Breadcrumb } from './Breadcrumb';
import { HmlCtaBand } from './HmlCtaBand';
import { SeoAeoGeoHeadline } from './SeoAeoGeoHeadline';

const SUPPLEMENT: Record<string, Record<string, string>> = {
  'seo-vs-aeo-vs-geo': g1SupplementaryCopy,
  'cited-by-chatgpt': g2SupplementaryCopy,
};

function resolveBody(copy: Record<string, string>, bodyKey: string, slug: string) {
  return copy[bodyKey] ?? SUPPLEMENT[slug]?.[bodyKey] ?? '';
}

type Props = { guide: GuideDefinition };

export function GuideArticleView({ guide }: Props) {
  const copy = loadCopyMap(guide.copyFile);
  const { prefix } = guide;
  const faqItems = faqItemsFromCopy(copy, { prefix, max: 8 });
  const updated = guideUpdatedLine(guide.publishedAt, copy[`${prefix}-UPDATED`]);
  const nextLinks = guide.slug === 'seo-vs-aeo-vs-geo' ? g1NextBodyLinks : g2NextBodyLinks;
  const reading =
    guide.readingMinutes && !copy[`GUIDES-CARD-G1-TIME`]?.includes('Jeff')
      ? `${guide.readingMinutes} min read`
      : copy[`GUIDES-CARD-${guide.hubCardKey}-TIME`]?.replace(/\[Reading time:\s*/i, '').replace(/\]$/, '') ??
        undefined;

  return (
    <>
      <Breadcrumb trail={copy[`${prefix}-BREADCRUMB`]} />
      <article className="pb-8 pt-6">
        <header className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h1 className="text-[10vw] leading-[0.98] tracking-[-0.05em] sm:text-[7vw] lg:text-[52px]">
            {guide.slug === 'seo-vs-aeo-vs-geo' ? (
              <SeoAeoGeoHeadline />
            ) : (
              copy[`${prefix}-H1`]
            )}
          </h1>
          <p className="mt-6 text-[15px] text-obsidian">
            By{' '}
            <Link href="/guides#rowan-blake" id="rowan-blake" className="underline decoration-obsidian/25 underline-offset-2">
              {copy[`${prefix}-BYLINE`]}
            </Link>
          </p>
          <p className="mt-1 text-[14px] text-slate">{copy[`${prefix}-REVIEWED`]}</p>
          <p className="mt-1 text-[14px] text-slate">{updated}</p>
          {reading && !reading.includes('Jeff') ? (
            <p className="mt-1 text-[14px] text-slate">{reading}</p>
          ) : null}
        </header>

        <div className="mx-auto mt-12 max-w-editorial space-y-14 px-5 sm:px-8 lg:px-12">
          {guide.sections.map((section, index) => {
            if (section.kind === 'prose') {
              return (
                <div
                  key={`prose-${index}`}
                  className="max-w-[62ch] [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-slate"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              );
            }
            if (section.kind === 'body') {
              const text = copy[section.bodyKey];
              const isCallout = section.bodyKey.includes('NOGUARANTEE');
              return (
                <blockquote
                  key={section.bodyKey}
                  className={
                    isCallout
                      ? 'max-w-[62ch] border-l-4 border-signalYellow pl-5 text-[16px] leading-[1.6] text-obsidian'
                      : 'max-w-[62ch] text-[17px] leading-[1.65] text-slate'
                  }
                >
                  {text}
                </blockquote>
              );
            }
            const heading = copy[section.headingKey];
            const body = resolveBody(copy, section.bodyKey, guide.slug);
            return (
              <section key={section.headingKey} className="max-w-[62ch]">
                <h2 className="text-[28px] tracking-[-0.03em]">{heading}</h2>
                <p className="mt-4 text-[17px] leading-[1.65] text-slate">{body}</p>
              </section>
            );
          })}

          <section aria-labelledby={`${guide.slug}-faq`}>
            <h2 id={`${guide.slug}-faq`} className="text-[28px] tracking-[-0.03em]">
              {copy[`${prefix}-FAQ-H2`]}
            </h2>
            <div className="mt-8 divide-y divide-obsidian/10 border-y border-obsidian/10">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="cursor-pointer list-none py-2 text-[17px] font-medium text-obsidian marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}
                      <span aria-hidden className="text-slate group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-[1.65] text-slate">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[28px] tracking-[-0.03em]">{copy[`${prefix}-NEXT-H2`]}</h2>
            <CopyRichText
              className="mt-4 text-[17px] leading-[1.65] text-slate"
              text={copy[`${prefix}-NEXT-BODY`]}
              phraseLinks={nextLinks}
            />
          </section>

          <footer className="border-t border-obsidian/10 pt-8 text-[14px] leading-[1.6] text-slate">
            <p>{copy[`${prefix}-BIO`]}</p>
          </footer>
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
          <Link href={guide.slug === 'seo-vs-aeo-vs-geo' ? contactHref('Authority Kit') : '/contact'} className="text-[15px] underline">
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