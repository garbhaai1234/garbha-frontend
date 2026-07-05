"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";

const STORAGE_KEY = "garbha.cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (e.g. privacy mode) — stay hidden.
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5">
      <Container className="rounded-2xl border border-ink-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-600">
            We use cookies to improve your experience and analyse site traffic.
            See our{" "}
            <Link href="/privacy" className="font-medium text-brand-700 underline">
              privacy policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => decide("declined")}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Accept
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
