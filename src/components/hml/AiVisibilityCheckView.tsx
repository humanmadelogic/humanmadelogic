import Image from 'next/image';
import Link from 'next/link';
import { AvcSectionImage } from '@/components/hml/AvcSectionImage';
import { CopyRichText } from '@/lib/hml/copyRichText';
import { faqItemsFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { contactHref } from '@/lib/hml/contactTopics';
import { Breadcrumb } from './Breadcrumb';
import { AiVisibilityCheckForm } from './AiVisibilityCheckForm';

const incPhraseLinks = [
  { phrase: 'Authority Kit', href: '/kits/authority-kit' },
  { phrase: 'Local Domination Kit', href: '/kits/local-domination-kit' },
  { phrase: 'SEO/AEO/GEO', href: '/services/seo-aeo-geo' },
];

const whoPhraseLinks = [{ phrase: 'beauty and skincare', href: '/industries/beauty-skincare' }];

const chatgptPhraseLinks = [
  { phrase: 'how to get your brand cited by ChatGPT', href: '/guides/how-to-get-your-brand-cited-by-chatgpt' },
];

const contactFallbackHref = contactHref('Free AI visibility check');

const AVC_HERO_ALT =
  'Four plain observation cards for ChatGPT, Perplexity, Google AI Overviews and Gemini, with a pencil and no scores';
const AVC_WHAT_ALT =
  'A sample report card with an empty scorecard, a top five fixes list and an evidence log';
const AVC_HOW_ALT = 'A timeline strip from complete intake to 3 working days to your report';

export function AiVisibilityCheckView({ formEnabled }: { formEnabled: boolean }) {
  const copy = loadCopyMap('ai-visibility-check.json');
  const faqItems = faqItemsFromCopy(copy, { prefix: 'AVC', max: 10 });

  return (
    <>
      <Breadcrumb trail={copy['AVC-BREADCRUMB']} />
      <section className="pb-12 pt-6">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h1 className="text-[9vw] leading-[0.98] tracking-[-0.05em] sm:text-[7vw] lg:text-[50px]">
            {copy['AVC-H1']}
          </h1>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-slate">{copy['AVC-HERO-SUB']}</p>
          <div className="mt-10">
            <Link
              href="#request-a-check"
              className="inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper"
            >
              {copy['AVC-HERO-CTA']}
            </Link>
          </div>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.55] text-slate">{copy['AVC-HERO-MICRO']}</p>
          <div className="mt-10 w-full max-w-full overflow-hidden rounded-[14px] border border-obsidian/10">
            <Image
              src="/images/ai-visibility-check/avc-hero.webp"
              alt={AVC_HERO_ALT}
              width={1600}
              height={900}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, min(1120px, 100%)"
              className="h-auto w-full max-w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['AVC-WHAT-H2']}</h2>
          <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{copy['AVC-WHAT-A']}</p>
          <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-slate">{copy['AVC-WHAT-BODY']}</p>
          <AvcSectionImage
            basename="avc-what-you-get"
            width={1200}
            height={900}
            alt={AVC_WHAT_ALT}
          />
        </div>
      </section>

      <Answer heading={copy['AVC-CHATGPT-H2']} lead={copy['AVC-CHATGPT-A']}>
        <CopyRichText
          className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-slate"
          text={copy['AVC-CHATGPT-BODY']}
          phraseLinks={chatgptPhraseLinks}
        />
      </Answer>

      <Answer heading={copy['AVC-WHY-H2']} lead={copy['AVC-WHY-A']} />

      <section className="py-14">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['AVC-INC-H2']}</h2>
          <CopyRichText
            className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate"
            text={copy['AVC-INC-BODY']}
            phraseLinks={incPhraseLinks}
          />
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['AVC-HOW-H2']}</h2>
          <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{copy['AVC-HOW-A']}</p>
          <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-slate">{copy['AVC-HOW-STEPS']}</p>
          <AvcSectionImage
            basename="avc-how-it-works"
            width={1200}
            height={450}
            alt={AVC_HOW_ALT}
          />
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['AVC-WHO-H2']}</h2>
          <CopyRichText
            className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate"
            text={copy['AVC-WHO-BODY']}
            phraseLinks={whoPhraseLinks}
          />
        </div>
      </section>

      <section id="request-a-check" className="scroll-mt-24 border-y border-obsidian/10 py-16">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['AVC-FORM-H2']}</h2>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-slate">{copy['AVC-FORM-INTRO']}</p>
          <div className="mt-10 max-w-xl">
            {formEnabled ? (
              <AiVisibilityCheckForm />
            ) : (
              <CopyRichText
                className="text-[16px] leading-[1.65] text-slate"
                text={copy['AVC-FORM-FALLBACK']}
                phraseLinks={[{ phrase: 'contact form', href: contactFallbackHref }]}
              />
            )}
          </div>
          <p className="mt-10 max-w-[62ch] text-[14px] leading-[1.6] text-slate">{copy['AVC-DISCLAIMER']}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['AVC-FAQ-H2']}</h2>
          <div className="mt-8 divide-y divide-obsidian/10 border-y border-obsidian/10">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none py-2 text-[17px] font-medium text-obsidian [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                {item.answer.includes('privacy policy') ? (
                  <CopyRichText
                    className="mt-2 max-w-[62ch] text-[15px] leading-[1.65] text-slate"
                    text={item.answer}
                    phraseLinks={[{ phrase: 'privacy policy', href: '/privacy' }]}
                  />
                ) : (
                  <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.65] text-slate">{item.answer}</p>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-obsidian/10 py-16">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <h2 className="text-[30px] tracking-[-0.03em]">{copy['AVC-CTA-H2']}</h2>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-slate">{copy['AVC-CTA-BODY']}</p>
          <Link
            href="#request-a-check"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper"
          >
            {copy['AVC-CTA-BTN']}
          </Link>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.55] text-slate">{copy['AVC-CTA-MICRO']}</p>
        </div>
      </section>
    </>
  );
}

function Answer({
  heading,
  lead,
  body,
  children,
}: {
  heading: string;
  lead: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <h2 className="text-[30px] tracking-[-0.03em]">{heading}</h2>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{lead}</p>
        {body?.trim() ? <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-slate">{body}</p> : null}
        {children}
      </div>
    </section>
  );
}