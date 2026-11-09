import { homeV2Config, type HomeV2Content } from '@/config/home-v2';

export function hasText(value?: string | null): boolean {
  return Boolean(value?.trim());
}

export function isProductionBuild(): boolean {
  return process.env.VERCEL_ENV === 'production';
}

export function isHeroPopulated(content: HomeV2Content): boolean {
  const { hero } = content;
  return (
    hasText(hero.h1) ||
    hasText(hero.sub) ||
    hasText(hero.eyebrow) ||
    hasText(hero.primaryCta.label) ||
    hasText(hero.secondaryCta.label)
  );
}

export function isProblemPopulated(content: HomeV2Content): boolean {
  const { problem } = content;
  return (
    hasText(problem.statement) ||
    hasText(problem.statementSupport) ||
    hasText(problem.heading) ||
    (problem.lines?.some((line) => hasText(line)) ?? false)
  );
}

export function isBeliefPopulated(content: HomeV2Content): boolean {
  return (
    hasText(content.belief.quote) ||
    hasText(content.belief.body) ||
    hasText(content.belief.slogan)
  );
}

export function isServiceCardsPopulated(content: HomeV2Content): boolean {
  if (
    hasText(content.serviceCards.heading) ||
    hasText(content.serviceCards.lede) ||
    hasText(content.serviceCards.blurb)
  ) {
    return true;
  }
  return Object.values(content.serviceCards.items).some(
    (card) => hasText(card.oneLiner) || card.tags.some((tag) => hasText(tag)),
  );
}

export function isHowWeWorkPopulated(content: HomeV2Content): boolean {
  if (hasText(content.howWeWork.heading) || hasText(content.howWeWork.aiLine)) return true;
  return content.howWeWork.steps.some((step) => hasText(step.title) || hasText(step.body));
}

export function isKitPopulated(kit: HomeV2Content['kits']['items'][number]): boolean {
  return (
    hasText(kit.title) ||
    hasText(kit.bestFor) ||
    (kit.inclusions?.some((line) => hasText(line)) ?? false) ||
    hasText(kit.price) ||
    hasText(kit.cta?.label)
  );
}

export function isKitsPopulated(content: HomeV2Content): boolean {
  return hasText(content.kits.heading) || content.kits.items.some(isKitPopulated);
}

export function isWhoPopulated(content: HomeV2Content): boolean {
  return (
    hasText(content.who.heading) || content.who.lines.some((line) => hasText(line))
  );
}

export function isPromisesPopulated(content: HomeV2Content): boolean {
  return (
    hasText(content.promises.heading) ||
    content.promises.items.some((item) => hasText(item.title) || hasText(item.body))
  );
}

export function isWorkPopulated(content: HomeV2Content): boolean {
  return content.work.items.some(
    (item) =>
      hasText(item.title) &&
      hasText(item.body) &&
      hasText(item.href) &&
      hasText(item.imageAlt),
  );
}

export function isFaqPopulated(content: HomeV2Content): boolean {
  return content.faq.items.some((item) => hasText(item.question) && hasText(item.answer));
}

export function isFinalCtaPopulated(content: HomeV2Content): boolean {
  const { finalCta } = content;
  return (
    hasText(finalCta.heading) ||
    hasText(finalCta.body) ||
    hasText(finalCta.button.label) ||
    hasText(finalCta.note)
  );
}

function walkStrings(value: unknown, out: string[]): void {
  if (typeof value === 'string') {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => walkStrings(entry, out));
    return;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach((entry) => walkStrings(entry, out));
  }
}

/** Every copy string in home v2 config (for production placeholder guard). */
export function collectHomeV2CopyStrings(): string[] {
  const strings: string[] = [];
  walkStrings(homeV2Config.content, strings);
  return strings;
}

export function findPlaceholderCopy(strings: string[]): string[] {
  return strings.filter((value) => {
    const trimmed = value.trim();
    return trimmed.startsWith('[');
  });
}

export function isPendingHomeImageAlt(alt: string): boolean {
  const trimmed = alt.trim();
  return !trimmed || trimmed.startsWith('[');
}
