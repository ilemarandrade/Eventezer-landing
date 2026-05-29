'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { LandingSocialLinks } from '@/components/landing/landing-social-links';
import { ContactForm } from '@/components/contact/contact-form';

function ContactFormWithParams() {
  const params = useSearchParams();
  const defaultMessage = params.get('mensaje') ?? '';
  return <ContactForm defaultMessage={defaultMessage} />;
}

export function LandingContact() {
  return (
    <section id="contacto" className="border-b border-border bg-muted/20 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lanza tu próximo evento hoy
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Cuéntanos tu operación y te ayudamos a elegir la mejor configuración para arrancar esta
            semana.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.04} className="mt-8">
          <p className="text-center text-sm font-medium text-foreground">
            También estamos en redes
          </p>
          <LandingSocialLinks variant="buttons" className="mt-4" />
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="mt-10">
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithParams />
          </Suspense>
        </ScrollReveal>
      </div>
    </section>
  );
}
