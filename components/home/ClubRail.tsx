'use client';
import { useEffect, useRef } from 'react';
import { CLUBS } from '@/lib/data';

const rail = CLUBS.map((c) => ({ name: c.name, city: c.cityShort }));
const doubled = rail.concat(rail);

export default function ClubRail() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = trackRef.current;
    if (!t || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const anim = t.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 36000, iterations: Infinity, easing: 'linear' });
    return () => anim.cancel();
  }, []);

  return (
    <div style={{ background: '#f2f2f3', color: '#1d1f20', padding: '26px 0', borderBottom: '1px solid rgba(29,31,32,.1)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(16px,4vw,44px)', display: 'flex', alignItems: 'center', gap: 28 }}>
        <div className="rail-label" style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, color: 'rgba(29,31,32,.72)', maxWidth: '16ch', lineHeight: 1.4 }}>
          One card opens every club
        </div>
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)', maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
          <div ref={trackRef} style={{ display: 'flex', width: 'max-content' }}>
            {doubled.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '0 26px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.02em', color: '#1d1f20' }}>{r.name}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(29,31,32,.72)' }}>{r.city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
