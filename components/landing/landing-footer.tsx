'use client';

import Link from 'next/link';
import { APP_LOGIN_URL, APP_REGISTER_URL } from '@/lib/constants';
import { trackPixelEvent } from '@/lib/pixel';
import { cn } from '@/lib/utils';
import { useCountry } from '@/components/providers/country-provider';
import { COUNTRIES } from '@/lib/country';

export function LandingFooter({ className }: { className?: string }) {
  const { country } = useCountry();
  const legal = COUNTRIES[country].legal;

  return (
    <footer className={cn('border-t border-border bg-card px-4 py-10', className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eventezer. Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:gap-x-6">
          <a
            href={APP_REGISTER_URL}
            className="text-primary hover:underline"
            onClick={() => trackPixelEvent('InitiateCheckout')}
          >
            Registro
          </a>
          <a href={APP_LOGIN_URL} className="text-muted-foreground hover:text-foreground">
            Login
          </a>
          <Link href="/#faq" className="text-muted-foreground hover:text-foreground">
            FAQ
          </Link>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground">
            Blog
          </Link>
          <Link href="/sobre-nosotros" className="text-muted-foreground hover:text-foreground">
            Sobre nosotros
          </Link>
          <Link href={legal.termsPath} className="text-muted-foreground hover:text-foreground">
            Términos de Uso
          </Link>
          <Link href={legal.privacyPath} className="text-muted-foreground hover:text-foreground">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
