type Props = { html: string; className?: string };

/** Full guide article body from Pamala FINAL markdown (tables, FAQ, lists, code). */
export function GuideArticleProse({ html, className }: Props) {
  return (
    <div
      className={
        className ??
        [
          'guide-article-prose max-w-[62ch]',
          '[&_h2]:mt-14 [&_h2]:text-[28px] [&_h2]:tracking-[-0.03em] [&_h2]:text-obsidian',
          '[&_h2:first-child]:mt-0',
          '[&_h3]:mt-8 [&_h3]:text-[22px] [&_h3]:tracking-[-0.02em]',
          '[&_p]:mt-4 [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-slate',
          '[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-signalYellow [&_blockquote]:pl-5',
          '[&_blockquote]:text-[16px] [&_blockquote]:leading-[1.6] [&_blockquote]:text-obsidian',
          '[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-[17px] [&_ul]:leading-[1.65] [&_ul]:text-slate',
          '[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-[17px] [&_ol]:leading-[1.65] [&_ol]:text-slate',
          '[&_li]:mt-2',
          '[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-[10px] [&_pre]:border [&_pre]:border-obsidian/10 [&_pre]:bg-paper [&_pre]:p-4',
          '[&_pre]:text-[14px] [&_pre]:leading-[1.5] [&_pre]:text-obsidian',
          '[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-[15px]',
          '[&_th]:border [&_th]:border-obsidian/15 [&_th]:bg-paper [&_th]:px-3 [&_th]:py-2 [&_th]:font-medium',
          '[&_td]:border [&_td]:border-obsidian/15 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:text-slate',
          '[&_a]:text-obsidian [&_a]:underline [&_a]:decoration-obsidian/25 [&_a]:underline-offset-2',
          '[&_hr]:mt-10 [&_hr]:border-obsidian/10',
          '[&_strong]:font-medium [&_strong]:text-obsidian',
        ].join(' ')
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}