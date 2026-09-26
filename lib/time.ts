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

export function status(hours: string, now: number = Date.now()) {
  const [o, c] = hours.split(/\s[–-]\s/);
  const m = istMinutes(now);
  const open = m >= parseT(o) && m < parseT(c);
  return { open, label: open ? 'Open now · closes ' + c : 'Closed · opens ' + o, short: open ? 'Open now' : 'Closed', dot: open ? '#b8e600' : 'rgba(242,242,243,.45)' };
}

/** First Monday of next month, IST-agnostic (matches the design reference's UTC-based calc). */
export function nextBatch(now: number = Date.now()) {
  const d = new Date(now);
  const first = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
  while (first.getUTCDay() !== 1) first.setUTCDate(first.getUTCDate() + 1);
  return first.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', timeZone: 'UTC' });
}
