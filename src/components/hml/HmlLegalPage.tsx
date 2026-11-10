import type { LegalPageContent } from '@/config/legal';
import { LegalWebPageJsonLd } from './LegalWebPageJsonLd';

export function HmlLegalPage({ page, path }: { page: LegalPageContent; path: string }) {
  return (
    <article className="pt-28 pb-20 sm:pb-28 lg:pt-36">
      <LegalWebPageJsonLd path={path} name={page.title} description={page.intro} />
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{page.updated}</p>
        <h1 className="mt-6 text-[12vw] leading-[1.02] tracking-[-0.04em] sm:text-[52px] lg:text-[56px]">
          {page.title}
        </h1>
        <p className="mt-6 max-w-prose text-[16px] leading-[1.65] text-slate">{page.intro}</p>

        <nav aria-label="On this page" className="mt-12 border-y border-obsidian/10 py-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate">On this page</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {page.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-[44px] items-center text-[15px] text-obsidian underline-offset-4 hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 max-w-prose">
          {page.sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-14 scroll-mt-28 last:mb-0">
              <h2 className="text-[26px] tracking-[-0.03em]">{section.title}</h2>
              <p className="mt-4 rounded-[12px] border border-dashed border-obsidian/25 bg-white p-5 font-mono text-[13px] leading-[1.6] text-slate">
                {section.placeholderNote}
              </p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
