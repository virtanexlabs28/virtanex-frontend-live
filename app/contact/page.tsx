import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { ContactSection } from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Book a discovery call or send Virtanex Labs a project brief. We reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader page="contact" />
      <ContactSection />
    </>
  );
}
