# Spec: Garbha Care page redesign

- Requirement ID: REQ-CARE-01
- Status: Approved (2026-10-12, "start")
- Owner: Garbha.ai team

## Problem

Couples land on `/care`, read about 25 phone screens of explanation, and have no way to ask for
the free counsellor call the page promises ("Talk to a counsellor" scrolls to text; "Keep me
posted" opens the clinic contact form). The page must be short, honest and working: everything
that looks clickable does something real.

## Scope

- In scope: hero with a working fertile-day check; the eight modules; a call-request form with
  its own server endpoint; a sticky phone bar; "coming" labels on features that are not live;
  module calculations moved to `src/lib/care/` with tests; end-to-end tests.
- Out of scope: the assistant, bookings and payments, analytics (the site sets essential cookies
  only), shared header and footer.

## Acceptance criteria

1. On a 360 px phone, the hero takes the first day of the last period and shows that person's
   fertile days, without leaving the page.
2. The module calculations give the expected results for fixed cases: fertile window, specialist
   rule at the 35 cut-off, WHO 2021 semen limits, IVF cost ranges, egg-freezing totals, IVF dates,
   calendar (.ics) export.
3. The call-request form asks only: first name, mobile, city or PIN, both partners' ages, months
   trying, stage, language, call time, optional email; contact consent is required and unticked;
   WhatsApp is a separate unticked opt-in. Errors show next to the field; input is kept on error.
4. A valid request is emailed to the team inbox and the person sees a confirmation with what
   happens next. Invalid input, a filled honeypot, a cross-site post and more than 5 requests in
   10 minutes from one address are refused with a clear message.
5. Nothing personal is stored on the server, logged, or put in a URL. If email delivery is not
   configured, the request is refused with a message giving the email address, never silently lost.
6. No dead ends: every non-live feature carries a "coming" label and has no button.
7. No invented testimonials, ratings, statistics or urgency.
8. Brand colours and fonts unchanged; fits 360 px; 48 px tap targets; no sideways scroll.
9. One H1; FAQ structured data kept; Lighthouse SEO and Accessibility do not drop.
10. The sticky phone bar never covers the form or the cookie banner.

## Decisions taken by default (change any of them)

- Requests go to the inbox the contact form uses (`CONTACT_TO_EMAIL`).
- The form promises a call when Garbha Care opens in Hyderabad, not a call this week.
- The redesign applies to phone and desktop.
- No named advisor and no partner-clinic count until confirmed.
- The shared header ("Book a demo") is unchanged.

## Design notes

- Modules affected: `src/app/care/page.tsx`, `src/components/CareTools.tsx`, `src/content/care.ts`,
  new `src/lib/care/`, new `src/app/api/care-call/route.ts`, new form component.
- New dev dependency: `@playwright/test` 1.63.0 (unit and browser tests; uses the installed Chrome).
- Analytics events: none (no analytics on the site).

## Risks

- Health-related personal data (ages, months trying): consent required, emailed only, not stored,
  rate limit, honeypot, origin check, escaped HTML in the email, size limits on every field.
- Email delivery depends on `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` on the host.

## Tasks

- [ ] 1. Module calculations to `src/lib/care/` with unit tests.
- [ ] 2. `POST /api/care-call` with validation, consent, honeypot, origin check, rate limit; tests.
- [ ] 3. Call-request form and sticky phone bar.
- [ ] 4. Hero with the working fertile-day check.
- [ ] 5. Sections restructured, "coming" labels, cuts.
- [ ] 6. End-to-end tests (phone and desktop) and Lighthouse before/after.
