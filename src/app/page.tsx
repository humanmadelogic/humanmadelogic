import type { Metadata } from 'next';
import { HomePage } from '@/components/hml/HomePage';
import { HomePageV2 } from '@/components/hml/HomePageV2';
import { HomeFaqStructuredData } from '@/components/hml/home-v2/HomeFaqStructuredData';
import { StructuredData } from '@/components/hml/StructuredData';
import { homePage } from '@/config/agency';
import { homeV2Config } from '@/config/home-v2';
import { siteConfig } from '@/config/site';
import { buildMetadata, homeTitle } from '@/lib/seo';
import { hasText, isFaqPopulated } from '@/lib/hml/homeV2';

const useHomeV2 = homeV2Config.enabled;

const legacyMeta = buildMetadata({
  title: siteConfig.coverLine,
  description: homePage.meta.description,
  path: '/',
  ogImage: homePage.meta.ogImage,
});

const v2Meta = buildMetadata({
  title: homeV2Config.content.meta.title,
  description: homeV2Config.content.meta.description,
  path: '/',
  ogImage: homeV2Config.content.meta.ogImage,
});

export const metadata: Metadata = useHomeV2
  ? {
      ...v2Meta,
      title: { absolute: homeV2Config.content.meta.title.trim() || homeTitle() },
      openGraph: {
        ...v2Meta.openGraph,
        title: homeV2Config.content.meta.title.trim() || homeTitle(),
      },
      twitter: {
        ...v2Meta.twitter,
        title: homeV2Config.content.meta.title.trim() || homeTitle(),
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

type PageProps = {
  searchParams?: { hook?: string };
};

export default function Page({ searchParams }: PageProps) {
  const hookParam = searchParams?.hook;

  if (useHomeV2) {
    const faqItems = isFaqPopulated(homeV2Config.content)
      ? homeV2Config.content.faq.items.filter(
          (item) => hasText(item.question) && hasText(item.answer),
        )
      : [];

    return (
      <>
        <StructuredData />
        {faqItems.length > 0 ? <HomeFaqStructuredData items={faqItems} /> : null}
        <HomePageV2 hookParam={hookParam} />
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
