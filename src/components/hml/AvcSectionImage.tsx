type AvcSectionImageProps = {
  /** Basename under /images/ai-visibility-check/ without extension (e.g. avc-what-you-get). */
  basename: string;
  width: number;
  height: number;
  alt: string;
};

/** Lazy section art with 1x / @2x WebP srcset (Manifest). */
export function AvcSectionImage({ basename, width, height, alt }: AvcSectionImageProps) {
  const base = `/images/ai-visibility-check/${basename}`;
  return (
    <picture className="mt-8 block w-full max-w-full overflow-hidden rounded-[14px] border border-obsidian/10">
      <source
        type="image/webp"
        srcSet={`${base}.webp ${width}w, ${base}@2x.webp ${width * 2}w`}
        sizes="(max-width: 768px) 100vw, min(1200px, 100%)"
      />
      <img
        src={`${base}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full max-w-full"
      />
    </picture>
  );
}