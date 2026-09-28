"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "@/lib/clsx";

/**
 * Scroll-reveal wrapper — fades/slides children in when they enter the
 * viewport. Robust by design: anything already on screen at mount reveals
 * immediately, a scroll observer handles the rest, and a safety timer
 * guarantees content is NEVER left stuck hidden.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  eager = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * Above-the-fold content: play the same entrance as a pure CSS animation
   * from first paint, so it never waits on hydration (keeps LCP fast).
   */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;

    // Already in view on mount → reveal right away (no waiting on the observer).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);

    // Safety net: never allow content to remain hidden.
    const fallback = window.setTimeout(() => setVisible(true), 1400);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [eager]);

  if (eager) {
    return (
      <div
        className={clsx("reveal-eager", className)}
        style={delay ? { animationDelay: `${delay}ms` } : undefined}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={clsx("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
