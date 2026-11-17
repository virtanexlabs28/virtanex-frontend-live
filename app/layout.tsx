import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Virtanex Labs — Engineering Intelligent Digital Solutions',
  description: 'Virtanex Labs is a Finland-based remote technology company focused on building intelligent software, AI-powered solutions, and scalable digital products.',
  openGraph: {
    title: 'Virtanex Labs — Engineering Intelligent Digital Solutions',
    description: 'Virtanex Labs is a Finland-based remote technology company focused on building intelligent software, AI-powered solutions, and scalable digital products.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtanex Labs — Engineering Intelligent Digital Solutions',
    description: 'Virtanex Labs is a Finland-based remote technology company focused on building intelligent software, AI-powered solutions, and scalable digital products.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter+Tight:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#0C0A09] text-[#E8E0D0] antialiased selection:bg-[#B87333]/30 selection:text-[#E8E0D0]">
        {children}
      </body>
    </html>
  );
}
