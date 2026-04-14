"use client";

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { CheckCheckIcon } from "lucide-react";

export function LandingStickyStory() {
  return (
    <section className="border-b border-border bg-background px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Escala tu operación sin escalar el caos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tu equipo, tus eventos y tus cobros en un solo lugar. El modelo
              de planes acompaña tu crecimiento y protege margen por ticket.
            </p>
          </ScrollReveal>
        </div>
        <div className="space-y-12 text-sm text-muted-foreground">
          <ScrollReveal>
            <div className="flex items-center gap-2">
              <CheckCheckIcon className="h-12 w-12 text-primary" />
              <p>
                Pasa de procesos dispersos a una operación centralizada: eventos,
                tickets, métodos de pago, check-ins y aprobaciones.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="flex items-center gap-2">
              <CheckCheckIcon className="h-12 w-12 text-primary" />
              <p>
                Delega con seguridad: OWNER/ADMIN operan todo y STAFF trabaja
                con permisos granulares según su rol.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-2">
              <CheckCheckIcon className="h-12 w-12 text-primary" />
              <p>
                Empieza en Free y migra cuando tu volumen lo pida. Usa la
                {" "}
                <a
                  href="#calculadora"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  calculadora
                </a>{" "}
                para estimar el mejor plan según eventos por mes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
