'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

interface ContentContextValue {
  locale: Locale;
  content: Content;
}

const ContentContext = createContext<ContentContextValue | null>(null);

/** Gives every client component the site copy for the current language via useContent(). */
export function ContentProvider({ locale, content, children }: { locale: Locale; content: Content; children: ReactNode }) {
  const value = useMemo(() => ({ locale, content }), [locale, content]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

function useCtx(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}

/** All site copy (site, services, ui, ...) in the visitor's language. */
export function useContent(): Content {
  return useCtx().content;
}

/** The active language code, e.g. "fi". */
export function useLocale(): Locale {
  return useCtx().locale;
}
