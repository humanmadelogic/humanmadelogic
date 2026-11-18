import type { BlogFaqItem } from '@/config/blog';

type Props = { faqs: BlogFaqItem[] };

/** Visible FAQ block — H2 "Questions", H3 per question; omitted when empty. */
export function BlogFaqSection({ faqs }: Props) {
  const items = faqs.filter((item) => item.q.trim() && item.a.trim());
  if (!items.length) return null;

  return (
    <section className="mt-14 border-t border-obsidian/10 pt-10" aria-labelledby="blog-faq-heading">
      <h2 id="blog-faq-heading" className="text-[30px] tracking-[-0.03em] text-obsidian">
        Questions people ask
      </h2>
      <div className="mt-8 flex flex-col gap-8">
        {items.map((item) => (
          <div key={item.q}>
            <h3 className="text-[20px] font-medium tracking-[-0.02em] text-obsidian">{item.q}</h3>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-slate">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}