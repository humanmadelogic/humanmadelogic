import Link from 'next/link';
import { kitsAiVisibilityCta } from '@/config/kits-cta';
import { contactHref } from '@/lib/hml/contactTopics';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { Breadcrumb } from './Breadcrumb';
import { HmlCtaBand } from './HmlCtaBand';

type KitCardKey = 'LAUNCH' | 'AUTH' | 'LOCAL';

const CARD_META: Record<KitCardKey, { slug: string; topic: Parameters<typeof contactHref>[0] }> = {
  LAUNCH: { slug: 'launch-kit', topic: 'Launch Kit' },
  AUTH: { slug: 'authority-kit', topic: 'Authority Kit' },
  LOCAL: { slug: 'local-domination-kit', topic: 'Local Domination Kit' },
};

function KitCard({ cardKey }: { cardKey: KitCardKey }) {
  const copy = loadCopyMap('kits-hub.json');
  const p = `KITS-CARD-${cardKey}`;
  const meta = CARD_META[cardKey];
  const includes = [1, 2, 3].map((n) => copy[`${p}-INC-${n}`]).filter(Boolean);

  return (
    <li className="flex flex-col rounded-[14px] border border-obsidian/10 p-6 sm:p-8">
      <h2 className="text-[26px] tracking-[-0.03em] text-obsidian">{copy[`${p}-NAME`]}</h2>
      <p className="mt-4 text-[15px] leading-[1.6] text-slate">{copy[`${p}-FOR`]}</p>
      <ul className="mt-6 space-y-2 text-[15px] text-obsidian">
        {includes.map((line) => (
          <li key={line} className="flex gap-2">
            <span aria-hidden className="text-signalYellow">
              ·
            </span>
            {line}
          </li>
        ))}
      </ul>
      <Link
        href={`/kits/${meta.slug}`}
        className="mt-8 text-[14px] font-medium text-obsidian underline decoration-obsidian/25 underline-offset-4"
      >
        {copy[`${p}-LINK`]}
      </Link>
      <Link
        href={contactHref(meta.topic)}
        className="mt-6 inline-flex h-11 w-fit items-center rounded-full bg-obsidian px-5 text-[14px] font-medium text-paper"
      >
        {copy[`${p}-CTA`]}
      </Link>
    </li>
  );
}

export function KitsHubView() {
  const copy = loadCopyMap('kits-hub.json');
  const faqItems = [1, 2, 3].map((n) => ({
    question: copy[`KITS-FAQ-${n}-Q`],
    answer: copy[`KITS-FAQ-${n}-A`],
  }));

  return (
    <>
      <Breadcrumb trail={copy['KITS-BREADCRUMB']} />
      <section className="pb-16 pt-6 sm:pb-20">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h1 className="max-w-[16ch] text-[11vw] leading-[0.95] tracking-[-0.05em] sm:text-[8vw] lg:text-[64px]">
            {copy['KITS-H1']}
          </h1>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-slate">{copy['KITS-HERO-SUB']}</p>
        </div>
      </section>

      <section className="border-t border-obsidian/10 py-16 sm:py-20">
        <ul className="mx-auto grid max-w-editorial gap-6 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12">
          <KitCard cardKey="LAUNCH" />
          <KitCard cardKey="AUTH" />
          <KitCard cardKey="LOCAL" />
        </ul>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="kits-choose-heading">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 id="kits-choose-heading" className="text-[30px] tracking-[-0.03em]">
            {copy['KITS-CHOOSE-H2']}
          </h2>
          <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{copy['KITS-CHOOSE-A']}</p>
        </div>
      </section>

      <section className="border-y border-obsidian/10 py-16 sm:py-20" aria-labelledby="kits-alacarte-heading">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 id="kits-alacarte-heading" className="text-[30px] tracking-[-0.03em]">
            {copy['KITS-ALACARTE-H2']}
          </h2>
          <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{copy['KITS-ALACARTE-A']}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="kits-faq-heading">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 id="kits-faq-heading" className="text-[30px] tracking-[-0.03em]">
            {copy['KITS-FAQ-H2']}
          </h2>
          <div className="mt-10 divide-y divide-obsidian/10 border-y border-obsidian/10">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none py-2 text-[17px] font-medium tracking-[-0.02em] text-obsidian marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span
                      aria-hidden
                      className="text-slate transition-transform group-open:rotate-45 motion-reduce:transition-none motion-reduce:transform-none"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-slate">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <HmlCtaBand
        heading={copy['KITS-CTA-H2']}
        body={copy['KITS-CTA-BODY']}
        primaryLabel={copy['KITS-CTA-BTN']}
        primaryHref="/contact"
        checkNote={copy['KITS-CTA-CHECK-NOTE']}
        checkLabel={copy['KITS-CTA-CHECK-BTN']}
        checkHref={kitsAiVisibilityCta.href}
        footnote={copy['KITS-CTA-NOTE']}
      />
    </>
  );
}