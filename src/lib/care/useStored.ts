import { useCallback, useMemo, useSyncExternalStore } from "react";
import { startOfToday } from "@/lib/care/dates";

/*
 * Client hooks for the Garbha Care modules. Values saved on this device: a
 * tiny external store over localStorage (with an in-memory copy, so the
 * modules still work when storage is blocked). The server snapshot is null,
 * so the first render matches the server HTML. Shared by the hero tracker and
 * the modules, so both see the same saved cycle.
 */
const memory = new Map<string, string | null>();
const listeners = new Set<() => void>();

function readStored(key: string): string | null {
  if (!memory.has(key)) {
    try {
      memory.set(key, localStorage.getItem(key));
    } catch {
      memory.set(key, null);
    }
  }
  return memory.get(key) ?? null;
}

function writeStored(key: string, v: string | null) {
  memory.set(key, v);
  try {
    if (v === null) localStorage.removeItem(key);
    else localStorage.setItem(key, v);
  } catch {
    // Storage unavailable: the in-memory copy still works for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function parseStored<T>(raw: string | null, initial: T): T {
  if (!raw) return initial;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return initial;
  }
}

export function useStored<T>(key: string, initial: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => readStored(key),
    () => null,
  );
  const value = useMemo(() => parseStored(raw, initial), [raw]); // eslint-disable-line react-hooks/exhaustive-deps
  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = parseStored(readStored(key), initial);
      const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      writeStored(key, JSON.stringify(v));
    },
    [key], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const clear = useCallback(() => writeStored(key, null), [key]);
  return [value, setValue, clear] as const;
}

const noSubscribe = () => () => {};

/** Today's date on the client; null during server render and hydration. */
export function useToday(): Date | null {
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  return hydrated ? startOfToday() : null;
}

