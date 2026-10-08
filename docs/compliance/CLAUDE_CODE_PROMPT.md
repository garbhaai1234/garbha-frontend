# Prompt to paste into Claude Code (VS Code)

Copy everything below the line into Claude Code, from the repo root.

---

Read `docs/compliance/COMPLIANCE_HUB_SPEC.md` and `docs/compliance/compliance-questions.json` in full before writing any code.

Then build the Compliance Hub on garbha.ai exactly as the spec describes:

1. First, explore this repo and tell me: the Next.js version and router (App or Pages), the Python framework (FastAPI, Django or Flask), the database, how forms and emails are handled today, and where privacy and consent code already lives. Propose a short plan that maps each spec section to files you will create or change. Wait for my OK before coding.
2. Back end: add the data model (spec §5.1), a seed command that loads `compliance-questions.json` as a versioned question bank, the API endpoints (§5.2), server-side scoring (§3.2) and the PDF report (§3.3). Adapt to the framework already used.
3. Front end: add the routes in §4 — the hub, the two guide pages (content from §2, with source links and a last-reviewed date), the self-check wizard and the result page.
4. Garbha's own DPDP items (§7): privacy notice page, consent checkboxes and consent logging on every form, withdrawal, the rights-request form with a 90-day due date, audit logging.
5. Write tests for every item in §8 and run them. Show me the results.

Rules:
- Never collect patient data in the self-check.
- Never hard-code questions in the front end; always read them from the API.
- Scoring happens only on the server.
- Do not change any legal text or numbers from the spec. If something looks wrong or unclear, ask me instead of guessing.
- Match the existing code style, components and design system of this repo.
- Small commits, one per spec section, with clear messages.
