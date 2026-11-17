'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBooking } from '@/components/BookingProvider';
import { getIcon } from '@/lib/icons';
import { services, servicesContent } from '@/lib/content';
import { Section, SectionHeader } from './section';

export function ServicesSection() {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(services[0].id);

  return (
    <Section id="services">
      <SectionHeader {...servicesContent.intro} />

      {/* Mobile / tablet selector */}
      <div className="mb-6 lg:hidden">
        <Select value={active} onValueChange={setActive}>
          <SelectTrigger className="h-12 w-full rounded-xl border-border bg-card text-sm" aria-label="Choose a service">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.number} · {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        value={active}
        onValueChange={setActive}
        orientation="vertical"
        className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
      >
        {/* Desktop list */}
        <TabsList className="hidden h-auto w-full flex-col items-stretch gap-2 bg-transparent p-0 lg:col-span-4 lg:flex">
          {services.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="h-auto flex-none rounded-xl border-border px-4 py-3.5 text-left text-sm text-foreground/70 hover:bg-foreground/5 data-[state=active]:border-accent data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:border-accent dark:data-[state=active]:bg-foreground/10 after:hidden"
              >
                <span className="flex w-full items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <Icon className="size-4 text-foreground/40 group-data-[state=active]/tabs-list:text-accent" aria-hidden="true" />
                    <span>{s.short}</span>
                  </span>
                  <span className="font-mono text-xs tabular-nums text-foreground/30">{s.number}</span>
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Detail panels */}
        <div className="lg:col-span-8">
          {services.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <TabsContent key={s.id} value={s.id} className="animate-fade-in">
                <Card className="gap-0 rounded-2xl border-border bg-card p-6 sm:p-9">
                  <div className="mb-6 flex items-start justify-between gap-4 border-b border-border pb-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-accent">Service {s.number}</p>
                      <h3 className="mt-1 font-fraunces text-2xl font-normal text-foreground sm:text-3xl">{s.title}</h3>
                    </div>
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/15 text-accent">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                  </div>

                  <p className="text-base leading-relaxed text-foreground/85">{s.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.overview}</p>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/40">What we do</h4>
                      <ul className="space-y-2.5">
                        {s.capabilities.map((c) => (
                          <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/75">
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/40">What you receive</h4>
                      <ul className="space-y-2.5">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-foreground/75">
                            <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground/40">Typical stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {s.technologies.map((t) => (
                        <Badge key={t} variant="outline" className="rounded-full border-border bg-foreground/5 px-3 py-1 text-xs font-normal text-foreground/80">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 rounded-xl border border-border bg-foreground/[0.03] p-5 text-sm sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Target className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-foreground/40">Ideal for</p>
                        <p className="mt-1 text-foreground/80">{s.idealFor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-foreground/40">Engagement</p>
                        <p className="mt-1 text-foreground/80">{s.engagement}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-muted-foreground">Want this capability on your project?</span>
                    <Button onClick={openBooking} className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-accent hover:text-accent-foreground">
                      Discuss this service
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </Section>
  );
}
