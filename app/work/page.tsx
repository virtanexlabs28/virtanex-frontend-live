import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { WorkSection } from '@/components/sections/work-section';
import { IndustriesSection, InsightsSection } from '@/components/sections/company-sections';
import { CommitmentSection } from '@/components/sections/commitment-section';

export const metadata: Metadata = {
  title: 'Work',
  description: "Solution blueprints, the industries we serve, and the technical areas we invest in.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader page="work" />
      <WorkSection />
      <IndustriesSection />
      <InsightsSection />
      <CommitmentSection />
    </>
  );
}
