import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/i18n';
import { PageHeader } from '@/components/sections/page-header';
import { TeamSection, ValuesSection, WhySection } from '@/components/sections/company-sections';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'team');
}

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
