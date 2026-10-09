"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Menu, Close, ChevronDown, ArrowRight } from "@/components/Icons";
import { mainNav, site } from "@/lib/site";
import { solutions } from "@/content/solutions";
import { clsx } from "@/lib/clsx";

export function Header() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu only: close when clicking/tapping outside the header.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const close = () => {
    setOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={clsx(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-ink-100 bg-white/90 shadow-sm shadow-ink-900/5 backdrop-blur"
          : "border-ink-100 bg-white",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Inline menu from lg; below that the menu button. lg–xl: tighter
            menu and a fixed-size logo so it fits; from xl up the original
            spacing and logo behaviour apply. */}
        <Link
          href="/"
          className="flex items-center lg:shrink-0 xl:shrink"
          onClick={close}
        >
          <Image
            src="/brand/garbhatm.png"
            alt={site.name}
            width={172}
            height={35}
            loading="eager"
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {/* Solutions mega-dropdown */}
          <div className="group relative">
            <Link
              href="/solutions"
              className={clsx(
                "relative inline-flex items-center gap-1 whitespace-nowrap px-2 py-2 text-sm font-semibold xl:px-4 xl:text-base tracking-tight transition-colors duration-200",
                isActive("/solutions")
                  ? "text-brand-600"
                  : "text-ink-700 group-hover:text-brand-600",
              )}
            >
              Solutions
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              <span
                className={clsx(
                  "absolute inset-x-2 bottom-1 xl:inset-x-4 h-0.5 origin-left rounded-full bg-brand-500 transition-transform duration-300",
                  isActive("/solutions")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>

            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="w-[30rem] rounded-2xl border border-ink-100 bg-white p-3 shadow-2xl shadow-ink-900/10">
                <div className="grid grid-cols-2 gap-1">
                  {solutions.map((s, i) => (
                    <div
                      key={s.slug}
                      style={{ transitionDelay: `${i * 45}ms` }}
                      className="translate-y-1.5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <Link
                        href={`/solutions/${s.slug}`}
                        className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 ring-1 ring-brand-100 transition-transform duration-300 group-hover/item:scale-110 group-hover/item:bg-white">
                          <Image
                            src={s.image}
                            alt=""
                            width={22}
                            height={22}
                            className="h-5 w-5 object-contain"
                          />
                        </span>
                        <span className="text-sm font-medium text-ink-700 transition-colors group-hover/item:text-brand-700">
                          {s.shortName}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group relative whitespace-nowrap px-2 py-2 text-sm font-semibold xl:px-4 xl:text-base tracking-tight transition-colors duration-200",
                isActive(item.href)
                  ? "text-brand-600"
                  : "text-ink-700 hover:text-brand-600",
              )}
            >
              {item.label}
              <span
                className={clsx(
                  "absolute inset-x-2 bottom-1 xl:inset-x-4 h-0.5 origin-left rounded-full bg-brand-500 transition-transform duration-300",
                  isActive(item.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            href="/contact"
            variant="primary"
            className="group whitespace-nowrap lg:px-4 xl:px-6"
          >
            Book a demo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {/* Solutions accordion */}
            <button
              type="button"
              onClick={() => setSolutionsOpen((v) => !v)}
              aria-expanded={solutionsOpen}
              className={clsx(
                "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium",
                isActive("/solutions")
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-ink-50",
              )}
            >
              Solutions
              <ChevronDown
                className={clsx(
                  "h-5 w-5 transition-transform",
                  solutionsOpen && "rotate-180",
                )}
              />
            </button>
            {solutionsOpen && (
              <ul className="mb-1 ml-3 border-l border-ink-100 pl-3">
                {solutions.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/solutions/${s.slug}`}
                      onClick={close}
                      className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-brand-700"
                    >
                      {s.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={clsx(
                  "rounded-lg px-4 py-3 text-base font-medium",
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-700 hover:bg-ink-50",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" className="mt-2 w-full">
              Book a demo
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
