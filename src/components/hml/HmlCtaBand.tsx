import Link from 'next/link';
import { kitsAiVisibilityCta } from '@/config/kits-cta';

type Props = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  checkNote: string;
  footnote?: string;
  checkHref?: string;
  checkLabel?: string;
};

/** Dark closing CTA with primary action and free AI visibility check secondary. */
export function HmlCtaBand({
  heading,
  body,
  primaryLabel,
  primaryHref,
  checkNote,
  footnote,
  checkHref = kitsAiVisibilityCta.href,
  checkLabel = kitsAiVisibilityCta.buttonLabel,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-obsidian py-20 text-paper sm:py-24">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <h2 className="text-[9vw] leading-[1.02] tracking-[-0.04em] sm:text-[48px]">{heading}</h2>
        <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.6] text-paper/70">{body}</p>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start">
          <Link
            href={primaryHref}
            className="inline-flex h-12 items-center rounded-full bg-signalYellow px-6 text-[15px] font-medium text-obsidian"
          >
            {primaryLabel}
          </Link>
          <div className="max-w-[52ch]">
            <Link
              href={checkHref}
              className="inline-flex h-12 items-center rounded-full border border-paper/25 px-6 text-[15px] text-paper transition-colors hover:border-paper/50"
            >
              {checkLabel}
            </Link>
            <p className="mt-3 text-[14px] leading-[1.55] text-paper/60">{checkNote}</p>
          </div>
        </div>
        {footnote?.trim() ? (
          <p className="mt-8 text-[13px] text-paper/45">{footnote}</p>
        ) : null}
      </div>
    </section>
  );
}