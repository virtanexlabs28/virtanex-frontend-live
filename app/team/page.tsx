import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { TeamSection, ValuesSection, WhySection } from '@/components/sections/company-sections';

export const metadata: Metadata = {
  title: 'Team',
  description: "The Virtanex Labs team, our core values, and partnership opportunities.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader page="team" />
      <TeamSection />
      <ValuesSection />
      <WhySection />
    </>
  );
}
