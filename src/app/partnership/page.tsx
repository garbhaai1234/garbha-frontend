import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { ArrowRight, Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Partner with Us",
  description:
    "Join the Garbha.ai IVF Partner Program. We invite embryologists and IVF clinics to collaborate with us in revolutionizing the IVF landscape through AI-powered insights and cutting-edge solutions.",
  alternates: { canonical: "/partnership" },
};

const partners = [
  { src: "/brand/partners/logo-7.webp", alt: "Partner logo" },
  { src: "/brand/partners/medlyfe.png", alt: "MEDLYFE" },
  { src: "/brand/partners/ravi-childrens.png", alt: "Ravi Children's Hospital" },
  { src: "/brand/partners/logo.png", alt: "Partner logo" },
  { src: "/brand/partners/mitra.png", alt: "Mitra" },
];

const benefits = [
  {
    icon: "cpu" as const,
    title: "Advanced AI Technologies",
    description:
      "Gain exclusive early access to our portfolio of advanced, innovative AI-powered tools designed specifically to enhance IVF success rates and streamline complex clinical workflows.",
  },
  {
    icon: "flask" as const,
    title: "Research Collaboration",
    description:
      "Contribute to groundbreaking research in reproductive medicine and get opportunities to actively co-author publications in prestigious international journals.",
  },
  {
    icon: "chart" as const,
    title: "Enhanced Outcomes",
    description:
      "Leverage advanced, data-driven insights to optimize personalized treatment protocols, improve embryo selection accuracy, and ultimately increase success rates.",
  },
  {
    icon: "award" as const,
    title: "Competitive Advantage",
    description:
      "Differentiate your clinic by offering cutting-edge AI technology and innovation that positions you at the forefront of reproductive medicine.",
  },
  {
    icon: "tag" as const,
    title: "Financial Incentives",
    description:
      "Enjoy attractive partnership benefits including preferred pricing, revenue-sharing models, and other financial incentives.",
  },
  {
    icon: "users" as const,
    title: "Community Access",
    description:
      "Join an exclusive network of forward-thinking IVF professionals and participate in specialized training and networking events.",
  },
];

const steps = [
  {
    title: "Apply",
    description: "Submit your partnership application through our simple online form.",
  },
  {
    title: "Consult",
    description: "Meet with our team to discuss your clinic's specific needs and goals.",
  },
  {
    title: "Integrate",
    description:
      "Seamlessly integrate our AI solutions into your existing clinical workflow.",
  },
  {
    title: "Thrive",
    description: "Enjoy improved outcomes, research opportunities, and ongoing support.",
  },
];

const heroChips = ["Clinics & embryologists", "Research partners", "Global standards"];

const perks = [
  "Early access to our AI toolkit",
  "Co-author peer-reviewed research",
  "Preferred pricing & revenue share",
  "Training, community & support",
];

function PartnershipHero() {
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
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Partner Program
            </span>

            <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Join the Garbha.ai{" "}
              <span className="italic text-brand-500">IVF Partner Program</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-500">
              We invite embryologists and IVF clinics to collaborate with us —
              revolutionising the IVF landscape through AI-powered insights, and
              elevating the standard of care together.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {heroChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-ink-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-ink-600 backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="primary">
                Become a partner <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="secondary" className="bg-white">
                Talk to our team
              </Button>
            </div>
          </div>

          {/* Program at a glance */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[2.5rem] bg-brand-400/15 blur-2xl" />
              <div className="rounded-3xl border border-ink-100 bg-white/85 p-8 shadow-xl shadow-brand-500/5 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                    What partners get
                  </p>
                </div>
                <ul className="mt-6 space-y-4">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium leading-6 text-ink-700">
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PartnerIcon({
  name,
  className,
}: {
  name: "cpu" | "flask" | "chart" | "award" | "tag" | "users";
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
    cpu: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1.5" {...s} />
        <rect x="10" y="10" width="4" height="4" rx="0.5" {...s} />
        <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" {...s} />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6M10 3v6l-4.2 8.4A2 2 0 0 0 7.6 20h8.8a2 2 0 0 0 1.8-2.6L14 9V3" {...s} />
        <path d="M7.5 15h9" {...s} />
      </>
    ),
    chart: (
      <>
        <path d="M22 7l-8.5 8.5-5-5L2 17" {...s} />
        <path d="M16 7h6v6" {...s} />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="9" r="6" {...s} />
        <path d="M8.2 13.6L7 21l5-2.8L17 21l-1.2-7.4" {...s} />
      </>
    ),
    tag: (
      <>
        <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6Z" {...s} />
        <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.2" {...s} />
        <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" {...s} />
        <path d="M16 5.3a3.2 3.2 0 0 1 0 5.4" {...s} />
        <path d="M17.5 19.5a5.5 5.5 0 0 0-3-4.9" {...s} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}

export default function PartnershipPage() {
  return (
    <>
      <PartnershipHero />

      {/* Partner logos */}
      <section className="border-t border-ink-100 bg-ink-50/50 py-14 sm:py-20">
        <Container>
          <Reveal>
            <Kicker index="01">Our Partners</Kicker>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Our Circle of Care
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-500">
              Trusted by leading fertility clinics, hospitals and research
              partners advancing IVF care.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner, i) => (
              <Reveal key={i} delay={(i % 5) * 70} className="h-full">
                <div className="group flex h-28 items-center justify-center rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/10">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={160}
                    height={60}
                    className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <Reveal>
            <Kicker index="02">Why Partner</Kicker>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Why Partner With Us
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={(i % 3) * 100} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-ink-100 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/15">
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <PartnerIcon name={benefit.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-500">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Partnership Process */}
      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <Reveal>
            <Kicker index="03">How It Works</Kicker>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Partnership Process
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="h-full">
                <div className="group relative h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 font-display text-lg font-bold text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-500">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <Reveal>
            <Callout
              eyebrow="Get started"
              title={
                <>
                  Ready to transform your{" "}
                  <span className="italic text-brand-500">IVF practice</span>?
                </>
              }
              description="Take the first step toward revolutionizing your clinical outcomes with Garbha.ai's AI-powered solutions."
              actions={
                <Button href="/contact" variant="primary">
                  Apply for Partnership
                  <ArrowRight className="h-4 w-4" />
                </Button>
              }
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
