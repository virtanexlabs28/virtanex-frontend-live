import 'server-only';
import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { locales, localeMeta, type Locale } from '@/lib/i18n';

/** hreflang alternates so search engines serve each language to the right audience. */
export function alternatesFor(locale: Locale, path = ''): NonNullable<Metadata['alternates']> {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      'x-default': `/en${path}`,
    },
  };
}

type PageKey = keyof Awaited<ReturnType<typeof getContent>>['site']['pages'];

/** Localized title, description and alternates for one inner page. */
export async function pageMetadata(locale: Locale, page: PageKey): Promise<Metadata> {
  const { site } = await getContent(locale);
  const p = site.pages[page];
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: alternatesFor(locale, p.href),
    openGraph: { title: `${p.metaTitle} | ${site.name}`, description: p.metaDescription, locale: localeMeta[locale].ogLocale },
  };
}
