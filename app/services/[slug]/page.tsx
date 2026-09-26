import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES, serviceBySlug } from '@/lib/data';
import ServiceDetail from '@/components/services/ServiceDetail';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} — ABS Fitness & Wellness Club`,
    description: service.lede,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
