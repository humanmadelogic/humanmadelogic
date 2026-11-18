import Link from 'next/link';
import { kitsAiVisibilityCta } from '@/config/kits-cta';
import { CopyRichText } from '@/lib/hml/copyRichText';
import { faqItemsFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { Breadcrumb } from './Breadcrumb';
import { HmlCtaBand } from './HmlCtaBand';

const kitLinks = [
  { phrase: 'Launch Kit', href: '/kits/launch-kit' },
  { phrase: 'Authority Kit', href: '/kits/authority-kit' },
];

export function IndustryBeautyView() {
  const copy = loadCopyMap('industries-beauty-skincare.json');
  const faqItems = faqItemsFromCopy(copy, { prefix: 'IND-BEAUTY', max: 8 });
  const pains = [1, 2, 3].map((n) => ({
    title: copy[`IND-BEAUTY-PAIN-${n}-H`],
    body: copy[`IND-BEAUTY-PAIN-${n}-BODY`],
  }));
  const services = [1, 2, 3, 4].map((n) => ({
    name: copy[`IND-BEAUTY-WHAT-${n}-NAME`],
    line: copy[`IND-BEAUTY-WHAT-${n}-LINE`],
  }));

  return (
    <>
      <Breadcrumb trail={copy['IND-BEAUTY-BREADCRUMB']} />
      <section className="pb-12 pt-6">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h1 className="text-[9vw] leading-[0.98] tracking-[-0.05em] sm:text-[7vw] lg:text-[50px]">
            {copy['IND-BEAUTY-H1']}
          </h1>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-slate">{copy['IND-BEAUTY-HERO-SUB']}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper"
            >
              {copy['IND-BEAUTY-HERO-CTA-1']}
            </Link>
            <Link
              href={kitsAiVisibilityCta.href}
              className="inline-flex h-12 items-center rounded-full border border-obsidian/20 px-6 text-[15px]"
            >
              {copy['IND-BEAUTY-HERO-CTA-2']}
            </Link>
          </div>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.55] text-slate">
            {copy['IND-BEAUTY-HERO-CTA-2-NOTE']}
          </p>
        </div>
      </section>

      <Answer heading={copy['IND-BEAUTY-BLUR-H2']} body={copy['IND-BEAUTY-BLUR-BODY']} />

      <section className="border-y border-obsidian/10 py-16">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <ul className="grid gap-6 md:grid-cols-3">
            {pains.map((pain) => (
              <li key={pain.title} className="rounded-[14px] border border-obsidian/10 p-5">
                <h3 className="text-[18px] tracking-[-0.02em]">{pain.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-slate">{pain.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['IND-BEAUTY-WHAT-H2']}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((svc) => (
              <li key={svc.name} className="rounded-[14px] border border-obsidian/10 p-5">
                <h3 className="text-[17px] font-medium">{svc.name}</h3>
                <p className="mt-2 text-[15px] text-slate">{svc.line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[62ch] text-[16px] leading-[1.65] text-slate">{copy['IND-BEAUTY-WHAT-PACK']}</p>
        </div>
      </section>

      {(
        [
          ['IND-BEAUTY-CODES-H2', 'IND-BEAUTY-CODES-A', 'IND-BEAUTY-CODES-BODY'],
          ['IND-BEAUTY-MARKET-H2', 'IND-BEAUTY-MARKET-A', 'IND-BEAUTY-MARKET-BODY'],
          ['IND-BEAUTY-FOUND-H2', 'IND-BEAUTY-FOUND-A', 'IND-BEAUTY-FOUND-BODY'],
          ['IND-BEAUTY-SOCIAL-H2', 'IND-BEAUTY-SOCIAL-A', null],
        ] as const
      ).map(([h, a, b]) => (
        <Answer key={h} heading={copy[h]} body={copy[a]} extra={b ? copy[b] : undefined} />
      ))}

      <p className="mx-auto max-w-editorial px-5 pb-8 text-[13px] text-slate sm:px-8 lg:px-12">
        {copy['IND-BEAUTY-CLAIMS-NOTE']}
      </p>

      <section className="border-t border-obsidian/10 py-16">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['IND-BEAUTY-KIT-H2']}</h2>
          <CopyRichText className="mt-4 text-[16px] leading-[1.65] text-slate" text={copy['IND-BEAUTY-KIT-1']} phraseLinks={kitLinks} />
          <CopyRichText className="mt-4 text-[16px] leading-[1.65] text-slate" text={copy['IND-BEAUTY-KIT-2']} phraseLinks={kitLinks} />
          <p className="mt-4 text-[16px] leading-[1.65] text-slate">{copy['IND-BEAUTY-KIT-3']}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['IND-BEAUTY-FAQ-H2']}</h2>
          <div className="mt-8 divide-y divide-obsidian/10 border-y border-obsidian/10">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none py-2 text-[17px] font-medium text-obsidian [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="mt-2 text-[15px] leading-[1.65] text-slate">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <HmlCtaBand
        heading={copy['IND-BEAUTY-CTA-H2']}
        body={copy['IND-BEAUTY-CTA-BODY']}
        primaryLabel={copy['IND-BEAUTY-CTA-BTN-1']}
        primaryHref="/contact"
        checkNote={copy['IND-BEAUTY-CTA-BTN-2-NOTE']}
        checkLabel={copy['IND-BEAUTY-CTA-BTN-2']}
        checkHref={kitsAiVisibilityCta.href}
        footnote={copy['IND-BEAUTY-CTA-NOTE']}
      />
    </>
  );
}

function Answer({ heading, body, extra }: { heading: string; body: string; extra?: string }) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <h2 className="text-[30px] tracking-[-0.03em]">{heading}</h2>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{body}</p>
        {extra?.trim() ? <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-slate">{extra}</p> : null}
      </div>
    </section>
  );
}