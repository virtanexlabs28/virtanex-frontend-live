'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/components/ContentProvider';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'theme';

function toggleTheme() {
  const dark = document.documentElement.classList.toggle('dark');
  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
}

/**
 * Light/dark switch. Which icon shows is decided in CSS from the <html> class, so it
 * never flashes the wrong state and needs no React state. (`[html.dark_&]` targets the page
 * theme itself, unlike `dark:`, which also matches sections that are locally forced dark.)
 */
export function ThemeToggle({ variant = 'icon', className }: { variant?: 'icon' | 'row'; className?: string }) {
  const { ui } = useContent();
  const t = ui.theme;

  if (variant === 'row') {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={toggleTheme}
        aria-label={t.toggle}
        className={cn('h-10 w-full justify-start gap-3 rounded-full border-foreground/20 bg-foreground/10 px-4 text-sm hover:bg-foreground/20', className)}
      >
        <Moon className="size-4 text-accent [html.dark_&]:hidden" aria-hidden="true" />
        <Sun className="hidden size-4 text-accent [html.dark_&]:block" aria-hidden="true" />
        <span className="[html.dark_&]:hidden">{t.toDark}</span>
        <span className="hidden [html.dark_&]:inline">{t.toLight}</span>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={t.toggle}
      title={t.toggle}
      className={cn('size-9 rounded-full border-foreground/20 bg-foreground/10 text-foreground shadow-none backdrop-blur-md hover:bg-foreground/20', className)}
    >
      <Moon className="size-4 [html.dark_&]:hidden" aria-hidden="true" />
      <Sun className="hidden size-4 [html.dark_&]:block" aria-hidden="true" />
    </Button>
  );
}
