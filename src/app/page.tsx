import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { ArrowRight } from "@/components/Icons";
import { HeroMedia } from "@/components/HeroMedia";
import { LazyVideo } from "@/components/LazyVideo";
import { FeatureIcon } from "@/components/FeatureIcons";
import { Kicker } from "@/components/Kicker";
import { Callout } from "@/components/Callout";
import { SolutionMark } from "@/components/SolutionMark";
import { TmName } from "@/components/TmName";
import { ComplianceIcon } from "@/components/ComplianceGuide";
import type { IconName } from "@/content/compliance";
import { stats } from "@/lib/site";
import { credibilityBadges } from "@/content/technology";

export const metadata: Metadata = {
  title: "AI for IVF — Embryo Grading & Fertility Solutions",
  description:
    "Garbha.ai brings explainable, CDSCO-cleared AI to the IVF lab: AI embryo grading (EmbryoScore), sperm & oocyte selection and endometrial receptivity — 93% embryo-selection accuracy, live in 11 clinics.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Capabilities />
      <SolutionsIndex />
      <ProofBand />
      <WhyTrust />
      <ComplianceTeaser />
      <ProudMoment />
      {/* <CtaBand /> */}
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* hero background image */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/brand/hero-bg.jpg"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* coral brand wash to unify the clinical photo with the palette */}
        <div className="absolute inset-0 bg-brand-500/20 mix-blend-multiply" />
        {/* white veil for text legibility — stronger on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/86 to-white/64" />
      </div>
      <Container className="pt-4 pb-16 sm:pt-6 sm:pb-24">
        <Reveal eager>
          <div className="flex items-center justify-between border-b border-ink-100 pb-6">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              Precision AI for IVF Excellence
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.22em] text-ink-400 sm:block">
              Hyderabad · India
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid items-center gap-12 sm:mt-14 lg:grid-cols-12 lg:gap-10">
          <Reveal eager className="lg:col-span-7">
            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-brand-500 sm:text-6xl lg:text-[4rem]">
              Transforming IVF outcomes with the{" "}
              <span className="text-ink-900">Power of AI</span>
            </h1>
            <p className="mt-7 max-w-xl font-display text-lg leading-8 text-ink-500">
              India&rsquo;s pioneering AI model for IVF, built on the most
              extensive embryo image dataset ever assembled — bringing AI embryo
              grading and data-driven precision to decision-making in fertility
              treatment.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="primary">
                Book a demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/solutions" variant="secondary">
                Explore solutions
              </Button>
            </div>
            <p className="mt-8 text-sm font-medium text-ink-400">
              Because every journey to parenthood deserves the best chance.
            </p>
          </Reveal>

          <Reveal eager className="lg:col-span-5" delay={120}>
            <div className="animate-hero-float relative mx-auto w-full max-w-[350px] lg:ml-auto lg:mr-0">
              {/* soft coral glow */}
              <div className="pointer-events-none absolute -inset-4 rounded-[2.75rem] bg-brand-400/20 blur-2xl" />
              {/* frosted panel so the illustration lifts off the photo */}
              <div className="relative rounded-[2rem] bg-white/70 p-4 shadow-2xl shadow-brand-500/25 ring-1 ring-white/60 backdrop-blur-md">
                <HeroMedia className="w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="border-y border-ink-100 bg-ink-50/50">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 100}
            className="group border-t border-ink-100 px-2 py-10 [&:nth-child(-n+2)]:border-t-0 lg:border-l lg:border-t-0 lg:px-10 lg:first:border-l-0"
          >
            <CountUp
              value={stat.value}
              className="block font-display text-5xl font-extrabold tracking-tight text-ink-900 transition-colors duration-300 group-hover:text-brand-500 sm:text-6xl"
            />
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

const features = [
  {
    title: "Smarter Embryo Selection",
    description: "AI-driven grading identifies the best embryos, enhancing IVF success.",
    icon: "embryo",
  },
  {
    title: "Tailored Hormone Therapy",
    description: "Genetic insights refine drug selection and dosing for improved outcomes.",
    icon: "/brand/Garbha-website-Icons-02.png",
  },
  {
    title: "Precision Implantation",
    description: "Garbha AI – ERA identifies the optimal embryo transfer window.",
    icon: "implant",
  },
  {
    title: "Evidence-Based IVF",
    description: "Real-time AI & genetic profiling personalize patient care.",
    icon: "evidence",
  },
  {
    title: "Next-Gen Fertility Science",
    description: "Integrating AI and big data for more predictable treatments.",
    icon: "spiral",
  },
  {
    title: "Smart IVF Analytics",
    description: "Turning real-time data and intelligent communication into smoother care.",
    icon: "icsi",
  },
  {
    title: "Sperm Selection",
    description: "AI-powered analysis identifies the healthiest sperm for fertilization.",
    icon: "sperm",
  },
  {
    title: "Oocyte Selection",
    description: "AI-based evaluation pinpoints the most viable oocytes for development.",
    icon: "oocyte",
  },
];

function Capabilities() {
  return (
    <section className="border-t border-ink-100 py-14 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker index="01">Our approach</Kicker>
          </div>
          <h2 className="mt-8 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
            Redefining fertility care with{" "}
            <span className="text-brand-500">AI &amp; precision medicine</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-500">
            At Garbha, we are revolutionizing IVF with AI-powered diagnostics —
            ensuring smarter, data-driven fertility treatments at every step of
            the journey.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 4) * 90}>
              <div className="group relative border-t-2 border-ink-100 pt-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500">
                <span className="absolute right-0 top-6 font-display text-sm font-bold text-ink-200 transition-colors duration-300 group-hover:text-brand-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {feature.icon.startsWith("/") ? (
                  <Image
                    src={feature.icon}
                    alt=""
                    width={96}
                    height={96}
                    className="mx-auto h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <FeatureIcon
                    name={feature.icon}
                    className="mx-auto h-20 w-20 transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                <h3 className="mt-5 font-display text-lg font-bold text-ink-900 transition-colors duration-300 group-hover:text-brand-600">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-500">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const serviceCards = [
  {
    href: "/solutions/embryo-scoring",
    name: "Garbha AI – EmbryoScore™",
    description:
      "India's first AI-powered scoring platform, supporting clinical decision-making with consistent grading.",
    mark: "embryo" as const,
  },
  {
    href: "/solutions/oocyte-selection",
    name: "Garbha AI – Oocyte Quality & Selection",
    description:
      "An advanced AI-powered assessment that evaluates oocyte morphology and vitality before fertilisation.",
    mark: "oocyte" as const,
  },
  {
    href: "/solutions/sperm-selection",
    name: "Garbha AI – Sperm Quality & Selection",
    description:
      "An advanced AI-driven platform that identifies and selects the most viable sperm for ICSI.",
    mark: "sperm" as const,
  },
  {
    href: "/solutions/endometrial-receptivity",
    name: "Garbha AI – ERA",
    description:
      "Gene-expression mapping and AI optimization reveal your unique implantation window.",
    mark: "era" as const,
  },
  {
    href: "/solutions/smart-ivf",
    name: "Garbha AI – Smart IVF",
    description:
      "Turning real-time data and intelligent communication into smoother, more coordinated treatments.",
    mark: "smart" as const,
  },
];

function SolutionsIndex() {
  return (
    <section className="border-t border-ink-100 bg-ink-50/50 py-14 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker index="02">Solutions</Kicker>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            We provide cutting-edge{" "}
            <span className="text-brand-500">AI-powered IVF solutions</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink-500">
            Because every journey to parenthood deserves the best chance.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((s, i) => (
            <Reveal key={s.href} delay={(i % 3) * 90} className="h-full">
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-100">
                  <SolutionMark
                    name={s.mark}
                    className="h-11 w-11 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-brand-600">
                  <TmName name={s.name} />
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-500">
                  {s.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="/solutions" variant="secondary">
            View all solutions <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

const trustPoints = [
  {
    title: "AI-Driven Precision",
    description: "Optimized embryo selection, personalized hormone therapy, and perfect implantation timing.",
  },
  {
    title: "Clinically Proven",
    description: "Supported by cutting-edge research and trusted by renowned fertility experts.",
  },
  {
    title: "Faster, Reliable Results",
    description: "Real-time analytics for quick, informed decisions across the treatment cycle.",
  },
  {
    title: "Trusted by Leading Clinics",
    description: "Elevating success rates with advanced, data-driven fertility solutions.",
  },
];

function ProofBand() {
  return (
    <section className="border-t border-ink-100 py-14 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>Proven &amp; cleared</Kicker>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Live in clinics
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink-500">
            India&rsquo;s first AI-powered IVF solution with a CDSCO
            Manufacturing Licence, running as explainable Edge AI on time-lapse
            incubators — including the ESCO time-lapse device.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {credibilityBadges.map((b, i) => (
            <Reveal key={b.label} delay={i * 90} className="text-center">
              <div className="font-display text-4xl font-extrabold tracking-tight text-brand-500 sm:text-5xl">
                {b.value}
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                {b.label}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="/technology" variant="secondary">
            Explore the technology <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

function WhyTrust() {
  return (
    <section className="border-t border-ink-100 py-14 sm:py-20">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <Kicker index="03">Why Garbha.ai</Kicker>
          <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Built for trust,
            <br />
            engineered for outcomes
          </h2>

          <dl className="mt-12">
            {trustPoints.map((point, i) => (
              // A <dl> row may only hold <dt>/<dd>, so the number lives inside
              // the <dt>; subgrid keeps it in its own column as before.
              <div
                key={point.title}
                className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-ink-100 py-5"
              >
                <dt className="col-span-2 grid grid-cols-subgrid">
                  <span className="font-display text-sm font-bold text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-bold text-ink-900">
                    {point.title}
                  </span>
                </dt>
                <dd className="col-start-2 mt-1 text-sm leading-6 text-ink-500">
                  {point.description}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120} className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-ink-100 shadow-lg">
            {/* aspect-video reserves the 16:9 box before metadata loads (no CLS) */}
            <LazyVideo
              src="/brand/updated-garbha-ai.mp4"
              className="aspect-video h-auto w-full"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const complianceGuides: {
  href: string;
  law: string;
  title: string;
  text: string;
  icon: IconName;
}[] = [
  {
    href: "/compliance/art-act",
    law: "ART (Regulation) Act 2021",
    title: "ART Act guide",
    text: "Registration, consent, donors, records and penalties.",
    icon: "building",
  },
  {
    href: "/compliance/dpdp",
    law: "DPDP Act 2023 · Rules 2025",
    title: "DPDP guide",
    text: "Notice, consent, security, 72-hour breach reporting and deadlines.",
    icon: "shield",
  },
];

function ComplianceTeaser() {
  return (
    <section className="border-t border-ink-100 bg-ink-50/50 py-14 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Kicker>Compliance Hub</Kicker>
          <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            ART Act &amp; DPDP,
            <br />
            in plain language
          </h2>
          <p className="mt-6 text-lg leading-8 text-ink-500">
            Free guides for IVF clinics in India on what the ART (Regulation)
            Act 2021 and the DPDP Act 2023 with the DPDP Rules 2025 require —
            with a source for every point.
          </p>
          <div className="mt-8">
            <Button href="/compliance" variant="primary">
              Visit the Compliance Hub <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
          {complianceGuides.map((g, i) => (
            <Reveal key={g.href} delay={i * 90} className="h-full">
              <Link
                href={g.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/15"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <ComplianceIcon name={g.icon} className="h-6 w-6" />
                </span>
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                  {g.law}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-ink-900">
                  {g.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-500">
                  {g.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProudMoment() {
  return (
    <section className="border-t border-ink-100 py-14 sm:py-20">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="group order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 shadow-sm">
            <Image
              src="/brand/hysea-award-2025.jpg"
              alt="Garbha.ai wins at the 32nd HYSEA National Summit & Awards 2025"
              width={640}
              height={520}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={100}>
          <Kicker index="04">Recognition</Kicker>
          <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            A proud moment for Garbha.ai
          </h2>
          <p className="mt-8 text-lg leading-8 text-ink-500">
            Garbha.ai emerged as the winner at the 32<sup>nd</sup> HYSEA
            National Summit &amp; Awards 2025, standing tall among 250+ startups.
            This recognition by Telangana&rsquo;s IT Minister, Sridhar Babu, is a
            proud milestone in our mission to redefine IVF success through
            AI-powered embryo assessment.
          </p>
          <p className="mt-4 text-base leading-7 text-ink-500">
            It validates the work our team has poured into this life-changing
            solution — and highlights the urgent need for innovation in the
            fertility space, bringing precision, transparency, and hope to
            millions of aspiring parents.
          </p>
        </Reveal>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
            Incubated &amp; recognised by
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {incubators.map((item, i) => (
            <Reveal key={item.name} delay={(i % 4) * 90} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-ink-100 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/15">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600 ring-1 ring-brand-100">
                  {item.badge}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-500">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const incubators = [
  {
    name: "ISB iHeal",
    badge: "Incubated",
    description: "Academic and innovation backing from the Indian School of Business.",
  },
  {
    name: "Wadhwani Foundation",
    badge: "Incubated",
    description: "Startup incubation and go-to-market support.",
  },
  {
    name: "Nasscom DeepTech Club",
    badge: "Member",
    description: "India's premier deep tech innovation community.",
  },
  {
    name: "IIM Lucknow – EIC",
    badge: "Incubated",
    description:
      "Incubation and recognition from IIM Lucknow's Enterprise Incubation Centre.",
  },
];

function CtaBand() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <Callout
          eyebrow="Get started"
          title={
            <>
              Empowering IVF success with{" "}
              <span className="italic text-brand-500">AI-driven insights</span>
            </>
          }
          description="Book a personalised demo and see how Garbha.ai fits into your lab."
          actions={
            <>
              <Button href="/contact" variant="primary">
                Book a demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/partnership" variant="secondary" className="bg-white">
                Partner with us
              </Button>
            </>
          }
        />
      </Container>
    </section>
  );
}
