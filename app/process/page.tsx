import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { ProcessSection } from '@/components/sections/process-section';
import { EngagementSection, SecuritySection } from '@/components/sections/company-sections';
import { CommitmentSection } from '@/components/sections/commitment-section';

export const metadata: Metadata = {
  title: 'Process',
  description: "Our seven-phase engineering lifecycle, flexible engagement models, and security and remote working practices.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader page="process" />
      <ProcessSection />
      <EngagementSection />
      <SecuritySection />
      <CommitmentSection />
    </>
  );
}
