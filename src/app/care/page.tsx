import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight, ChevronDown } from "@/components/Icons";
import {
  ComplianceIcon,
  CtaLink,
  ExternalLink,
} from "@/components/ComplianceGuide";
import { CareCycleRing } from "@/components/CareCycleRing";
import {
  assistantPromises,
  callSteps,
  careDisclaimer,
  careFaqs,
  careSources,
  careStatus,
  finderLabels,
  howItWorks,
  journey,
  neverDo,
  programmes,
  promises,
  sampleChat,
  services,
  tools,
  verification,
} from "@/content/care";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { clsx } from "@/lib/clsx";

// Server component only: renders fully without JavaScript (FAQ uses <details>).

export const metadata: Metadata = {
  title: "Garbha Care — Fertility Support You Can Trust",
  description:
    "Trying to conceive or going through IVF? Garbha Care gives you free fertility tools, a free call with a counsellor, and care from licence-checked clinics, at the full price shown up front.",
  alternates: { canonical: "/care" },
};

const reassurance: { label: string; icon: Parameters<typeof ComplianceIcon>[0]["name"] }[] = [
  { label: "Free to start", icon: "heart" },
  { label: "No sign-up for tools", icon: "check" },
  { label: "A real person to talk to", icon: "chat" },
  { label: "Clinics checked against the government registry", icon: "badge" },
];

function SectionShell({
  id,
  tinted,
  children,
}: {
  id?: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "scroll-mt-24 border-t border-ink-100",
        tinted && "bg-ink-50/60",
      )}
    >
      <Container className="py-10 sm:py-14">{children}</Container>
    </section>
  );
}

function IconTile({
  name,
  solid,
}: {
  name: Parameters<typeof ComplianceIcon>[0]["name"];
  solid?: boolean;
}) {
  return (
    <span
      className={clsx(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
        solid
          ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25"
          : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
      )}
    >
      <ComplianceIcon name={name} className="h-6 w-6" />
    </span>
  );
}

const jumpLinks = [
  { href: "#journey", label: "Where are you?" },
  { href: "#tools", label: "Free tools" },
  { href: "#call", label: "Free counsellor call" },
  { href: "#care", label: "Care plans" },
  { href: "#trust", label: "Who we list" },
  { href: "#privacy", label: "Your privacy" },
];

export default function GarbhaCarePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Garbha Care", path: "/care" },
          ]),
          faqSchema(careFaqs),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-ink-100">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-50 [mask-image:radial-gradient(90%_60%_at_50%_0%,black,transparent)]" />
        <div className="animate-blob pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />
        <div
          className="animate-blob pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-teal-300/25 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <Container className="pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                Garbha Care · {careStatus.label} in {careStatus.city}
              </span>
              <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                Trying for a baby?
                <span className="block text-brand-500">You don’t have to work it out alone.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-500">
                Understand your cycle and your reports with free tools. Talk
                it through with a fertility counsellor, free. And when you need
                care, book it with clinics whose licences we have checked, at
                the full price, shown before you pay.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="#journey">
                  Find where you are <ArrowRight className="h-4 w-4" />
                </CtaLink>
                <CtaLink href="#call" variant="secondary">
                  Talk to a counsellor, free
                </CtaLink>
              </div>
              <p className="mt-8 text-sm text-ink-500">
                In {careStatus.languages.join(" and ")}, with {careStatus.next} to
                follow. {careDisclaimer}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:ml-auto lg:mr-0 animate-float">
                <div className="pointer-events-none absolute -inset-6 rounded-full bg-teal-400/15 blur-2xl" />
                <div className="relative rounded-[2rem] bg-white/80 p-6 shadow-2xl shadow-brand-500/15 ring-1 ring-white/60 backdrop-blur-md">
                  <CareCycleRing className="h-auto w-full" />
                  <p className="mt-2 text-center text-xs text-ink-500">
                    An example cycle, with sample data. Dates are estimates,
                    never contraception.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reassurance strip */}
      <section className="border-b border-ink-100 bg-ink-50/60">
        <Container className="py-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
            {reassurance.map((r) => (
              <li key={r.label} className="flex items-center gap-3">
                <IconTile name={r.icon} />
                <span className="text-sm font-semibold leading-5 text-ink-800">
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Jump links: one scrollable line on phones. */}
      <Container>
        <nav
          aria-label="On this page"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 py-6 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {jumpLinks.map((j) => (
            <a
              key={j.href}
              href={j.href}
              className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {j.label}
            </a>
          ))}
        </nav>
      </Container>

      {/* Where are you right now? */}
      <SectionShell id="journey">
        <SectionHeading
          eyebrow="Wherever you are"
          title="Where are you right now?"
          description="Every journey is different. Find the moment that sounds like yours, and see what can help today and what you can book when you’re ready."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {journey.map((j) => (
            <li
              key={j.stage}
              className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
              <div className="flex items-center gap-3">
                <IconTile name={j.icon} />
                <h3 className="font-display text-lg font-bold leading-snug text-ink-900">
                  {j.stage}
                </h3>
              </div>
              <p className="mt-4 text-sm italic leading-6 text-ink-600">{j.feeling}</p>
              <dl className="mt-5 flex-1 space-y-3 border-t border-ink-100 pt-4 text-sm">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.1em] text-teal-700">
                    Free help now
                  </dt>
                  <dd className="mt-1 text-ink-700">{j.helpNow}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.1em] text-brand-700">
                    When you’re ready
                  </dt>
                  <dd className="mt-1 text-ink-700">{j.whenReady}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* How it works */}
      <SectionShell tinted>
        <SectionHeading
          eyebrow="How it works"
          title="Free help first. Care only when you need it."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map((s, i) => (
            <li
              key={s.title}
              className="relative h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <IconTile name={s.icon} solid />
                <span
                  className={clsx(
                    "rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] ring-1 ring-inset",
                    s.free
                      ? "bg-teal-50 text-teal-700 ring-teal-200"
                      : "bg-ink-50 text-ink-600 ring-ink-200",
                  )}
                >
                  {s.free ? "Free" : "Paid, price shown first"}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                <span className="text-brand-500">{i + 1}.</span> {s.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      {/* Free tools */}
      <SectionShell id="tools">
        <SectionHeading
          eyebrow="Free tools"
          title="Answers in under two minutes"
          description="No account needed. Every tool shows your result first, explains what it is based on, and offers a free call with a counsellor if you want to talk it through."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tools.map((t) => (
            <li
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <IconTile name={t.icon} />
                {t.later && (
                  <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ink-600 ring-1 ring-inset ring-ink-200">
                    Coming later
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                {t.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-700">{t.gets}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink-500">{t.basis}</p>
              {t.source && (
                <p className="mt-5 border-t border-ink-100 pt-4 text-xs text-ink-500">
                  Source: <ExternalLink source={t.source} />
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-8 rounded-xl border border-ink-100 bg-ink-50 px-5 py-4 text-sm text-ink-600">
          <strong className="font-semibold text-ink-900">
            These tools inform; they don’t diagnose.
          </strong>{" "}
          None of them gives a diagnosis or your chances as a percentage. The
          tracker shows estimates and must never be used as contraception.
        </p>
      </SectionShell>

      {/* Assistant */}
      <SectionShell tinted>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="The Garbha Assistant"
              title="Ask anything, any time, without judgement"
              description="In the app, and on WhatsApp if you choose. It explains terms and reports in plain words, reminds you of medicines and scans, and helps you book."
            />
            <ul className="mt-8 space-y-3">
              {assistantPromises.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-6 text-ink-700">
                  <ComplianceIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <figure className="mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-ink-100 bg-white shadow-xl shadow-brand-500/10">
              <div className="flex items-center justify-between gap-3 border-b border-ink-100 bg-ink-50 px-5 py-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                  <span className="h-2 w-2 rounded-full bg-teal-500" />
                  Garbha Assistant · automated
                </span>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
                  Talk to a person
                </span>
              </div>
              <ul className="space-y-3 px-5 py-5">
                {sampleChat.map((m, i) => (
                  <li
                    key={i}
                    className={clsx(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                      m.from === "you"
                        ? "ml-auto rounded-br-md bg-brand-700 text-white"
                        : "rounded-bl-md bg-ink-50 text-ink-800 ring-1 ring-inset ring-ink-100",
                    )}
                  >
                    <span className="sr-only">{m.from === "you" ? "You: " : "Assistant: "}</span>
                    {m.text}
                  </li>
                ))}
              </ul>
              <figcaption className="border-t border-ink-100 px-5 py-3 text-xs text-ink-500">
                Example conversation, for illustration.
              </figcaption>
            </figure>
          </div>
        </div>
      </SectionShell>

      {/* Free counsellor call */}
      <SectionShell id="call">
        <SectionHeading
          eyebrow="Free counselling"
          title="Talk to a person before you pay for anything"
          description="A fertility counsellor listens, explains your options in plain words and helps you decide what to do next. If you already know what you need, you can book directly."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {callSteps.map((s, i) => (
            <li
              key={s.title}
              className="relative h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 font-display font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-600">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-ink-600">
          We ask your permission before anyone calls you. WhatsApp updates are a
          separate choice, and you never have to upload reports to sign up.
        </p>
      </SectionShell>

      {/* Care plans */}
      <SectionShell id="care" tinted>
        <SectionHeading
          eyebrow="Care plans"
          title="A clear plan for where you are"
          description="Each plan brings together counselling, the right tests and consults with verified providers. It lists everything included before you start, and never promises a pregnancy."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <li
              key={p.name}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <IconTile name={p.icon} solid />
              <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                {p.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-brand-700">{p.for}</p>
              <p className="mt-4 flex-1 text-sm leading-6 text-ink-600">{p.includes}</p>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* What you can book */}
      <SectionShell>
        <SectionHeading
          eyebrow="When you need care"
          title="Book it in one place, with the protections built in"
          description="Every service comes from a verified provider at its own full price, shown before you book."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.name}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <IconTile name={s.icon} />
              <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                {s.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-600">{s.gets}</p>
              <div className="mt-4 flex-1 rounded-xl bg-indigo-50 px-4 py-3 text-sm leading-6 text-indigo-900">
                <span className="font-semibold">What protects you: </span>
                {s.protection}
              </div>
              <p className="mt-4 text-xs text-ink-500">
                Source: <ExternalLink source={s.source} />
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-600">
          Consults and tests open first. Medicine delivery follows later.
        </p>
      </SectionShell>

      {/* Trust: who we list */}
      <SectionShell id="trust" tinted>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Who we list"
              title="How you know a clinic is genuine"
              description="Before any provider can take a booking, we check its licences with the authority that issued them. If a licence lapses, its listing is paused automatically."
            />
            <ul className="mt-8 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
              {verification.map((v) => (
                <li key={v.type} className="flex gap-3 px-5 py-4 text-sm leading-6">
                  <ComplianceIcon name="badge" className="mt-0.5 h-5 w-5 shrink-0 text-indigo-700" />
                  <p>
                    <span className="font-semibold text-ink-900">{v.type}:</span>{" "}
                    <span className="text-ink-700">{v.checked}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <h3 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              What the badges in the clinic finder mean
            </h3>
            <p className="mt-3 leading-7 text-ink-600">
              The finder lists every clinic on the government’s national ART
              registry, whether or not it works with us, so you can check any
              clinic you are considering.
            </p>
            <ul className="mt-6 space-y-4">
              {finderLabels.map((f) => (
                <li key={f.label} className="flex flex-col gap-1.5">
                  <span
                    className={clsx(
                      "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset",
                      f.tone === "registry" && "bg-white text-ink-700 ring-ink-300",
                      f.tone === "verified" && "bg-indigo-50 text-indigo-700 ring-indigo-200",
                      f.tone === "ai" && "bg-brand-50 text-brand-700 ring-brand-200",
                    )}
                  >
                    <ComplianceIcon name="badge" className="h-3.5 w-3.5" />
                    {f.label}
                  </span>
                  <span className="text-sm text-ink-600">{f.meaning}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-600">
              We don’t show star ratings or success-rate rankings: there is no
              reliable public source for clinic success rates, and we won’t
              guess.
            </p>
            <p className="mt-3 text-xs text-ink-500">
              Source: <ExternalLink source={careSources.registry} />.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* Privacy and promises */}
      <SectionShell id="privacy">
        <SectionHeading
          eyebrow="Your privacy"
          title="Private by default, honest at every step"
          description="Fertility is personal. These promises hold whether you use one free tool or book your treatment through us."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p) => (
            <li
              key={p.title}
              className="h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <IconTile name={p.icon} />
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-600">{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-7 sm:p-10">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white">
              <ComplianceIcon name="ban" className="h-6 w-6" />
            </span>
            <h3 className="font-display text-2xl font-bold text-ink-900">
              What we will never do
            </h3>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {neverDo.map((n) => (
              <li key={n} className="flex gap-3 text-sm leading-6 text-ink-700">
                <ComplianceIcon name="ban" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      {/* FAQ */}
      <section className="border-t border-ink-100 bg-ink-50/60">
        <Container className="py-10 sm:py-14">
          <SectionHeading eyebrow="Questions" title="What people ask us" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
            {careFaqs.map((f, i) => (
              <details key={f.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-base font-semibold text-ink-900 transition-colors group-open:text-brand-700 sm:text-lg">
                    {f.q}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="px-6 pb-6 leading-7 text-ink-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-ink-100">
        <Container className="py-10 sm:py-14">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-50 px-7 py-12 text-center sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-brand opacity-70" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              Garbha Care · {careStatus.label}
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Be the first to know when it opens in {careStatus.city}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-ink-500">
              Leave us your details and we’ll tell you as soon as Garbha Care is
              ready, in {careStatus.languages.join(" or ")}.
            </p>
            <div className="mt-8 flex justify-center">
              <CtaLink href="/contact">
                Keep me posted <ArrowRight className="h-4 w-4" />
              </CtaLink>
            </div>
            <p className="mt-8 text-sm text-ink-500">
              Are you a clinic, lab or pharmacy?{" "}
              <Link
                href="/partnership"
                className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
              >
                Partner with Garbha
              </Link>
            </p>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-ink-500">
            {careDisclaimer} In an emergency, such as heavy bleeding or severe
            pain, seek urgent medical care.
          </p>
        </Container>
      </section>
    </>
  );
}
