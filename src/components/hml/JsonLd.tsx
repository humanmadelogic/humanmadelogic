type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Serialize JSON-LD safely for inline script tags. */
export function jsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdStringify(data) }}
    />
  );
}
