import Link from 'next/link';
import { CITIES } from '@/lib/data';

export default function Footer() {
  return (
    <footer style={{ background: '#0d0e0d', borderTop: '1px solid rgba(255,255,255,.1)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(56px,6vw,80px) clamp(16px,4vw,44px) 28px' }}>
        <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,190px),1fr))' }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/abs-logo-white.png" alt="ABS Fitness & Wellness Club" width={106} height={40} style={{ height: 40, width: 'auto', display: 'block' }} />
            <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.6, color: 'rgba(242,242,243,.6)', maxWidth: '28ch' }}>#ITSNOTGYMITSLIFE</p>
          </div>
          <div style={{ display: 'grid', gap: 12, alignContent: 'start', fontSize: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(242,242,243,.6)' }}>Explore</div>
            <Link href="/about" style={{ color: 'rgba(242,242,243,.82)' }}>About</Link>
            <Link href="/trainers-programs" style={{ color: 'rgba(242,242,243,.82)' }}>Programs &amp; coaches</Link>
            <Link href="/timetable" style={{ color: 'rgba(242,242,243,.82)' }}>Timetable</Link>
            <Link href="/events" style={{ color: 'rgba(242,242,243,.82)' }}>Events</Link>
            <Link href="/careers" style={{ color: 'rgba(242,242,243,.82)' }}>Careers</Link>
          </div>
          <div style={{ display: 'grid', gap: 12, alignContent: 'start', fontSize: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(242,242,243,.6)' }}>Cities</div>
            {CITIES.map((city) => (
              <Link key={city} href={`/locations?city=${encodeURIComponent(city)}`} style={{ color: 'rgba(242,242,243,.82)' }}>
                {city === 'Chhatrapati Sambhaji Nagar' ? 'Ch. Sambhaji Nagar' : city}
              </Link>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 12, alignContent: 'start', fontSize: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(242,242,243,.6)' }}>Get in touch</div>
            <a href="tel:+919763215051" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.02em', color: '#ffffff' }}>+91 97632 15051</a>
            <a href="mailto:info@absfitnessclub.in" style={{ color: 'rgba(242,242,243,.82)' }}>info@absfitnessclub.in</a>
            <Link href="/franchise" style={{ color: 'rgba(242,242,243,.82)' }}>Own an ABS club →</Link>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginTop: 56, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.1)', fontSize: 12.5, color: 'rgba(242,242,243,.6)' }}>
          <span>© 2026 ABS Fitness &amp; Wellness Club</span>
          <span>Pune · Mumbai · Nashik · Kolhapur · Ahilyanagar · Ch. Sambhaji Nagar</span>
        </div>
      </div>
      <div className="mobile-footer-spacer" />
    </footer>
  );
}
