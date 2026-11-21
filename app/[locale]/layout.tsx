import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getContent } from '@/lib/content';
import { isLocale, localeMeta, locales } from '@/lib/i18n';
import { alternatesFor } from '@/lib/metadata';
import { ContentProvider } from '@/components/ContentProvider';
import { BookingProvider } from '@/components/BookingProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Applies a saved dark-mode choice before first paint (light is the default). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter+Tight:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-background text-foreground tracking-[-0.015em] antialiased selection:bg-accent/30 selection:text-foreground">
        <ContentProvider locale={locale} content={content}>
          <BookingProvider>
            <Navbar />
            <main className="min-h-screen" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {children}
            </main>
            <Footer />
          </BookingProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
