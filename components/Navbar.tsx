'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useBooking } from '@/components/BookingProvider';
import { Logo } from '@/components/Logo';
import { site } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-5 py-5 transition-opacity delay-200 duration-[600ms] sm:px-7',
        mounted ? 'opacity-100' : 'opacity-0',
      )}
      aria-label="Main Navigation"
    >
      <Link
        href="/"
        className="group flex items-center rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`${site.name} home`}
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
                'block rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
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

      <Button
        onClick={openBooking}
        className="hidden rounded-full px-5 font-semibold shadow-md shadow-black/30 transition-colors duration-300 hover:bg-accent hover:text-accent-foreground lg:inline-flex"
      >
        Book a call
      </Button>

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-foreground/20 bg-foreground/10 text-foreground hover:bg-foreground/20 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full gap-0 border-border bg-background/95 p-7 backdrop-blur-xl sm:max-w-sm">
          <SheetTitle className="flex items-center">
            <Logo className="h-9 w-auto text-foreground" />
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>

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
            <Button
              size="lg"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="w-full rounded-full font-semibold hover:bg-accent hover:text-accent-foreground"
            >
              Book a call
              <ArrowUpRight className="size-4" />
            </Button>
            <p className="text-center text-xs tracking-wider text-foreground/40">
              FINLAND · REMOTE · EST. {site.founded}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
