import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/i18n';
import { PageHeader } from '@/components/sections/page-header';
import { ProcessSection } from '@/components/sections/process-section';
import { EngagementSection, SecuritySection } from '@/components/sections/company-sections';
import { CommitmentSection } from '@/components/sections/commitment-section';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'process');
}

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
