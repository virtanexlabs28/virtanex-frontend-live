'use client';

import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useContent, useLocale } from '@/components/ContentProvider';
import { LOCALE_COOKIE, isLocale, localeMeta, locales, splitLocale, withLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  /** `compact` shows the language code (header); `full` shows the language name (footer, menu). */
  variant?: 'compact' | 'full';
  className?: string;
}

/** Lets visitors override the automatic language. The choice is remembered in a cookie. */
export function LanguageSwitcher({ variant = 'compact', className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const { ui } = useContent();
  const pathname = usePathname();
  const router = useRouter();

  const change = (next: string) => {
    if (!isLocale(next) || next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    const { path } = splitLocale(pathname);
    router.push(withLocale(next, path) + window.location.hash);
  };

  return (
    <Select value={locale} onValueChange={change}>
      <SelectTrigger
        aria-label={ui.language.switch}
        className={cn(
          'gap-2 rounded-full border-foreground/20 bg-foreground/10 text-foreground shadow-none backdrop-blur-md hover:bg-foreground/20 focus-visible:ring-ring',
          variant === 'compact' ? 'h-9 w-auto px-3 text-xs font-medium uppercase tracking-wider' : 'h-10 w-full px-4 text-sm sm:w-48',
          className,
        )}
      >
        <Globe className="size-4 shrink-0 text-accent" aria-hidden="true" />
        <span>{variant === 'compact' ? locale : localeMeta[locale].name}</span>
      </SelectTrigger>
      <SelectContent position="popper" align="end" className="z-[300]">
        {locales.map((l) => (
          <SelectItem key={l} value={l} lang={l}>
            {localeMeta[l].name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
