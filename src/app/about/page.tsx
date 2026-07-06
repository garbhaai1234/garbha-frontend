import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { TeamAccordion } from "@/components/TeamAccordion";
import { TeamCarousel } from "@/components/TeamCarousel";
import { ValuesShowcase } from "@/components/ValuesShowcase";
import { TmName } from "@/components/TmName";
import { CountUp } from "@/components/CountUp";
import { ArrowRight, Check } from "@/components/Icons";
import { credibilityBadges, credibilityPoints } from "@/content/technology";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Garbha AI EmbryoScore™, founded by alumni of the Indian School of Business (ISB), is revolutionizing reproductive healthcare with AI-powered fertility solutions.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "target" as const,
    title: "Our Mission",
    description:
      "To revolutionize IVF outcomes with intelligent, technology-driven solutions that empower embryologists and offer renewed hope to families.",
  },
  {
    icon: "eye" as const,
    title: "Our Vision",
    description:
      "To lead the future of reproductive care by blending AI innovation with empathy — creating impactful fertility solutions that improve lives.",
  },
  {
    icon: "cpu" as const,
    title: "What We Do",
    description:
      "We build AI-powered tools like Garbha AI – EmbryoScore™ that support embryologists making data-driven decisions during IVF treatment.",
  },
  {
    icon: "chart" as const,
    title: "How It Helps",
    description:
      "Our technology improves embryo selection, reduces implantation failures, and increases the chances of a successful IVF outcome.",
  },
  {
    icon: "heart" as const,
    title: "Built with Empathy",
    description:
      "Every model is designed alongside embryologists and clinicians, because behind every cycle is a family hoping for the best chance.",
  },
  {
    icon: "spark" as const,
    title: "Our Impact",
    description:
      "From embryo grading to implantation timing, we bring precision, transparency and objectivity to the moments that matter most in IVF.",
  },
];

const team = [
  {
    name: "Dr. V. Shekar",
    role: "Advisor",
    desc: "Medical Director – Ravi Children's Hospital",
    img: "/brand/team/shekar.png",
  },
  {
    name: "Bharani Kumar Depuru",
    role: "CEO / Founder",
    desc: "Garbha.ai",
    img: "/brand/team/bharani.jpeg",
  },
  {
    name: "Dr. Ilan Kumaran",
    role: "Business Advisor",
    desc: "CEO, Apollo Hospitals",
    img: "/brand/team/ilan-kumaran.png",
  },
  {
    name: "Prof. Sarang Deo – ISB",
    role: "Advisor",
    desc: "Executive Director – MIHM",
    img: "/brand/team/sarang-deo.png",
  },
  {
    name: "Dr. G. Buvaneswari",
    role: "Strategic Clinical Advisor",
    desc: "Clinical Lead & Medical Director – GBR Fertility Center",
    img: "/brand/team/buvaneswari.webp",
  },
  {
    name: "Alekya Vuppu",
    role: "Co-Founder",
    desc: "Director – Finance & General Administration",
    img: "/brand/team/alekya.png",
  },
  {
    name: "Ajeeth Dumpala",
    role: "Advisor – Garbha.ai",
    desc: "Director – AiSPRY and 360DigiTMG",
    img: "/brand/team/ajeeth.png",
  },
];

// Founders first, advisors after (relative order preserved).
const orderedTeam = [
  ...team.filter((m) => /founder/i.test(m.role)),
  ...team.filter((m) => !/founder/i.test(m.role)),
];


export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Values */}
      <section className="py-14 sm:py-20">
        <Container>
          <Reveal>
            <Kicker index="01">Who We Are</Kicker>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              What drives us
            </h2>
          </Reveal>

          <Reveal className="mt-14">
            <ValuesShowcase values={values} />
          </Reveal>
        </Container>
      </section>

      {/* Credibility */}
      <section className="border-t border-ink-100 bg-ink-50/60 py-14 sm:py-20">
        <Container>
          <Reveal>
            <Kicker index="02">By the Numbers</Kicker>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Proven, cleared &amp; live in clinics
            </h2>
          </Reveal>

          <Reveal className="mt-14">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 shadow-sm shadow-ink-900/5 sm:grid-cols-4">
              {credibilityBadges.map((b) => (
                <div
                  key={b.label}
                  className="group relative bg-white px-6 py-10 text-center transition-colors hover:bg-brand-50/40"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-center scale-x-0 bg-gradient-to-r from-brand-500 to-accent-500 transition-transform duration-500 group-hover:scale-x-100" />
                  <CountUp
                    value={b.value}
                    className="block bg-gradient-to-br from-brand-500 to-accent-500 bg-clip-text font-display text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl"
                  />
                  <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {credibilityPoints.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 90} className="h-full">
                <div className="group h-full rounded-2xl border border-ink-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-500">
                    {c.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Button href="/technology" variant="secondary" className="bg-white">
              See the technology <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Team */}
      <section className="mobile-slide-left border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <Reveal>
            <Kicker index="03">Our People</Kicker>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
              Meet the team behind Garbha
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-500">
              Clinicians, embryologists and technologists — founders and advisors
              from ISB, Apollo and leading fertility centres.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            {/* Desktop keeps the accordion; mobile shows the coverflow carousel. */}
            <div className="hidden md:block">
              <TeamAccordion members={orderedTeam} />
            </div>
            <div className="md:hidden">
              <TeamCarousel members={orderedTeam} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="mobile-slide-left border-t border-ink-100 py-14 sm:py-20">
        <Container>
          <Reveal>
            <Callout
              eyebrow="Work with us"
              title={
                <>
                  Partner with us to advance{" "}
                  <span className="italic text-brand-500">fertility care</span>
                </>
              }
              description="We collaborate with clinics and researchers who share our vision of accessible, personalised precision medicine."
              actions={
                <>
                  <Button href="/partnership" variant="primary">
                    Explore partnership
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/contact" variant="secondary" className="bg-white">
                    Contact us
                  </Button>
                </>
              }
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

const glanceFacts = [
  { label: "Founded by", value: "Alumni of ISB" },
  { label: "Headquarters", value: "Hyderabad, India" },
  { label: "Flagship", value: "Garbha AI – EmbryoScore™" },
  { label: "Regulatory", value: "CDSCO licence · ISO 13485" },
  { label: "Recognition", value: "HYSEA National Award, 2025" },
  { label: "Deployment", value: "Live in 11 partner clinics" },
];

function AboutHero() {
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
              About Garbha.ai
            </span>

            <h1 className="mt-7 font-display text-5xl font-bold leading-[1.03] tracking-tight text-ink-900 sm:text-6xl lg:text-[4rem]">
              Redefining fertility care with{" "}
              <span className="italic text-brand-500">intelligence & empathy</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-500">
              Garbha AI EmbryoScore<sup className="align-super text-[0.55em] font-semibold">™</sup>, founded by alumni of the Indian School of
              Business (ISB), is revolutionising reproductive healthcare with
              explainable AI — built alongside embryologists and clinicians.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="primary">
                Book a demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/solutions" variant="secondary" className="bg-white">
                Our solutions
              </Button>
            </div>
          </div>

          {/* At-a-glance company facts */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[2.5rem] bg-brand-400/15 blur-2xl" />
              <div className="rounded-3xl border border-ink-100 bg-white/85 p-8 shadow-xl shadow-brand-500/5 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                    At a glance
                  </p>
                </div>
                <dl className="mt-5 divide-y divide-ink-100">
                  {glanceFacts.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-start justify-between gap-6 py-3.5"
                    >
                      <dt className="text-sm text-ink-400">{f.label}</dt>
                      <dd className="max-w-[62%] text-right text-sm font-semibold text-ink-800">
                        <TmName name={f.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
