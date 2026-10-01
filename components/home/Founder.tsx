'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks';

const CREDS = ['First Indian certified by ACSM', 'Founder President, UHFF', 'Member, IHRSA', 'ACE Fitness Professional of the Year nominee, 2003'];

export default function Founder() {
  const photoRef = useReveal<HTMLDivElement>(0);
  const textRef = useReveal<HTMLDivElement>(1);

  return (
    <section id="founder" style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)', display: 'grid', gap: 'clamp(40px,6vw,96px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px),1fr))', alignItems: 'center' }}>
        <div ref={photoRef} style={{ position: 'relative', maxWidth: 520, width: '100%' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 28, overflow: 'hidden', background: '#e0e0e2' }}>
            <Image src="/assets/abhimanyu-sable.jpg" alt="Abhimanyu Sable — portrait" fill priority style={{ objectFit: 'cover', objectPosition: '50% 20%' }} sizes="(min-width: 900px) 40vw, 90vw" />
          </div>
          <div style={{ position: 'absolute', right: -12, bottom: 28, padding: '16px 20px', borderRadius: 18, background: '#ffffff', boxShadow: '0 24px 50px rgba(13,14,13,.14)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-.01em' }}>Abhimanyu Sable</div>
            <div style={{ marginTop: 3, fontSize: 13, color: 'rgba(29,31,32,.62)' }}>Founder, MD &amp; CEO</div>
          </div>
        </div>
        <div ref={textRef}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#566e00' }}>Since club one · Pune, 29 August 2005</div>
          <blockquote style={{ margin: '18px 0 0', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(44px,5.6vw,80px)', lineHeight: 1, letterSpacing: '-.01em', color: '#1d1f20' }}>
            &ldquo;It&apos;s not a gym. It&apos;s life.&rdquo;
          </blockquote>
          <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.65, maxWidth: '50ch', color: 'rgba(29,31,32,.74)' }}>
            Abhimanyu Sable has spent forty years in fitness and twenty building ABS. He opened the first club in Pune in 2005. Today there are 28 clubs across six cities, all run on one membership and one idea.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '0 28px', marginTop: 36, borderTop: '1px solid rgba(29,31,32,.14)' }}>
            {CREDS.map((c) => (
              <div key={c} style={{ padding: '16px 0', borderBottom: '1px solid rgba(29,31,32,.14)', fontSize: 14.5, fontWeight: 500, lineHeight: 1.45 }}>
                {c}
              </div>
            ))}
          </div>
          <Link href="/about#founder" style={{ display: 'inline-block', marginTop: 30, fontSize: 15, fontWeight: 600, color: '#1d1f20', borderBottom: '1px solid rgba(29,31,32,.35)', paddingBottom: 3 }}>
            Read the founder story →
          </Link>
        </div>
      </div>
    </section>
  );
}
