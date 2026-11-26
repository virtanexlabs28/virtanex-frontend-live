import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { BlogList } from '@/components/sections/blog-section';
import { CommitmentSection } from '@/components/sections/commitment-section';
import type { Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, 'blog');
}

export default function BlogPage() {
  return (
    <>
      <PageHeader page="blog" />
      <BlogList />
      <CommitmentSection />
    </>
  );
}
