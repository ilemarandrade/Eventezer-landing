"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ScrollReveal,
  StaggerItem,
  StaggerReveal,
} from "@/components/landing/scroll-reveal";
import { Building2, Rocket, Users, Zap } from "lucide-react";

const segments = [
  {
    icon: Rocket,
    title: "Organizadores esporádicos",
    body: "Riesgo cero: sin mensualidad obligatoria en el plan Flex. Ideal para probar la plataforma con pocos eventos.",
  },
  {
    icon: Users,
    title: "Regulares",
    body: "Staff colaborativo, roles y permisos. Ahorra comisión al consolidar volumen con Starter o Pro.",
  },
  {
    icon: Zap,
    title: "Profesionales",
    body: "Waitlist, stock en tiempo real y flujos de pago alineados a tu operación diaria.",
  },
  {
    icon: Building2,
    title: "Enterprise",
    body: "Personalización total de branding  y condiciones comerciales dedicadas para grandes productores.",
  },
];

export function LandingSegments() {
  return (
    <section
      id="caracteristicas"
      className="border-b border-border bg-background px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Valor para cada etapa de tu negocio
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Desde el primer evento hasta operaciones a escala, Eventezer crece
            contigo sin sacrificar control ni experiencia de compra.
          </p>
        </ScrollReveal>
        <StaggerReveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s) => (
            <StaggerItem key={s.title}>
              <Card className="h-full border-border bg-card transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
