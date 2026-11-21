import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/i18n';
import { PageHeader } from '@/components/sections/page-header';
import { ContactSection } from '@/components/ContactSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'contact');
}

export default function ContactPage() {
  return (
    <>
      <PageHeader page="contact" />
      <ContactSection />
    </>
  );
}
