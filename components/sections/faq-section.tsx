'use client';

import { ArrowUpRight, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useContent } from '@/components/ContentProvider';
import { Section, SectionHeader } from './section';

export function FaqSection() {
  const { faq, site, ui } = useContent();
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader {...faq.intro} className="mb-6 md:mb-6 md:flex-col md:items-start" />
          <a
            href={`mailto:${site.contact.email}`}
            className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Mail className="size-4" aria-hidden="true" />
            {ui.common.askDirectly}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
        <Accordion type="single" collapsible defaultValue="item-0" className="lg:col-span-8">
          {faq.items.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="py-5 font-fraunces text-lg font-normal hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-foreground/70 sm:text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
