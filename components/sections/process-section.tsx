'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, FileCheck2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { processContent as process } from '@/lib/content';
import { Section, SectionHeader } from './section';

export function ProcessSection() {
  const [active, setActive] = useState(process.phases[0].phase);

  return (
    <Section id="process">
      <SectionHeader {...process.intro} />

      <Tabs value={active} onValueChange={setActive} className="gap-4">
        <TabsList className="grid items-stretch h-auto group-data-[orientation=horizontal]/tabs:h-auto w-full grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-4 lg:grid-cols-7">
          {process.phases.map((p) => (
            <TabsTrigger
              key={p.phase}
              value={p.phase}
              className="h-auto flex-none flex-col items-start justify-start gap-1 rounded-xl border-border p-4 text-left text-foreground/60 hover:bg-foreground/5 data-[state=active]:border-accent data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:border-accent dark:data-[state=active]:bg-foreground/10 after:hidden"
            >
              <span className="font-mono text-xs text-accent">{p.phase}</span>
              <span className="whitespace-normal text-xs font-semibold leading-snug">{p.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {process.phases.map((p) => (
          <TabsContent key={p.phase} value={p.phase} className="animate-fade-in">
            <Card className="gap-0 rounded-2xl border-border bg-card p-6 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase text-accent">{p.phase} in focus</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {p.duration}
                </span>
              </div>
              <h3 className="mb-4 mt-2 font-fraunces text-2xl font-normal sm:text-3xl">{p.title}</h3>
              <p className="max-w-3xl text-base leading-relaxed text-foreground/80">{p.detail}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/40">Key activities</h4>
                  <ul className="space-y-2.5">
                    {p.activities.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 text-sm text-foreground/75">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/40">What you get</h4>
                  <ul className="space-y-2.5">
                    {p.outputs.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-sm text-foreground/75">
                        <FileCheck2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
