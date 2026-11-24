import type { Metadata } from 'next';
import { PrivacyContent } from '@/components/sections/privacy-content';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/i18n';
import { alternatesFor } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { privacy } = await getContent(locale as Locale);
  return {
    title: privacy.metaTitle,
    description: privacy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/privacy'),
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
