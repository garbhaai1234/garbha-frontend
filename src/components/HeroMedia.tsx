"use client";

import { useEffect, useState } from "react";
import { HeroArt } from "@/components/HeroArt";
import { clsx } from "@/lib/clsx";

/**
 * Hero visual sequence. The AI scan frame (dial + score ring) stays constant;
 * inside the microscope lens circle it crossfades from the embryo ("eggs") to
 * the live "heart with baby" GIF — clipped to the same circle. Tells the story:
 * AI-analysed embryo → a healthy baby. Loops.
 *
 * Lens geometry mirrors HeroArt: viewBox 440×470, lens centred at (220, 210),
 * shown here as % of the rendered art so the GIF lands exactly in the circle.
 */
const LENS_LEFT = (220 / 440) * 100; // 50%
const LENS_TOP = (210 / 470) * 100; // ~44.7%
const LENS_SIZE = (270 / 440) * 100; // ~61.4% — just inside the lens ring

export function HeroMedia({ className }: { className?: string }) {
  const [showBaby, setShowBaby] = useState(false);

  useEffect(() => {
    let timer: number;
    const step = (baby: boolean) => {
      setShowBaby(baby);
      // eggs ~3.4s, baby GIF ~5s, then repeat
      timer = window.setTimeout(() => step(!baby), baby ? 5000 : 3400);
    };
    step(false); // start on the eggs
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={clsx("relative aspect-[44/47]", className)}>
      {/* scan frame + eggs (always rendered) */}
      <HeroArt className="absolute inset-0 h-full w-full" />

      {/* moving baby GIF, clipped to the same lens circle, fading over the eggs */}
      <div
        className="pointer-events-none absolute overflow-hidden rounded-full ring-1 ring-white/70 transition-opacity duration-700 ease-in-out"
        style={{
          left: `${LENS_LEFT}%`,
          top: `${LENS_TOP}%`,
          width: `${LENS_SIZE}%`,
          aspectRatio: "1",
          transform: "translate(-50%, -50%)",
          opacity: showBaby ? 1 : 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/finalgif2.gif"
          alt="Heart with baby — the outcome of a successful IVF journey"
          className="h-full w-full scale-[1.5] object-cover"
        />
      </div>
    </div>
  );
}
