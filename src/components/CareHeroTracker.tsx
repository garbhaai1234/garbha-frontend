"use client";

import { useMemo } from "react";
import { CareCycleRing } from "@/components/CareCycleRing";
import { ArrowRight } from "@/components/Icons";
import { Field, inputCls } from "@/components/CareUi";
import { fmt, fmtLong, toInput } from "@/lib/care/dates";
import { CYCLE_MAX, CYCLE_MIN, currentPlan, ringFromPlan } from "@/lib/care/ovulation";
import { useStored, useToday } from "@/lib/care/useStored";

/**
 * The hero's working fertile-day check. It shares the saved cycle with the
 * ovulation tracker module (same key), so a date entered here is there too.
 * Before a date is entered, the ring shows a labelled sample.
 */

type TrackerData = { start: string; cycle: number; period: number; lh: string };

const lengths = Array.from({ length: CYCLE_MAX - CYCLE_MIN + 1 }, (_, i) => CYCLE_MIN + i);

export function CareHeroTracker({ children }: { children: React.ReactNode }) {
  const [d, setD] = useStored<TrackerData>("garbha-care:tracker", {
    start: "",
    cycle: 28,
    period: 5,
    lh: "",
  });
  // Null until the page is interactive: inputs stay disabled until then, so
  // nothing typed before hydration is lost.
  const now = useToday();

  const view = useMemo(() => {
    if (!now) return null;
    const cur = currentPlan(d, now);
    return cur ? { ...cur, ring: ringFromPlan(cur.plan, now) } : null;
  }, [d, now]);

  const passed = view && now ? now > view.plan.ovulation : false;
  const inWindow = view && now ? now >= view.plan.windowStart && now <= view.plan.ovulation : false;
  const cycle = Math.min(CYCLE_MAX, Math.max(CYCLE_MIN, Math.round(d.cycle || 28)));

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7">
        {children}

        <div className="mt-8 rounded-[1.75rem] border border-ink-100 bg-white/90 p-5 shadow-xl shadow-brand-500/10 backdrop-blur sm:p-6">
          <p className="font-display text-lg font-bold text-ink-900">When are my fertile days?</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
            <Field label="First day of your last period">
              {(id) => (
                <input
                  id={id}
                  name="hero-start"
                  type="date"
                  value={d.start}
                  max={now ? toInput(now) : undefined}
                  disabled={!now}
                  onChange={(e) => setD((v) => ({ ...v, start: e.target.value }))}
                  className={inputCls}
                />
              )}
            </Field>
            <Field label="Usual cycle length">
              {(id) => (
                <select
                  id={id}
                  name="hero-cycle"
                  value={cycle}
                  disabled={!now}
                  onChange={(e) => setD((v) => ({ ...v, cycle: Number(e.target.value) }))}
                  className={inputCls}
                >
                  {lengths.map((n) => (
                    <option key={n} value={n}>
                      {n} days{n === 28 ? " (typical)" : ""}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </div>

          <div aria-live="polite">
            {view ? (
              <div className="mt-5 border-t border-ink-100 pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
                  {inWindow ? "You’re in your fertile window" : passed ? "Next likely fertile days" : "Your likely fertile days"}
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                  {passed
                    ? `${fmt(view.plan.upcoming[0].from)} – ${fmt(view.plan.upcoming[0].to)}`
                    : `${fmt(view.plan.windowStart)} – ${fmt(view.plan.ovulation)}`}
                </p>
                <p className="mt-2 text-sm leading-6 text-ink-600">
                  {passed ? (
                    <>This cycle’s window has passed. Next period expected around <strong>{fmtLong(view.plan.next)}</strong>.</>
                  ) : (
                    <>
                      Estimated ovulation <strong>{fmtLong(view.plan.ovulation)}</strong>. Next period around{" "}
                      <strong>{fmtLong(view.plan.next)}</strong>.
                    </>
                  )}
                  {view.projected && (
                    <> Projected from the period you logged on {fmtLong(view.logged)}: log your latest period for a closer estimate.</>
                  )}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  <a href="#tool-ovulation" className="inline-flex items-center gap-1.5 text-brand-700 hover:text-brand-800">
                    Day-by-day calendar and LH test <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#request-call" className="inline-flex items-center gap-1.5 text-brand-700 hover:text-brand-800">
                    Talk to a counsellor, free <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-ink-500">
                Your answer appears here straight away. Nothing is sent to us.
              </p>
            )}
          </div>
          <p className="mt-4 text-xs leading-5 text-ink-500">
            Estimates only: never use them as contraception. Saved on this device only.
          </p>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:ml-auto lg:mr-0 lg:max-w-[340px]">
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-teal-400/15 blur-2xl" />
          <div className="relative rounded-[2rem] bg-white/80 p-6 shadow-2xl shadow-brand-500/15 ring-1 ring-white/60 backdrop-blur-md">
            <CareCycleRing
              key={view ? `${view.plan.start.getTime()}-${view.plan.cycle}` : "sample"}
              cycle={view?.ring}
              showSampleChart={false}
              className="h-auto w-full"
            />
            <p className="mt-2 text-center text-xs text-ink-500">
              {view ? "Your estimated cycle. Dates are estimates, never contraception." : "An example cycle. Enter your date to see yours."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
