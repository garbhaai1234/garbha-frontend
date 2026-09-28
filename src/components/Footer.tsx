import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Facebook, Instagram, Linkedin } from "@/components/Icons";
import { quickLinks, site } from "@/lib/site";
import { solutions } from "@/content/solutions";

export function Footer() {
  const year = 2026; // build-time constant; update per release

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-ink-100 bg-ink-50">
      {/* decorative circle map, echoing the live footer */}
      <Image
        src="/brand/circle-map-1-1-1.png"
        alt=""
        width={520}
        height={260}
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[min(40%,520px)] opacity-[0.06]"
      />

      <Container className="relative py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/brand/garbhatm.png"
                alt={site.name}
                width={172}
                height={35}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-500">
              {site.footerTagline}
            </p>
            <div className="mt-5 flex gap-3">
              <SocialLink href={site.socials.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.socials.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.socials.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <FooterCol title="Services">
            {solutions.map((s) => (
              <FooterLink key={s.slug} href={`/solutions/${s.slug}`}>
                {s.shortName}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Quick Links">
            {quickLinks.map((item) => (
              <FooterLink key={item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterCol>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-500">
              <li>Address: {site.address}</li>
              <li>
                Email:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-brand-700"
                >
                  {site.email}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href={`tel:${site.phone}`}
                  className="transition-colors hover:text-brand-700"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-200 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright{" "}
            <Link href="/" className="font-medium text-ink-700 hover:text-brand-700">
              {site.name}
            </Link>{" "}
            — Powered by {site.poweredBy} | All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand-700"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand-700"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-ink-500 transition-colors hover:text-brand-700"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-600 ring-1 ring-inset ring-ink-200 transition-colors hover:bg-brand-600 hover:text-white hover:ring-brand-600"
    >
      {children}
    </a>
  );
}
