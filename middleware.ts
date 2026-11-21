import { NextResponse, type NextRequest } from 'next/server';
import {
  COUNTRY_HEADERS,
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  localeForCountry,
  localeFromAcceptLanguage,
  splitLocale,
  type Locale,
} from '@/lib/i18n';

/**
 * Picks a language for visitors who open a URL without one (e.g. "/").
 *
 * Order of precedence:
 *  1. The language the visitor chose with the switcher (cookie).
 *  2. Their country, from the host's geo header: Finland -> Finnish, Germany -> German, ...
 *     Only European countries we have a translation for get a local language; everyone else gets English.
 *  3. Only when the host supplies no country header at all (local dev, plain servers):
 *     the browser's Accept-Language, so the feature still works there.
 *  4. English.
 */
function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  for (const header of COUNTRY_HEADERS) {
    const country = request.headers.get(header);
    if (country) return localeForCountry(country);
  }

  return localeFromAcceptLanguage(request.headers.get('accept-language')) ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (splitLocale(pathname).locale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(url, 307);
  // The target depends on who is asking, so shared caches must not reuse this redirect.
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Vary', 'Cookie, Accept-Language');
  return response;
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (icon.svg, images, ...).
  matcher: ['/((?!api|_next|.*[.].*).*)'],
};
