/**
 * Renders a JSON-LD structured-data block. The `<` → `<` escape follows
 * the Next.js JSON-LD guide to prevent XSS via injected strings.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
