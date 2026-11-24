import type { Metadata } from 'next';
import { Fraunces, Inter_Tight } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getContent } from '@/lib/content';
import { isLocale, localeMeta, locales } from '@/lib/i18n';
import { alternatesFor } from '@/lib/metadata';
import { ContentProvider } from '@/components/ContentProvider';
import { BookingProvider } from '@/components/BookingProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Self-hosted: next/font downloads the fonts at build time and serves them from this site,
// so visitors' browsers never contact Google (no IP address is sent to Google Fonts).
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-fraunces',
});
const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter-tight',
});

type Params = Promise<{ locale: string }>;

const THEME_SCRIPT = `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

// Only the languages in lib/i18n.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { site } = await getContent(locale);
  const title = `${site.name} — ${site.tagline.replace(/\.$/, '')}`;

  return {
    metadataBase: new URL(site.contact.website),
    title: { default: title, template: `%s | ${site.name}` },
    description: site.description,
    alternates: alternatesFor(locale),
    openGraph: {
      title,
      description: site.description,
      type: 'website',
      siteName: site.name,
      locale: localeMeta[locale].ogLocale,
    },
    twitter: { card: 'summary_large_image', title, description: site.description },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getContent(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={`${fraunces.variable} ${interTight.variable}`}>
      <head>
        {/* Applies a saved dark-mode choice before first paint (light is the default). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body suppressHydrationWarning className="bg-background text-foreground tracking-[-0.015em] antialiased selection:bg-accent/30 selection:text-foreground">
        <ContentProvider locale={locale} content={content}>
          <BookingProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </BookingProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
