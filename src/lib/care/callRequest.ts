/**
 * The free counsellor call request (Garbha Care brief, sign-up form): the
 * fields, their rules and the email the team receives. Used by the form in
 * the browser and again by POST /api/care-call, so both apply the same rules.
 * Nothing here stores data.
 */

export const callOptions = {
  trying: [
    "Not trying yet",
    "Less than 6 months",
    "6 to 12 months",
    "1 to 2 years",
    "More than 2 years",
  ],
  stage: [
    "Trying to conceive",
    "Tests done, not sure what they mean",
    "Advised IVF or IUI",
    "In treatment now",
    "A cycle didn’t work",
    "Planning ahead (egg freezing)",
  ],
  language: ["English", "Telugu"],
  callTime: ["Morning (9am–12pm)", "Afternoon (12–4pm)", "Evening (4–8pm)"],
} as const;

export type CallRequest = {
  firstName: string;
  mobile: string; // normalised: 10 digits
  place: string;
  age: number;
  partnerAge: number | null;
  trying: (typeof callOptions.trying)[number];
  stage: (typeof callOptions.stage)[number];
  language: (typeof callOptions.language)[number];
  callTime: (typeof callOptions.callTime)[number];
  email: string;
  whatsapp: boolean;
  from: string; // the module the person came from, if any (not personal)
};

export type CallField =
  | "firstName"
  | "mobile"
  | "place"
  | "age"
  | "partnerAge"
  | "trying"
  | "stage"
  | "language"
  | "callTime"
  | "email"
  | "consent";

export type CallErrors = Partial<Record<CallField, string>>;

const LIMITS = {
  firstName: 60,
  mobile: 20,
  place: 80,
  age: 3,
  partnerAge: 3,
  email: 254,
  from: 30,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;

/** "+91 98765-43210", "098765 43210" -> "9876543210"; null if not an Indian mobile. */
export function normaliseMobile(v: string): string | null {
  let d = v.replace(/[\s()-]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.startsWith("0091")) d = d.slice(4);
  else if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

function str(raw: Record<string, unknown>, key: string): string | null {
  const v = raw[key];
  if (v === undefined || v === null) return "";
  return typeof v === "string" ? v.trim() : null;
}

function age(v: string): number | null {
  if (!/^\d{1,3}$/.test(v)) return null;
  const n = Number(v);
  return n >= 18 && n <= 60 ? n : null;
}

const oneOf = <T extends readonly string[]>(list: T, v: string): v is T[number] =>
  (list as readonly string[]).includes(v);

export type Validation =
  | { ok: true; data: CallRequest }
  | { ok: false; malformed: true }
  | { ok: false; malformed: false; errors: CallErrors };

/** Checks a submitted request. Wrong types or over-long values are "malformed". */
export function validateCallRequest(raw: unknown): Validation {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ok: false, malformed: true };
  const r = raw as Record<string, unknown>;
  const v: Record<string, string> = {};
  for (const key of [
    "firstName", "mobile", "place", "age", "partnerAge", "trying", "stage",
    "language", "callTime", "email", "consent", "whatsapp", "from",
  ]) {
    const s = str(r, key);
    if (s === null) return { ok: false, malformed: true };
    const limit = (LIMITS as Record<string, number>)[key] ?? 100;
    if (s.length > limit) return { ok: false, malformed: true };
    v[key] = s;
  }

  const errors: CallErrors = {};
  if (!v.firstName) errors.firstName = "Please tell us your first name.";
  else if (!NAME_RE.test(v.firstName)) errors.firstName = "Please use letters only.";

  const mobile = normaliseMobile(v.mobile);
  if (!v.mobile) errors.mobile = "Please enter your mobile number.";
  else if (!mobile) errors.mobile = "Please enter a 10-digit Indian mobile number.";

  if (!v.place) errors.place = "Please enter your city or PIN code.";

  const a = age(v.age);
  if (!v.age) errors.age = "Please enter your age.";
  else if (a === null) errors.age = "Please enter an age between 18 and 60.";

  const pa = v.partnerAge ? age(v.partnerAge) : null;
  if (v.partnerAge && pa === null) errors.partnerAge = "Please enter an age between 18 and 60, or leave it blank.";

  if (!oneOf(callOptions.trying, v.trying)) errors.trying = "Please choose how long you’ve been trying.";
  if (!oneOf(callOptions.stage, v.stage)) errors.stage = "Please choose where you are now.";
  if (!oneOf(callOptions.language, v.language)) errors.language = "Please choose a language.";
  if (!oneOf(callOptions.callTime, v.callTime)) errors.callTime = "Please choose a time.";

  if (v.email && !EMAIL_RE.test(v.email)) errors.email = "Please check your email address, or leave it blank.";

  if (v.consent !== "yes") errors.consent = "We need your permission to call you.";

  if (Object.keys(errors).length) return { ok: false, malformed: false, errors };
  return {
    ok: true,
    data: {
      firstName: v.firstName,
      mobile: mobile!,
      place: v.place,
      age: a!,
      partnerAge: pa,
      trying: v.trying as CallRequest["trying"],
      stage: v.stage as CallRequest["stage"],
      language: v.language as CallRequest["language"],
      callTime: v.callTime as CallRequest["callTime"],
      email: v.email,
      whatsapp: v.whatsapp === "yes",
      from: /^[a-z]{1,20}$/.test(v.from) ? v.from : "",
    },
  };
}

/** The rows of the email the team receives, in reading order. */
export function callRequestRows(d: CallRequest): [string, string][] {
  return [
    ["First name", d.firstName],
    ["Mobile", `+91 ${d.mobile.slice(0, 5)} ${d.mobile.slice(5)}`],
    ["City or PIN", d.place],
    ["Age", String(d.age)],
    ["Partner’s age", d.partnerAge === null ? "Not given" : String(d.partnerAge)],
    ["Trying for", d.trying],
    ["Where they are", d.stage],
    ["Language", d.language],
    ["Best time to call", d.callTime],
    ["Email", d.email || "Not given"],
    ["Consent to be called", "Yes"],
    ["WhatsApp updates", d.whatsapp ? "Yes, opted in" : "No"],
    ["Came from", d.from ? `Module: ${d.from}` : "Garbha Care page"],
  ];
}
