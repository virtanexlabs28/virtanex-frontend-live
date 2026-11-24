'use client';

import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useContent } from '@/components/ContentProvider';
import { Link } from '@/components/LocaleLink';
import { getIcon } from '@/lib/icons';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeader } from './section';

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

/** All ten services as icon cards, each with a one-line summary. */
export function ServicesOverview() {
  const { home, services } = useContent();
  const c = home.services;
  return (
    <Section id="services-overview">
      <Reveal>
        <SectionHeader kicker={c.kicker} title={c.title} description={c.description} />
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((s, i) => {
          const Icon = getIcon(s.icon);
          return (
            <Reveal key={s.id} delay={(i % 5) * 60}>
              <Link
                href="/services"
                className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full gap-3 rounded-xl border-border bg-card p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:bg-foreground/[0.04]">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-foreground/30">{s.number}</span>
                  </div>
                  <h3 className="font-fraunces text-lg font-normal leading-snug">{s.short}</h3>
                  <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{s.summary}</p>
                </Card>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-10">
        <TextLink href="/services">{c.cta}</TextLink>
      </div>
    </Section>
  );
}

/** The seven-phase lifecycle as a compact timeline. */
export function ProcessPreview() {
  const { home, processContent } = useContent();
  const c = home.process;
  const phases = processContent.phases;
  return (
    <Section id="process-preview">
      <Reveal>
        <SectionHeader kicker={c.kicker} title={c.title} description={c.description} />
      </Reveal>
      <ol className="relative grid gap-6 lg:grid-cols-7 lg:gap-4">
        {/* Connector line on desktop */}
        <span className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" aria-hidden="true" />
        {phases.map((p, i) => (
          <Reveal key={p.phase} delay={i * 70}>
            <li className="relative flex gap-4 lg:flex-col lg:gap-5">
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background font-mono text-sm text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-fraunces text-lg font-normal leading-snug">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.duration}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="mt-12">
        <TextLink href="/process">{c.cta}</TextLink>
      </div>
    </Section>
  );
}

/** Four solution blueprints with imagery. */
export function WorkPreview() {
  const { home, work } = useContent();
  const c = home.work;
  return (
    <Section id="work-preview">
      <Reveal>
        <SectionHeader kicker={c.kicker} title={c.title} description={c.description} />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {work.items.map((item, i) => (
          <Reveal key={item.id} delay={i * 80}>
            <Link href={`/work/${item.id}`} className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Card className="h-full gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/50">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="size-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                    role="img"
                    aria-label={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border border-foreground/20 bg-background/70 backdrop-blur-md transition-colors group-hover:border-accent group-hover:bg-accent">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-accent">{item.category}</p>
                  <h3 className="font-fraunces text-xl font-normal leading-snug">{item.title}</h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-foreground/65">{item.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {item.tags.slice(0, 2).map((t) => (
                      <Badge key={t} variant="outline" className="rounded-full border-border text-[11px] font-normal text-foreground/60">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <TextLink href="/work">{c.cta}</TextLink>
      </div>
    </Section>
  );
}

/** Industries as an icon row. */
export function IndustriesPreview() {
  const { home, company } = useContent();
  const c = home.industries;
  return (
    <Section id="industries-preview">
      <Reveal>
        <SectionHeader kicker={c.kicker} title={c.title} description={c.description} />
      </Reveal>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {company.industries.items.map((ind, i) => {
          const Icon = getIcon(ind.icon);
          return (
            <Reveal key={ind.name} delay={i * 50}>
              <Link
                href="/work#industries"
                className="group flex h-full flex-col items-center gap-4 rounded-xl border border-border bg-card px-3 py-7 text-center outline-none transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-foreground/85">{ind.name}</span>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-10">
        <TextLink href="/work#industries">{c.cta}</TextLink>
      </div>
    </Section>
  );
}

/** Why-us statement on the left, reasons on the right. */
export function WhyPreview() {
  const { home, company } = useContent();
  const c = home.why;
  return (
    <Section id="why-preview">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">{c.kicker}</p>
          <h2 className="font-fraunces text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">{c.title}</h2>
          <p className="mb-8 mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{c.description}</p>
          <TextLink href="/team">{c.cta}</TextLink>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {company.why.items.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 80}>
              <Card className="h-full gap-2 rounded-xl border-border bg-card p-6 transition-colors hover:border-accent/40">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  <h3 className="font-fraunces text-lg font-normal leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground/65">{w.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** First four FAQ entries with a link to the full page. */
export function FaqPreview() {
  const { home, faq } = useContent();
  const c = home.faq;
  return (
    <Section id="faq-preview">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">{c.kicker}</p>
          <h2 className="mb-6 font-fraunces text-3xl font-normal leading-tight tracking-tight sm:text-4xl">{c.title}</h2>
          <TextLink href="/faq">{c.cta}</TextLink>
        </Reveal>
        <Reveal className="lg:col-span-8">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faq.items.slice(0, 4).map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="py-5 font-fraunces text-lg font-normal hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-foreground/70 sm:text-base">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
