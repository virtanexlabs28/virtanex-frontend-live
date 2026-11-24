/**
 * The website runs on Finnish time. Whatever the visitor's or the server's own clock says,
 * anything we state as a time (call slots, "now in Helsinki", email timestamps) is Europe/Helsinki,
 * which handles the switch between winter time (EET, UTC+2) and summer time (EEST, UTC+3).
 */
export const SITE_TIME_ZONE = 'Europe/Helsinki';

/** Current Helsinki time as "14:32" (formatted for `locale`) plus its UTC offset, e.g. "UTC+3". */
export function helsinkiClock(locale: string, date: Date = new Date()) {
  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: SITE_TIME_ZONE,
  }).format(date);

  const offset =
    new Intl.DateTimeFormat('en', { timeZone: SITE_TIME_ZONE, timeZoneName: 'shortOffset' })
      .formatToParts(date)
      .find((part) => part.type === 'timeZoneName')
      ?.value.replace('GMT', 'UTC') ?? 'UTC+2';

  return { time, offset };
}

/** Full Helsinki timestamp for emails, e.g. "24 Nov 2026, 14:32:10 EET". */
export function helsinkiTimestamp(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone: SITE_TIME_ZONE,
  }).format(date);
}
