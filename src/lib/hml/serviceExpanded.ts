import type { ServiceExpandedContent, ServiceDefinition } from '@/config/services';

function hasText(value: string | undefined) {
  return Boolean(value?.trim());
}

export function isHeroPopulated(hero: ServiceExpandedContent['hero']) {
  if (!hero) return false;
  return (
    hasText(hero.subline) ||
    hasText(hero.primaryCtaLabel) ||
    hasText(hero.secondaryCtaLabel) ||
    hasText(hero.imageAlt)
  );
}

export function isWhoItsForPopulated(block: ServiceExpandedContent['whoItsFor']) {
  if (!block) return false;
  if (hasText(block.intro)) return true;
  return (
    block.painPoints?.some(
      (p) => hasText(p.title) || hasText(p.description) || hasText(p.imageAlt),
    ) ?? false
  );
}

export function isWhatYouGetPopulated(block: ServiceExpandedContent['whatYouGet']) {
  if (!block) return false;
  if (hasText(block.heading) || hasText(block.intro) || hasText(block.featureImageAlt)) return true;
  return (
    block.deliverables?.some((d) => hasText(d.title) || hasText(d.description)) ?? false
  );
}

export function isHowItWorksPopulated(block: ServiceExpandedContent['howItWorks']) {
  if (!block) return false;
  if (hasText(block.heading)) return true;
  return block.steps?.some((s) => hasText(s.title) || hasText(s.description)) ?? false;
}

export function isWhatChangesPopulated(block: ServiceExpandedContent['whatChanges']) {
  if (!block) return false;
  if (hasText(block.heading)) return true;
  return block.outcomes?.some((o) => hasText(o.title) || hasText(o.description)) ?? false;
}

export function isHowWeUseAiPopulated(block: ServiceExpandedContent['howWeUseAi']) {
  if (!block) return false;
  return hasText(block.heading) || hasText(block.body);
}

export function isPackageBandPopulated(block: ServiceExpandedContent['packageBand']) {
  if (!block) return false;
  return (
    hasText(block.heading) ||
    hasText(block.body) ||
    hasText(block.servicesLinkLabel) ||
    hasText(block.contactLinkLabel)
  );
}

export function isFaqPopulated(block: ServiceExpandedContent['faq']) {
  if (!block) return false;
  if (hasText(block.heading)) return true;
  return block.items?.some((i) => hasText(i.question) && hasText(i.answer)) ?? false;
}

export function isRelatedServicesPopulated(block: ServiceExpandedContent['relatedServices']) {
  return Boolean(block?.enabled);
}

export function isFinalCtaPopulated(block: ServiceExpandedContent['finalCta']) {
  if (!block) return false;
  return (
    hasText(block.heading) ||
    hasText(block.body) ||
    hasText(block.ctaLabel) ||
    hasText(block.ctaHref)
  );
}

export function hasExpandedServiceContent(service: ServiceDefinition) {
  const e = service.expanded;
  if (!e) return false;
  return (
    isHeroPopulated(e.hero) ||
    isWhoItsForPopulated(e.whoItsFor) ||
    isWhatYouGetPopulated(e.whatYouGet) ||
    isHowItWorksPopulated(e.howItWorks) ||
    isWhatChangesPopulated(e.whatChanges) ||
    isHowWeUseAiPopulated(e.howWeUseAi) ||
    isPackageBandPopulated(e.packageBand) ||
    isFaqPopulated(e.faq) ||
    isRelatedServicesPopulated(e.relatedServices) ||
    isFinalCtaPopulated(e.finalCta)
  );
}
