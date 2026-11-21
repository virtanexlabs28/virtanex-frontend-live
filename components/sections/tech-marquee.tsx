'use client';

import { useContent } from '@/components/ContentProvider';
import { TechIcon } from './tech-icon';

/** Endlessly scrolling strip of technology icons, moving left to right. Pauses on hover. */
export function TechMarquee() {
  const { home, technologies } = useContent();
  const items = technologies.items;

  // Two identical groups; the second is hidden from assistive tech.
  const group = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item.name}
          title={item.name}
          className="group flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 transition-colors hover:border-accent/50 hover:bg-foreground/[0.05]"
        >
          <TechIcon icon={item.icon} className="size-7 transition-transform duration-300 group-hover:scale-110" />
          <span className="whitespace-nowrap text-sm font-medium text-foreground/75">{item.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={home.marquee.title}
      className="border-y border-border bg-background py-10 sm:py-14"
    >
      <p className="mb-7 px-5 text-center text-xs font-medium uppercase tracking-[0.25em] text-accent">
        {home.marquee.kicker} · {home.marquee.title}
      </p>
      <div className="marquee">
        <div className="marquee-track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </section>
  );
}
