'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useBooking } from '@/components/BookingProvider';
import { useContent } from '@/components/ContentProvider';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/components/LocaleLink';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { fmt } from '@/lib/format';
import { splitLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { site, ui } = useContent();
  const pathname = splitLocale(usePathname()).path;
  const { openBooking } = useBooking();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pastBanner, setPastBanner] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [plainTop, setPlainTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Every page opens on a dark photo banner (home hero or page header) in both themes, so the bar
  // uses the dark palette while it floats over it, then follows the chosen theme once you scroll past.
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      const banner = document.querySelector('main')?.firstElementChild as HTMLElement | null;
      // Text pages (e.g. the privacy policy) open without a photo, so the bar keeps the theme colours.
      setPlainTop(banner?.hasAttribute('data-plain') ?? false);
      setPastBanner(window.scrollY > (banner?.offsetHeight ?? window.innerHeight) - 90);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);
  const overHero = !pastBanner && !plainTop;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-5 py-5 transition-opacity delay-200 duration-[600ms] sm:px-7',
        mounted ? 'opacity-100' : 'opacity-0',
        overHero && 'dark',
        // Once scrolled, a frosted bar keeps the logo and controls legible over page content.
        scrolled && !overHero && 'border-b border-border bg-background/85 backdrop-blur-md',
      )}
      aria-label={ui.nav.aria}
    >
      <Link
        href="/"
        className="group flex items-center rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={fmt(ui.nav.home, { name: site.name })}
      >
        <Logo className="h-9 w-auto text-foreground transition-transform duration-300 group-hover:scale-[1.03] sm:h-10" />
      </Link>

      {/* Desktop pill */}
      <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-foreground/15 bg-foreground/10 px-2 py-1.5 shadow-lg shadow-black/20 backdrop-blur-md lg:flex">
        {site.nav.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'block whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                isActive(link.href)
                  ? 'bg-foreground/20 text-foreground'
                  : 'text-foreground/75 hover:bg-foreground/15 hover:text-foreground',
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        <ThemeToggle className="hidden sm:inline-flex" />

        <Button
          onClick={openBooking}
          className="hidden whitespace-nowrap rounded-full px-5 font-semibold shadow-md shadow-black/30 transition-colors duration-300 hover:bg-accent hover:text-accent-foreground lg:inline-flex"
        >
          {ui.nav.bookCall}
        </Button>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-foreground/20 bg-foreground/10 text-foreground hover:bg-foreground/20 lg:hidden"
              aria-label={ui.nav.openMenu}
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full gap-0 border-border bg-background/95 p-7 backdrop-blur-xl sm:max-w-sm">
            <SheetTitle className="flex items-center">
              <Logo className="h-9 w-auto text-foreground" />
            </SheetTitle>
            <SheetDescription className="sr-only">{ui.nav.menuDescription}</SheetDescription>

            <div className="my-auto flex flex-col gap-2">
              {site.nav.map((link, idx) => (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center justify-between border-b border-border py-4 font-fraunces text-3xl font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent',
                      isActive(link.href) ? 'text-accent' : 'text-foreground',
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs uppercase tracking-widest text-foreground/40">{String(idx + 1).padStart(2, '0')}</span>
                  </Link>
                </SheetClose>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-6">
              <LanguageSwitcher variant="full" className="sm:w-full" />
              <ThemeToggle variant="row" />
              <Button
                size="lg"
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
                className="w-full rounded-full font-semibold hover:bg-accent hover:text-accent-foreground"
              >
                {ui.nav.bookCall}
                <ArrowUpRight className="size-4" />
              </Button>
              <p className="text-center text-xs tracking-wider text-foreground/40">
                {fmt(ui.nav.mobileFooter, { founded: site.founded })}
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
