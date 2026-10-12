import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight, ChevronDown } from "@/components/Icons";
import { ComplianceIcon, CtaLink } from "@/components/ComplianceGuide";
import { CareHeroTracker } from "@/components/CareHeroTracker";
import { CareTools } from "@/components/CareTools";
import { CareCallForm } from "@/components/CareCallForm";
import { CareStickyBar } from "@/components/CareStickyBar";
import {
  artRegistryUrl,
  callSteps,
  careDisclaimer,
  careFaqs,
  careStatus,
  neverDo,
  programmes,
  promises,
  services,
  verification,
} from "@/content/care";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { clsx } from "@/lib/clsx";

// Server component. Interactive parts are client components: the hero
// tracker, the modules, the call form and the phone shortcut bar.
// Spec: docs/specs/garbha-care-redesign.md (REQ-CARE-01).

export const metadata: Metadata = {
  title: "Garbha Care — Fertility Support You Can Trust",
  description:
    "Trying to conceive? Free fertility tools that answer in a minute, and a free call with a fertility counsellor. Garbha Care is opening in Hyderabad.",
  alternates: { canonical: "/care" },
};

type Icon = Parameters<typeof ComplianceIcon>[0]["name"];

/** Only what is true today. */
const reassurance: { label: string; icon: Icon }[] = [
  { label: "Free, no sign-up", icon: "heart" },
  { label: "Answers saved only on your device", icon: "lock" },
  { label: `A free counsellor call, in ${careStatus.languages.join(" or ")}`, icon: "chat" },
  { label: "No diagnosis, no chances as a number", icon: "check" },
];

function SectionShell({
  id,
  tinted,
  band,
  children,
}: {
  id?: string;
  tinted?: boolean;
  /** A soft coral band, for the one section that asks for action. */
  band?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "scroll-mt-24",
        band ? "bg-gradient-to-b from-brand-50/80 via-brand-50/40 to-white" : "border-t border-ink-100",
        tinted && "bg-ink-50/60",
      )}
    >
      <Container className="py-10 sm:py-14">{children}</Container>
    </section>
  );
}

function IconTile({ name }: { name: Icon }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
      <ComplianceIcon name={name} className="h-6 w-6" />
    </span>
  );
}

function ComingBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-indigo-700 ring-1 ring-inset ring-indigo-200">
      Coming
    </span>
  );
}

/** A "when it opens" topic: title and one line, with the detail folded away. */
function Upcoming({
  icon,
  title,
  summary,
  children,
}: {
  icon: Icon;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-start gap-4 px-1 py-5 sm:py-6 [&::-webkit-details-marker]:hidden">
        <IconTile name={icon} />
        <span className="flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-bold text-ink-900">{title}</span>
            <ComingBadge />
          </span>
          <span className="mt-1 block text-sm leading-6 text-ink-600">{summary}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className="mt-1 h-5 w-5 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <div className="pb-6 pl-[3.75rem] pr-1">{children}</div>
    </details>
  );
}

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

      {/* Hero: a working fertile-day check */}
      <section id="care-hero" className="relative isolate overflow-hidden border-b border-ink-100">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-50 via-white to-white" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-50 [mask-image:radial-gradient(90%_60%_at_50%_0%,black,transparent)]" />
        <div className="animate-blob pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-200/20 blur-3xl" />
        <div
          className="animate-blob pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-teal-300/25 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <Container className="pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
          <CareHeroTracker>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              Garbha Care · Free tools, available now
            </span>
            <h1 className="mt-6 font-display text-[2.1rem] font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Trying for a baby?
              <span className="block text-brand-500">You don’t have to work it out alone.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-500 sm:text-lg sm:leading-8">
              Free tools that give you an answer in a minute, and a free call with a
              fertility counsellor when you want to talk it through.
            </p>
            <p className="mt-3 text-sm text-ink-500">
              Prefer to talk first?{" "}
              <a href="#request-call" className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800">
                Request a free counsellor call
              </a>
            </p>
          </CareHeroTracker>
        </Container>
      </section>

      {/* What is true today, in one line */}
      <section className="border-b border-ink-100 bg-ink-50/60">
        <Container className="py-6 sm:py-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
            {reassurance.map((r) => (
              <li key={r.label} className="flex items-center gap-3">
                <IconTile name={r.icon} />
                <span className="text-sm font-semibold leading-5 text-ink-800">{r.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The eight tools */}
      <SectionShell id="tools">
        <SectionHeading
          eyebrow="8 free tools"
          title="Pick a tool. Get your answer now."
          description="Each tool works right here: enter your details and see the result straight away. No account, and anything you save stays on this device."
        />
        <CareTools />
        {/* The one disclaimer for the page; each result also carries its own short note. */}
        <p className="mt-8 rounded-xl border border-ink-100 bg-ink-50 px-5 py-4 text-sm leading-6 text-ink-600">
          <strong className="font-semibold text-ink-900">These tools inform; they don’t diagnose.</strong>{" "}
          None gives a diagnosis or your chances as a number, and the tracker’s dates are estimates,
          never contraception. {careDisclaimer} In an emergency, such as heavy bleeding or severe
          pain, seek urgent medical care.
        </p>
      </SectionShell>

      {/* Free counsellor call: the one form on the page */}
      <SectionShell id="call" band>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Free counselling"
              title="Talk it through with a person, free"
              description="A fertility counsellor listens, explains your options in plain words and helps you decide what to do next. You are never pushed to buy anything."
            />
            <ol className="mt-8 space-y-5">
              {callSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-700 font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink-900">{s.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-sm leading-6 text-indigo-900">
              <strong className="font-semibold">Opening soon in {careStatus.city}.</strong>{" "}
              Request your call now and a counsellor will ring you, in{" "}
              {careStatus.languages.join(" or ")}, as soon as calls begin.
            </p>
          </div>
          {/* Call buttons land here, so on a phone the form is on screen, not the steps. */}
          <div id="request-call" className="scroll-mt-20 lg:col-span-7 lg:scroll-mt-24">
            <CareCallForm />
          </div>
        </div>
      </SectionShell>

      {/* Everything that opens later: clearly marked, nothing to click that doesn't work */}
      <SectionShell id="care">
        <SectionHeading
          eyebrow={`Opening in ${careStatus.city}`}
          title="When you need care, book it with protections built in"
          description="These start when Garbha Care opens. Until then, you can check any clinic yourself on the government’s registry."
        />
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="flex gap-3 text-sm leading-6 text-indigo-900">
            <ComplianceIcon name="badge" className="mt-0.5 h-5 w-5 shrink-0 text-indigo-700" />
            <span>
              <strong className="font-semibold">Available today:</strong> look up any IVF clinic on
              the National ART &amp; Surrogacy Registry before you visit.
            </span>
          </p>
          <a
            href={artRegistryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-indigo-800 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
          >
            Check a clinic’s registration <ArrowRight className="h-4 w-4" />
            <span className="sr-only">(opens the government registry in a new tab)</span>
          </a>
        </div>

        <div className="mt-4 max-w-4xl divide-y divide-ink-100 border-y border-ink-100">
          <Upcoming
            icon="list"
            title="Care plans"
            summary="A clear plan for where you are, with everything included listed before you start."
          >
            <ul className="space-y-3">
              {programmes.map((p) => (
                <li key={p.name} className="text-sm leading-6">
                  <span className="font-semibold text-ink-900">{p.name}</span>
                  <span className="text-ink-500"> · {p.for}</span>
                  <span className="block text-ink-600">{p.includes}</span>
                </li>
              ))}
            </ul>
          </Upcoming>
          <Upcoming
            icon="building"
            title="Consults, scans, IVF and medicines"
            summary="Book in one place, at the provider’s full price, shown before you book."
          >
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name} className="text-sm leading-6">
                  <span className="font-semibold text-ink-900">{s.name}:</span>{" "}
                  <span className="text-ink-600">{s.gets}</span>
                  <span className="mt-1 block rounded-lg bg-indigo-50 px-3 py-2 text-indigo-900">
                    <span className="font-semibold">What protects you: </span>
                    {s.protection}
                  </span>
                </li>
              ))}
            </ul>
          </Upcoming>
          <Upcoming
            icon="badge"
            title="Only licence-checked providers"
            summary="Before a provider can take a booking, we check its licences with the authority that issued them."
          >
            <ul className="space-y-2">
              {verification.map((v) => (
                <li key={v.type} className="text-sm leading-6">
                  <span className="font-semibold text-ink-900">{v.type}:</span>{" "}
                  <span className="text-ink-600">{v.checked}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-600">
              No star ratings or success-rate rankings: there is no reliable public source for
              clinic success rates, and we won’t guess.
            </p>
          </Upcoming>
          <Upcoming
            icon="chat"
            title="The Garbha Assistant"
            summary="An automated helper in the app, and on WhatsApp if you choose, that explains terms and reports."
          >
            <ul className="space-y-2 text-sm leading-6 text-ink-600">
              <li>Says it is automated, and always offers a real person.</li>
              <li>Answers only from content our clinical advisor has approved.</li>
              <li>Never diagnoses, prescribes or tells you your chances.</li>
              <li>For anything urgent, such as heavy bleeding or severe pain, tells you to get urgent care.</li>
            </ul>
          </Upcoming>
        </div>
      </SectionShell>

      {/* Privacy and promises: true today */}
      <SectionShell id="privacy" tinted>
        <SectionHeading
          eyebrow="Your privacy"
          title="Private by default, honest at every step"
        />
        <ul className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {promises.map((p) => (
            <li key={p.title} className="flex gap-4">
              <IconTile name={p.icon} />
              <div>
                <h3 className="font-display text-base font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-600">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl border border-brand-200 bg-white p-5 sm:p-6">
          <h3 className="flex items-center gap-3 font-display text-lg font-bold text-ink-900">
            <ComplianceIcon name="ban" className="h-5 w-5 text-brand-700" />
            What we will never do
          </h3>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {neverDo.map((n) => (
              <li key={n} className="flex gap-2.5 text-sm leading-6 text-ink-700">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      {/*
        Who's behind Garbha Care: add a strip with the counsellors and the clinical advisor
        here once each person has agreed to be named and pictured (REQ-CARE-02). Never use
        stock photos or placeholder people.
      */}

      {/* FAQ */}
      <SectionShell>
        <SectionHeading eyebrow="Questions" title="What people ask us" />
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
          {careFaqs.map((f, i) => (
            <details key={f.q} className="group" open={i === 0}>
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-base font-semibold text-ink-900 transition-colors group-open:text-brand-700 sm:text-lg">
                  {f.q}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 leading-7 text-ink-600 sm:px-6 sm:pb-6">{f.a}</p>
            </details>
          ))}
        </div>
      </SectionShell>

      {/* Closing */}
      <section className="border-t border-ink-100">
        <Container className="py-10 sm:py-14">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-50 px-6 py-10 text-center sm:px-14 sm:py-14">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-brand opacity-70" />
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Not sure where to start?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-ink-500 sm:text-lg sm:leading-8">
              Tell a counsellor where you are. The call is free, in{" "}
              {careStatus.languages.join(" or ")}, and you decide what happens next.
            </p>
            <div className="mt-7 flex justify-center">
              <CtaLink href="#request-call">
                Request a free call <ArrowRight className="h-4 w-4" />
              </CtaLink>
            </div>
            <p className="mt-7 text-sm text-ink-500">
              Are you a clinic, lab or pharmacy?{" "}
              <Link
                href="/partnership"
                className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
              >
                Partner with Garbha
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <CareStickyBar heroId="care-hero" callId="request-call" />
    </>
  );
}
