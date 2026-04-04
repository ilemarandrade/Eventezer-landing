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
              Comisiones alineadas a resultados reales
            </h2>
            <p className="mt-4 text-muted-foreground">
              Menos sorpresas en el cierre de mes: el modelo híbrido premia la
              escala y mantiene costos predecibles cuando aún estás creciendo.
            </p>
          </ScrollReveal>
        </div>
        <div className="space-y-12 text-sm text-muted-foreground">
          <ScrollReveal>
            <div className="flex items-center gap-2">
              <CheckCheckIcon className="h-12 w-12 text-primary" />
              <p>
                Las suscripciones cubren infraestructura, soporte y evolución
                del producto. El porcentaje por entrada refleja el valor
                generado en cada venta concretada.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="flex items-center gap-2">
              <CheckCheckIcon className="h-12 w-12 text-primary" />
              <p>
                Al subir de plan, reduces el porcentaje efectivo sobre el mismo
                volumen. Usa la calculadora para ver el punto de equilibrio
                entre tu ticket promedio y tus ventas mensuales.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-2">
              <CheckCheckIcon className="h-12 w-12 text-primary" />
              <p>
                Eventezer está pensado para equipos que operan eventos con
                frecuencia variable: puedes empezar en Flex y migrar cuando el
                volumen lo justifique.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
