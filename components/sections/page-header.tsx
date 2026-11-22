'use client';

import { useContent } from '@/components/ContentProvider';

type PageKey = 'services' | 'process' | 'work' | 'team' | 'faq' | 'contact';

/**
 * Banner for inner pages: each page has its own image, title, and description from data/site.json.
 * Like the home hero it is a dark photo banner in both themes (`dark` swaps the tokens inside it),
 * so the image stays clearly visible and the text stays readable in light mode too.
 */
export function PageHeader({ page }: { page: PageKey }) {
  const p = useContent().site.pages[page];
  return (
    <header className="dark relative isolate flex min-h-[52vh] items-end overflow-hidden bg-background px-5 pb-14 pt-36 sm:px-10 sm:pb-20 md:px-14">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${p.image}')` }}
        role="img"
        aria-label={p.imageAlt}
      />
      <div className="absolute inset-0 -z-10 bg-background/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-transparent to-background/90" />
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#e8b57d] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">{p.kicker}</p>
        <h1 className="max-w-4xl font-fraunces text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {p.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-lg">{p.description}</p>
      </div>
    </header>
  );
}
