'use client';

import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useContent } from '@/components/ContentProvider';
import { Link } from '@/components/LocaleLink';
import { fmt } from '@/lib/format';
import { Section, SectionHeader } from './section';

/** Card for one solution blueprint. Opens its own page at /work/<id>. */
export function WorkCard({ id }: { id: string }) {
  const { work, ui } = useContent();
  const item = work.items.find((i) => i.id === id);
  if (!item) return null;

  return (
    <Link
      href={`/work/${item.id}`}
      aria-label={fmt(ui.work.viewBlueprint, { title: item.title })}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-2xl group-hover:shadow-black/30">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
          <div
            className="size-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('${item.image}')` }}
            role="img"
            aria-label={item.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
          <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-foreground/20 bg-background/70 text-foreground backdrop-blur-md transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">{item.category}</p>
            <h3 className="mb-3 font-fraunces text-2xl font-normal text-foreground transition-colors group-hover:text-accent">
              {item.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-foreground/65">{item.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            {item.tags.map((t) => (
              <Badge key={t} variant="outline" className="rounded-full border-border font-normal text-foreground/60">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function WorkSection() {
  const { work } = useContent();

  return (
    <Section id="work">
      <SectionHeader {...work.intro} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {work.items.map((item) => (
          <WorkCard key={item.id} id={item.id} />
        ))}
      </div>
    </Section>
  );
}
