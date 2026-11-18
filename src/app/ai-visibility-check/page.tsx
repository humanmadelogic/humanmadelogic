import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { homePage } from '@/config/agency';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'AI visibility check',
  description: 'Placeholder preview page for the free AI visibility check offer.',
  path: '/ai-visibility-check',
  noindex: true,
  ogImage: homePage.meta.ogImage,
});

export default function AiVisibilityCheckPlaceholderPage() {
  return (
    <HmlPageShell>
      <main id="main" className="mx-auto max-w-editorial px-5 py-28 sm:px-8 sm:py-32 lg:px-12">
        <p
          className="mb-8 border border-obsidian/20 bg-signalYellow/15 px-4 py-3 text-[14px] font-medium text-obsidian"
          role="status"
        >
          [PLACEHOLDER: copy and intake form coming, pending approval]
        </p>
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] leading-[0.95] tracking-[-0.04em] text-obsidian">
          AI visibility check
        </h1>
        <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-slate">
          This route is reserved for the free AI visibility check. Until copy and the intake form are approved,
          use the contact form with the Free AI visibility check topic selected.
        </p>
      </main>
    </HmlPageShell>
  );
}
