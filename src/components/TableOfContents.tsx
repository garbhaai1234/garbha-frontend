import { clsx } from "@/lib/clsx";
import type { Heading } from "@/lib/blog";

/** Sticky "On this page" table of contents built from a post's H2/H3 headings. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
        On this page
      </p>
      <ul className="space-y-2.5 border-l border-ink-100">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={clsx(
                "-ml-px block border-l-2 border-transparent py-0.5 leading-snug text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-600",
                h.depth === 2 ? "pl-4 font-medium" : "pl-8 text-[0.8rem]",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
