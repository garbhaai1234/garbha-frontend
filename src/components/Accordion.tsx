"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/Icons";
import { clsx } from "@/lib/clsx";

export type Faq = { q: string; a: string };

/**
 * FAQ accordion — mirrors the Elementor accordion on the live garbha.ai
 * solution pages. First item is open by default.
 */
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span
                className={clsx(
                  "font-display text-base font-semibold transition-colors sm:text-lg",
                  isOpen ? "text-brand-600" : "text-ink-900",
                )}
              >
                {item.q}
              </span>
              <ChevronDown
                className={clsx(
                  "h-5 w-5 shrink-0 text-brand-500 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={clsx(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-7 text-ink-500">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
