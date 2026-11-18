import Image from 'next/image';
import Link from 'next/link';
import { publishedBlogPosts } from '@/config/blog';
import { blogPublishedLine } from '@/lib/hml/blogDates';
import { blogHubCardTeaser } from '@/lib/hml/blogHubTeasers';
import { ROWAN_BLAKE_BIO } from '@/lib/hml/rowanBlakeBio';
import { CopyRichText } from '@/lib/hml/copyRichText';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { Breadcrumb } from './Breadcrumb';

export function BlogHubView() {
  const copy = loadCopyMap('blog-hub.json');
  const posts = publishedBlogPosts();

  return (
    <>
      <Breadcrumb trail={copy['BLOG-BREADCRUMB']} />
      <section className="pb-12 pt-6">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h1 className="text-[10vw] leading-[0.95] tracking-[-0.05em] sm:text-[8vw] lg:text-[56px]">
            {copy['BLOG-H1']}
          </h1>
          <CopyRichText
            className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-slate"
            text={copy['BLOG-INTRO']}
            phraseLinks={[{ phrase: 'Guides', href: '/guides' }]}
          />
          <p className="mt-6 max-w-[62ch] text-[16px] leading-[1.65] text-slate">
            <Link href="/ai-visibility-check" className="underline decoration-obsidian/30 underline-offset-2">
              Get a free AI visibility check
            </Link>
            {' '}
            if you want an observed snapshot across ChatGPT, Perplexity, Google AI Overviews and Gemini.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="border-t border-obsidian/10 py-16">
          <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
            <h2 className="text-[28px] tracking-[-0.03em]">{copy['BLOG-EMPTY-H2']}</h2>
            <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{copy['BLOG-EMPTY-BODY']}</p>
          </div>
        </section>
      ) : (
        <section className="border-t border-obsidian/10 py-16" aria-labelledby="blog-posts">
          <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
            <h2 id="blog-posts" className="sr-only">
              Blog posts
            </h2>
            <ul className="mt-4 grid gap-10 lg:grid-cols-2">
              {posts.map((post, index) => {
                const isLcpCard = index === 0;
                const cardSrc = isLcpCard
                  ? post.cardImage || post.heroImage
                  : post.cardImage2x || post.cardImage || post.heroImage;
                const cardSizes = '(min-width: 1024px) 50vw, 100vw';
                return (
                <li key={post.slug} className="flex flex-col gap-5">
                  {cardSrc ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block aspect-[4/3] overflow-hidden rounded-[14px] border border-obsidian/10"
                    >
                      <Image
                        src={cardSrc}
                        alt={post.title}
                        width={640}
                        height={480}
                        className="h-full w-full object-cover"
                        sizes={cardSizes}
                        priority={isLcpCard}
                        {...(isLcpCard ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[22px] tracking-[-0.03em]">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-[15px] leading-[1.6] text-slate">{blogHubCardTeaser(post.slug)}</p>
                    <p className="text-[13px] text-slate">
                      {copy['BLOG-BYLINE']} · {blogPublishedLine(post.date)} · {post.readingMinutes} min read
                    </p>
                  </div>
                </li>
              );
              })}
            </ul>
          </div>
        </section>
      )}

      <section id="rowan-blake" className="border-y border-obsidian/10 py-12">
        <div className="mx-auto max-w-editorial px-5 text-[15px] leading-[1.6] text-slate sm:px-8 lg:px-12">
          <p>{ROWAN_BLAKE_BIO}</p>
        </div>
      </section>
    </>
  );
}