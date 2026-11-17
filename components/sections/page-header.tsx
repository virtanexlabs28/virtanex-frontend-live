import { site } from '@/lib/content';

type PageKey = keyof typeof site.pages;

/** Banner for inner pages: each page has its own image, title, and description from data/site.json. */
export function PageHeader({ page }: { page: PageKey }) {
  const p = site.pages[page];
  return (
    <header className="relative isolate flex min-h-[52vh] items-end overflow-hidden bg-background px-5 pb-14 pt-36 sm:px-10 sm:pb-20 md:px-14">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${p.image}')` }}
        role="img"
        aria-label={p.imageAlt}
      />
      <div className="absolute inset-0 -z-10 bg-background/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-accent">{p.kicker}</p>
        <h1 className="max-w-4xl font-fraunces text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {p.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">{p.description}</p>
      </div>
    </header>
  );
}
