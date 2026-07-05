"use client";

import { useState } from "react";
import { Check } from "@/components/Icons";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-ink-700"
      >
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-brand-100 bg-brand-50 p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
          Thank you — we&apos;ve received your message
        </h3>
        <p className="mt-2 max-w-sm text-sm text-ink-500">
          Our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-y-5 sm:grid-cols-2 sm:gap-x-4">
        <Field label="First Name" htmlFor="firstName" required>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClasses}
          />
        </Field>
        <Field label="Last Name" htmlFor="lastName" required>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="grid gap-y-5 sm:grid-cols-2 sm:gap-x-4">
        <Field label="Designation" htmlFor="designation" required>
          <input
            id="designation"
            name="designation"
            type="text"
            required
            className={inputClasses}
          />
        </Field>
        <Field label="Clinic Name" htmlFor="clinic" required>
          <input
            id="clinic"
            name="clinic"
            type="text"
            required
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="grid gap-y-5 sm:grid-cols-2 sm:gap-x-4">
        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClasses}
          />
        </Field>
        <Field label="Phone Number" htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="Your Message" htmlFor="message">
        <textarea id="message" name="message" rows={4} className={inputClasses} />
      </Field>

      {/* Honeypot — hidden from humans, catches spam bots. Leave empty. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company (leave this field empty)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            type="checkbox"
            name="marketingConsent"
            value="yes"
            className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-400/30"
          />
          <span>
            I agree to receive other communications from Garbha.ai
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            type="checkbox"
            name="dataConsent"
            value="yes"
            required
            className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-400/30"
          />
          <span>
            I agree to allow Garbha.ai to store and process my personal data.
            <span className="text-brand-500"> *</span>
          </span>
        </label>
      </div>

      <p className="text-xs leading-5 text-ink-400">
        By clicking submit below, you consent to allow Garbha.ai to store and
        process the personal information submitted above to provide you the
        content requested.
      </p>

      {status === "error" && error && (
        <p className="rounded-lg bg-brand-500/10 px-4 py-3 text-sm text-brand-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
