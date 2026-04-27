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
    a: "Más eventos activos simultáneos, más staff, menor comisión por ticket y acceso a funciones avanzadas como analítica completa y waitlist avanzada en Pro.",
  },
  {
    q: "¿Cómo recibe el asistente su entrada?",
    a: "Al completar la compra, el asistente recibe automáticamente un correo con su entrada y código QR. Esto aplica en todos los planes sin configuración adicional.",
  },
  {
    q: "¿Qué pasa si un asistente pierde o no encuentra su entrada?",
    a: "El organizador puede reenviar la entrada o validar al asistente manualmente desde el panel de control sin necesidad de cancelar ni reemitir la orden.",
  },
  {
    q: "¿Puedo crear entradas gratuitas?",
    a: "Sí. Puedes crear tipos de ticket con precio $0 para eventos de registro gratuito. Las entradas gratuitas no generan comisión.",
  },
  {
    q: "¿Puedo cambiar el precio de las entradas después de publicar?",
    a: "Sí. Puedes modificar el precio de un tipo de ticket en cualquier momento. El cambio aplica a nuevas ventas y no afecta órdenes ya aprobadas.",
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
