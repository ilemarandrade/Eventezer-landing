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
    q: "¿Cómo sé qué plan me conviene?",
    a: "Usa la sección Calculadora con tus eventos por mes, tickets por evento y precio promedio. Te sugerimos el plan con menor costo total estimado (suscripción + comisión).",
  },
  {
    q: "¿Cuándo se aplica la comisión por entrada?",
    a: "Solo sobre órdenes en estado APROBADO. Reservas, pendientes de pago o canceladas no generan comisión.",
  },
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí. Puedes empezar en Free y migrar a Starter o Pro cuando tu volumen crezca. El cambio se refleja en tu siguiente ciclo de facturación.",
  },
  {
    q: "¿Qué gano al subir de plan?",
    a: "Más eventos activos, más staff, menor comisión por ticket y acceso a funciones avanzadas como analítica completa, waitlist avanzada y entrega online en Pro.",
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
            Lo esencial para elegir plan y escalar con control. Tambien puedes ir
            directo a la{" "}
            <a
              href="#calculadora"
              className="font-medium text-primary underline underline-offset-4"
            >
              calculadora
            </a>
            .
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
