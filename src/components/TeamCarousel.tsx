"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Member } from "@/components/TeamAccordion";
import styles from "./TeamCarousel.module.css";

// Visible slots, from far-left (-2) to far-right (+2), mapped to CSS classes.
const POSITIONS = ["farLeft", "left", "center", "right", "farRight"] as const;

/**
 * Glowing coverflow carousel — mobile only. The centre card glows and shows the
 * full description; neighbours peek at the edges. Auto-advances (paused under
 * reduced-motion or while the user is interacting) with prev/next controls, and
 * clicking any card brings it to the centre.
 */
export function TeamCarousel({ members }: { members: Member[] }) {
  const n = members.length;
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => {
      setCurrent((i) => (i + 1) % n);
    }, 3000);
  }, [n, stop]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % n) + n) % n);
      start(); // restart the timer after a manual move
    },
    [n, start],
  );

  return (
    <div className={styles.wrapper} onPointerEnter={stop} onPointerLeave={start}>
      <div className={styles.track}>
        {[-2, -1, 0, 1, 2].map((offset) => {
          const index = (current + offset + n) % n;
          const member = members[index];
          const isCenter = offset === 0;
          return (
            <button
              key={member.name}
              type="button"
              className={`${styles.card} ${styles[POSITIONS[offset + 2]]}`}
              onClick={() => goTo(index)}
              aria-label={`${member.name}, ${member.role}`}
              aria-current={isCenter}
            >
              <div className={styles.cardImage}>
                <Image src={member.img} alt={member.name} fill sizes="280px" />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{member.name}</h3>
                <p className={styles.cardDesignation}>{member.role}</p>
                <p className={styles.cardDescription}>{member.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={`${styles.nav} ${styles.navPrev}`}
        onClick={() => goTo(current - 1)}
        aria-label="Previous team member"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        className={`${styles.nav} ${styles.navNext}`}
        onClick={() => goTo(current + 1)}
        aria-label="Next team member"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
