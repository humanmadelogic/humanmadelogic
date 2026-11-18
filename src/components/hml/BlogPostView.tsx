import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostRecord } from '@/config/blog';
import { loadBlogArticle } from '@/lib/hml/blogFullArticle';
import { blogPublishedLine, blogUpdatedLine } from '@/lib/hml/blogDates';
import { BlogAuthorNote } from './BlogAuthorNote';
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
            <div className="relative mb-10 aspect-[1200/630] w-full overflow-hidden rounded-[14px] border border-obsidian/10">
              <Image
                src={post.heroImage}
                alt={post.heroImageAlt}
                fill
                className="object-cover"
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
          <p className="mt-1 text-[14px] text-slate">{blogPublishedLine(post.date)}</p>
          {post.updated !== post.date ? (
            <p className="mt-1 text-[14px] text-slate">{blogUpdatedLine(post.updated)}</p>
          ) : null}
          <p className="mt-1 text-[14px] text-slate">{reading}</p>
        </header>

        <div className="mx-auto mt-12 min-w-0 max-w-full px-5 sm:max-w-editorial sm:px-8 lg:px-12">
          <GuideArticleProse html={article.html} />
        </div>

        <footer className="mx-auto mt-14 max-w-editorial border-t border-obsidian/10 px-5 pt-10 text-[15px] leading-[1.65] text-slate sm:px-8 lg:px-12">
          <BlogAuthorNote />
        </footer>
      </article>
    </>
  );
}