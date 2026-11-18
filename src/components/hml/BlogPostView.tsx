import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostRecord } from '@/config/blog';
import { loadBlogArticle } from '@/lib/hml/blogFullArticle';
import { blogDateLine } from '@/lib/hml/blogDates';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { Breadcrumb } from './Breadcrumb';
import { GuideArticleProse } from './GuideArticleProse';

type Props = { post: BlogPostRecord };

export function BlogPostView({ post }: Props) {
  const copy = loadCopyMap('blog-hub.json');
  const article = loadBlogArticle(post);
  const breadcrumb = `Home > Blog > ${post.title}`;
  const reading = `${post.readingMinutes} min read`;

  return (
    <>
      <Breadcrumb trail={breadcrumb} />
      <article className="pb-8 pt-6">
        <header className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          {post.heroImage ? (
            <div className="mb-10 overflow-hidden rounded-[14px] border border-obsidian/10">
              <Image
                src={post.heroImage}
                alt={post.heroImageAlt}
                width={1200}
                height={630}
                className="h-auto w-full"
                priority
                sizes="(min-width: 1024px) 720px, 100vw"
              />
            </div>
          ) : null}
          <h1 className="text-[10vw] leading-[0.98] tracking-[-0.05em] sm:text-[7vw] lg:text-[52px]">
            {post.title}
          </h1>
          <p className="mt-6 text-[15px] text-obsidian">
            By{' '}
            <Link
              href="/guides#rowan-blake"
              className="underline decoration-obsidian/25 underline-offset-2"
            >
              {copy['BLOG-BYLINE']}
            </Link>
          </p>
          <p className="mt-1 text-[14px] text-slate">{copy['BLOG-REVIEWED']}</p>
          <p className="mt-1 text-[14px] text-slate">{blogDateLine(post.updated)}</p>
          <p className="mt-1 text-[14px] text-slate">{reading}</p>
        </header>

        <div className="mx-auto mt-12 min-w-0 max-w-full px-5 sm:max-w-editorial sm:px-8 lg:px-12">
          <GuideArticleProse html={article.html} />
        </div>
      </article>
    </>
  );
}