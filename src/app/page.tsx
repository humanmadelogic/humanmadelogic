import type { Metadata } from 'next';
import { HomePage } from '@/components/hml/HomePage';
import { HomePageV2 } from '@/components/hml/HomePageV2';
import { HomePageV3 } from '@/components/hml/HomePageV3';
import { HomeFaqStructuredData } from '@/components/hml/home-v2/HomeFaqStructuredData';
import { StructuredData } from '@/components/hml/StructuredData';
import { homePage } from '@/config/agency';
import { homeV2Config } from '@/config/home-v2';
import { homeV3Config } from '@/config/home-v3';
import { siteConfig } from '@/config/site';
import { buildMetadata, homeTitle } from '@/lib/seo';
import { hasText, isFaqPopulated } from '@/lib/hml/homeV2';

const useHomeV3 = homeV3Config.enabled;
const useHomeV2 = !useHomeV3 && homeV2Config.enabled;

const legacyMeta = buildMetadata({
  title: siteConfig.coverLine,
  description: homePage.meta.description,
  path: '/',
  ogImage: homePage.meta.ogImage,
});

const v2MetaTitle = homeV2Config.content.meta.title.trim();
const v2MetaPageSegment = v2MetaTitle.includes(' | ')
  ? v2MetaTitle.split(' | ')[0]?.trim() ?? v2MetaTitle
  : v2MetaTitle;

const v2Meta = buildMetadata({
  title: v2MetaPageSegment || siteConfig.coverLine,
  description: homeV2Config.content.meta.description,
  path: '/',
  ogImage: homeV2Config.content.meta.ogImage,
});

export const metadata: Metadata = useHomeV3 || useHomeV2
  ? {
      ...v2Meta,
      title: { absolute: v2MetaTitle || homeTitle() },
      openGraph: {
        ...v2Meta.openGraph,
        title: v2MetaTitle || homeTitle(),
      },
      twitter: {
        ...v2Meta.twitter,
        title: v2MetaTitle || homeTitle(),
      },
    }
  : {
      ...legacyMeta,
      title: { absolute: homeTitle() },
      openGraph: {
        ...legacyMeta.openGraph,
        title: homeTitle(),
      },
      twitter: {
        ...legacyMeta.twitter,
        title: homeTitle(),
      },
    };

export default function Page() {
  if (useHomeV3 || useHomeV2) {
    const faqItems = isFaqPopulated(homeV2Config.content)
      ? homeV2Config.content.faq.items.filter(
          (item) => hasText(item.question) && hasText(item.answer),
        )
      : [];

    return (
      <>
        <StructuredData />
        {faqItems.length > 0 ? <HomeFaqStructuredData items={faqItems} /> : null}
        {useHomeV3 ? <HomePageV3 /> : <HomePageV2 />}
      </>
    );
  }

  return (
    <>
      <StructuredData />
      <HomePage />
    </>
  );
}
