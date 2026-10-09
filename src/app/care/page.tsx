import type { Metadata } from "next";
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
  assistantJobs,
  assistantRules,
  careDisclaimer,
  careFaqs,
  careSources,
  careStatus,
  counsellingSteps,
  finderLabels,
  journey,
  layers,
  neverDo,
  onboarding,
  programmes,
  promises,
  services,
  tools,
  verification,
} from "@/content/care";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { clsx } from "@/lib/clsx";

// Server component only: renders fully without JavaScript (FAQ uses <details>).

export const metadata: Metadata = {
  title: "Garbha Care — Free Fertility Tools, Counselling & Verified Care",
  description:
    "Garbha Care: a free ovulation tracker and fertility tools, a free counselling call, and consults, scans, care programmes, egg freezing and medicines from licence-verified providers — in one app.",
  alternates: { canonical: "/care" },
};

const stats: { value: string; label: string }[] = [
  { value: "27.5M", label: "Infertile couples in India" },
  { value: "3–3.5L", label: "IVF cycles a year" },
  { value: "4,692", label: "ART-registered clinics in the finder" },
  { value: "Free", label: "Tools, tracker and first counselling call" },
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
  { href: "#journey", label: "Your journey" },
  { href: "#tools", label: "Free tools" },
  { href: "#assistant", label: "Assistant" },
  { href: "#counselling", label: "Free counselling" },
  { href: "#programmes", label: "Care programmes" },
  { href: "#marketplace", label: "Book care" },
  { href: "#verified", label: "Verified partners" },
  { href: "#privacy", label: "Privacy" },
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
                Garbha Care · {careStatus.label}
              </span>
              <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                Every step of your fertility journey,
                <span className="block text-brand-500">in one trusted place</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-500">
                Free tools led by an ovulation tracker, an assistant in the app
                and on WhatsApp, and a free call with a fertility counsellor.
                When you need care, book consults, scans, care programmes, egg
                freezing and medicines from providers whose licences we have
                checked — at their full price, shown before you book.
              </p>
              <ul className="mt-8 hidden flex-wrap gap-2.5 sm:flex">
                {[
                  "Free ovulation tracker",
                  "Free counselling call",
                  "Licence-verified providers",
                  `${careStatus.languages.join(" & ")} · ${careStatus.next} next`,
                ].map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-ink-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-ink-600 backdrop-blur"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="#tools">
                  See the free tools <ArrowRight className="h-4 w-4" />
                </CtaLink>
                <CtaLink href="#verified" variant="secondary">
                  Become a verified partner
                </CtaLink>
              </div>
              <p className="mt-8 text-sm text-ink-500">
                Launching first in {careStatus.city}. {careDisclaimer}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:ml-auto lg:mr-0 animate-float">
                <div className="pointer-events-none absolute -inset-6 rounded-full bg-teal-400/15 blur-2xl" />
                <div className="relative rounded-[2rem] bg-white/80 p-6 shadow-2xl shadow-brand-500/15 ring-1 ring-white/60 backdrop-blur-md">
                  <CareCycleRing className="h-auto w-full" />
                  <p className="mt-2 text-center text-xs text-ink-500">
                    Sample cycle. Dates are estimates, never contraception.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Figures */}
      <section className="border-b border-ink-100 bg-ink-50/60">
        <Container className="py-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse text-center">
                <dt className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-500">
                  {s.label}
                </dt>
                <dd className="font-display text-3xl font-bold tracking-tight text-brand-700 sm:text-4xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-xs text-ink-500">
            Sources: <ExternalLink source={careSources.isar} />;{" "}
            <ExternalLink source={careSources.cycles} />;{" "}
            <ExternalLink source={careSources.registry} /> (checked 3 Oct 2026).
          </p>
        </Container>
      </section>

      {/* Jump links: one scrollable line on phones (avoids CLS on font swap). */}
      <Container>
        <nav
          aria-label="On this page"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 py-6 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {jumpLinks.map((j, i) => (
            <a
              key={j.href}
              href={j.href}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              <span className="font-display text-xs font-bold text-brand-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              {j.label}
            </a>
          ))}
        </nav>
      </Container>

      {/* Journey */}
      <SectionShell id="journey">
        <SectionHeading
          eyebrow="Wherever you are"
          title="Something free first, then care you can book"
          description="Most couples are early in the journey: unsure whether they have a problem, what it costs, or whom to trust. Garbha Care meets you at every stage."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {journey.map((j, i) => (
            <li
              key={j.stage}
              className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-bold text-ink-900">
                  {j.stage}
                </h3>
                <span aria-hidden="true" className="font-display text-3xl font-bold text-ink-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-ink-500">{j.who}</p>
              <p className="mt-4 text-sm italic leading-6 text-ink-700">{j.worry}</p>
              <dl className="mt-5 flex-1 space-y-3 border-t border-ink-100 pt-4 text-sm">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.1em] text-teal-700">
                    Free in the app
                  </dt>
                  <dd className="mt-1 text-ink-600">{j.free}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.1em] text-brand-700">
                    What you can book
                  </dt>
                  <dd className="mt-1 text-ink-600">{j.book}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </SectionShell>

      {/* Ecosystem layers */}
      <SectionShell tinted>
        <SectionHeading
          eyebrow="How it fits together"
          title="Garbha guides and verifies. Licensed providers deliver care."
          description="Garbha does not treat, test or dispense: it guides, verifies, connects and collects payment. You are a member; licensed providers are our partners."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((l) => (
            <li
              key={l.name}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <IconTile name={l.icon} solid />
              <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                {l.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{l.holds}</p>
              <dl className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-ink-500">Delivered by</dt>
                  <dd className="text-right font-medium text-ink-700">{l.by}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-500">Price</dt>
                  <dd className="text-right font-medium text-ink-700">{l.price}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* Free tools */}
      <SectionShell id="tools">
        <SectionHeading
          eyebrow="Free tools"
          title="Answers first — no sign-up"
          description="Each tool works without an account, takes under two minutes, and ends with one button: “Talk to a fertility counsellor — free.” The ovulation tracker leads, because it is the tool people open every day."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((t) => (
            <li
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <IconTile name={t.icon} />
                <span
                  className={clsx(
                    "rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] ring-1 ring-inset",
                    t.priority === "At launch"
                      ? "bg-teal-50 text-teal-700 ring-teal-200"
                      : "bg-ink-50 text-ink-600 ring-ink-200",
                  )}
                >
                  {t.priority}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                {t.name}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-ink-700">{t.gets}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink-600">{t.basis}</p>
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
            Educational information, not medical advice.
          </strong>{" "}
          No tool states a diagnosis or a success percentage. The tracker shows
          estimates and is never a form of contraception. Each tool will also
          have its own page on garbha.ai, with an “Open in the app” button.
        </p>
      </SectionShell>

      {/* Assistant */}
      <SectionShell id="assistant" tinted>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The Garbha Assistant"
              title="A guide, not a clinician"
              description="One assistant, in the app and on WhatsApp. It answers in plain words from content our clinical advisor has approved, sends reminders and helps you book — and hands you to a counsellor whenever a question turns medical or you ask."
            />
            <ul className="mt-8 space-y-3">
              {assistantRules.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-6 text-ink-700">
                  <ComplianceIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-500">
              Sources: <ExternalLink source={careSources.telemedicine} />;{" "}
              <ExternalLink source={careSources.whatsapp} />.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-ink-100 bg-ink-50 px-5 py-3">
                <span className="text-sm font-semibold text-ink-900">
                  Automated helper
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
                  Talk to a person
                </span>
              </div>
              <ul className="divide-y divide-ink-100">
                {assistantJobs.map((a) => (
                  <li key={a.job} className="grid gap-2 px-5 py-4 sm:grid-cols-[8rem_1fr]">
                    <span className="font-display font-bold text-ink-900">{a.job}</span>
                    <div className="text-sm leading-6">
                      <p className="text-ink-700">{a.does}</p>
                      <p className="mt-1 text-ink-500">
                        <span className="font-semibold text-amber-700">Hands over when:</span>{" "}
                        {a.handover}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Counselling */}
      <SectionShell id="counselling">
        <SectionHeading
          eyebrow="Free first-level counselling"
          title="Talk to a person before you pay for anything"
          description="Tools and the assistant earn your attention; a counsellor earns your trust. Only then is a paid service suggested — and if you already know what you need, you can book directly."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {counsellingSteps.map((s, i) => (
            <li
              key={s.title}
              className="relative h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <IconTile name={s.icon} />
                <span aria-hidden="true" className="font-display text-4xl font-bold text-ink-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-600">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-ink-600">
          Contact consent is asked before any call, and WhatsApp updates and
          outcome follow-up are separate, optional opt-ins — no box is ticked for
          you. Uploads are never part of sign-up.
        </p>
      </SectionShell>

      {/* Programmes */}
      <SectionShell id="programmes" tinted>
        <SectionHeading
          eyebrow="Care programmes"
          title="A fixed plan, with everything listed up front"
          description="Each programme bundles counselling, the right tests and consults from verified partners, and assistant check-ins. Each has a clinical owner, states what is and is not included, and never promises a pregnancy."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <li
              key={p.name}
              className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <IconTile name={p.icon} solid />
                <span
                  className={clsx(
                    "rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] ring-1 ring-inset",
                    i === 0
                      ? "bg-teal-50 text-teal-700 ring-teal-200"
                      : "bg-ink-50 text-ink-600 ring-ink-200",
                  )}
                >
                  {i === 0 ? "At launch" : "Next"}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                {p.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-ink-500">For: {p.for}</p>
              <p className="mt-4 flex-1 text-sm leading-6 text-ink-600">{p.bundles}</p>
              <p className="mt-5 border-t border-ink-100 pt-4 text-xs text-ink-500">
                Delivered by: {p.by}
              </p>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* Marketplace */}
      <SectionShell id="marketplace">
        <SectionHeading
          eyebrow="Book care"
          title="Six services, each with the rule that protects you"
          description="Every service is sold by a verified provider at its own price, shown in full before you book. The app enforces the rule that entitles each provider to offer it."
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
              <p className="mt-3 text-sm text-ink-500">
                <span className="font-semibold text-ink-700">Sold by:</span> {s.seller}
              </p>
              <p className="mt-4 flex-1 rounded-xl bg-indigo-50 px-4 py-3 text-sm leading-6 text-indigo-900">
                {s.rule}
              </p>
              <p className="mt-4 text-xs text-ink-500">
                Source: <ExternalLink source={s.source} />
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-600">
          Services open in order: consults and tests first, medicines last.
          Medicine delivery starts only after a legal review; prescription
          medicines are always dispensed and invoiced by a licensed pharmacy.
        </p>
      </SectionShell>

      {/* Verified partners */}
      <SectionShell id="verified" tinted>
        <SectionHeading
          eyebrow="Verified partners"
          title="“Verified” always names the licence behind it"
          description="A provider goes live only after Garbha has checked its licences against the issuing registry. A lapsed licence pauses its listings automatically."
        />

        <div className="mt-12 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm">
          <ul className="divide-y divide-ink-100">
            {verification.map((v) => (
              <li key={v.type} className="grid gap-2 px-6 py-5 md:grid-cols-[13rem_1fr]">
                <div>
                  <p className="font-display text-lg font-bold text-ink-900">{v.type}</p>
                  <p className="text-sm text-ink-500">{v.sells}</p>
                </div>
                <p className="flex gap-3 text-sm leading-6 text-ink-700">
                  <ComplianceIcon name="badge" className="mt-0.5 h-5 w-5 shrink-0 text-indigo-700" />
                  {v.checks}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-ink-500">
          Every partner also provides its legal name, address, PAN, GSTIN where
          registered, bank account, a grievance contact and a signed partner
          agreement. Sources: <ExternalLink source={careSources.artAct} />;{" "}
          <ExternalLink source={careSources.pcpndt} />;{" "}
          <ExternalLink source={careSources.nabl} />.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              The verified clinic finder
            </h3>
            <p className="mt-3 leading-7 text-ink-600">
              The finder lists every clinic on the National ART &amp; Surrogacy
              Registry — 4,692 when checked on 3 Oct 2026 — whether or not it is
              a partner.
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
              No star ratings, reviews or success-rate rankings at launch: there
              is no standard public source for clinic-level success rates.
            </p>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              For providers: onboarding in six steps
            </h3>
            <ol className="mt-6 space-y-3">
              {onboarding.map((o, i) => (
                <li
                  key={o.step}
                  className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-700 font-display font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="text-sm leading-6">
                    <p className="font-display text-base font-bold text-ink-900">{o.step}</p>
                    <p className="text-ink-600">{o.what}</p>
                    <p className="mt-1 text-xs text-teal-700">
                      <span className="font-semibold">Before moving on:</span> {o.gate}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/contact">
                Apply to become a partner <ArrowRight className="h-4 w-4" />
              </CtaLink>
              <CtaLink href="/partnership" variant="secondary">
                Partner with Garbha
              </CtaLink>
            </div>
            <p className="mt-3 text-xs text-ink-500">
              IVF centres, diagnostic centres, pharmacies, nutraceutical vendors,
              doctors and counsellors.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* Privacy and promises */}
      <SectionShell id="privacy">
        <SectionHeading
          eyebrow="Privacy and trust"
          title="Private by default, honest at every step"
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
              What Garbha Care never does
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
          <SectionHeading eyebrow="FAQ" title="Common questions" />
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
              Launching first in {careStatus.city}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-ink-500">
              In {careStatus.languages.join(" and ")}, with {careStatus.next} next.
              Want to know when it opens, or to join as a verified provider?
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CtaLink href="/contact">
                Get in touch <ArrowRight className="h-4 w-4" />
              </CtaLink>
              <CtaLink href="/compliance" variant="secondary">
                For clinics: Compliance Hub
              </CtaLink>
            </div>
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
