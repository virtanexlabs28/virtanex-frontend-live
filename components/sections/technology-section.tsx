'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { technologies } from '@/lib/content';
import { Section, SectionHeader } from './section';
import { TechIcon } from './tech-icon';

export function TechnologySection() {
  const [category, setCategory] = useState('all');
  const items =
    category === 'all' ? technologies.items : technologies.items.filter((t) => t.category === category);

  return (
    <Section id="technology">
      <SectionHeader {...technologies.intro} />

      <Tabs value={category} onValueChange={setCategory} className="mb-8">
        <TabsList className="h-auto group-data-[orientation=horizontal]/tabs:h-auto w-full flex-wrap justify-start gap-1 rounded-xl border border-border bg-foreground/5 p-1 sm:w-fit">
          {technologies.categories.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id}
              className="h-auto flex-none rounded-lg px-3.5 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground after:hidden"
            >
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((item) => (
          <li key={item.name}>
            <Card
              title={`${item.name} — ${item.type}`}
              className="group h-full items-center justify-center gap-3 rounded-xl border-border bg-card px-4 py-7 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-foreground/[0.04]"
            >
              <TechIcon icon={item.icon} className="size-9 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xs font-medium text-foreground/70">{item.name}</span>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
