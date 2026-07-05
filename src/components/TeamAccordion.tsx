"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "@/lib/clsx";

export type Member = {
  name: string;
  role: string;
  desc: string;
  img: string;
};

/**
 * Horizontal image accordion. Every member's photo stays visible; panels
 * flex-grow to fill the full width of the box. The active panel takes the
 * largest share and reveals an information side (photo + details); opening one
 * closes the others. Hover, focus or click to open.
 */
export function TeamAccordion({ members }: { members: Member[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex h-80 w-full gap-2 sm:h-[26rem] sm:gap-3">
        {members.map((member, i) => {
          const isActive = active === i;
          return (
            <button
              key={member.name}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              aria-label={`${member.name}, ${member.role}`}
              style={{ flexGrow: isActive ? 9 : 2, flexBasis: 0 }}
              className="relative flex h-full min-w-0 overflow-hidden rounded-2xl outline-none ring-brand-400 transition-[flex-grow] duration-500 ease-out focus-visible:ring-2"
            >
              {/* Photo — always visible, fills the panel */}
              <div className="relative h-full min-w-0 flex-1">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className={clsx(
                    "object-cover object-top transition-all duration-700 ease-out",
                    isActive ? "grayscale-0" : "grayscale",
                  )}
                />
                {/* dim collapsed panels a touch */}
                <div
                  className={clsx(
                    "absolute inset-0 bg-ink-900/25 transition-opacity duration-500",
                    isActive ? "opacity-0" : "opacity-100",
                  )}
                />
                {/* coral accent bar on the active photo */}
                <span
                  className={clsx(
                    "absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-brand-500 to-accent-500 transition-transform duration-500",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </div>

              {/* Information — expands / collapses */}
              <div
                className={clsx(
                  "flex shrink-0 flex-col justify-center overflow-hidden bg-ink-50 text-left transition-all duration-500 ease-out",
                  isActive
                    ? "w-52 px-5 opacity-100 sm:w-60 sm:px-6"
                    : "w-0 px-0 opacity-0",
                )}
              >
                <div className="min-w-[12rem] sm:min-w-[15rem]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                    {member.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink-900">
                    {member.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-ink-500">
                    {member.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
