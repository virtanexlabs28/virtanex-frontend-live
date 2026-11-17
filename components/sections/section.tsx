import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Render the top divider (default true). */
  divider?: boolean;
}

/** Consistent page section: spacing, max width, and anchor offset for the fixed navbar. */
export function Section({ id, children, className, divider = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 px-5 py-20 sm:px-10 sm:py-28 md:px-14',
        divider && 'border-t border-border',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ kicker, title, description, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end',
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">{kicker}</p>
        <h2 className="font-fraunces text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
