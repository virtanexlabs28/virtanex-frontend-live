import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { ServicesSection } from '@/components/sections/services-section';
import { TechnologySection } from '@/components/sections/technology-section';
import { CommitmentSection } from '@/components/sections/commitment-section';

export const metadata: Metadata = {
  title: 'Services',
  description: "Custom software, AI, data engineering, integration, automation, cloud, product, design, QA, and IoT, delivered by one accountable team.",
};

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
