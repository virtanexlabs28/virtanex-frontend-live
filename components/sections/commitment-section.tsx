'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/components/BookingProvider';
import { site } from '@/lib/content';
import { Section } from './section';

export function CommitmentSection() {
  const { openBooking } = useBooking();
  const { commitment, motto } = site;
  return (
    <Section id="commitment">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-foreground/[0.05] to-background p-8 sm:p-12">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{commitment.kicker}</p>
          <blockquote className="font-fraunces text-2xl font-normal leading-snug sm:text-3xl md:text-4xl">
            &ldquo;{commitment.quote}&rdquo;
          </blockquote>
          <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">{commitment.body}</p>
          <div className="flex flex-col justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
            <p className="font-fraunces text-lg">
              {site.name} · <span className="italic text-accent">{motto}</span>
            </p>
            <Button onClick={openBooking} className="rounded-full px-6 hover:bg-accent hover:text-accent-foreground">
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
