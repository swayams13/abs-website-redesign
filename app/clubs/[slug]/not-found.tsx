import Link from 'next/link';
import { PHONE, PHONE_HREF } from '@/lib/data';

export default function ClubNotFound() {
  return (
    <main style={{ background: '#0d0e0d', minHeight: '60vh', display: 'grid', placeItems: 'center', padding: 'clamp(140px,16vw,200px) clamp(16px,4vw,44px) clamp(60px,10vw,140px)' }}>
      <div style={{ textAlign: 'center', maxWidth: '52ch' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>Club not found</div>
        <h1 style={{ marginTop: 16, fontWeight: 700, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff' }}>
          We don&rsquo;t have a club by that name yet.
        </h1>
        <p style={{ margin: '20px 0 0', fontSize: 16, lineHeight: 1.6, color: 'rgba(242,242,243,.7)' }}>
          Browse all 35+ ABS clubs across Maharashtra, or call <a href={PHONE_HREF} style={{ color: '#b8e600' }}>{PHONE}</a> and we&rsquo;ll point you to the nearest one.
        </p>
        <Link href="/locations" style={{ display: 'inline-block', marginTop: 28, background: '#b8e600', color: '#0d0e0d', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '16px 28px' }}>
          All locations →
        </Link>
      </div>
    </main>
  );
}
