"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

const faqs = [
  {
    q: "¿Cobran comisión si el ticket cuesta $0?",
    a: "No hay comisión sobre el precio del ticket si es gratuito. Los cargos fijos del plan (si aplica) siguen según tu suscripción. Revisa siempre el detalle del plan al contratar.",
  },
  {
    q: "¿Cuándo se aplica la comisión por entrada?",
    a: "Solo sobre órdenes en estado APPROVED. Reservas, pendientes de pago o canceladas no generan comisión de venta.",
  },
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí. El cambio se refleja en el siguiente ciclo de facturación; las comisiones se calculan con el porcentaje vigente del plan activo en el momento de aprobar cada orden.",
  },
  {
    q: "¿Se pierden datos si bajo de plan?",
    a: "Tus datos se conservan. Algunas funciones avanzadas pueden quedar en solo lectura o limitadas hasta que vuelvas a un plan que las incluya.",
  },
];

export function LandingFaq() {
  return (
    <section id="faq" className="bg-background px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Reglas de negocio que suelen decidir el plan adecuado.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
