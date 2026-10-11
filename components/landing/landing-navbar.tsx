'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { LogoSwitcher } from '@/components/landing/logo-switcher';
import { CountrySwitcher } from '@/components/landing/country-switcher';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { APP_LOGIN_URL, APP_REGISTER_URL } from '@/lib/constants';
import { trackPixelEvent } from '@/lib/pixel';
import { useCountry } from '@/components/providers/country-provider';
import { COUNTRIES } from '@/lib/country';
import { cn } from '@/lib/utils';

const links = [
  { href: '/#caracteristicas', label: 'Características' },
  { href: '/#precios', label: 'Precios' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
];

function ThemeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      aria-label="Cambiar tema"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="relative text-foreground"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute inset-0 m-auto h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

/** `overHero`: la navbar arranca transparente sobre el Hero con video y se vuelve sólida al pasarlo. */
export function LandingNavbar({ overHero = false }: { overHero?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { scrollY } = useScroll();
  const updatePastHero = (y: number) => {
    if (overHero) setPastHero(y > window.innerHeight - 80);
  };
  useMotionValueEvent(scrollY, 'change', updatePastHero);
  // Al recargar a mitad de página no hay evento de scroll inicial.
  useEffect(() => updatePastHero(window.scrollY), []);
  const transparent = overHero && !pastHero && !mobileOpen;
  const closeMobile = () => setMobileOpen(false);
  const { country } = useCountry();
  const { signupEnabled } = COUNTRIES[country];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-300',
        // `dark` fuerza texto claro mientras está sobre el video.
        transparent ? 'dark border-transparent bg-transparent' : 'border-border bg-background',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <LogoSwitcher forceDark={transparent} />

        <nav
          className={cn(
            'hidden md:flex items-center gap-8 text-sm font-medium',
            transparent ? 'text-white' : 'text-muted-foreground',
          )}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'transition-colors',
                transparent ? 'hover:text-white/75' : 'hover:text-foreground',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: todos los controles a la vista */}
        <div className="hidden items-center gap-3 md:flex">
          <CountrySwitcher className={cn(transparent && '[&>button_svg]:text-white')} />
          <ThemeToggleButton />
          {signupEnabled ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <a href={APP_LOGIN_URL}>Login</a>
              </Button>
              <Button size="sm" asChild>
                <a href={APP_REGISTER_URL} onClick={() => trackPixelEvent('InitiateCheckout')}>
                  Registrarme
                </a>
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link href="/#contacto" onClick={() => trackPixelEvent('Contact')}>
                Escríbenos
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile: indicador de país (con iniciales) + botón de menú hamburguesa */}
        <div className="flex items-center gap-1.5 md:hidden">
          <CountrySwitcher />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <nav className="flex flex-col px-4 py-2 text-sm font-medium">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="rounded-md px-2 py-2.5 text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-border px-6 py-3">
              <span className="text-xs font-medium text-muted-foreground">Tema</span>
              <ThemeToggleButton />
            </div>

            <div className="flex flex-col gap-2 border-t border-border px-4 py-4">
              {signupEnabled ? (
                <>
                  <Button variant="outline" asChild onClick={closeMobile}>
                    <a href={APP_LOGIN_URL}>Login</a>
                  </Button>
                  <Button
                    asChild
                    onClick={() => {
                      trackPixelEvent('InitiateCheckout');
                      closeMobile();
                    }}
                  >
                    <a href={APP_REGISTER_URL}>Registrarme</a>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  onClick={() => {
                    trackPixelEvent('Contact');
                    closeMobile();
                  }}
                >
                  <Link href="/#contacto">Escríbenos</Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
