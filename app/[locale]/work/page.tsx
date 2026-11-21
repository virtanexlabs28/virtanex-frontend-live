import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/i18n';
import { PageHeader } from '@/components/sections/page-header';
import { WorkSection } from '@/components/sections/work-section';
import { IndustriesSection, InsightsSection } from '@/components/sections/company-sections';
import { CommitmentSection } from '@/components/sections/commitment-section';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'work');
}

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
