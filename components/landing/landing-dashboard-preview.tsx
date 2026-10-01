'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/landing/scroll-reveal';

/** Captura del dashboard justo después del Hero con video. */
export function LandingDashboardPreview() {
  return (
    <section className="border-b border-border px-4 py-16 sm:py-20">
      <ScrollReveal className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-primary/10">
          <Image
            src="/images/hero-light.png"
            alt="Vista del dashboard de Eventezer con métricas en modo claro."
            width={1897}
            height={795}
            sizes="(min-width: 1280px) 1024px, (min-width: 768px) 90vw, 100vw"
            className="h-auto w-full object-cover dark:hidden"
          />
          <Image
            src="/images/hero-dark.png"
            alt="Vista del dashboard de Eventezer con métricas en modo oscuro."
            width={1887}
            height={803}
            sizes="(min-width: 1280px) 1024px, (min-width: 768px) 90vw, 100vw"
            className="hidden h-auto w-full object-cover dark:block"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
