'use client';

import { Card } from '@/components/ui/card';
import { useContent } from '@/components/ContentProvider';
import { Section } from './section';

export function AboutSection() {
  const { overview, stats, missionVision } = useContent().site;

  return (
    <Section id="studio">
      <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
        <div className="lg:max-w-xl">
          <p className="mb-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent">
            {overview.kicker.map((k, i) => (
              <span key={k} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">·</span>}
                {k}
              </span>
            ))}
          </p>
          <h2 className="font-fraunces text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {overview.title}
          </h2>
        </div>
        <div className="space-y-5 text-sm leading-relaxed text-foreground/70 sm:text-base lg:max-w-lg">
          {overview.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 pt-3 text-sm">
            {overview.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-wider text-foreground/40">{f.label}</dt>
                <dd className="mt-0.5 text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Key facts */}
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background p-6 sm:p-8">
            <p className="font-fraunces text-4xl font-normal text-accent sm:text-5xl">{s.value}</p>
            <p className="mt-2 text-sm font-medium text-foreground">{s.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Mission & vision */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {missionVision.map((m) => (
          <Card key={m.kicker} className="gap-0 rounded-2xl border-border bg-card p-8 transition-colors hover:border-accent/40">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{m.kicker}</span>
            <h3 className="mb-4 mt-3 font-fraunces text-2xl font-normal">{m.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/70">{m.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
