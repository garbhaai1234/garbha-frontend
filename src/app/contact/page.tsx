import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import { ArrowRight, Check } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Drop us a message and our team will get back to you within 24–48 hours to help bring AI-powered precision medicine to your fertility clinic.",
  alternates: { canonical: "/contact" },
};

const demoPoints = [
  "Explore Garbha.ai's full suite of AI solutions tailored for reproductive medicine",
  "Take a guided tour of our intuitive platform, built for clinicians and embryologists",
  "Understand what to consider when integrating AI into your IVF practice safely and effectively",
  "Discover how AI can assist in embryo selection, reducing subjectivity and increasing accuracy",
  "See real-world case studies showing how clinics have improved efficiency and success rates with Garbha.ai",
  "Ask questions directly to our product specialists and get tailored advice for your practice",
];

const methods = [
  {
    icon: "phone" as const,
    label: "Call us",
    value: "+91 89776 05360",
    href: "tel:+918977605360",
  },
  {
    icon: "mail" as const,
    label: "Email us",
    value: "info@garbha.ai",
    href: "mailto:info@garbha.ai",
  },
  {
    icon: "pin" as const,
    label: "Visit us",
    value: "Madhapur, Hyderabad, India",
    href: "https://maps.google.com/?q=Madhapur,Hyderabad",
  },
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-14 sm:py-20">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <Reveal>
            <Kicker index="01">Get in touch</Kicker>

            <h2 className="mt-8 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Discover how Garbha.ai can transform your IVF practice with
              trustworthy AI
            </h2>

            <p className="mt-6 leading-8 text-ink-500">
              Garbha.ai offers intelligent, AI-powered solutions designed to
              empower fertility clinics. From embryo grading to personalized
              stimulation protocols, our tools help you make data-driven
              decisions that improve success rates, streamline workflows, and
              elevate patient satisfaction.
            </p>

            <h3 className="mt-10 font-display text-lg font-bold text-ink-900">
              Schedule a demo to:
            </h3>
            <ul className="mt-5 space-y-3.5">
              {demoPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-6 text-ink-600">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-sm sm:p-8">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-ink-900">
                  Request a demo
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Fill in your details and we&rsquo;ll be in touch within 24–48
                  hours.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-ink-100 py-10 sm:py-14">
        <Container>
          <Reveal>
            <Kicker>Find us</Kicker>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="h-full overflow-hidden rounded-2xl border border-ink-100">
                <iframe
                  src="https://maps.google.com/maps?q=Madhapur%2Chyderabad&t=m&z=12&output=embed&iwloc=near"
                  title="Garbha.ai — Madhapur, Hyderabad"
                  className="h-full min-h-[380px] w-full"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex h-full flex-col rounded-2xl border border-ink-100 bg-gradient-to-br from-brand-50 to-white p-7 shadow-sm">
                <h3 className="font-display text-xl font-bold text-ink-900">
                  {site.name} HQ
                </h3>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                      Address
                    </dt>
                    <dd className="mt-1 leading-6 text-ink-600">
                      {site.address}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                      Hours
                    </dt>
                    <dd className="mt-1 leading-6 text-ink-600">
                      Mon–Fri · 9:00 AM – 6:00 PM IST
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                      Reach us
                    </dt>
                    <dd className="mt-1 flex flex-col gap-1 leading-6">
                      <a
                        href={`tel:${site.phone}`}
                        className="font-medium text-ink-700 hover:text-brand-600"
                      >
                        {site.phone}
                      </a>
                      <a
                        href={`mailto:${site.email}`}
                        className="font-medium text-ink-700 hover:text-brand-600"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>
                <div className="mt-auto pt-7">
                  <Button
                    href="https://maps.google.com/?q=Madhapur,Hyderabad"
                    variant="secondary"
                    className="w-full bg-white"
                  >
                    Get directions
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-50 [mask-image:radial-gradient(90%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-blob pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />
      <div
        className="animate-blob pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <Container className="pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Contact
            </span>

            <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Drop us a <span className="italic text-brand-500">message</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-ink-500">
              Our team will get back to you via email or phone within 24–48
              hours to help bring AI-powered precision medicine to your fertility
              clinic.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="grid gap-4 sm:grid-cols-1">
              {methods.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white/85 p-5 shadow-sm backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110">
                    <ContactIcon name={m.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                      {m.label}
                    </span>
                    <span className="mt-0.5 block font-semibold text-ink-900 transition-colors group-hover:text-brand-600">
                      {m.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactIcon({
  name,
  className,
}: {
  name: "phone" | "mail" | "pin";
  className?: string;
}) {
  const s = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths = {
    phone: (
      <path
        d="M4.5 5.8a2 2 0 0 1 2-2h2.2L10.5 8l-2 1.4a10.5 10.5 0 0 0 5.1 5.1L15 12.5l4.2 1.8v2.2a2 2 0 0 1-2 2A15 15 0 0 1 4.5 5.8Z"
        {...s}
      />
    ),
    mail: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" {...s} />
        <path d="M3.5 7l8.5 6.2L20.5 7" {...s} />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s-6-5.1-6-10a6 6 0 0 1 12 0c0 4.9-6 10-6 10Z" {...s} />
        <circle cx="12" cy="11" r="2.4" {...s} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
