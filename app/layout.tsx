import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import MobileActionBar from '@/components/layout/MobileActionBar';
import PreviewBanner from '@/components/layout/PreviewBanner';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  style: ['italic'],
  weight: ['500', '600'],
});

const TITLE = 'ABS Fitness & Wellness Club — concept redesign';
const DESCRIPTION = '28 clubs across Maharashtra. One membership card, a whole network. A concept redesign preview — not the live ABS Fitness site.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${cormorant.variable}`}>
      <body style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}>
        <PreviewBanner />
        <Nav />
        <main id="top">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
