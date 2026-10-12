/**
 * Reminders as iCalendar (.ics) files, so the phone's own calendar does the
 * reminding and nothing is sent to Garbha. Times are local ("floating").
 */

export type ReminderKind = "Tablet" | "Injection" | "Scan" | "Call or appointment";

export type Reminder = {
  id: string;
  what: string;
  kind: ReminderKind;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  days: number; // repeat daily this many times (1 = once)
};

export const DISCREET_TITLE = "Garbha: you have a reminder";

export function icsStamp(date: string, time: string): string {
  return `${date.replaceAll("-", "")}T${time.replace(":", "")}00`;
}

export function icsEscape(s: string): string {
  return s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\r?\n/g, "\\n");
}

export function toIcs(list: Reminder[], discreet: boolean, now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const events = list.flatMap((r) => [
    "BEGIN:VEVENT",
    `UID:${r.id}@care.garbha.ai`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsStamp(r.date, r.time)}`,
    "DURATION:PT15M",
    `SUMMARY:${discreet ? DISCREET_TITLE : icsEscape(`${r.kind}: ${r.what}`)}`,
    ...(r.days > 1 ? [`RRULE:FREQ=DAILY;COUNT=${r.days}`] : []),
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Garbha reminder",
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
  ]);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Garbha//Care reminders//EN",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Sort key: earliest reminder first. */
export const byStart = (a: Reminder, b: Reminder) =>
  icsStamp(a.date, a.time).localeCompare(icsStamp(b.date, b.time));
