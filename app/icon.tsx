import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

const logoData = await readFile(join(process.cwd(), 'public/assets/abs-logo-white.png'), 'base64');
const logoSrc = `data:image/png;base64,${logoData}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0e0d' }}>
        <img src={logoSrc} width={48} height={18} alt="" />
      </div>
    ),
    { ...size }
  );
}
