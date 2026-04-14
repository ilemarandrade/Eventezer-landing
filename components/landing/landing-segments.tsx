"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ScrollReveal,
  StaggerItem,
  StaggerReveal,
} from "@/components/landing/scroll-reveal";
import { BarChart3, Rocket, Users, Zap } from "lucide-react";

const segments = [
  {
    icon: Rocket,
    title: "Primeros organizadores",
    body: "Empieza en Free sin costo mensual para validar tu operación y vender tu primer evento con estructura profesional.",
  },
  {
    icon: Users,
    title: "Equipos en crecimiento",
    body: "Con Starter operas varios eventos al mes, delegas en staff y mejoras margen con una comisión más baja.",
  },
  {
    icon: Zap,
    title: "Operaciones profesionales",
    body: "Pro desbloquea analítica completa, waitlist avanzada y entrega online para escalar sin límites.",
  },
  {
    icon: BarChart3,
    title: "Orientados a resultados",
    body: "Mide ventas, check-ins y retención para convertir cada evento en decisiones de crecimiento y rentabilidad.",
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
