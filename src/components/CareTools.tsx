"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ComplianceIcon } from "@/components/ComplianceGuide";
import { ArrowRight } from "@/components/Icons";
import { Check, Field, btnPrimary, btnQuiet, btnSecondary, inputCls } from "@/components/CareUi";
import { artRegistryUrl, journey, tools, type CareToolId } from "@/content/care";
import { clsx } from "@/lib/clsx";
import {
  addDays,
  daysBetween,
  fmt,
  fmtLong,
  lakh,
  num,
  parseDate,
  toInput,
} from "@/lib/care/dates";
import { cyclePlan, isIrregular } from "@/lib/care/ovulation";
import { specialistAdvice } from "@/lib/care/specialist";
import { evaluateSemen, semenRows, type SemenKey } from "@/lib/care/semen";
import { cities, eggFreezingCost, ivfCost } from "@/lib/care/cost";
import { byWeek, ivfMilestones } from "@/lib/care/ivf";
import { byStart, toIcs, type Reminder } from "@/lib/care/ics";
import { useStored, useToday } from "@/lib/care/useStored";

/**
 * The eight free Garbha Care tools as working modules. Everything runs in the
 * browser: answers that are saved (tracker, checklist, reminders) live in this
 * device's localStorage and are never sent anywhere. Reminders become calendar
 * files (.ics) so the phone's own calendar does the reminding.
 *
 * Medical values come from the Garbha Care brief: ASRM fertile window and
 * specialist timing, WHO 2021 semen lower reference limits, published Indian
 * IVF and egg-freezing price ranges. Results inform; they never diagnose.
 */

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function download(filename: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ------------------------------------------------------------------ */
/* Shared UI                                                          */
/* ------------------------------------------------------------------ */

function Result({
  tone = "neutral",
  title,
  children,
}: {
  tone?: "neutral" | "good" | "act";
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "rounded-2xl border p-5 sm:p-6",
        tone === "good" && "border-teal-200 bg-teal-50/70",
        tone === "act" && "border-brand-200 bg-brand-50/70",
        tone === "neutral" && "border-ink-100 bg-ink-50/70",
      )}
    >
      <p
        className={clsx(
          "font-display text-lg font-bold leading-snug sm:text-xl",
          tone === "good" && "text-teal-800",
          tone === "act" && "text-brand-800",
          tone === "neutral" && "text-ink-900",
        )}
      >
        {title}
      </p>
      {children && <div className="mt-3 space-y-2 text-sm leading-6 text-ink-700">{children}</div>}
    </div>
  );
}

function Counsellor({ text }: { text?: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm leading-6 text-ink-600">
        {text ?? "Want to talk your result through with a person?"}
      </p>
      <a href="#request-call" className={clsx(btnPrimary, "shrink-0")}>
        Talk to a fertility counsellor, free <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-200 px-5 py-6 text-center text-sm text-ink-500">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Ovulation tracker                                               */
/* ------------------------------------------------------------------ */

type TrackerData = { start: string; cycle: number; period: number; lh: string };

function OvulationTracker() {
  const [d, setD, clear] = useStored<TrackerData>("garbha-care:tracker", {
    start: "",
    cycle: 28,
    period: 5,
    lh: "",
  });
  const set = (p: Partial<TrackerData>) => setD((v) => ({ ...v, ...p }));
  const now = useToday();

  const plan = useMemo(
    () => cyclePlan({ start: d.start, cycle: d.cycle, period: d.period, lh: d.lh }),
    [d],
  );

  const irregular = isIrregular(d.cycle);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First day of your last period">
          {(id) => (
            <input
              id={id}
              type="date"
              value={d.start}
              max={now ? toInput(now) : undefined}
              onChange={(e) => set({ start: e.target.value })}
              className={inputCls}
            />
          )}
        </Field>
        <Field label="Usual cycle length (days)" hint="From the first day of one period to the first day of the next. Most are 21–35.">
          {(id) => (
            <input
              id={id}
              type="number"
              inputMode="numeric"
              min={20}
              max={45}
              value={d.cycle}
              onChange={(e) => set({ cycle: Number(e.target.value) })}
              className={inputCls}
            />
          )}
        </Field>
        <Field label="How many days your period lasts">
          {(id) => (
            <input
              id={id}
              type="number"
              inputMode="numeric"
              min={1}
              max={10}
              value={d.period}
              onChange={(e) => set({ period: Number(e.target.value) })}
              className={inputCls}
            />
          )}
        </Field>
        <Field label="Positive LH (ovulation) test on (optional)" hint="Logging it sharpens the estimate for this cycle.">
          {(id) => (
            <input
              id={id}
              type="date"
              value={d.lh}
              min={d.start || undefined}
              onChange={(e) => set({ lh: e.target.value })}
              className={inputCls}
            />
          )}
        </Field>
      </div>

      {!plan ? (
        <Empty>Enter the first day of your last period to see your estimated fertile days.</Empty>
      ) : (
        <>
          <Result
            tone="good"
            title={`Most fertile: ${fmt(plan.windowStart)} – ${fmt(plan.ovulation)}`}
          >
            <p>
              Estimated ovulation day: <strong>{fmtLong(plan.ovulation)}</strong>
              {plan.fromLh ? " (moved by your positive LH test)." : "."} Next period expected
              around <strong>{fmtLong(plan.next)}</strong>.
            </p>
            {now && now >= plan.windowStart && now <= plan.ovulation && (
              <p className="font-semibold text-teal-800">Today is inside your estimated fertile window.</p>
            )}
            <p className="text-ink-500">
              The fertile window is the six days ending on ovulation day. Calendar dates are
              estimates, so use LH tests to confirm, and never use these dates as contraception.
            </p>
          </Result>

          <div>
            <p className="text-sm font-semibold text-ink-800">This cycle, day by day</p>
            <ol className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2" aria-label="Cycle calendar">
              {plan.days.map((x) => {
                const isToday = now && daysBetween(x.date, now) === 0;
                return (
                  <li
                    key={x.day}
                    title={`${fmtLong(x.date)}${x.kind === "other" ? "" : ` · ${x.kind}`}`}
                    className={clsx(
                      "flex aspect-square flex-col items-center justify-center rounded-lg text-[0.7rem] leading-tight sm:text-xs",
                      x.kind === "period" && "bg-rose-100 text-rose-800",
                      x.kind === "fertile" && "bg-teal-100 text-teal-800",
                      x.kind === "ovulation" && "bg-teal-600 font-bold text-white",
                      x.kind === "other" && "bg-ink-50 text-ink-500",
                      isToday && "ring-2 ring-brand-500 ring-offset-1",
                    )}
                  >
                    <span className="font-semibold">{x.date.getDate()}</span>
                    <span className="sr-only">
                      {fmtLong(x.date)} {x.kind === "other" ? "" : x.kind}
                    </span>
                  </li>
                );
              })}
            </ol>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-600">
              <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-rose-100" />Period</li>
              <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-teal-100" />Fertile</li>
              <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-teal-600" />Ovulation (est.)</li>
              <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded ring-2 ring-brand-500" />Today</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-800">Next three cycles (estimates)</p>
            <ul className="mt-3 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white text-sm">
              {plan.upcoming.map((u) => (
                <li key={u.period.getTime()} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                  <span className="text-ink-600">Period ~ {fmt(u.period)}</span>
                  <span className="font-semibold text-teal-800">
                    Fertile {fmt(u.from)} – {fmt(u.to)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {irregular && (
        <Result tone="act" title="Cycles shorter than 21 or longer than 35 days are worth a check">
          <p>
            Irregular cycles make calendar estimates less reliable, and guidance suggests seeing a
            specialist without waiting a full year. Try the “Is it time to see a specialist?” check.
          </p>
        </Result>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-500">Saved on this device only. Nothing is sent to Garbha.</p>
        <button type="button" onClick={clear} className={btnQuiet}>
          Clear my data
        </button>
      </div>
      <Counsellor />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Is it time to see a specialist?                                 */
/* ------------------------------------------------------------------ */

function SpecialistCheck() {
  const [age, setAge] = useState("");
  const [months, setMonths] = useState("");
  const [flags, setFlags] = useState({ irregular: false, endo: false, male: false });
  const a = num(age);
  const m = num(months);

  const result = useMemo(() => specialistAdvice(a, m, flags), [a, m, flags]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Age of the person trying to conceive">
          {(id) => (
            <input id={id} type="number" inputMode="numeric" min={18} max={60} value={age} onChange={(e) => setAge(e.target.value)} className={inputCls} placeholder="e.g. 31" />
          )}
        </Field>
        <Field label="Months you’ve been trying" hint="Regular sex without contraception.">
          {(id) => (
            <input id={id} type="number" inputMode="numeric" min={0} max={240} value={months} onChange={(e) => setMonths(e.target.value)} className={inputCls} placeholder="e.g. 8" />
          )}
        </Field>
      </div>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-ink-800">Does any of this apply? (tick all that do)</legend>
        <Check checked={flags.irregular} onChange={(v) => setFlags((f) => ({ ...f, irregular: v }))}>
          Periods are irregular (cycles under 21 or over 35 days) or have stopped
        </Check>
        <Check checked={flags.endo} onChange={(v) => setFlags((f) => ({ ...f, endo: v }))}>
          Endometriosis has been diagnosed or suspected
        </Check>
        <Check checked={flags.male} onChange={(v) => setFlags((f) => ({ ...f, male: v }))}>
          A semen report came back below the reference range
        </Check>
      </fieldset>

      {!result ? (
        <Empty>Enter the age and how long you’ve been trying to see your answer.</Empty>
      ) : result.yes ? (
        <Result tone="act" title="Yes: it’s a good time to see a specialist">
          <ul className="list-disc space-y-1 pl-5">
            {result.reasons.map((r) => <li key={r}>{r}</li>)}
          </ul>
          <p className="text-ink-500">This doesn’t mean something is wrong. A check-up simply gives you answers sooner.</p>
        </Result>
      ) : (
        <Result tone="good" title="Not yet: keep trying for now">
          <p>
            Guidance suggests seeing a specialist after {result.limit} months of trying at your age.
            That’s about <strong>{result.left} more {result.left === 1 ? "month" : "months"}</strong>.
            Using the ovulation tracker can help you time things in the meantime.
          </p>
          <p className="text-ink-500">If anything worries you, you don’t have to wait: a counsellor call is free.</p>
        </Result>
      )}
      <Counsellor />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Semen report reader                                             */
/* ------------------------------------------------------------------ */

function SemenReader() {
  const [v, setV] = useState<Record<SemenKey, string>>({
    volume: "", conc: "", total: "", totalMot: "", prog: "", morph: "",
  });
  const values = useMemo(
    () =>
      evaluateSemen(
        Object.fromEntries(semenRows.map((r) => [r.key, num(v[r.key])])) as Record<SemenKey, number | null>,
      ),
    [v],
  );
  const entered = semenRows.filter((r) => values[r.key].status !== "none");
  const below = semenRows.filter((r) => values[r.key].status === "below");

  return (
    <div className="space-y-6">
      <p className="text-sm leading-6 text-ink-600">
        Type the numbers from your report. Leave any you don’t have blank. Total sperm number is
        worked out for you from volume × concentration if it isn’t on the report.
      </p>
      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Semen report values compared with WHO 2021 lower reference limits</caption>
          <thead className="bg-ink-50 text-xs uppercase tracking-[0.08em] text-ink-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Value on your report</th>
              <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">WHO lower limit</th>
              <th scope="col" className="px-4 py-3 font-semibold">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {semenRows.map((r) => {
              const val = values[r.key];
              const status = val.status;
              return (
                <tr key={r.key} className="align-top">
                  <td className="px-4 py-3">
                    <label htmlFor={`semen-${r.key}`} className="block font-semibold text-ink-800">
                      {r.label}
                    </label>
                    <div className="mt-1.5 flex items-center gap-2">
                      <input
                        id={`semen-${r.key}`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step="any"
                        value={v[r.key]}
                        placeholder={val.derived ? String(val.n) : ""}
                        onChange={(e) => setV((s) => ({ ...s, [r.key]: e.target.value }))}
                        className="w-24 rounded-lg border border-ink-200 px-2.5 py-1.5 text-base sm:text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                      />
                      <span className="text-xs text-ink-500">{r.unit}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink-500 sm:hidden">WHO lower limit: {r.min} {r.unit}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-ink-600 sm:table-cell">{r.min} {r.unit}</td>
                  <td className="px-4 py-3">
                    {status === "none" && <span className="text-ink-400">—</span>}
                    {status === "within" && (
                      <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 ring-1 ring-inset ring-teal-200">
                        Within range{val.derived ? " (calculated)" : ""}
                      </span>
                    )}
                    {status === "below" && (
                      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200">
                        Below range{val.derived ? " (calculated)" : ""}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {entered.length === 0 ? (
        <Empty>Your results appear here as you type.</Empty>
      ) : below.length === 0 ? (
        <Result tone="good" title="Every value you entered is within the WHO reference range">
          <p>That’s reassuring, though a semen report is only one part of the picture for a couple.</p>
        </Result>
      ) : (
        <Result tone="act" title={`${below.length} ${below.length === 1 ? "value is" : "values are"} below the WHO reference range`}>
          <p>{below.map((r) => r.label).join(", ")}.</p>
          <p>
            This is not a diagnosis. Results change from one sample to the next, so doctors usually
            repeat the test after about three months before drawing conclusions. An andrologist or
            fertility doctor can tell you what it means for you.
          </p>
        </Result>
      )}
      <p className="text-xs text-ink-500">Compared with the World Health Organization’s 2021 (6th edition) lower reference limits.</p>
      <Counsellor />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. IVF cost estimator                                              */
/* ------------------------------------------------------------------ */

function CostEstimator() {
  const [city, setCity] = useState("Hyderabad");
  const [addOns, setAddOns] = useState({ icsi: false, freeze: false, pgt: false });
  const [cycles, setCycles] = useState(1);
  const est = ivfCost(city, addOns, cycles);
  const anyAddOn = est.withAddOns;
  const [lo, hi] = est.perCycle;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City">
          {(id) => (
            <select id={id} value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
              {cities.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
          )}
        </Field>
        <Field label="Number of cycles to plan for">
          {(id) => (
            <select id={id} value={cycles} onChange={(e) => setCycles(Number(e.target.value))} className={inputCls}>
              <option value={1}>1 cycle</option>
              <option value={2}>2 cycles</option>
              <option value={3}>3 cycles</option>
            </select>
          )}
        </Field>
      </div>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-ink-800">Add-ons your doctor has mentioned</legend>
        <Check checked={addOns.icsi} onChange={(v) => setAddOns((a) => ({ ...a, icsi: v }))}>
          ICSI (a single sperm injected into each egg)
        </Check>
        <Check checked={addOns.freeze} onChange={(v) => setAddOns((a) => ({ ...a, freeze: v }))}>
          Embryo freezing
        </Check>
        <Check checked={addOns.pgt} onChange={(v) => setAddOns((a) => ({ ...a, pgt: v }))}>
          PGT (genetic testing of embryos)
        </Check>
      </fieldset>

      <Result tone="neutral" title={`Likely ${lakh(lo * cycles)} – ${lakh(hi * cycles)}`}>
        <p>
          {cycles > 1 ? `For ${cycles} cycles in ${city}` : `For one cycle in ${city}`}
          {anyAddOn ? ", including the add-ons you ticked" : ", standard IVF"}. Per cycle:{" "}
          <strong>{lakh(lo)} – {lakh(hi)}</strong>.
        </p>
        {anyAddOn && (
          <p className="text-ink-500">
            Published prices give one combined range for IVF with ICSI, freezing or PGT, so ticking
            one or all of them shows the same range.
          </p>
        )}
        <p className="text-ink-500">
          Based on published price ranges for Indian cities. Every clinic prices differently: ask
          for a written list of what the package includes before you pay.
        </p>
      </Result>
      <Counsellor text="A counsellor can help you compare clinic quotes line by line." />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Questions to ask your clinic                                    */
/* ------------------------------------------------------------------ */

const questionGroups: { title: string; items: string[] }[] = [
  {
    title: "Is the clinic genuine?",
    items: [
      "Are you registered under the ART (Regulation) Act 2021? Can I see the certificate?",
      "Is your ultrasound unit registered under the PCPNDT Act?",
      "Who will my doctor be, and what is their medical council registration number?",
    ],
  },
  {
    title: "Cost",
    items: [
      "What exactly does the package include: scans, blood tests, medicines, egg collection, transfer?",
      "What could cost extra, and roughly how much?",
      "What do embryo freezing and storage cost each year?",
      "What happens to the cost if a cycle is cancelled?",
    ],
  },
  {
    title: "Treatment",
    items: [
      "Which tests do you need from both of us before we start?",
      "Which treatment plan do you suggest for us, and why?",
      "How many scans and blood tests will there be, and roughly when?",
      "Do you use AI embryo grading?",
      "What happens to embryos we don’t use?",
    ],
  },
  {
    title: "Support",
    items: [
      "Is counselling included?",
      "Who do I call outside clinic hours if I have pain or bleeding?",
    ],
  },
];

function ClinicQuestions() {
  const [state, setState, clear] = useStored<{ done: string[]; own: string[] }>(
    "garbha-care:questions",
    { done: [], own: [] },
  );
  const [draft, setDraft] = useState("");
  const groups = state.own.length
    ? [...questionGroups, { title: "My own questions", items: state.own }]
    : questionGroups;
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const toggle = (q: string, on: boolean) =>
    setState((s) => ({ ...s, done: on ? [...s.done, q] : s.done.filter((x) => x !== q) }));

  const addOwn = (e: React.FormEvent) => {
    e.preventDefault();
    const q = draft.trim();
    if (!q || state.own.includes(q)) return;
    setState((s) => ({ ...s, own: [...s.own, q] }));
    setDraft("");
  };

  const asText = () =>
    [
      "Questions to ask your clinic (Garbha Care)",
      "",
      ...groups.flatMap((g) => [
        g.title.toUpperCase(),
        ...g.items.map((q) => `[${state.done.includes(q) ? "x" : " "}] ${q}`),
        "",
      ]),
      `Check any clinic on the national ART registry: ${artRegistryUrl}`,
    ].join("\n");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-indigo-900">
          Before your consult, look the clinic up on the government’s national ART registry.
        </p>
        <a href={artRegistryUrl} target="_blank" rel="noopener noreferrer" className={clsx(btnSecondary, "shrink-0")}>
          Check a clinic’s registration
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      <p className="text-sm font-semibold text-ink-800">
        {state.done.length} of {total} answered
      </p>
      {groups.map((g) => (
        <fieldset key={g.title} className="space-y-2">
          <legend className="text-xs font-bold uppercase tracking-[0.1em] text-brand-700">{g.title}</legend>
          {g.items.map((q) => (
            <Check key={q} checked={state.done.includes(q)} onChange={(on) => toggle(q, on)}>
              {q}
            </Check>
          ))}
        </fieldset>
      ))}

      <form onSubmit={addOwn} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="own-question" className="sr-only">Add your own question</label>
        <input
          id="own-question"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add your own question"
          maxLength={200}
          className={clsx(inputCls, "mt-0 flex-1")}
        />
        <button type="submit" className={btnSecondary} disabled={!draft.trim()}>
          Add
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={btnPrimary} onClick={() => download("questions-for-my-clinic.txt", asText(), "text/plain;charset=utf-8")}>
          Download checklist
        </button>
        <button type="button" className={btnQuiet} onClick={clear}>
          Reset
        </button>
      </div>
      <Counsellor text="Not sure what an answer means? A counsellor can explain it." />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Medicine and appointment reminders                              */
/* ------------------------------------------------------------------ */

function Reminders() {
  const [list, setList, clearAll] = useStored<Reminder[]>("garbha-care:reminders", []);
  const [discreet, setDiscreet] = useStored<boolean>("garbha-care:discreet", true);
  const [form, setForm] = useState<Omit<Reminder, "id">>({
    what: "",
    kind: "Tablet",
    date: "",
    time: "08:00",
    days: 1,
  });
  const now = useToday();
  // Starts on today's date until the person picks another.
  const date = form.date || (now ? toInput(now) : "");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.what.trim() || !parseDate(date) || !/^\d{2}:\d{2}$/.test(form.time)) return;
    const days = Math.min(90, Math.max(1, Math.round(form.days || 1)));
    setList((l) =>
      [...l, { ...form, date, what: form.what.trim(), days, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }].sort(byStart),
    );
    setForm((f) => ({ ...f, what: "" }));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="space-y-4 rounded-2xl border border-ink-100 bg-ink-50/60 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="What is it?" hint="As written on your prescription or appointment slip.">
            {(id) => (
              <input id={id} value={form.what} maxLength={80} required onChange={(e) => setForm({ ...form, what: e.target.value })} className={inputCls} placeholder="e.g. Evening injection" />
            )}
          </Field>
          <Field label="Type">
            {(id) => (
              <select id={id} value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as Reminder["kind"] })} className={inputCls}>
                <option>Tablet</option>
                <option>Injection</option>
                <option>Scan</option>
                <option>Call or appointment</option>
              </select>
            )}
          </Field>
          <Field label="Starting on">
            {(id) => (
              <input id={id} type="date" required value={date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} />
            )}
          </Field>
          <Field label="At">
            {(id) => (
              <input id={id} type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputCls} />
            )}
          </Field>
          <Field label="Repeat every day for (days)" hint="1 means just once.">
            {(id) => (
              <input id={id} type="number" inputMode="numeric" min={1} max={90} value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })} className={inputCls} />
            )}
          </Field>
        </div>
        <button type="submit" className={btnPrimary} disabled={!form.what.trim()}>
          Add reminder
        </button>
      </form>

      <Check checked={discreet} onChange={setDiscreet}>
        Discreet mode: calendar alerts just say “Garbha: you have a reminder”, never what it is for.
      </Check>

      {list.length === 0 ? (
        <Empty>No reminders yet. Add your first one above.</Empty>
      ) : (
        <>
          <ul className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white">
            {list.map((r) => {
              const start = parseDate(r.date);
              return (
                <li key={r.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <ComplianceIcon name={r.kind === "Scan" ? "doc" : r.kind === "Call or appointment" ? "chat" : "clock"} className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-ink-900">{r.kind}: {r.what}</p>
                      <p className="text-ink-600">
                        {start ? fmt(start) : r.date} at {r.time}
                        {r.days > 1 && start ? `, daily until ${fmt(addDays(start, r.days - 1))}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" className={btnSecondary} onClick={() => download(`garbha-reminder.ics`, toIcs([r], discreet), "text/calendar;charset=utf-8")}>
                      Add to calendar
                    </button>
                    <button
                      type="button"
                      className={btnQuiet}
                      aria-label={`Delete ${r.what}`}
                      onClick={() => setList((l) => l.filter((x) => x.id !== r.id))}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className={btnPrimary} onClick={() => download("garbha-reminders.ics", toIcs(list, discreet), "text/calendar;charset=utf-8")}>
              Add all to my calendar
            </button>
            <button type="button" className={btnQuiet} onClick={clearAll}>
              Delete all
            </button>
          </div>
        </>
      )}
      <p className="text-xs text-ink-500">
        “Add to calendar” opens the reminder in your phone’s calendar, which alerts you at the time
        you chose. Reminders are saved on this device only. Garbha never suggests doses: always
        follow your own prescription.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Egg-freezing planner                                            */
/* ------------------------------------------------------------------ */

const eggSteps: { title: string; text: string }[] = [
  { title: "Assessment", text: "An AMH blood test and an ultrasound scan show your egg reserve, and the doctor explains what to expect." },
  { title: "About 10–12 days of injections", text: "Daily hormone injections help several eggs grow at once, with scans every few days to check progress." },
  { title: "Egg collection", text: "A short procedure under sedation; most people go home the same day." },
  { title: "Freezing", text: "Mature eggs are frozen quickly (vitrification) and stored at the clinic." },
  { title: "Yearly storage", text: "Storage is renewed each year until you are ready to use the eggs." },
];

function EggPlanner() {
  const [age, setAge] = useState("");
  const [cycles, setCycles] = useState(1);
  const [years, setYears] = useState(5);
  const a = num(age);
  const [lo, hi] = eggFreezingCost(cycles, years);

  return (
    <div className="space-y-6">
      <ol className="space-y-3">
        {eggSteps.map((s, i) => (
          <li key={s.title} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">{i + 1}</span>
            <div className="text-sm leading-6">
              <p className="font-semibold text-ink-900">{s.title}</p>
              <p className="text-ink-600">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Your age">
          {(id) => (
            <input id={id} type="number" inputMode="numeric" min={18} max={55} value={age} onChange={(e) => setAge(e.target.value)} className={inputCls} placeholder="e.g. 32" />
          )}
        </Field>
        <Field label="Cycles" hint="Some people need more than one.">
          {(id) => (
            <select id={id} value={cycles} onChange={(e) => setCycles(Number(e.target.value))} className={inputCls}>
              <option value={1}>1 cycle</option>
              <option value={2}>2 cycles</option>
              <option value={3}>3 cycles</option>
            </select>
          )}
        </Field>
        <Field label={`Store for ${years} ${years === 1 ? "year" : "years"}`}>
          {(id) => (
            <input id={id} type="range" min={1} max={15} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-4 w-full accent-brand-700" />
          )}
        </Field>
      </div>

      <Result tone="neutral" title={`Likely ${lakh(lo)} – ${lakh(hi)} in total`}>
        <p>
          {cycles} {cycles === 1 ? "cycle" : "cycles"} at ₹1–2.5 lakh each, plus {years} {years === 1 ? "year" : "years"} of
          storage at ₹10,000–30,000 a year.
          {a !== null && a > 0 ? ` If you freeze now, you’d be about ${Math.round(a + years)} when this storage period ends.` : ""}
        </p>
        <p className="text-ink-500">
          Results tend to be better when eggs are frozen younger, but there isn’t enough evidence to
          name a best age. Freezing eggs is not a guarantee of a future pregnancy.
        </p>
      </Result>

      <div>
        <p className="text-sm font-semibold text-ink-800">Ask the clinic</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink-700">
          <li>Based on my AMH and scan, how many eggs might one cycle give?</li>
          <li>What does the package include, and what does storage cost after the first year?</li>
          <li>What happens to my eggs if I stop paying for storage or move cities?</li>
        </ul>
      </div>
      <Counsellor />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 8. IVF week-by-week planner                                        */
/* ------------------------------------------------------------------ */

function IvfPlanner() {
  const [start, setStart] = useState("");
  const [transfer, setTransfer] = useState<"fresh" | "frozen">("fresh");
  const s = parseDate(start);
  const ms = ivfMilestones(transfer);
  const weeks = byWeek(ms);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First day of the period your cycle starts with" hint="Leave blank to see the plan by day number.">
          {(id) => <input id={id} type="date" value={start} onChange={(e) => setStart(e.target.value)} className={inputCls} />}
        </Field>
        <fieldset>
          <legend className="text-sm font-semibold text-ink-800">Embryo transfer</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(["fresh", "frozen"] as const).map((t) => (
              <label
                key={t}
                className={clsx(
                  "flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
                  transfer === t ? "border-brand-500 bg-brand-50 text-brand-800" : "border-ink-200 bg-white text-ink-600",
                )}
              >
                <input type="radio" name="ivf-transfer" value={t} checked={transfer === t} onChange={() => setTransfer(t)} className="sr-only" />
                {t === "fresh" ? "Fresh transfer" : "Freeze all"}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <ol className="space-y-5">
        {weeks.map((w) => (
          <li key={w.week} className="rounded-2xl border border-ink-100 bg-white p-5">
            <p className="font-display text-lg font-bold text-ink-900">
              Week {w.week}
              {s && (
                <span className="ml-2 text-sm font-medium text-ink-500">
                  {fmt(addDays(s, (w.week - 1) * 7))} – {fmt(addDays(s, (w.week - 1) * 7 + 6))}
                </span>
              )}
            </p>
            <ol className="mt-4 space-y-4 border-l-2 border-brand-100 pl-5">
              {w.items.map((m) => (
                <li key={m.title} className="relative">
                  <span
                    className={clsx(
                      "absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full ring-4 ring-white",
                      m.key ? "bg-brand-600" : "bg-brand-200",
                    )}
                  />
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand-700">
                    {s ? `~ ${fmt(addDays(s, m.day))}` : `~ Day ${m.day + 1}`}
                  </p>
                  <p className="mt-0.5 font-semibold text-ink-900">{m.title}</p>
                  <p className="text-sm leading-6 text-ink-600">{m.text}</p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <p className="rounded-xl border border-ink-100 bg-ink-50 px-4 py-3 text-xs leading-5 text-ink-600">
        A typical cycle with the most common plan. Your clinic’s protocol and your scans decide the
        real dates, which can move by several days. Use the reminders tool to set your actual
        injection and scan times.
      </p>
      <Counsellor text="Feeling anxious about the weeks ahead? A counsellor can walk you through it." />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hub                                                                */
/* ------------------------------------------------------------------ */

const panels: Record<CareToolId, () => React.ReactElement> = {
  ovulation: OvulationTracker,
  specialist: SpecialistCheck,
  semen: SemenReader,
  cost: CostEstimator,
  questions: ClinicQuestions,
  reminders: Reminders,
  eggs: EggPlanner,
  ivf: IvfPlanner,
};

const isToolId = (v: string): v is CareToolId => v in panels;

/** The last module opened in this tab, so the call form knows where the person came from. */
const LAST_MODULE_KEY = "garbha-care:last-module"; // read by CareCallForm
function rememberModule(id: CareToolId) {
  try {
    sessionStorage.setItem(LAST_MODULE_KEY, id);
  } catch {
    // Storage blocked: the form simply won't pre-fill.
  }
}

export function CareTools() {
  const [active, setActive] = useState<CareToolId>("ovulation");
  const [stage, setStage] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<CareToolId, HTMLButtonElement | null>>>({});

  // Links such as #tool-semen (from the journey cards) open that tool.
  useEffect(() => {
    const open = (hash: string) => {
      const id = hash.replace(/^#tool-/, "");
      if (!isToolId(id)) return;
      setActive(id);
      rememberModule(id);
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    };
    const onHash = () => open(window.location.hash);
    // A link to the hash already in the address bar fires no hashchange.
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element | null)?.closest?.('a[href^="#tool-"]')?.getAttribute("href");
      if (href && href === window.location.hash) open(href);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // On phones the tabs are a sideways strip: keep the active one in view.
  // On desktop the list doesn't overflow, so this does nothing there.
  useEffect(() => {
    const tab = tabRefs.current[active];
    const strip = tab?.parentElement;
    if (!tab || !strip || strip.scrollWidth <= strip.clientWidth) return;
    const t = tab.getBoundingClientRect();
    const s = strip.getBoundingClientRect();
    if (t.left < s.left || t.right > s.right) {
      strip.scrollBy({ left: t.left - s.left - (s.width - t.width) / 2, behavior: "smooth" });
    }
  }, [active]);

  const select = (id: CareToolId) => {
    setActive(id);
    history.replaceState(null, "", `#tool-${id}`);
    rememberModule(id);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = tools[(i + step + tools.length) % tools.length].id;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const tool = tools.find((t) => t.id === active)!;
  const Panel = panels[active];
  const suggested = stage === null ? [] : journey[stage].tools;

  const pickStage = (i: number) => {
    const same = stage === i;
    setStage(same ? null : i);
    if (!same) select(journey[i].tools[0]);
  };

  return (
    <>
    <div className="mt-8">
      <p id="care-stage-label" className="text-sm font-semibold text-ink-800">
        Where are you right now?
      </p>
      <div
        role="group"
        aria-labelledby="care-stage-label"
        className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {journey.map((j, i) => (
          <button
            key={j.stage}
            type="button"
            aria-pressed={stage === i}
            onClick={() => pickStage(i)}
            className={clsx(
              "min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              stage === i
                ? "border-teal-600 bg-teal-50 text-teal-800"
                : "border-ink-200 bg-white text-ink-700 hover:border-teal-300 hover:text-teal-800",
            )}
          >
            {j.stage}
          </button>
        ))}
      </div>
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div
        role="tablist"
        aria-label="Free modules"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:col-span-4 lg:mx-0 lg:flex-col lg:self-start lg:overflow-visible lg:px-0 lg:sticky lg:top-24"
      >
        {tools.map((t, i) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="care-tool-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={clsx(
                "flex shrink-0 items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:px-4 lg:py-3",
                on
                  ? "border-brand-300 bg-brand-50 text-brand-800 shadow-sm"
                  : "border-ink-100 bg-white text-ink-700 hover:border-brand-200 hover:text-brand-700",
              )}
            >
              <span
                className={clsx(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  on ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700",
                )}
              >
                <ComplianceIcon name={t.icon} className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className={clsx("text-[0.65rem] font-bold uppercase tracking-[0.12em]", on ? "text-brand-600" : "text-ink-400")}>
                  Module {i + 1}
                  {suggested.includes(t.id) && <span className="ml-1.5 text-teal-700">· For you</span>}
                </span>
                <span className="whitespace-nowrap lg:whitespace-normal">{t.name}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        id="care-tool-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="scroll-mt-24 rounded-[1.75rem] border border-ink-100 bg-white p-5 shadow-sm sm:p-8 lg:col-span-8"
      >
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">
          Module {tools.indexOf(tool) + 1} of {tools.length}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold text-ink-900">{tool.name}</h3>
        <p className="mt-2 text-sm leading-6 text-ink-600">{tool.gets}</p>
        <p className="mt-1 text-xs leading-5 text-ink-500">{tool.basis}</p>
        <div className="mt-6">
          <Panel key={active} />
        </div>
      </div>
    </div>
    </>
  );
}
