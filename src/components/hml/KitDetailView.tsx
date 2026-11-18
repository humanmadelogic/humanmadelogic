import Link from 'next/link';
import type { ReactNode } from 'react';
import type { KitSlug } from '@/config/kits';
import { kitAltBodyLinks, localDominationExtraLinks } from '@/config/kitCopyLinks';
import { kitsAiVisibilityCta } from '@/config/kits-cta';
import { contactHref, type ContactTopic } from '@/lib/hml/contactTopics';
import { CopyRichText } from '@/lib/hml/copyRichText';
import { faqItemsFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { Breadcrumb } from './Breadcrumb';
import { HmlCtaBand } from './HmlCtaBand';

const KIT_META: Record<
  KitSlug,
  { file: string; prefix: string; contactTopic: ContactTopic }
> = {
  'launch-kit': { file: 'launch-kit.json', prefix: 'LK', contactTopic: 'Launch Kit' },
  'authority-kit': { file: 'authority-kit.json', prefix: 'AK', contactTopic: 'Authority Kit' },
  'local-domination-kit': {
    file: 'local-domination-kit.json',
    prefix: 'LDK',
    contactTopic: 'Local Domination Kit',
  },
};

function AnswerBlock({ heading, body, children }: { heading: string; body?: string; children?: ReactNode }) {
  if (!heading?.trim()) return null;
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <h2 className="text-[30px] tracking-[-0.03em]">{heading}</h2>
        {body?.trim() ? (
          <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{body}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function IncBlock({
  prefix,
  copy,
}: {
  prefix: string;
  copy: Record<string, string>;
}) {
  const cards = [1, 2, 3].map((n) => ({
    title: copy[`${prefix}-INC-${n}-TITLE`],
    body: copy[`${prefix}-INC-${n}-BODY`],
  }));
  return (
    <section className="border-y border-obsidian/10 py-16 sm:py-20">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <h2 className="text-[30px] tracking-[-0.03em]">{copy[`${prefix}-INC-H2`]}</h2>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{copy[`${prefix}-INC-A`]}</p>
        {'LDK-INC-CLINIC-NOTE' in copy && copy['LDK-INC-CLINIC-NOTE']?.trim() ? (
          <p className="mt-4 max-w-[62ch] text-[14px] text-slate">{copy['LDK-INC-CLINIC-NOTE']}</p>
        ) : null}
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title} className="rounded-[14px] border border-obsidian/10 p-5">
              <h3 className="text-[18px] font-medium tracking-[-0.02em]">{card.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-slate">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowBlock({ prefix, copy }: { prefix: string; copy: Record<string, string> }) {
  const steps = [1, 2, 3, 4].map((n) => ({
    title: copy[`${prefix}-HOW-${n}-TITLE`],
    body: copy[`${prefix}-HOW-${n}-BODY`],
  }));
  if (!copy[`${prefix}-HOW-H2`]?.trim()) return null;
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <h2 className="text-[30px] tracking-[-0.03em]">{copy[`${prefix}-HOW-H2`]}</h2>
        <ol className="mt-10 space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-6">
              <span className="text-[13px] tabular-nums tracking-[0.18em] text-slate">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[20px] tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-slate">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function KitDetailView({ slug }: { slug: KitSlug }) {
  const meta = KIT_META[slug];
  const copy = loadCopyMap(meta.file);
  const { prefix } = meta;
  const faqItems = faqItemsFromCopy(copy, { prefix });
  const altLinks = kitAltBodyLinks[slug];

  return (
    <>
      <Breadcrumb trail={copy[`${prefix}-BREADCRUMB`]} />
      <section className="pb-12 pt-6">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h1 className="text-[11vw] leading-[0.95] tracking-[-0.05em] sm:text-[8vw] lg:text-[56px]">
            {copy[`${prefix}-H1`]}
          </h1>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-slate">{copy[`${prefix}-HERO-SUB`]}</p>
          <Link
            href={contactHref(meta.contactTopic)}
            className="mt-10 inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper"
          >
            {copy[`${prefix}-HERO-CTA`]}
          </Link>
        </div>
      </section>

      <AnswerBlock heading={copy[`${prefix}-WHO-H2`]} body={copy[`${prefix}-WHO-BODY`]} />

      <IncBlock prefix={prefix} copy={copy} />

      {slug === 'launch-kit' ? <HowBlock prefix={prefix} copy={copy} /> : null}

      {slug === 'launch-kit' ? (
        <>
          <AnswerBlock heading={copy['LK-PKG-H2']} body={copy['LK-PKG-A']} />
          <AnswerBlock heading={copy['LK-LAUNCH-H2']} body={copy['LK-LAUNCH-A']} />
          <AnswerBlock heading={copy['LK-SKIN-H2']} body={copy['LK-SKIN-A']} />
        </>
      ) : null}

      {slug === 'authority-kit' ? (
        <>
          <AnswerBlock heading={copy['AK-TOPIC-H2']} body={copy['AK-TOPIC-A']} />
          <AnswerBlock heading={copy['AK-STRUCT-H2']} body={copy['AK-STRUCT-A']} />
          <AnswerBlock heading={copy['AK-ENGINE-H2']} body={copy['AK-ENGINE-A']} />
          <AnswerBlock heading={copy['AK-EXPECT-H2']} body={copy['AK-EXPECT-A']} />
        </>
      ) : null}

      {slug === 'local-domination-kit' ? (
        <>
          <section className="py-14 sm:py-16">
            <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
              <h2 className="text-[30px] tracking-[-0.03em]">{copy['LDK-MAPS-H2']}</h2>
              <CopyRichText
                className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate"
                text={copy['LDK-MAPS-A']}
                phraseLinks={localDominationExtraLinks.filter((l) => l.phrase === "Google's help page")}
              />
            </div>
          </section>
          <section className="py-14 sm:py-16">
            <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
              <h2 className="text-[30px] tracking-[-0.03em]">{copy['LDK-REVIEWS-H2']}</h2>
              <CopyRichText
                className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate"
                text={copy['LDK-REVIEWS-A']}
                phraseLinks={localDominationExtraLinks.filter((l) => l.phrase === "Google's policy")}
              />
            </div>
          </section>
          <AnswerBlock heading={copy['LDK-VS-H2']} body={copy['LDK-VS-A']} />
          <AnswerBlock heading={copy['LDK-SG-H2']} body={copy['LDK-SG-BODY']} />
          <AnswerBlock heading={copy['LDK-REFRESH-H2']} body={copy['LDK-REFRESH-BODY']} />
        </>
      ) : null}

      <section className="border-t border-obsidian/10 py-14 sm:py-16">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy[`${prefix}-ALT-H2`]}</h2>
          <CopyRichText
            className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate"
            text={copy[`${prefix}-ALT-BODY`]}
            phraseLinks={altLinks}
          />
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby={`${slug}-faq`}>
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 id={`${slug}-faq`} className="text-[30px] tracking-[-0.03em]">
            {copy[`${prefix}-FAQ-H2`]}
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
          {copy[`${prefix}-CREDIT`]?.trim() ? (
            <p className="mt-10 text-[13px] text-slate">{copy[`${prefix}-CREDIT`]}</p>
          ) : null}
        </div>
      </section>

      <HmlCtaBand
        heading={copy[`${prefix}-CTA-H2`]}
        body={copy[`${prefix}-CTA-BODY`]}
        primaryLabel={copy[`${prefix}-CTA-BTN`]}
        primaryHref={contactHref(meta.contactTopic)}
        checkNote={copy[`${prefix}-CTA-CHECK-NOTE`]}
        checkLabel={copy[`${prefix}-CTA-CHECK-BTN`]}
        checkHref={kitsAiVisibilityCta.href}
        footnote={copy[`${prefix}-CTA-NOTE`]}
      />
    </>
  );
}