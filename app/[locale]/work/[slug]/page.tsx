import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkDetail } from '@/components/sections/work-detail';
import { getContent } from '@/lib/content';
import { locales, type Locale } from '@/lib/i18n';
import { alternatesFor } from '@/lib/metadata';

type Params = Promise<{ locale: string; slug: string }>;

// Only the blueprints defined in data/<language>/work.json exist.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { work } = await getContent('en');
  return locales.flatMap((locale) => work.items.map((item) => ({ locale, slug: item.id })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const { work, site } = await getContent(locale as Locale);
  const item = work.items.find((i) => i.id === slug);
  if (!item) notFound();
  return {
    title: item.title,
    description: item.description,
    alternates: alternatesFor(locale as Locale, `/work/${slug}`),
    openGraph: { title: `${item.title} | ${site.name}`, description: item.description },
  };
}

export default async function WorkDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  return <WorkDetail id={slug} />;
}
