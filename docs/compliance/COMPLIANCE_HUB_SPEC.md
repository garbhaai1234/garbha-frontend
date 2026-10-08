# Garbha.ai Compliance Hub — Build Spec

Status: ready to build · Owner: Garbha.ai founders · Last legal review of content: 29 Sep 2026

## 1. What to build

A **Compliance Hub** on garbha.ai for IVF clinics, with three parts:

1. **ART Act guide** — a plain-language page on what the ART (Regulation) Act 2021 requires of clinics.
2. **DPDP guide** — a plain-language page on what the DPDP Act 2023 and DPDP Rules 2025 require, and by when.
3. **Free self-check** — a 31-question, ~10-minute wizard. The clinic answers Yes / Partly / No / Not applicable and gets a score, a gap list with fixes, and a downloadable PDF report. After seeing the score, the clinic can opt in to "Talk to Garbha" (lead capture).

Business goal: a useful free tool that brings IVF clinics to Garbha and starts a sales conversation.

**Hard rule: the self-check must never collect patient data.** It asks about the clinic's processes only.

The question bank is in `compliance-questions.json` (same folder). It is the single source of truth for questions, legal basis, severity, evidence and fixes. Seed the database from it; do not hard-code questions in React.

## 2. Legal content for the guide pages

Every row below links to its source. Show the "last reviewed" date on each guide page.

### 2.1 ART (Regulation) Act 2021 — what clinics must do

| Topic | Requirement | Section |
|---|---|---|
| Registration | Every ART clinic and bank must register with the National ART & Surrogacy Registry; registration is valid for 5 years | Sec 16 |
| Eligibility | Screen commissioning couple, woman and gamete donors for eligibility | Sec 21 |
| Age limits | Woman above 21 and below 50; man above 21 and below 55 | Sec 21 |
| Embryo transfer | Not more than three oocytes or embryos placed in the uterus in a treatment cycle | Sec 21 |
| Counselling | Professional counselling on all implications and chances | Sec 21 |
| Consent | Written informed consent of all parties; 12-month insurance for oocyte donors; cryopreservation needs written instructions for death or incapacity; either partner can withdraw consent before transfer | Sec 22 |
| Oocyte donors | Aged 23–35; donate only once in life; not more than seven oocytes retrieved | Sec 27 |
| Genetic testing | PGT only to screen for known, pre-existing, heritable or genetic diseases | Sec 25 |
| Sex selection | Must not offer a child of pre-determined sex | Sec 26 |
| Advertising | No advertisement of sex-selective ART in any manner, including the internet (5–10 years' imprisonment or ₹10–25 lakh fine) | Sec 32 |
| Records | Detailed records kept for at least 10 years; share information with the National Registry | Sec 21 |
| Confidentiality | Information on couple, woman and donor kept confidential | Sec 21 |
| Grievance | Maintain a grievance cell | Sec 21 |
| Penalties | First contravention: ₹5–10 lakh fine. Later: 3–8 years' imprisonment and ₹10–20 lakh fine | Sec 33 |

Sources: [ART Act text — Indian Kanoon](https://indiankanoon.org/doc/61852499/), [Sec 22 — Indian Kanoon](https://indiankanoon.org/doc/147282120/), [PRS summary](https://prsindia.org/billtrack/prs-products/issues-for-consideration), [National ART & Surrogacy Registry](https://registry.artsurrogacy.gov.in/clinic/list?type=register-clinic).

### 2.2 DPDP Act 2023 and DPDP Rules 2025 — what clinics must do

An IVF clinic that collects patient data is a **Data Fiduciary** under the DPDP Act.

**Timeline**
- **14 Nov 2025** — DPDP Rules notified; Data Protection Board set up.
- **~Nov 2026 (12 months)** — Consent Manager registration opens.
- **~May 2027 (18 months)** — main duties apply: notices, consent, security safeguards, breach reporting, rights requests.

| Topic | Requirement |
|---|---|
| Notice | Standalone, clear notice: itemised data collected, purpose, and a link to withdraw consent, exercise rights and complain to the Board |
| Consent | Free, specific, recorded; can be withdrawn at any time |
| Processors | Use vendors that process personal data only under a valid contract (Act Sec 8(2)) |
| Contact | Display contact details of a designated officer or Data Protection Officer (Act Sec 8(9)) |
| Rights requests | Respond to access, correction and erasure requests within 90 days |
| Security | Reasonable safeguards: encryption or masking, access control, access logging and monitoring, backups, ways to detect and investigate unauthorised access |
| Logs | Keep logs for at least one year |
| Breach | Inform affected people without delay in plain language; report to the Data Protection Board within 72 hours |
| Children | Verifiable parental consent for under-18s, with exemptions including healthcare |
| Penalties | Up to ₹250 crore (security failure); up to ₹200 crore (breach not reported, or children's data); up to ₹50 crore (other) |

Note for the page: ART's 10-year record rule and DPDP's storage limitation must be reconciled — keep ART records 10 years, delete other data when its purpose ends.

Sources: [DPDP Act Sec 8 — Indian Kanoon](https://indiankanoon.org/doc/186118625/), [PIB — DPDP Rules notified](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655&reg=48&lang=2), [PIB — DPDP Rules 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&reg=3&lang=2), [Privacy World — Rules summary (timeline, security, 72 hours)](https://www.privacyworld.blog/2025/11/india-passes-the-digital-personal-data-protection-rules-ushering-in-a-new-digital-age-in-india/).

## 3. Self-check logic

### 3.1 Flow
1. Clinic picks its level: **Level 1 (IUI)** or **Level 2 (IVF)**. Questions with `applies_to: "level2"` are hidden for Level 1.
2. Wizard shows one area per step (ART Act, then DPDP), ~5 questions per screen, progress bar.
3. Each question: Yes / Partly / No / Not applicable, plus an expandable "Why this matters" (legal basis + source link) and "What counts as evidence".
4. Submit → result page.
5. On the result page: download PDF; optional "Talk to Garbha about closing these gaps" form (lead capture with consent).

### 3.2 Scoring
- Weights: critical = 3, high = 2, medium = 1 (from JSON `severity_weights`).
- Values: Yes = 1, Partly = 0.5, No = 0, N/A = excluded from both numerator and denominator.
- Score per area and overall = Σ(weight × value) ÷ Σ(weight of answered, applicable questions) × 100, rounded.
- Status bands: **≥ 85 Good**, **60–84 Needs work**, **< 60 At risk**.
- **Override:** any critical question answered "No" sets status to **At risk**, whatever the score. Show those first.
- Gap list = every No or Partly, sorted critical → high → medium, each with its `fix` text and source link.

These bands are product choices, not legal thresholds — say so on the result page.

### 3.3 PDF report
Clinic level, date, question bank version, overall and per-area scores, status, gap list with fixes and sources, disclaimer. Generate server-side in Python (WeasyPrint or ReportLab). No patient data ever appears.

## 4. Pages and routes (Next.js, App Router)

| Route | Type | Content |
|---|---|---|
| `/compliance` | Static (SSG) | Hub: intro, two guide cards, "Start free self-check" CTA |
| `/compliance/art-act` | Static (SSG) | Guide from §2.1, last-reviewed date, sources |
| `/compliance/dpdp` | Static (SSG) | Guide from §2.2 with timeline, sources |
| `/compliance/self-check` | Client component | Wizard; fetches questions from API; progress kept in sessionStorage only |
| `/compliance/self-check/result/[id]` | Server component | Result; requires `?t=<token>`; score, status, gap list, PDF button, opt-in form |
| `/privacy` | Static | Garbha's own privacy notice (see §7) |
| `/data-request` | Client form | Garbha's own rights-request form (see §7) |

SEO: unique title and meta description per page; JSON-LD `FAQPage` on the two guides; guides and hub in the sitemap; result pages `noindex`.

## 5. Back end (Python)

FastAPI is assumed below; the same shape works in Django REST Framework.

### 5.1 Data model (PostgreSQL)

- `question_bank_version` — `id`, `version` (e.g. `2026-09-29`), `published_at`, `is_active`
- `question` — `id` (e.g. `ART-08`), `version_id`, `area`, `severity`, `applies_to`, `question`, `legal_basis`, `source_url`, `evidence`, `fix`, `sort_order`
- `assessment` — `id` (UUID), `created_at`, `version_id`, `clinic_level`, `answers` (JSONB `{question_id: "yes|partial|no|na"}`), `overall_score`, `area_scores` (JSONB), `status`, `token_hash` (store only a hash of the result-link token), `expires_at` (e.g. 180 days)
- `lead` — `id`, `assessment_id`, `clinic_name`, `contact_name`, `email`, `phone`, `city`, `consent_contact` (bool), `consent_marketing` (bool, separate), `consent_at`, `notice_version`
- `consent_log` — `id`, `subject_ref`, `purpose`, `granted` (bool), `at`, `notice_version`, `source` (form name)
- `data_request` — `id`, `received_at`, `type` (access / correct / erase / withdraw / grievance), `email`, `details`, `status`, `due_at` (received + 90 days), `closed_at`
- `audit_log` — `id`, `at`, `actor`, `action`, `object`, `ip_hash` (retain ≥ 1 year)

The anonymous self-check stores no personal data. Personal data exists only in `lead` and `data_request`, and only after consent.

### 5.2 API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/compliance/questions?level=1\|2` | Active question bank, filtered by level |
| POST | `/api/compliance/assessments` | Body: `{clinic_level, answers}` → validates, scores on the server, returns `{id, token, overall_score, status}` |
| GET | `/api/compliance/assessments/{id}?t=` | Result JSON (token checked against hash) |
| GET | `/api/compliance/assessments/{id}/report.pdf?t=` | PDF report |
| POST | `/api/compliance/leads` | Body: `{assessment_id, clinic_name, contact_name, email, phone, city, consent_contact, consent_marketing, notice_version}` → reject if `consent_contact` is false; write `consent_log` |
| POST | `/api/privacy/requests` | Rights request → creates `data_request` with `due_at`; emails acknowledgement |
| POST | `/api/privacy/consent/withdraw` | Withdraw consent → logs it and stops messaging |

Scoring runs only on the server (never trust client scores). Rate-limit POST endpoints; add a honeypot or CAPTCHA on the lead form.

### 5.3 Notifications
On a new lead: email to the Garbha sales inbox and an optional WhatsApp template message — only when `consent_contact` is true.

## 6. Architecture

Browser → Next.js (static guides, client wizard, server result page) → Python API → PostgreSQL. The Python API also generates PDFs and sends email/WhatsApp. Question bank loaded from `compliance-questions.json` by a seed command and versioned in the database. Admin edits via Django admin or a protected admin page; publishing a new version never changes old assessments.

## 7. garbha.ai's own DPDP compliance (build alongside)

Garbha collects clinic contacts here and patient contacts in the B2C counselling module, so garbha.ai itself is a Data Fiduciary.

- **Notice:** standalone privacy notice at `/privacy` — itemised data, purposes, retention, how to withdraw, contact of the designated officer, right to complain to the Data Protection Board. Show a short version beside every form, with a link.
- **Consent:** unticked checkboxes; separate boxes for "contact me about this" and "marketing"; log every consent with notice version (`consent_log`).
- **Withdrawal:** one-click link in every email/WhatsApp; `/data-request` form; honour within the system immediately.
- **Rights requests:** `/data-request` creates a ticket with a 90-day `due_at`; admin view lists open and overdue requests.
- **Security:** TLS everywhere; encrypt the database at rest; role-based admin access with 2FA; secrets in environment variables, never in the repo.
- **Logs:** audit log of admin access to personal data, retained ≥ 1 year.
- **Breach:** a written runbook — inform affected people without delay; report to the Data Protection Board within 72 hours; named owner.
- **Cookies/analytics:** no non-essential cookies before consent.
- **Retention:** delete leads with no activity after a set period (founders to decide, e.g. 24 months); expire assessment result links after 180 days.

## 8. Acceptance tests

1. Level 1 clinic does not see `applies_to: "level2"` questions.
2. N/A answers are excluded from the score; all-N/A area shows "not assessed", not 0 or 100.
3. Any critical "No" forces status "At risk" even if the score is ≥ 85.
4. Scores computed by the API match a Python unit test fixture for 5 sample answer sets.
5. Changing a score in the browser has no effect on the stored result.
6. Result page without a valid token returns 404; expired token returns 410.
7. PDF contains no personal data, shows version and disclaimer, and every gap has a source link.
8. Lead form refuses submission without the contact-consent box; marketing consent is separate and optional; both are logged with notice version.
9. Withdrawal link stops further messages and writes to `consent_log`.
10. Rights request gets an acknowledgement email and a `due_at` 90 days out; overdue requests appear in admin.
11. No personal data in URLs, logs or analytics events.
12. Guides render without JavaScript; Lighthouse accessibility ≥ 90; pages work at 375 px width.
13. Every legal statement on the guide pages links to a source and shows the last-reviewed date.

## 9. Content upkeep and disclaimers

- Footer on every Hub page: "Educational information, not legal advice. Last reviewed: <date>."
- Review the guides and question bank every quarter, and whenever ART or DPDP rules change. Bump the question bank version; keep old versions for old reports.
- Legal review of guide text and question bank before launch.

## 10. Open questions for founders

- Who is Garbha's designated officer for data protection (name and email to publish)?
- Retention period for leads.
- Which WhatsApp provider, if any, for lead notifications.
- Whether to gate the PDF behind the lead form (more leads) or keep it free (more trust). Recommendation: keep it free.
