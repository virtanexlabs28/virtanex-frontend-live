/**
 * Typed, per-language access to all site copy (server only).
 *
 * Content lives in data/<locale>/*.json. English (data/en) is the complete source of
 * truth; every other language is merged over it, so anything not translated yet
 * falls back to English instead of breaking the page.
 *
 * Client components never import this file. The [locale] layout loads one language
 * and hands it to <ContentProvider>; client code reads it with useContent().
 */
import 'server-only';
import { cache } from 'react';
import { defaultLocale, type Locale } from './i18n';

const FILES = [
  'site',
  'services',
  'technologies',
  'process',
  'company',
  'faq',
  'work',
  'insights',
  'home',
  'ui',
] as const;

type Raw = {
  site: typeof import('@/data/en/site.json');
  services: typeof import('@/data/en/services.json');
  technologies: typeof import('@/data/en/technologies.json');
  process: typeof import('@/data/en/process.json');
  company: typeof import('@/data/en/company.json');
  faq: typeof import('@/data/en/faq.json');
  work: typeof import('@/data/en/work.json');
  insights: typeof import('@/data/en/insights.json');
  home: typeof import('@/data/en/home.json');
  ui: typeof import('@/data/en/ui.json');
};

export interface Content {
  site: Raw['site'];
  servicesContent: Raw['services'];
  services: Raw['services']['services'];
  technologies: Raw['technologies'];
  processContent: Raw['process'];
  company: Raw['company'];
  faq: Raw['faq'];
  work: Raw['work'];
  insights: Raw['insights'];
  home: Raw['home'];
  ui: Raw['ui'];
}

export type Service = Content['services'][number];
export type WorkItem = Content['work']['items'][number];

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Objects merge key by key; arrays and strings from the override replace the base. */
function merge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (isObj(base) && isObj(override)) {
    const out: Obj = { ...base };
    for (const key of Object.keys(base)) out[key] = merge(base[key], override[key]);
    return out as T;
  }
  return (typeof override === typeof base ? override : base) as T;
}

async function loadRaw(locale: string): Promise<Partial<Raw>> {
  const entries = await Promise.all(
    FILES.map(async (name) => {
      try {
        const mod = await import(`@/data/${locale}/${name}.json`);
        return [name, mod.default] as const;
      } catch {
        return [name, undefined] as const; // language folder or file not written yet
      }
    }),
  );
  return Object.fromEntries(entries.filter(([, v]) => v !== undefined)) as Partial<Raw>;
}

export const getContent = cache(async (locale: Locale): Promise<Content> => {
  const en = (await loadRaw(defaultLocale)) as Raw;
  const local = locale === defaultLocale ? {} : await loadRaw(locale);
  const raw = Object.fromEntries(FILES.map((name) => [name, merge(en[name], local[name])])) as Raw;

  return {
    site: raw.site,
    servicesContent: raw.services,
    services: raw.services.services,
    technologies: raw.technologies,
    processContent: raw.process,
    company: raw.company,
    faq: raw.faq,
    work: raw.work,
    insights: raw.insights,
    home: raw.home,
    ui: raw.ui,
  };
});
