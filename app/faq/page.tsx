import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { FaqSection } from '@/components/sections/faq-section';
import { CommitmentSection } from '@/components/sections/commitment-section';

export const metadata: Metadata = {
  title: 'FAQ',
  description: "Answers about how projects start, pricing, code ownership, time zones, security, and support.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader page="faq" />
      <FaqSection />
      <CommitmentSection />
    </>
  );
}
