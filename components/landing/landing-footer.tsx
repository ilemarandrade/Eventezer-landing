'use client';

import Link from 'next/link';
import { LandingSocialLinks } from '@/components/landing/landing-social-links';
import { APP_LOGIN_URL, APP_REGISTER_URL } from '@/lib/constants';
import { trackPixelEvent } from '@/lib/pixel';
import { cn } from '@/lib/utils';

export function LandingFooter({ className }: { className?: string }) {
  return (
    <footer className={cn('border-t border-border bg-card px-4 py-10', className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eventezer. Todos los derechos reservados.
        </p>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Síguenos</span>
          <LandingSocialLinks />
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
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
          <Link
            href="/politica-de-privacidad"
            className="text-muted-foreground hover:text-foreground"
          >
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
