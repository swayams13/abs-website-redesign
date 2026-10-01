// One entry point for every enquiry form: builds a wa.me deep link and opens it.
// Call from a click handler, after validation, so browsers don't block the popup.
export function sendWhatsApp(subject: string, fields: Record<string, string | undefined>) {
  const lines = Object.entries(fields).filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${v!.trim()}`);
  const text = `${subject}\n${lines.join('\n')}`;
  window.open(`https://wa.me/919763215051?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}
