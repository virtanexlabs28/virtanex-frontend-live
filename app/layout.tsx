import type {Metadata} from 'next';
import './globals.css';
import { site } from '@/lib/content';
import { BookingProvider } from '@/components/BookingProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const title = `${site.name} — ${site.tagline.replace(/\.$/, '')}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.contact.website),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: title,
    description: site.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: site.description,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter+Tight:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#0C0A09] text-[#E8E0D0] tracking-[-0.015em] antialiased selection:bg-[#B87333]/30 selection:text-[#E8E0D0]">
        <BookingProvider>
          <Navbar />
          <main className="min-h-screen" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            {children}
          </main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
