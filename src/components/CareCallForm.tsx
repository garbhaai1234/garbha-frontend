"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "@/components/Icons";
import { ComplianceIcon } from "@/components/ComplianceGuide";
import { Check, Field, btnPrimary, inputCls } from "@/components/CareUi";
import { careStatus, type CareToolId } from "@/content/care";
import {
  callOptions,
  validateCallRequest,
  type CallErrors,
  type CallField,
} from "@/lib/care/callRequest";
import { clsx } from "@/lib/clsx";
import { useHydrated } from "@/lib/care/useStored";
import { site } from "@/lib/site";

/**
 * The free counsellor call request: four required answers (name, mobile,
 * language, consent) and an optional, folded "help your counsellor prepare"
 * part. The same rules run here and on the server (lib/care/callRequest).
 * What is typed stays in this component only (never in storage) and is kept if
 * sending fails.
 */

type Values = Record<
  | "firstName" | "mobile" | "place" | "age" | "partnerAge" | "trying" | "stage"
  | "language" | "callTime" | "email",
  string
> & { consent: boolean; whatsapp: boolean };

const empty: Values = {
  firstName: "", mobile: "", place: "", age: "", partnerAge: "", trying: "", stage: "",
  language: "", callTime: "", email: "", consent: false, whatsapp: false,
};

/** The module someone came from suggests where they are; they can change it. */
const stageFromModule: Record<CareToolId, (typeof callOptions.stage)[number]> = {
  ovulation: "Trying to conceive",
  specialist: "Trying to conceive",
  semen: "Tests done, not sure what they mean",
  cost: "Advised IVF or IUI",
  questions: "Advised IVF or IUI",
  reminders: "In treatment now",
  ivf: "In treatment now",
  eggs: "Planning ahead (egg freezing)",
};

/** The module in the address bar, else the last one opened in this tab (set by CareTools). */
const moduleFromHash = () => {
  if (typeof window === "undefined") return null;
  let id = window.location.hash.replace(/^#tool-/, "");
  if (!(id in stageFromModule)) {
    try {
      id = sessionStorage.getItem("garbha-care:last-module") ?? "";
    } catch {
      id = "";
    }
  }
  return id in stageFromModule ? (id as CareToolId) : null;
};

function payload(v: Values, extra: Record<string, string> = {}) {
  return {
    ...v,
    consent: v.consent ? "yes" : "",
    whatsapp: v.whatsapp ? "yes" : "",
    ...extra,
  };
}

function Choices({
  name,
  legend,
  options,
  value,
  error,
  onChange,
}: {
  name: CallField;
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-sm font-semibold text-ink-800">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o}
            className={clsx(
              "flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500",
              value === o
                ? "border-brand-500 bg-brand-50 text-brand-800"
                : "border-ink-200 bg-white text-ink-700 hover:border-brand-300",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-brand-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}

const OPTIONAL: CallField[] = ["place", "age", "partnerAge", "trying", "stage", "callTime", "email"];

export function CareCallForm() {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<CallErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [problem, setProblem] = useState("");
  const [sentTo, setSentTo] = useState<Values | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  // Fields stay disabled until the page is interactive, so nothing typed is lost.
  const ready = useHydrated();

  const set = <K extends keyof Values>(k: K, value: Values[K]) => {
    setV((s) => ({ ...s, [k]: value }));
    setErrors((e) => {
      if (!(k in e)) return e;
      const next = { ...e };
      delete next[k as CallField];
      return next;
    });
  };

  const focusField = (field: CallField) =>
    requestAnimationFrame(() =>
      formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus(),
    );

  /** Shows errors; opens the optional part if one of them is there; focuses the first. */
  const showErrors = (errs: CallErrors) => {
    setErrors(errs);
    const first = (Object.keys(errs) as CallField[])[0];
    if (!first) return;
    if (OPTIONAL.includes(first)) setMoreOpen(true);
    focusField(first);
  };

  // Pre-fill "where you are now" from the tool just used, the first time the form is touched.
  const prefill = () => {
    if (v.stage) return;
    const m = moduleFromHash();
    if (m) set("stage", stageFromModule[m]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProblem("");
    const body = payload(v, { from: moduleFromHash() ?? "", website: honeypot.current?.value ?? "" });
    const r = validateCallRequest(body);
    if (!r.ok) {
      if (r.malformed) setProblem("Some answers are too long. Please shorten them and try again.");
      else showErrors(r.errors);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/care-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: CallErrors };
      if (res.ok && data.ok) {
        setSentTo(v);
        setV(empty);
        setStatus("done");
        return;
      }
      setStatus("idle");
      if (data.errors) showErrors(data.errors);
      setProblem(data.error ?? `We couldn’t send your request. Please try again, or email us at ${site.email}.`);
    } catch {
      setStatus("idle");
      setProblem(`You seem to be offline. Your answers are still here: please try again, or email us at ${site.email}.`);
    }
  };

  if (status === "done" && sentTo) {
    const masked = sentTo.mobile.replace(/\D/g, "").slice(-10).replace(/^(\d{2})\d{4}/, "$1••••");
    const when = sentTo.callTime ? `, in the ${sentTo.callTime.split(" ")[0].toLowerCase()}` : "";
    return (
      <div role="status" className="rounded-[1.75rem] border border-teal-200 bg-white p-6 shadow-xl shadow-teal-700/10 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white">
          <ComplianceIcon name="check" className="h-6 w-6" />
        </span>
        <p className="mt-4 font-display text-2xl font-bold text-ink-900">
          Thank you, {sentTo.firstName}. Your request is with our team.
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-700">
          <li>
            A counsellor will call you on <strong>+91 {masked}</strong> in <strong>{sentTo.language}</strong>
            {when}, when calls begin in {careStatus.city}.
          </li>
          <li>The call is free, and nobody will ask you to pay or to share reports on it.</li>
          {sentTo.whatsapp && <li>We’ll also send updates on WhatsApp, as you asked.</li>}
        </ul>
        <p className="mt-4 text-sm text-ink-600">
          Changed your mind? Email{" "}
          <a className="font-semibold text-brand-700 underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          and we’ll delete your request.
        </p>
        <a href="#tools" className={clsx(btnPrimary, "mt-6")}>
          Keep using the free tools <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      onFocusCapture={prefill}
      noValidate
      aria-labelledby="call-form-title"
      className="relative rounded-[1.75rem] border border-ink-100 bg-white p-5 shadow-xl shadow-brand-500/10 sm:p-8"
    >
      <p id="call-form-title" className="font-display text-xl font-bold text-ink-900">
        Request your free call
      </p>
      <p className="mt-1 text-sm text-ink-500">Takes under a minute. Only four answers are needed.</p>

      {/* Honeypot: hidden from people and screen readers; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset disabled={!ready} className="contents">
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="First name" error={errors.firstName}>
            {(id, d) => (
              <input id={id} name="firstName" autoComplete="given-name" value={v.firstName} maxLength={60}
                aria-invalid={!!errors.firstName || undefined} aria-describedby={d}
                onChange={(e) => set("firstName", e.target.value)} className={inputCls} />
            )}
          </Field>
          <Field label="Mobile number" error={errors.mobile}>
            {(id, d) => (
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 mt-1.5 flex items-center text-base text-ink-500 sm:text-sm">+91</span>
                <input id={id} name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" value={v.mobile} maxLength={20}
                  aria-invalid={!!errors.mobile || undefined} aria-describedby={d}
                  onChange={(e) => set("mobile", e.target.value)} className={clsx(inputCls, "pl-12")} />
              </div>
            )}
          </Field>
        </div>

        <div className="mt-5">
          <Choices name="language" legend="Language for the call" options={callOptions.language}
            value={v.language} error={errors.language} onChange={(o) => set("language", o)} />
        </div>

        <details
          className="group mt-5 rounded-2xl border border-ink-100 bg-ink-50/60"
          open={moreOpen}
          onToggle={(e) => setMoreOpen(e.currentTarget.open)}
        >
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block text-sm font-semibold text-ink-800">Help your counsellor prepare</span>
              <span className="block text-xs text-ink-500">Optional: your city, ages, how long you’ve been trying</span>
            </span>
            <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-500 transition-transform group-open:rotate-180" />
          </summary>
          <div className="grid gap-4 px-4 pb-5 sm:grid-cols-2">
            <Field label="City or PIN code" optional error={errors.place}>
              {(id, d) => (
                <input id={id} name="place" autoComplete="address-level2" value={v.place} maxLength={80}
                  aria-invalid={!!errors.place || undefined} aria-describedby={d}
                  onChange={(e) => set("place", e.target.value)} className={inputCls} />
              )}
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Your age" optional error={errors.age}>
                {(id, d) => (
                  <input id={id} name="age" inputMode="numeric" value={v.age} maxLength={3}
                    aria-invalid={!!errors.age || undefined} aria-describedby={d}
                    onChange={(e) => set("age", e.target.value.replace(/\D/g, ""))} className={inputCls} />
                )}
              </Field>
              <Field label="Partner’s age" optional error={errors.partnerAge}>
                {(id, d) => (
                  <input id={id} name="partnerAge" inputMode="numeric" value={v.partnerAge} maxLength={3}
                    aria-invalid={!!errors.partnerAge || undefined} aria-describedby={d}
                    onChange={(e) => set("partnerAge", e.target.value.replace(/\D/g, ""))} className={inputCls} />
                )}
              </Field>
            </div>
            <Field label="How long have you been trying?" optional error={errors.trying}>
              {(id, d) => (
                <select id={id} name="trying" value={v.trying} aria-invalid={!!errors.trying || undefined} aria-describedby={d}
                  onChange={(e) => set("trying", e.target.value)} className={inputCls}>
                  <option value="">Choose one</option>
                  {callOptions.trying.map((o) => <option key={o}>{o}</option>)}
                </select>
              )}
            </Field>
            <Field label="Where are you now?" optional error={errors.stage}>
              {(id, d) => (
                <select id={id} name="stage" value={v.stage} aria-invalid={!!errors.stage || undefined} aria-describedby={d}
                  onChange={(e) => set("stage", e.target.value)} className={inputCls}>
                  <option value="">Choose one</option>
                  {callOptions.stage.map((o) => <option key={o}>{o}</option>)}
                </select>
              )}
            </Field>
            <div className="sm:col-span-2">
              <Choices name="callTime" legend="Best time to call (optional)" options={callOptions.callTime}
                value={v.callTime} error={errors.callTime} onChange={(o) => set("callTime", o)} />
            </div>
            <div className="sm:col-span-2">
              <Field label="Email" optional error={errors.email} hint="Only if you’d like a written summary after the call.">
                {(id, d) => (
                  <input id={id} name="email" type="email" autoComplete="email" value={v.email} maxLength={254}
                    aria-invalid={!!errors.email || undefined} aria-describedby={d}
                    onChange={(e) => set("email", e.target.value)} className={inputCls} />
                )}
              </Field>
            </div>
          </div>
        </details>

        <div className="mt-5 space-y-2">
          <Check name="consent" checked={v.consent} onChange={(c) => set("consent", c)} invalid={!!errors.consent}
            describedBy={errors.consent ? "consent-error" : undefined}>
            I agree that Garbha may call me on this number about my request. My details are used for this call
            only and are never shared with a clinic without my permission.{" "}
            <Link href="/privacy" className="font-semibold text-brand-700 underline underline-offset-4">
              Privacy policy
            </Link>
          </Check>
          {errors.consent && (
            <p id="consent-error" className="text-sm font-medium text-brand-700">{errors.consent}</p>
          )}
          <Check name="whatsapp" checked={v.whatsapp} onChange={(c) => set("whatsapp", c)}>
            Also send me updates on WhatsApp (optional). Nothing is ever sold on WhatsApp.
          </Check>
        </div>
      </fieldset>

      {problem && (
        <p role="alert" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {problem}
        </p>
      )}

      <button type="submit" disabled={!ready || status === "sending"} className={clsx(btnPrimary, "mt-6 min-h-12 w-full")}>
        {status === "sending" ? "Sending…" : "Request my free call"}
        {status !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="mt-3 text-center text-xs text-ink-500">Free. No payment, no reports needed.</p>
    </form>
  );
}
