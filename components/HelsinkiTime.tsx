'use client';

import { useEffect, useState } from 'react';
import { useContent, useLocale } from '@/components/ContentProvider';
import { helsinkiClock } from '@/lib/time';

/** Live clock showing the current time in Finland, wherever the visitor is. */
export function HelsinkiTime({ className }: { className?: string }) {
  const { ui } = useContent();
  const locale = useLocale();
  const [now, setNow] = useState<{ time: string; offset: string } | null>(null);

  useEffect(() => {
    const tick = () => setNow(helsinkiClock(locale));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [locale]);

  // Rendered only in the browser, so it never mismatches the statically generated HTML.
  if (!now) return null;
  return (
    <span className={className}>
      {ui.time.now}: <time className="font-medium tabular-nums">{now.time}</time> ({now.offset})
    </span>
  );
}
