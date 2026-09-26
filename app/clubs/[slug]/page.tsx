import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CLUBS, clubBySlug, clubDetails, clubsInCity } from '@/lib/data';
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

  return <ClubDetail club={club} details={details} nearby={nearby} />;
}
