import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CLUBS, PHONE, clubBySlug, clubDetails, clubsInCity } from '@/lib/data';
import { schemaHours } from '@/lib/time';
import { SITE_URL } from '@/lib/site';
import ClubDetail from '@/components/clubs/ClubDetail';

export function generateStaticParams() {
  return CLUBS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const club = clubBySlug(slug);
  if (!club) return {};
  return {
    title: `ABS Fitness ${club.name} — ${club.city}`,
    description: `${club.addr}, ${club.city}. Hours, amenities, trainers and a free club tour at ABS ${club.name}.`,
  };
}

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = clubBySlug(slug);
  if (!club) notFound();

  const details = clubDetails(club);
  const nearby = clubsInCity(club.city).filter((c) => c.slug !== club.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: `ABS Fitness ${club.name}`,
    address: { '@type': 'PostalAddress', streetAddress: club.addr, addressLocality: club.city, addressRegion: 'Maharashtra', addressCountry: 'IN' },
    telephone: PHONE,
    url: `${SITE_URL}/clubs/${club.slug}`,
    ...(club.verified ? { openingHours: schemaHours(club.hours) } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ClubDetail club={club} details={details} nearby={nearby} />
    </>
  );
}
