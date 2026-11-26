import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/components/sections/blog-post';
import { getContent } from '@/lib/content';
import { locales, localeMeta, type Locale } from '@/lib/i18n';
import { alternatesFor } from '@/lib/metadata';

type Params = Promise<{ locale: string; slug: string }>;

// Only the articles defined in data/<language>/blog.json exist.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { blog } = await getContent('en');
  return locales.flatMap((locale) => blog.posts.map((post) => ({ locale, slug: post.id })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const { blog, site } = await getContent(locale as Locale);
  const post = blog.posts.find((p) => p.id === slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesFor(locale as Locale, `/blog/${slug}`),
    openGraph: {
      type: 'article',
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      locale: localeMeta[locale as Locale].ogLocale,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  return <BlogPost id={slug} />;
}
