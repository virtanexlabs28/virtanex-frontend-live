import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/i18n';
import { PageHeader } from '@/components/sections/page-header';
import { FaqSection } from '@/components/sections/faq-section';
import { CommitmentSection } from '@/components/sections/commitment-section';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'faq');
}

export default function FaqPage() {
  return (
    <>
      <PageHeader page="faq" />
      <FaqSection />
      <CommitmentSection />
    </>
  );
}
