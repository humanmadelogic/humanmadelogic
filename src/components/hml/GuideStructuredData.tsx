import { indexableGuides } from '@/config/guides';
import type { GuideDefinition } from '@/config/guides/types';
import { guideHeadlineForSchema } from '@/components/hml/GuideArticleView';
import { siteConfig } from '@/config/site';
import { faqItemsFromCopy } from '@/lib/hml/seoCopyMeta';
import { guideIsoDates } from '@/lib/hml/guideDates';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { guideArticleGraph, guidesHubGraph } from '@/lib/schema';
import { JsonLd } from './JsonLd';
import { ServiceFaqStructuredData } from './ServiceFaqStructuredData';

export function GuideStructuredData({ guide }: { guide: GuideDefinition }) {
  const copy = loadCopyMap(guide.copyFile);
  const dates = guideIsoDates(guide.publishedAt, guide.updatedAt);
  const path = `/guides/${guide.slug}`;
  const imageUrl = new URL(guide.ogImage, siteConfig.url).toString();
  const faqItems = faqItemsFromCopy(copy, { prefix: guide.prefix, max: 8 });

  return (
    <>
      <JsonLd
        data={guideArticleGraph({
          slug: guide.slug,
          headline: guideHeadlineForSchema(guide, copy),
          description: copy[`${guide.prefix}-META-DESC`],
          imageUrl,
          webPageTitle: copy[`${guide.prefix}-META-TITLE`],
          breadcrumbTitle: guide.breadcrumbTitle,
          ...dates,
          about: guide.about,
        })}
      />
      {faqItems.length > 0 ? <ServiceFaqStructuredData items={faqItems} path={path} /> : null}
    </>
  );
}

export function GuidesHubStructuredData() {
  const copy = loadCopyMap('guides-hub.json');
  const guides = indexableGuides().map((g) => {
    const gCopy = loadCopyMap(g.copyFile);
    return { slug: g.slug, title: gCopy[`${g.prefix}-H1`] };
  });

  return (
    <JsonLd
      data={guidesHubGraph({
        name: copy['GUIDES-META-TITLE'],
        description: copy['GUIDES-META-DESC'],
        guides,
      })}
    />
  );
}