# Spec: Garbha Care page polish

- Requirement ID: REQ-CARE-02 (follows REQ-CARE-01, `garbha-care-redesign.md`)
- Status: Approved (2026-10-12; the user delegated the decisions: "take a call based on best practice")
- Owner: Garbha.ai team

## Problem

A first-time review found the working `/care` page still reads like a form page rather than a
consumer brand: the cycle question is asked twice, the tools hide behind a cut-off sideways strip
on phones, "Coming soon" is the first thing read, disclaimers repeat, every section has the same
card layout, the header speaks to clinics, and the call form asks seven questions before anything
happens. One hydration warning was also introduced in REQ-CARE-01.

## Decisions (best practice, taken on the user's behalf)

| Item | Decision | Why |
|---|---|---|
| Real people on the page | Not now; a marked place is left | No names or photos have consent. Stock or invented people damage trust (and the brief bars fabricated claims). |
| Call form length | Required: first name, mobile, language, consent. Everything else optional under "Help your counsellor prepare". | Fewer required fields convert better, and DPDP data minimisation: ask only what the call needs. Deviates from the brief's required list on purpose. |
| Header button | On `/care` only: "Free counsellor call" to the form. Elsewhere unchanged ("Book a demo"). | One audience per page; clinics are still served on every other page. |
| Wording | "Free tools" in visible copy; numbered "Tool 1–8". | Plain consumer language; "module" reads as software or a course. |
| Phone and desktop | Both. | Same page for both; desktop keeps its layout patterns. |

## Acceptance criteria

1. No hydration warning on `/care` (ring coordinates identical on server and client).
2. The cycle question appears once: the hero. Tool 1 shows the calendar from the hero's answer; with no answer it points to the hero instead of showing a second empty form; cycle length, period length and LH test stay adjustable there.
3. Phones (< 1024 px): the eight tools show as a 2-column grid of cards with no cut-off text; a card opens the tool in a bottom sheet (native dialog: focus kept inside, Escape and a Close button close it, focus returns to the card). Desktop keeps the side list and the panel. Links to `#tool-x` open the tool on both.
4. The first badge says the tools are available now; the launch date wording moves to the call section.
5. One "inform, don't diagnose" block for the tools (with the emergency line); per-result notes stay.
6. Hero background is neutral with coral only as accent; the ring shows on phones too; the sample ring has no sample temperature chart.
7. Section layouts vary (a soft full-width band for the call, a plain list for "coming", icon rows for privacy) without new colours or fonts.
8. Call form: required fields as above; optional fields folded; server rules match; email lists "Not given" for skipped answers.
9. On `/care` the header button reads "Free counsellor call" and goes to the form, desktop and phone menu.
10. All REQ-CARE-01 tests still pass (updated where the behaviour above changed); no sideways scroll at 360 px; Lighthouse SEO and Accessibility do not drop.

## Tasks

- [ ] 1. Ring rounding (hydration).
- [ ] 2. Tool 1 without a duplicate form.
- [ ] 3. Phone tool grid + bottom sheet.
- [ ] 4. Shorter call form (client + server + tests).
- [ ] 5. Copy and layout: badge, wording, one disclaimer, neutral hero, ring on phones, varied sections, header button.
- [ ] 6. Tests, screenshots, Lighthouse before/after.
