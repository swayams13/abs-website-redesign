// IST-dependent helpers. Compute client-side after mount — see TECH-STACK.md "Hydration".
const parseT = (s: string) => {
  const m = s.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let hh = +m[1] % 12;
  if (/pm/i.test(m[3])) hh += 12;
  return hh * 60 + +m[2];
};

export function istMinutes(now: number = Date.now()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date(now));
  const hh = +(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const mm = +(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return hh * 60 + mm;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
/** IST weekday, Monday = 0 .. Sunday = 6. */
export function istWeekday(now: number = Date.now()) {
  const label = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short' }).format(new Date(now));
  return WEEKDAYS.indexOf(label);
}

/** Hours strings may hold multiple shifts split by a comma (e.g. ICC's midday closure). */
export function status(hours: string, now: number = Date.now()) {
  const ranges = hours.split(',').map((r) => r.trim().split(/\s[–-]\s/) as [string, string]);
  const m = istMinutes(now);
  const active = ranges.find(([o, c]) => m >= parseT(o) && m < parseT(c));
  if (active) {
    return { open: true, label: 'Open now · closes ' + active[1], short: 'Open now', dot: '#b8e600' };
  }
  const nextOpen = ranges.map(([o]) => parseT(o)).filter((t) => t > m).sort((a, b) => a - b)[0];
  const upcoming = ranges.find(([o]) => parseT(o) === nextOpen)?.[0] ?? ranges[0][0];
  return { open: false, label: 'Closed · opens ' + upcoming, short: 'Closed', dot: 'rgba(242,242,243,.45)' };
}

/** Converts a club's `hours` string into schema.org HealthClub `openingHours` entries, e.g. "Mo-Sa 06:00-22:00". */
export function schemaHours(hours: string) {
  const to24h = (s: string) => {
    const m = s.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return '00:00';
    let hh = +m[1] % 12;
    if (/pm/i.test(m[3])) hh += 12;
    return String(hh).padStart(2, '0') + ':' + m[2];
  };
  return hours.split(',').map((r) => {
    const [o, c] = r.trim().split(/\s[–-]\s/);
    return `Mo-Sa ${to24h(o)}-${to24h(c)}`;
  });
}

/** First Monday of next month, IST-agnostic (matches the design reference's UTC-based calc). */
export function nextBatchDate(now: number = Date.now()) {
  const d = new Date(now);
  const first = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
  while (first.getUTCDay() !== 1) first.setUTCDate(first.getUTCDate() + 1);
  return first;
}

export function nextBatch(now: number = Date.now()) {
  return nextBatchDate(now).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', timeZone: 'UTC' });
}
