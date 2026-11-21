'use client';

import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useContent } from '@/components/ContentProvider';
import { getIcon } from '@/lib/icons';
import { Section, SectionHeader } from './section';

export function IndustriesSection() {
  const { company } = useContent();
  const { industries } = company;
  return (
    <Section id="industries">
      <SectionHeader kicker={industries.kicker} title={industries.title} description={industries.description} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {industries.items.map((ind) => {
          const Icon = getIcon(ind.icon);
          return (
            <Card key={ind.name} className="gap-0 rounded-xl border-border bg-card p-6 transition-colors hover:border-accent/40">
              <div className="mb-4 flex size-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-fraunces text-xl font-normal">{ind.name}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground/65">{ind.desc}</p>
              <div className="flex flex-wrap gap-2">
                {ind.focus.map((f) => (
                  <Badge key={f} variant="outline" className="rounded-full border-border font-normal text-foreground/60">
                    {f}
                  </Badge>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export function EngagementSection() {
  const { company, ui } = useContent();
  const { engagement } = company;
  return (
    <Section id="engagement">
      <SectionHeader kicker={engagement.kicker} title={engagement.title} description={engagement.description} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {engagement.items.map((m, i) => (
          <Card key={m.title} className="gap-0 rounded-2xl border-border bg-card p-8 transition-colors hover:border-accent/40">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
              <Badge variant="outline" className="rounded-full border-border font-mono text-xs font-normal text-foreground/60">
                {m.badge}
              </Badge>
            </div>
            <h3 className="mb-3 font-fraunces text-2xl font-normal">{m.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-foreground/75">{m.desc}</p>
            <ul className="mb-6 grid gap-2 sm:grid-cols-2">
              {m.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-2 text-sm text-foreground/70">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {inc}
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-border pt-4 text-xs leading-relaxed text-foreground/50">
              <span className="font-medium text-foreground/70">{ui.common.bestFor} </span>
              {m.bestFor}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function SecuritySection() {
  const { company } = useContent();
  const { security } = company;
  return (
    <Section id="security">
      <SectionHeader kicker={security.kicker} title={security.title} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {security.items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <Card key={item.title} className="gap-0 rounded-2xl border-border bg-card p-8">
              <div className="mb-4 flex items-center gap-3">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <h3 className="font-fraunces text-2xl font-normal">{item.title}</h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-foreground/70">{item.body}</p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {item.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/65">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export function TeamSection() {
  const { company } = useContent();
  const { team } = company;
  return (
    <Section id="team">
      <SectionHeader kicker={team.kicker} title={team.title} description={team.description} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {team.groups.map((g) => {
          const Icon = getIcon(g.icon);
          return (
            <Card
              key={g.title}
              className={`gap-0 rounded-2xl p-7 ${g.featured ? 'border-accent/30 bg-foreground/[0.03]' : 'border-border bg-card'}`}
            >
              <div className="mb-3 flex items-center gap-3">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <h3 className="font-fraunces text-xl font-normal">{g.title}</h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-foreground/60">{g.desc}</p>
              <ul className={`grid gap-2 ${g.featured ? 'sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2' : ''}`}>
                {g.roles.map((r) => (
                  <li key={r} className="rounded-lg border border-border bg-foreground/5 px-3 py-2.5 text-sm font-medium text-foreground/90">
                    {r}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export function WhySection() {
  const { company } = useContent();
  const { why, partnerships } = company;
  return (
    <Section id="why">
      <SectionHeader kicker={why.kicker} title={why.title} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {why.items.map((w) => (
          <Card key={w.title} className="gap-2 rounded-xl border-border bg-card p-6 transition-colors hover:bg-foreground/[0.04]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
              <h3 className="font-fraunces text-lg font-normal">{w.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-foreground/65">{w.desc}</p>
          </Card>
        ))}
      </div>

      <div className="mt-24">
        <SectionHeader kicker={partnerships.kicker} title={partnerships.title} description={partnerships.description} className="mb-10 md:mb-10" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partnerships.items.map((p) => (
            <Card key={p.title} className="gap-2 rounded-xl border-border bg-card p-6 transition-colors hover:border-accent/40">
              <h3 className="font-fraunces text-lg font-normal">{p.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/65">{p.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function InsightsSection() {
  const { insights } = useContent();
  return (
    <Section id="insights">
      <SectionHeader {...insights.intro} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {insights.items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <Card key={item.title} className="gap-3 rounded-xl border-border bg-card p-6 transition-colors hover:border-accent/40">
              <Icon className="size-5 text-accent" aria-hidden="true" />
              <h3 className="font-fraunces text-xl font-normal">{item.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/65">{item.desc}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export function ValuesSection() {
  const { company } = useContent();
  const { values } = company;
  return (
    <Section id="values">
      <SectionHeader kicker={values.kicker} title={values.title} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {values.items.map((v, i) => (
          <Card key={v.title} className="gap-2 rounded-xl border-border bg-card p-6 transition-colors hover:bg-foreground/[0.04]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-fraunces text-lg font-normal">{v.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-foreground/65">{v.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
