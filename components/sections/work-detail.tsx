'use client';

import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/components/BookingProvider';
import { useContent } from '@/components/ContentProvider';
import { Link } from '@/components/LocaleLink';
import { Section, SectionHeader } from './section';
import { WorkCard } from './work-section';

/** Full page for one solution blueprint (/work/<id>). */
export function WorkDetail({ id }: { id: string }) {
  const { work, ui } = useContent();
  const { openBooking } = useBooking();
  const t = ui.work;
  const item = work.items.find((i) => i.id === id);
  if (!item) notFound();
  const others = work.items.filter((i) => i.id !== item.id);

  return (
    <>
      {/* Dark photo banner in both themes, like the other page banners */}
      <header className="dark relative isolate flex min-h-[52vh] items-end overflow-hidden bg-background px-5 pb-14 pt-36 sm:px-10 sm:pb-20 md:px-14">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${item.image}')` }}
          role="img"
          aria-label={item.title}
        />
        <div className="absolute inset-0 -z-10 bg-background/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-transparent to-background/90" />
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href="/work"
            className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-[#e8b57d] focus-visible:outline-2 focus-visible:outline-accent"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.back}
          </Link>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#e8b57d] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            {item.category}
          </p>
          <h1 className="max-w-4xl font-fraunces text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-lg">
            {item.description}
          </p>
        </div>
      </header>

      <Section id="blueprint" divider={false}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <p className="text-lg leading-relaxed text-foreground/85">{item.overview}</p>

            <div>
              <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground/40">{t.challenge}</h2>
              <p className="text-base leading-relaxed text-foreground/80">{item.challenge}</p>
            </div>

            <div>
              <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/40">{t.approach}</h2>
              <ul className="space-y-3">
                {item.approach.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-base text-foreground/80">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/40">{t.outcomes}</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {item.outcomes.map((o) => (
                  <div key={o} className="rounded-xl border border-border bg-card p-4 text-sm font-medium">
                    {o}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/40">{t.tags}</h2>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full border-border font-normal text-foreground/70">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-6 border-t border-border pt-6">
                <p className="mb-4 text-sm text-muted-foreground">{t.similar}</p>
                <Button onClick={openBooking} className="w-full rounded-full hover:bg-accent hover:text-accent-foreground">
                  {ui.common.startProject}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="more-blueprints">
        <SectionHeader kicker={work.intro.kicker} title={t.more} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {others.map((o) => (
            <WorkCard key={o.id} id={o.id} />
          ))}
        </div>
      </Section>
    </>
  );
}
