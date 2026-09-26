'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CLUBS, CITIES, ZONES, PHONE, PHONE_HREF, type Club } from '@/lib/data';
import { status } from '@/lib/time';
import { useReveal } from '@/lib/hooks';

const ALL_CITIES = ['All cities', ...CITIES];
const ALL_ZONES = ['All Pune', ...ZONES];
const cityLabel = (c: string) => (c === 'Chhatrapati Sambhaji Nagar' ? 'Ch. Sambhaji Nagar' : c);

type ClubWithStatus = Club & { open: boolean; dot: string; statusLabel: string };

function chipStyle(active: boolean, small = false): React.CSSProperties {
  return {
    fontFamily: 'inherit',
    fontSize: small ? 12 : 12.5,
    fontWeight: 700,
    padding: small ? '9px 15px' : '11px 18px',
    borderRadius: 999,
    cursor: 'pointer',
    border: `1px solid ${active ? '#b8e600' : 'rgba(255,255,255,.22)'}`,
    background: active ? '#b8e600' : 'transparent',
    color: active ? '#0d0e0d' : '#f2f2f3',
    transition: 'background .2s, color .2s, border-color .2s',
    whiteSpace: 'nowrap',
  };
}

function ClubCard({ c, index }: { c: ClubWithStatus; index: number }) {
  const ref = useReveal<HTMLAnchorElement>(index);
  return (
    <Link
      ref={ref}
      href={`/clubs/${c.slug}`}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 220, padding: 'clamp(20px,2.2vw,26px)', borderRadius: 22, border: '1px solid rgba(255,255,255,.16)', color: '#f2f2f3', transition: 'border-color .3s, transform .4s cubic-bezier(.22,1,.36,1)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: '#b8e600' }}>{cityLabel(c.city)}</span>
        {c.tag && <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(242,242,243,.5)' }}>{c.tag}</span>}
      </div>
      <h3 style={{ margin: '14px 0 0', fontWeight: 700, fontSize: 22, letterSpacing: '-.02em', lineHeight: 1.1, color: '#ffffff' }}>{c.name}</h3>
      <p style={{ margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.5, color: 'rgba(242,242,243,.62)' }}>{c.addr}</p>
      <div style={{ marginTop: 'auto', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'rgba(242,242,243,.62)' }}>
          <i style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0, display: 'inline-block' }} />
          {c.statusLabel}
        </span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: '#b8e600', whiteSpace: 'nowrap' }}>View club →</span>
      </div>
    </Link>
  );
}

const CITY_LABEL_POS: [string, number, number, number][] = [
  ['Pune', 20, 40, 60],
  ['Mumbai', 76, 26, 38],
  ['Nashik', 63, 6, 30],
  ['Kolhapur', 56, 92, 30],
];

function SchematicMap({ pins }: { pins: ClubWithStatus[] }) {
  return (
    <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,.16)', borderRadius: 22, background: '#151716', backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '44px 44px', aspectRatio: '16/9', minHeight: 360, marginBottom: 'clamp(22px,3vw,34px)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 18, left: 20, fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(242,242,243,.45)', zIndex: 3 }}>
        Schematic club map — not to scale
      </div>
      {CITY_LABEL_POS.map(([name, x, y, size]) => (
        <div key={name} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, fontWeight: 700, fontSize: size, textTransform: 'uppercase', color: 'rgba(242,242,243,.07)', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
          {name}
        </div>
      ))}
      <div style={{ position: 'absolute', inset: '16% 10% 10% 9%' }}>
        {pins.map((p) => (
          <Link key={p.slug} href={`/clubs/${p.slug}`} style={{ position: 'absolute', left: `${p.mx}%`, top: `${p.my}%`, transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 6, zIndex: 2 }}>
            <span style={{ width: 10, height: 10, background: '#b8e600', border: '1.5px solid #0d0e0d', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color: '#f2f2f3', background: 'rgba(13,14,13,.9)', padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function LocationsContent() {
  const [city, setCity] = useState('All cities');
  const [zone, setZone] = useState('All Pune');
  const [query, setQuery] = useState('');
  const [openOnly, setOpenOnly] = useState(false);
  const [mapOn, setMapOn] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCity = params.get('city');
    const urlQuery = params.get('q');
    // Sync initial filters from the URL — client-only, matches the design reference's pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlCity && CITIES.includes(urlCity)) setCity(urlCity);
    if (urlQuery) setQuery(urlQuery);
  }, []);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const syncUrl = (nextCity: string, nextQuery: string) => {
    const url = new URL(window.location.href);
    if (nextCity !== 'All cities') url.searchParams.set('city', nextCity);
    else url.searchParams.delete('city');
    if (nextQuery.trim()) url.searchParams.set('q', nextQuery.trim());
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url.toString());
  };

  const withStatus: ClubWithStatus[] = CLUBS.map((c) => {
    const st = now ? status(c.hours, now) : { open: false, dot: 'rgba(242,242,243,.45)', label: ' ' };
    return { ...c, open: st.open, dot: st.dot, statusLabel: st.label };
  });

  const needle = query.trim().toLowerCase();
  const visible = withStatus.filter(
    (c) =>
      (city === 'All cities' || c.city === city) &&
      (city !== 'Pune' || zone === 'All Pune' || c.zone === zone) &&
      (!openOnly || c.open) &&
      (!needle || (c.name + ' ' + c.city + ' ' + c.addr).toLowerCase().includes(needle))
  );

  const bits: string[] = [];
  if (city !== 'All cities') bits.push(cityLabel(city));
  if (city === 'Pune' && zone !== 'All Pune') bits.push(zone + ' Pune');
  if (openOnly) bits.push('open now');
  if (needle) bits.push(`"${query.trim()}"`);
  const filtered = bits.length > 0;
  const openCount = withStatus.filter((c) => c.open).length;

  const clear = () => {
    setCity('All cities');
    setZone('All Pune');
    setQuery('');
    setOpenOnly(false);
    syncUrl('All cities', '');
  };

  const headerRef = useReveal<HTMLDivElement>(0);

  return (
    <>
      <section style={{ background: '#0d0e0d', color: '#f2f2f3', borderBottom: '1px solid rgba(255,255,255,.14)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '140px clamp(16px,4vw,44px) clamp(56px,7vw,92px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <span style={{ width: 28, height: 2, background: '#b8e600' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>
              {CLUBS.length} clubs · {CITIES.length} cities{now ? ` · ${openCount} open right now` : ''}
            </span>
          </div>
          <div style={{ display: 'grid', gap: 'clamp(28px,4vw,64px)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', alignItems: 'end' }}>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(38px,5.4vw,76px)', lineHeight: 1, letterSpacing: '-.035em', color: '#ffffff', maxWidth: '14ch' }}>
              Find your nearest
              <br />
              <span style={{ color: '#b8e600' }}>ABS</span> Fitness Club
            </h1>
            <div style={{ borderLeft: '2px solid #b8e600', padding: '4px 0 4px 22px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#b8e600' }}>One membership, every location</div>
              <p style={{ margin: '12px 0 0', fontSize: 15.5, lineHeight: 1.6, maxWidth: '46ch', color: 'rgba(242,242,243,.75)' }}>
                The ABS Passport Program means the club you pick below is not the only one you get. Train at any of the 35+ clubs on the same card.
              </p>
              <Link href="/#passport" style={{ display: 'inline-block', marginTop: 14, fontSize: 13, fontWeight: 700, color: '#f2f2f3', borderBottom: '2px solid #b8e600', paddingBottom: 4 }}>
                How the Passport works →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'sticky', top: 88, zIndex: 40, background: 'rgba(13,14,13,.94)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,.14)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '16px clamp(16px,4vw,44px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ALL_CITIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCity(c);
                    setZone('All Pune');
                    syncUrl(c, query);
                  }}
                  style={chipStyle(city === c)}
                >
                  {cityLabel(c)}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, minWidth: 250, justifyContent: 'flex-end' }}>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  syncUrl(city, e.target.value);
                }}
                placeholder="Search area, e.g. Kharadi"
                aria-label="Search clubs"
                style={{ flex: 1, maxWidth: 280, background: 'transparent', border: '1px solid rgba(255,255,255,.24)', borderRadius: 14, color: '#f2f2f3', fontFamily: 'inherit', fontSize: 14, padding: '12px 16px', outline: 0, transition: 'border-color .2s' }}
              />
              <button type="button" onClick={() => setOpenOnly((o) => !o)} style={{ ...chipStyle(openOnly), display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <i style={{ width: 7, height: 7, borderRadius: '50%', background: openOnly ? '#0d0e0d' : '#b8e600', display: 'inline-block' }} />
                Open now
              </button>
              <button type="button" onClick={() => setMapOn((m) => !m)} style={chipStyle(mapOn)}>
                {mapOn ? '✕ Close map' : 'Map view'}
              </button>
            </div>
          </div>

          {city === 'Pune' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px dashed rgba(255,255,255,.2)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(242,242,243,.5)', alignSelf: 'center', marginRight: 4 }}>
                Pune area
              </span>
              {ALL_ZONES.map((z) => (
                <button key={z} type="button" onClick={() => setZone(z)} style={chipStyle(zone === z, true)}>
                  {z}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: '#0d0e0d' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(28px,4vw,48px) clamp(16px,4vw,44px) clamp(56px,8vw,104px)' }}>
          <div ref={headerRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'clamp(22px,3vw,34px)' }}>
            <div style={{ fontWeight: 700, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.03em', color: '#ffffff' }}>
              {visible.length} {visible.length === 1 ? 'club' : 'clubs'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', alignItems: 'center', fontSize: 13, color: 'rgba(242,242,243,.6)' }}>
              <span>{filtered ? `Filtered by ${bits.join(' · ')}` : 'Showing every ABS club across Maharashtra'}</span>
              {filtered && (
                <button type="button" onClick={clear} style={{ fontFamily: 'inherit', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', background: 'transparent', border: 0, borderBottom: '1px solid #b8e600', color: '#b8e600', cursor: 'pointer', padding: 0 }}>
                  Clear
                </button>
              )}
            </div>
          </div>

          {mapOn && <SchematicMap pins={visible} />}

          {visible.length > 0 ? (
            <div style={{ display: 'grid', gap: 'clamp(14px,1.8vw,24px)', gridTemplateColumns: 'repeat(auto-fill, minmax(268px,1fr))' }}>
              {visible.map((c, i) => (
                <ClubCard key={c.slug} c={c} index={i} />
              ))}
            </div>
          ) : (
            <div style={{ border: '1px solid rgba(255,255,255,.18)', borderRadius: 22, padding: 'clamp(28px,4vw,60px) 24px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 26, letterSpacing: '-.02em', color: '#ffffff' }}>No club matches that search</div>
              <p style={{ margin: '12px 0 0', fontSize: 15, color: 'rgba(242,242,243,.65)' }}>
                Try an area name like Kharadi, Baner or Camp — or call <a href={PHONE_HREF} style={{ color: '#b8e600' }}>{PHONE}</a> and we will find your closest club.
              </p>
            </div>
          )}
        </div>
      </section>

      <section style={{ background: '#b8e600', color: '#0d0e0d' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(48px,6vw,86px) clamp(16px,4vw,44px)', display: 'flex', flexWrap: 'wrap', gap: 26, alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px,3.6vw,48px)', lineHeight: 1.02, letterSpacing: '-.03em', maxWidth: '20ch' }}>
              Not sure which club fits your routine?
            </h2>
            <p style={{ margin: '14px 0 0', fontSize: 15.5, color: 'rgba(13,14,13,.75)', maxWidth: '52ch' }}>
              Tell us where you live and work. With the Passport you may end up using two.
            </p>
          </div>
          <Link href="/#join" style={{ background: '#0d0e0d', color: '#b8e600', fontSize: 14, fontWeight: 700, borderRadius: 999, padding: '18px 30px', flexShrink: 0 }}>
            Book a Free Club Tour →
          </Link>
        </div>
      </section>
    </>
  );
}
