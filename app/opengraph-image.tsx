import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'ABS Fitness & Wellness Club — concept redesign';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const logoData = await readFile(join(process.cwd(), 'public/assets/abs-logo-white.png'), 'base64');
const logoSrc = `data:image/png;base64,${logoData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          background: '#0d0e0d',
        }}
      >
        <img src={logoSrc} width={360} height={135} alt="" />
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 600, color: '#b8e600', letterSpacing: '-0.01em' }}>
          28 clubs · 6 cities
        </div>
      </div>
    ),
    { ...size }
  );
}
