import type { MetadataRoute } from 'next';

// Preview build — keep it out of search results until the real site launches.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', disallow: '/' } };
}
