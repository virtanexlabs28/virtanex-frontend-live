import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/i18n';
import { PageHeader } from '@/components/sections/page-header';
import { ServicesSection } from '@/components/sections/services-section';
import { TechnologySection } from '@/components/sections/technology-section';
import { CommitmentSection } from '@/components/sections/commitment-section';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'services');
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader page="services" />
      <ServicesSection />
      <TechnologySection />
      <CommitmentSection />
    </>
  );
}
