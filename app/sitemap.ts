import type { MetadataRoute } from 'next';
import { CLUBS, SERVICES } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

// Ready for the real launch — robots.ts disallows crawling of this preview in the meantime.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/locations', '/trainers-programs', '/timetable', '/events', '/contact', '/franchise', '/careers', '/exercises'];
  const now = new Date();
  return [
    ...staticRoutes.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now })),
    ...CLUBS.map((c) => ({ url: `${SITE_URL}/clubs/${c.slug}`, lastModified: now })),
    ...SERVICES.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now })),
  ];
}
