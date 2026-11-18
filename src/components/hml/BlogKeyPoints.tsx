import { keyPointsListHtml } from '@/lib/hml/blogMarkdownSnippet';

type Props = { points: string[] };

/** Optional manifest key points — omitted entirely when the list is empty. */
export function BlogKeyPoints({ points }: Props) {
  const items = points.map((p) => p.trim()).filter(Boolean);
  if (!items.length) return null;

  const listHtml = keyPointsListHtml(items);

  return (
    <aside
      aria-labelledby="blog-key-points-heading"
      className="mb-10 rounded-[14px] border border-obsidian/10 bg-obsidian/[0.02] px-5 py-6 sm:px-6"
    >
      <h2
        id="blog-key-points-heading"
        className="text-[13px] font-medium uppercase tracking-[0.18em] text-slate"
      >
        Key points
      </h2>
      <div
        className="guide-article-prose mt-4 text-[15px] leading-[1.65] text-obsidian [&_a]:underline [&_a]:decoration-obsidian/25 [&_a]:underline-offset-2 [&_li]:mt-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: listHtml }}
      />
    </aside>
  );
}