/**
 * Language configuration. Safe to import from both server and client code.
 *
 * English is the default. A visitor only gets another language when their country
 * (from the host's geo header) is in COUNTRY_LOCALE, or when they pick one themselves.
 */

export const locales = ['en', 'fi', 'de', 'sv', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Remembers a visitor's explicit language choice. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const localeMeta: Record<Locale, { name: string; ogLocale: string }> = {
  en: { name: 'English', ogLocale: 'en_GB' },
  fi: { name: 'Suomi', ogLocale: 'fi_FI' },
  de: { name: 'Deutsch', ogLocale: 'de_DE' },
  sv: { name: 'Svenska', ogLocale: 'sv_SE' },
  fr: { name: 'Français', ogLocale: 'fr_FR' },
  es: { name: 'Español', ogLocale: 'es_ES' },
};

/**
 * ISO country code -> language, for European countries we have a translation for.
 * Every country not listed here (including the rest of Europe) gets English.
 */
export const COUNTRY_LOCALE: Record<string, Locale> = {
  FI: 'fi',
  AX: 'fi',
  SE: 'sv',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',
  FR: 'fr',
  MC: 'fr',
  LU: 'fr',
  BE: 'fr',
  ES: 'es',
  AD: 'es',
};

/** Request headers set by common hosts/CDNs with the visitor's country code. */
export const COUNTRY_HEADERS = [
  'x-vercel-ip-country',
  'cf-ipcountry',
  'cloudfront-viewer-country',
  'x-country-code',
  'x-appengine-country',
] as const;

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function localeForCountry(country: string | null | undefined): Locale {
  return (country && COUNTRY_LOCALE[country.toUpperCase()]) || defaultLocale;
}

/** Best supported language from an Accept-Language header, or null when none match. */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = Number(params.find((p) => p.trim().startsWith('q='))?.split('=')[1] ?? 1);
      return { base: tag.trim().toLowerCase().split('-')[0], q: Number.isNaN(q) ? 0 : q };
    })
    .sort((a, b) => b.q - a.q);
  for (const { base } of ranked) if (isLocale(base)) return base;
  return null;
}

/** Splits "/fi/services" into { locale: 'fi', path: '/services' }. */
export function splitLocale(pathname: string): { locale: Locale | null; path: string } {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first)) return { locale: first, path: `/${rest.join('/')}` };
  return { locale: null, path: pathname || '/' };
}

/** Prefixes an internal path (optionally with ?query / #hash) with a locale. */
export function withLocale(locale: Locale, href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const rest = href === '/' ? '' : href;
  // "/#faq" and "/?x=1" keep their hash/query attached to the locale root.
  return `/${locale}${rest.startsWith('/#') || rest.startsWith('/?') ? rest.slice(1) : rest}`;
}
