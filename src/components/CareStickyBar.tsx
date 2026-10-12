"use client";

import { useEffect, useState } from "react";
import { clsx } from "@/lib/clsx";

/**
 * Phones only: "Free modules" and "Free call" stay one tap away once the hero
 * has scrolled out of view. Hidden while the call form is on screen, so it
 * never covers the form; z-40 sits under the cookie banner (z-50).
 */
export function CareStickyBar({ heroId, callId }: { heroId: string; callId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const call = document.getElementById(callId);
    if (!hero || !call || !("IntersectionObserver" in window)) return;
    const seen = new Map<Element, boolean>([
      [hero, true],
      [call, false],
    ]);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) seen.set(e.target, e.isIntersecting);
      setShow(!seen.get(hero) && !seen.get(call));
    });
    io.observe(hero);
    io.observe(call);
    return () => io.disconnect();
  }, [heroId, callId]);

  return (
    <>
      {/* Room at the end of the page so the bar never hides the footer. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
      <nav
        aria-label="Garbha Care shortcuts"
        inert={!show}
        className={clsx(
          "fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur transition-transform duration-300 motion-reduce:transition-none lg:hidden",
          show ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <a
            href="#tools"
            className="flex min-h-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200"
          >
            Free modules
          </a>
          <a
            href={`#${callId}`}
            className="flex min-h-12 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white"
          >
            Free counsellor call
          </a>
        </div>
      </nav>
    </>
  );
}
