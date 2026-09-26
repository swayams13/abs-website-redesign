import type { Metadata } from 'next';
import LocationsContent from '@/components/locations/LocationsContent';

export const metadata: Metadata = {
  title: 'Find your nearest ABS Fitness Club — Locations',
  description: '35+ ABS Fitness clubs across Maharashtra. One membership, every location.',
};

export default function LocationsPage() {
  return <LocationsContent />;
}
