import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, shares and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, share and protect your personal information — and the choices and rights you have."
      />
      <section className="py-10 sm:py-12">
        <Container>
          <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display prose-headings:text-ink-900 prose-a:text-brand-700 prose-strong:text-ink-900">
            <p>
              {site.name} (operated by {site.poweredBy}, &quot;we&quot;,
              &quot;us&quot;, &quot;our&quot;) is committed to protecting your
              privacy. This policy explains what personal data we collect, why,
              how we use and safeguard it, and the rights available to you.
            </p>

            <h2>1. Who we are</h2>
            <p>
              We provide AI-powered software for fertility clinics and
              laboratories. Our registered address is {site.address} You can
              reach us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
              <a href={`tel:${site.phone}`}>{site.phone}</a>.
            </p>

            <h2>2. Information we collect</h2>
            <ul>
              <li>
                <strong>Contact &amp; demo requests</strong> — name,
                designation, clinic/organisation, email, phone number and any
                message you send us.
              </li>
              <li>
                <strong>Usage data</strong> — basic technical information such as
                IP address, browser type and pages viewed, where applicable.
              </li>
              <li>
                <strong>Cookies</strong> — see section 7.
              </li>
            </ul>
            <p>
              We do <strong>not</strong> collect patient medical records or
              embryo data through this website. Clinical data processed by our
              products is governed by separate agreements with partner clinics.
            </p>

            <h2>3. How we use your information</h2>
            <ul>
              <li>To respond to enquiries and schedule product demos.</li>
              <li>To provide, maintain and improve our website and services.</li>
              <li>
                To send communications you have consented to receive (you can
                opt out at any time).
              </li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>

            <h2>4. Legal basis</h2>
            <p>
              We process your data on the basis of your <strong>consent</strong>{" "}
              (which you provide when submitting a form), our{" "}
              <strong>legitimate interests</strong> in operating and improving
              our business, and to meet <strong>legal obligations</strong>.
              Where required, we rely on applicable data-protection law
              including India&rsquo;s Digital Personal Data Protection Act and,
              where relevant, the EU GDPR.
            </p>

            <h2>5. Sharing your information</h2>
            <p>
              We do not sell your personal data. We may share it with trusted
              service providers who help us operate (for example, email or CRM
              providers), under appropriate confidentiality and data-processing
              terms, and where required by law.
            </p>

            <h2>6. Data retention &amp; security</h2>
            <p>
              We retain personal data only as long as necessary for the purposes
              above or as required by law, after which it is deleted or
              anonymised. We apply appropriate technical and organisational
              measures — including encryption in transit and access controls —
              to protect your data.
            </p>

            <h2>7. Cookies</h2>
            <p>
              We use essential cookies to run the site and, with your consent,
              may use analytics cookies to understand usage. You can accept or
              decline non-essential cookies via the consent banner, and manage
              cookies in your browser settings.
            </p>

            <h2>8. Your rights</h2>
            <p>
              Subject to applicable law, you may have the right to access,
              correct, delete or export your personal data, to withdraw consent,
              and to object to or restrict certain processing. To exercise any
              of these rights, contact us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>9. Children</h2>
            <p>
              Our website is intended for healthcare professionals and is not
              directed at children. We do not knowingly collect data from
              children.
            </p>

            <h2>10. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Material changes will
              be reflected on this page with an updated revision.
            </p>

            <h2>11. Contact &amp; grievances</h2>
            <p>
              For any privacy questions or to raise a grievance, contact our
              data protection contact at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
