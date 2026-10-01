'use client';
import { useEffect, useState } from 'react';

export default function PreviewBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Reading session state on mount, not reacting to a dep change — see TECH-STACK.md "Hydration".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sessionStorage.getItem('abs-preview-banner-dismissed') === '1') setDismissed(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--banner-h', dismissed ? '0px' : '40px');
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90, height: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        padding: '0 48px', background: '#b8e600', color: '#0d0e0d',
        fontSize: 13, fontWeight: 600, textAlign: 'center', lineHeight: 1.3,
      }}
    >
      <span>Concept redesign for ABS Fitness by Swayam Singh — some content is sample data.</span>
      <button
        type="button"
        aria-label="Dismiss this banner"
        onClick={() => { sessionStorage.setItem('abs-preview-banner-dismissed', '1'); setDismissed(true); }}
        style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          width: 28, height: 28, display: 'grid', placeItems: 'center',
          background: 'none', border: 'none', color: '#0d0e0d', fontSize: 16, cursor: 'pointer',
        }}
      >
        ✕
      </button>
    </div>
  );
}
