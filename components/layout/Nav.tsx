'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PHONE, PHONE_HREF } from '@/lib/data';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/locations', label: 'Locations' },
  { href: '/trainers-programs', label: 'Programs' },
  { href: '/timetable', label: 'Timetable' },
  { href: '/franchise', label: 'Franchise' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled || menu ? 'rgba(13,14,13,.72)' : 'rgba(20,22,21,.28)';

  return (
    <header style={{ position: 'fixed', top: 'var(--banner-h, 40px)', left: 0, right: 0, zIndex: 80, padding: '16px clamp(12px,3vw,32px)', pointerEvents: 'none' }}>
      <nav
        style={{
          pointerEvents: 'auto', maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          padding: '8px 8px 8px 22px', borderRadius: 999, border: '1px solid rgba(255,255,255,.16)', background: navBg,
          backdropFilter: 'blur(18px) saturate(140%)', WebkitBackdropFilter: 'blur(18px) saturate(140%)', boxShadow: '0 20px 50px rgba(0,0,0,.18)', transition: 'background .4s ease',
        }}
      >
        <Link href="/#top" aria-label="ABS Fitness home" style={{ display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/abs-logo-white.png" alt="ABS Fitness & Wellness Club" width={80} height={30} style={{ height: 30, width: 'auto', display: 'block' }} />
        </Link>

        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: 'rgba(242,242,243,.82)' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/#join" style={{ background: '#b8e600', color: '#0d0e0d', fontSize: 14, fontWeight: 700, padding: '12px 20px', borderRadius: 999, transition: 'background .3s ease-out' }}>
            Book a free tour
          </Link>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMenu((m) => !m)}
            aria-label="Menu"
            aria-expanded={menu}
            style={{ width: 44, height: 44, borderRadius: 999, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.06)', color: '#f2f2f3', cursor: 'pointer', placeItems: 'center', fontSize: 18 }}
          >
            {menu ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menu && (
        <div style={{ pointerEvents: 'auto', maxWidth: 1320, margin: '8px auto 0', padding: 14, borderRadius: 24, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(13,14,13,.92)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', display: 'grid', gap: 2 }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenu(false)} style={{ padding: '14px 12px', fontSize: 20, fontWeight: 600 }}>
              {l.label}
            </Link>
          ))}
          <a href={PHONE_HREF} style={{ marginTop: 8, padding: '14px 12px', borderTop: '1px solid rgba(255,255,255,.12)', fontSize: 15, color: '#b8e600' }}>
            {PHONE}
          </a>
        </div>
      )}
    </header>
  );
}
