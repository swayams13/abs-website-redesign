'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useReveal } from '@/lib/hooks';

const PROGRAMS = [
  { t: 'Personal Training', tag: '1:1 coaching', d: 'One coach, one plan, measured every fortnight.', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80', href: '/services/personal-training' },
  { t: 'Strength Training', tag: 'Free weights', d: 'Racks, platforms and progressive programming from beginner to competition lifter.', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80', href: '/services/strength' },
  { t: 'Group Classes', tag: 'Morning & evening', d: 'HIIT, spin, Zumba and functional circuits at every club.', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80', href: '/services/group-classes' },
  { t: '90-Day Challenge', tag: 'Coached block', d: 'One goal, 90 days. Body composition tracked, nutrition included.', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80', href: '/services/90-day' },
];

function ProgramCard({ p, index }: { p: (typeof PROGRAMS)[number]; index: number }) {
  const ref = useReveal<HTMLAnchorElement>(index);
  return (
    <Link
      ref={ref}
      href={p.href}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', aspectRatio: '3/4', minHeight: 380, borderRadius: 24, overflow: 'hidden', color: '#ffffff', background: '#1d1f20', transition: 'transform .45s ease-out, box-shadow .45s ease-out' }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image src={p.img} alt={p.t} fill style={{ objectFit: 'cover' }} sizes="(min-width: 1100px) 25vw, (min-width: 620px) 50vw, 100vw" />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg,rgba(13,14,13,0) 30%,rgba(13,14,13,.88) 100%)' }} />
      <span style={{ position: 'absolute', top: 18, left: 18, padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.22)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', fontSize: 12, fontWeight: 600 }}>
        {p.tag}
      </span>
      <div style={{ position: 'relative', padding: 24 }}>
        <h3 style={{ fontWeight: 700, fontSize: 24, letterSpacing: '-.02em', lineHeight: 1.15 }}>{p.t}</h3>
        <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(255,255,255,.8)' }}>{p.d}</p>
      </div>
    </Link>
  );
}

export default function Programs() {
  const headerRef = useReveal<HTMLDivElement>(0);
  return (
    <section id="programs" style={{ background: '#f2f2f3', color: '#1d1f20' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(72px,9vw,128px) clamp(16px,4vw,44px)' }}>
        <div ref={headerRef} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 'clamp(36px,4vw,56px)' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#566e00' }}>What we coach</div>
            <h2 style={{ marginTop: 14, fontWeight: 700, fontSize: 'clamp(34px,4.6vw,60px)', lineHeight: 1.04, letterSpacing: '-.03em', maxWidth: '16ch' }}>
              Programs built around one goal at a time
            </h2>
          </div>
          <Link href="/trainers-programs" style={{ fontSize: 15, fontWeight: 600, color: '#1d1f20', borderBottom: '1px solid rgba(29,31,32,.35)', paddingBottom: 3 }}>
            All programs →
          </Link>
        </div>
        <div className="programs-grid">
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={p.t} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
