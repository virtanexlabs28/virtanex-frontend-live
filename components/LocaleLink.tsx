'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import NextLink from 'next/link';
import { useLocale } from '@/components/ContentProvider';
import { withLocale } from '@/lib/i18n';

type LinkProps = ComponentPropsWithoutRef<typeof NextLink>;

/**
 * Drop-in replacement for next/link that keeps visitors in their language:
 * "/services" becomes "/fi/services" on the Finnish site. External links pass through.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ href, ...props }, ref) {
  const locale = useLocale();
  return <NextLink ref={ref} href={typeof href === 'string' ? withLocale(locale, href) : href} {...props} />;
});

export default Link;
