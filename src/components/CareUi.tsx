import { useId } from "react";

/** Form controls and button styles shared by the Garbha Care modules and the call form. */

export const inputCls =
  "mt-1.5 block w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-base text-ink-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:text-sm";

export function Field({
  label,
  hint,
  error,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  /** Renders the control; spread `describedBy` into aria-describedby. */
  children: (id: string, describedBy: string | undefined) => React.ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : "";
  const errorId = error ? `${id}-error` : "";
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink-800">
        {label}
        {optional && <span className="ml-1 font-normal text-ink-500">(optional)</span>}
      </label>
      {children(id, describedBy)}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-brand-700">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-ink-500">
          {hint}
        </p>
      )}
    </div>
  );
}

export function Check({
  checked,
  onChange,
  invalid,
  describedBy,
  name,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  invalid?: boolean;
  describedBy?: string;
  name?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border bg-white px-4 py-3 text-sm leading-6 text-ink-700 transition-colors has-[:checked]:border-brand-300 has-[:checked]:bg-brand-50/60 ${invalid ? "border-brand-500" : "border-ink-100"}`}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-brand-700"
      />
      <span>{children}</span>
    </label>
  );
}

export const btn =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
export const btnPrimary = `${btn} bg-brand-700 text-white hover:bg-brand-800`;
export const btnSecondary = `${btn} bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50`;
export const btnQuiet = `${btn} px-3 text-ink-500 hover:text-ink-800`;
