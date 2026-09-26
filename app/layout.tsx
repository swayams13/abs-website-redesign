import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import MobileActionBar from '@/components/layout/MobileActionBar';
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

export const metadata: Metadata = {
  title: 'ABS Fitness & Wellness Club',
  description: '35+ clubs across Maharashtra. One membership card opens every single club.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${cormorant.variable}`}>
      <body style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}>
        <Nav />
        <main id="top">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
