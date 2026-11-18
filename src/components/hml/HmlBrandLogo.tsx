import Image from 'next/image';

const MARK_VIEWBOX = { width: 78, height: 104 };
const HORIZONTAL_VIEWBOX = { width: 730.19, height: 104 };

export type BrandLogoVariant = 'mark' | 'horizontal';
export type BrandLogoTone = 'dark' | 'reversed';

function logoSrc(variant: BrandLogoVariant, tone: BrandLogoTone) {
  const suffix = tone === 'dark' ? 'dark' : 'reversed';
  return variant === 'mark'
    ? `/brand/hml-mark-${suffix}.svg`
    : `/brand/hml-logo-horizontal-${suffix}.svg`;
}

function dimensions(variant: BrandLogoVariant, height: number) {
  const vb = variant === 'mark' ? MARK_VIEWBOX : HORIZONTAL_VIEWBOX;
  const width = Math.round((vb.width / vb.height) * height);
  return { width, height };
}

type HmlBrandLogoProps = {
  variant: BrandLogoVariant;
  tone?: BrandLogoTone;
  height: number;
  priority?: boolean;
  className?: string;
  /** Default: Human Made Logic (header/footer home links). */
  alt?: string;
};

export function HmlBrandLogo({
  variant,
  tone = 'dark',
  height,
  priority = false,
  className,
  alt = 'Human Made Logic',
}: HmlBrandLogoProps) {
  const { width } = dimensions(variant, height);
  return (
    <Image
      src={logoSrc(variant, tone)}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      fetchPriority={priority ? 'high' : undefined}
      unoptimized
      className={className ?? 'h-auto max-w-full'}
    />
  );
}