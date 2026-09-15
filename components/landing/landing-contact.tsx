'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { ContactForm } from '@/components/contact/contact-form';
import { Button } from '@/components/ui/button';
import { APP_REGISTER_URL } from '@/lib/constants';
import { trackPixelEvent } from '@/lib/pixel';

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
            Empezar es así de fácil
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Solo necesitas registrarte. Elige el plan que más te guste —puedes arrancar gratis con
            Free— y empieza a vender entradas hoy mismo.
          </p>
          <div className="mt-6 flex justify-center">
            <Button size="lg" asChild onClick={() => trackPixelEvent('InitiateCheckout')}>
              <a href={APP_REGISTER_URL}>Registrarme</a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-14 border-t border-border pt-10">
          <h4 className="text-center text-2xl font-semibold text-foreground">
            ¿Tienes dudas o necesitas apoyo?
          </h4>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Escríbenos y con gusto te ayudamos a aclararlas antes o después de registrarte.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.12} className="mt-6">
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithParams />
          </Suspense>
        </ScrollReveal>
      </div>
    </section>
  );
}
