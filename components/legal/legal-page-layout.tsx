import type { ReactNode } from 'react';
import Link from 'next/link';
import { LandingNavbar } from '@/components/landing/landing-navbar';
import { LandingFooter } from '@/components/landing/landing-footer';

interface LegalPageLayoutProps {
  title: string;
  serviceLabel: string;
  effectiveDate: string;
  toc: Array<[href: string, label: string]>;
  children: ReactNode;
}

/**
 * Shell reutilizable para documentos legales (header + fecha de vigencia +
 * tabla de contenido + secciones numeradas + link de vuelta al inicio).
 * Calcado del layout ya usado en app/politica-de-privacidad/page.tsx, para
 * que los documentos nuevos luzcan igual sin duplicar ese markup ni tocar
 * la página original.
 */
export function LegalPageLayout({
  title,
  serviceLabel,
  effectiveDate,
  toc,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <LandingNavbar />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Servicio: <span className="font-medium text-foreground">{serviceLabel}</span>
            {' · '}Vigente desde:{' '}
            <span className="font-medium text-foreground">{effectiveDate}</span>
          </p>
        </div>

        <nav
          aria-label="Tabla de contenido"
          className="mb-10 rounded-lg border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tabla de contenido
          </h2>
          <ol className="space-y-1.5 text-sm">
            {toc.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-primary hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12 text-sm leading-7 text-foreground">{children}</div>

        <div className="mt-12 border-t border-border pt-6">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}

/** Resalta visualmente un dato pendiente de completar antes de publicar. */
export function LegalPlaceholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[13px] font-medium text-amber-600 dark:text-amber-400">
      [{children}]
    </span>
  );
}

/** Nota de cierre recordando la revisión legal/contable antes de publicar. */
export function LegalReviewNotice() {
  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
      <strong>Nota interna:</strong> este documento es una plantilla de referencia. Antes de
      publicarlo, complétalo con los datos marcados como{' '}
      <LegalPlaceholder>COMPLETAR</LegalPlaceholder> y solicita revisión de un abogado/contador
      local para validar obligaciones específicas (impuestos, registro ante autoridades, etc.).
    </div>
  );
}
