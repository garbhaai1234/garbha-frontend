"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric value up from 0 whenever it scrolls into view — and resets
 * when it leaves, so it re-animates every time the section is revisited.
 * Accepts a display string like "94%" or "24/7"; the leading number animates,
 * the rest is preserved.
 */
export function CountUp({
  value,
  duration = 1600,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : value;
  const decimals = match && match[1].includes(".") ? 1 : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const zero = (0).toFixed(decimals) + suffix;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const run = () => {
      if (reduce) {
        setDisplay(target.toFixed(decimals) + suffix);
        return;
      }
      cancelAnimationFrame(raf);
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay((target * eased).toFixed(decimals) + suffix);
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run(); // re-count every time it enters view
        } else {
          cancelAnimationFrame(raf);
          setDisplay(zero); // reset so the next entry animates again
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : display}
    </span>
  );
}
