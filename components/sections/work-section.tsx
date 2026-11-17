'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useBooking } from '@/components/BookingProvider';
import { work, type WorkItem } from '@/lib/content';
import { Section, SectionHeader } from './section';

export function WorkSection() {
  const { openBooking } = useBooking();
  const [active, setActive] = useState<WorkItem | null>(null);

  return (
    <Section id="work">
      <SectionHeader {...work.intro} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {work.items.map((item) => (
          <Card
            key={item.id}
            className="group cursor-pointer gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-black/60"
          >
            <button
              type="button"
              onClick={() => setActive(item)}
              className="flex h-full flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View blueprint: ${item.title}`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                <div
                  className="size-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.image}')` }}
                  role="img"
                  aria-label={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
                <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-foreground/20 bg-background/70 text-foreground backdrop-blur-md transition-colors group-hover:border-accent group-hover:bg-accent">
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
            </button>
          </Card>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[90vh] gap-6 overflow-y-auto rounded-2xl border-border bg-background p-0 sm:max-w-3xl">
          {active && (
            <>
              <div
                className="aspect-[21/9] w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${active.image}')` }}
                role="img"
                aria-label={active.title}
              />
              <div className="space-y-8 px-6 pb-8 sm:px-8">
                <DialogHeader className="text-left">
                  <p className="text-xs uppercase tracking-wider text-accent">{active.category}</p>
                  <DialogTitle className="font-fraunces text-2xl font-normal sm:text-3xl">{active.title}</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed text-foreground/80">
                    {active.overview}
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-foreground/40">The challenge</h4>
                  <p className="text-sm leading-relaxed text-foreground/80">{active.challenge}</p>
                </div>

                <div>
                  <h4 className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground/40">Our approach</h4>
                  <ul className="space-y-2">
                    {active.approach.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground/40">Intended outcomes</h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {active.outcomes.map((o) => (
                      <div key={o} className="rounded-xl border border-border bg-foreground/5 p-4 text-sm font-medium">
                        {o}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-muted-foreground">Need something similar?</span>
                  <Button
                    onClick={() => {
                      setActive(null);
                      openBooking();
                    }}
                    className="rounded-full hover:bg-accent hover:text-accent-foreground"
                  >
                    Start a project
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
