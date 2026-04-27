"use client";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { ContactForm } from "@/components/contact/contact-form";

export function LandingContact() {
  return (
    <section id="contacto" className="border-b border-border bg-muted/20 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lanza tu próximo evento hoy
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Cuéntanos tu operación y te ayudamos a elegir la mejor configuración
            para arrancar esta semana.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="mt-10">
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
