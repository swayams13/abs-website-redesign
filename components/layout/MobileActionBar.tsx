'use client';
import { usePathname } from 'next/navigation';
import { PHONE_HREF } from '@/lib/data';

function action(pathname: string): { href: string; label: string } {
  if (pathname === '/') return { href: '#join', label: 'Book a free tour' };
  if (pathname.startsWith('/clubs/')) return { href: '#tour', label: 'Book a free tour' };
  if (pathname === '/trainers-programs') return { href: '#challenge', label: 'Join the 90-Day Challenge' };
  if (pathname.startsWith('/services/')) return { href: '#trial', label: 'Book a free trial' };
  if (pathname === '/timetable') return { href: '/#join', label: 'Book a free trial class' };
  if (pathname === '/careers') return { href: '#apply', label: 'Apply now' };
  return { href: '/#join', label: 'Book a free tour' };
}

export default function MobileActionBar() {
  const pathname = usePathname();
  const { href, label } = action(pathname);

  return (
    <div
      className="mobile-action-bar"
      style={{
        position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 70, gap: 6, padding: 6, borderRadius: 999,
        background: 'rgba(13,14,13,.78)', border: '1px solid rgba(255,255,255,.16)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      }}
    >
      <a href={PHONE_HREF} style={{ flex: 1, textAlign: 'center', padding: '14px 8px', borderRadius: 999, fontSize: 14, fontWeight: 600, color: '#f2f2f3' }}>
        Call
      </a>
      <a href={href} style={{ flex: 2, textAlign: 'center', padding: '14px 8px', borderRadius: 999, background: '#b8e600', color: '#0d0e0d', fontSize: 14, fontWeight: 700 }}>
        {label}
      </a>
    </div>
  );
}
