"use client";

import { useEffect, useRef } from "react";

/**
 * Below-the-fold video that starts downloading only when it nears the
 * viewport. Even preload="metadata" makes Chrome fetch ~200 KB up front,
 * which competed with the hero image on mobile. The <source> stays in the
 * server HTML (crawlers still see it); the caller keeps the box size
 * (e.g. aspect-video) so nothing shifts when the first frame loads.
 */
export function LazyVideo({
  src,
  type = "video/mp4",
  className,
}: {
  src: string;
  type?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          el.preload = "metadata";
          el.load();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      controls
      muted
      playsInline
      preload="none"
    >
      <source src={src} type={type} />
    </video>
  );
}
