"use client";

import { useRef } from "react";

export type ValueIconName =
  | "target"
  | "eye"
  | "cpu"
  | "chart"
  | "heart"
  | "spark";

export type ValueItem = {
  icon: ValueIconName;
  title: string;
  description: string;
};

export function ValuesShowcase({ values }: { values: ValueItem[] }) {
  return (
    <div className="grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
      {values.map((item) => (
        <TiltCard key={item.title} item={item} />
      ))}
    </div>
  );
}

const MAX_TILT = 12; // degrees

function TiltCard({ item }: { item: ValueItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 2 * MAX_TILT;
    const rotX = (0.5 - py) * 2 * MAX_TILT;
    card.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.04)`;
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(241,87,94,0.22), transparent 55%)`;
    }
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-full overflow-hidden rounded-2xl border border-ink-100 bg-white p-7 shadow-sm transition-[transform,box-shadow] duration-300 ease-out will-change-transform [transform-style:preserve-3d] hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/15"
    >
      {/* gradient accent bar along the top */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

      {/* pointer-following coral glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      />
      {/* sheen highlight on the glass */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* content */}
      <div className="relative">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
          <ValueIcon name={item.icon} className="h-7 w-7" />
        </span>

        <h3 className="mt-6 font-display text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-ink-500">{item.description}</p>
      </div>
    </div>
  );
}

function ValueIcon({
  name,
  className,
}: {
  name: ValueIconName;
  className?: string;
}) {
  const s = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths = {
    target: (
      <>
        <circle cx="12" cy="12" r="9" {...s} />
        <circle cx="12" cy="12" r="5" {...s} />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" {...s} />
        <circle cx="12" cy="12" r="3" {...s} />
      </>
    ),
    cpu: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1.5" {...s} />
        <rect x="10" y="10" width="4" height="4" rx="0.5" {...s} />
        <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" {...s} />
      </>
    ),
    chart: (
      <>
        <path d="M22 7l-8.5 8.5-5-5L2 17" {...s} />
        <path d="M16 7h6v6" {...s} />
      </>
    ),
    heart: (
      <path
        d="M12 20.3l-1.1-1C6.1 15 3 12.2 3 8.8 3 6.1 5.1 4 7.8 4c1.5 0 3 .7 3.9 1.9l.3.4.3-.4C13.2 4.7 14.7 4 16.2 4 18.9 4 21 6.1 21 8.8c0 3.4-3.1 6.2-7.9 10.5l-1.1 1Z"
        {...s}
      />
    ),
    spark: (
      <path
        d="M12 3l2 6.5 6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2L12 3Z"
        {...s}
      />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
