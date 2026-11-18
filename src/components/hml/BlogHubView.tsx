import Image from 'next/image';
import Link from 'next/link';
import { publishedBlogPosts } from '@/config/blog';
import { blogPublishedLine } from '@/lib/hml/blogDates';
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
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-slate">
            <CopyRichText
              text={copy['BLOG-INTRO']}
              phraseLinks={[{ phrase: 'Guides', href: '/guides' }]}
            />
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
              {posts.map((post) => (
                <li key={post.slug} className="flex flex-col gap-5">
                  {post.cardImage || post.heroImage ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block aspect-[4/3] overflow-hidden rounded-[14px] border border-obsidian/10"
                    >
                      <Image
                        src={post.cardImage2x || post.cardImage || post.heroImage}
                        alt={post.title}
                        width={640}
                        height={480}
                        className="h-full w-full object-cover"
                        sizes="(min-width: 1024px) 28vw, 100vw"
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[22px] tracking-[-0.03em]">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-slate">{post.excerpt}</p>
                    <p className="text-[13px] text-slate">
                      {copy['BLOG-BYLINE']} · {blogPublishedLine(post.date)} · {post.readingMinutes} min read
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="rowan-blake" className="border-y border-obsidian/10 py-12">
        <div className="mx-auto max-w-editorial px-5 text-[15px] leading-[1.6] text-slate sm:px-8 lg:px-12">
          <p>
            <strong className="font-medium text-obsidian">Rowan Blake</strong> writes for the blog at Human Made
            Logic. Rowan Blake is the pen name of our guides and blog team.
          </p>
        </div>
      </section>
    </>
  );
}