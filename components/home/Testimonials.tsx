'use client';
import { useReveal } from '@/lib/hooks';

const TESTIMONIALS = [
  { quote: 'I travel to Mumbai three weeks a month. The Passport means I never pay for a second gym. BKC on weekdays, Kharadi on weekends.', name: 'Imran Shaikh', role: 'ABS EON 2 Kharadi', ini: 'IS' },
  { quote: 'Govind rebuilt my programme around a bad shoulder instead of telling me to rest. Two years in, I am lifting more than I did at 25.', name: 'Prasad Bhosale', role: 'ABS Nanded City', ini: 'PB' },
  { quote: 'I joined for the 90-day challenge and stayed. The 6 AM class at Model Colony is the reason I get out of bed.', name: 'Aditi Rane', role: 'ABS Model Colony', ini: 'AR' },
];

function TestimonialCard({ t, index }: { t: (typeof TESTIMONIALS)[number]; index: number }) {
  const ref = useReveal<HTMLElement>(index);
  return (
    <figure ref={ref} style={{ position: 'relative', margin: 0, padding: '40px 30px 60px', borderRadius: 22, background: '#f2f2f3' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: 6, right: 24, fontFamily: 'var(--font-cormorant), serif', fontSize: 130, lineHeight: 1, color: 'rgba(29,31,32,.09)' }}>
        &rdquo;
      </div>
      <div style={{ fontSize: 14, letterSpacing: 2, color: '#6d8a00' }}>★★★★★</div>
      <blockquote style={{ position: 'relative', margin: '18px 0 0', fontSize: 17, lineHeight: 1.6, fontWeight: 500, color: '#1d1f20' }}>{t.quote}</blockquote>
      <figcaption style={{ position: 'absolute', left: 24, bottom: -26, display: 'flex', alignItems: 'center', gap: 12, padding: '8px 18px 8px 8px', borderRadius: 999, background: '#ffffff', boxShadow: '0 14px 34px rgba(13,14,13,.12)' }}>
        <span style={{ position: 'relative', width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', background: '#1d1f20', color: '#b8e600', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700 }}>{t.ini}</span>
        <span>
          <span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>{t.name}</span>
          <span style={{ display: 'block', fontSize: 12, color: 'rgba(29,31,32,.6)' }}>{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const headerRef = useReveal<HTMLDivElement>(0);
  return (
    <section id="reviews" style={{ background: '#ffffff', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px) clamp(96px,11vw,150px)' }}>
        <div ref={headerRef} style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#6d8a00' }}>Members</div>
          <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.04, letterSpacing: '-.03em' }}>
            People who stayed <span style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 500, fontSize: '1.1em', letterSpacing: '-.01em' }}>for years</span>
          </h2>
        </div>
        <div className="reviews-grid" style={{ marginTop: 'clamp(44px,5vw,68px)' }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
