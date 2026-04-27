"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ScrollReveal,
  StaggerItem,
  StaggerReveal,
} from "@/components/landing/scroll-reveal";
import {
  Users,
  Heart,
  Music,
  GraduationCap,
  Building2,
  Briefcase,
  Globe,
  Mic2,
} from "lucide-react";

const naturales = [
  {
    icon: Users,
    title: "Reunión o celebración",
    body: "Cumpleaños, reuniones familiares o encuentros de amigos con control de acceso y entradas personalizadas.",
  },
  {
    icon: Heart,
    title: "Boda o evento privado",
    body: "Gestiona tu lista de invitados, tipos de acceso y confirma asistencia sin hojas de cálculo.",
  },
  {
    icon: Music,
    title: "Concierto o show",
    body: "Artistas emergentes o shows independientes que necesitan vender entradas y controlar el aforo.",
  },
  {
    icon: GraduationCap,
    title: "Clase, taller o curso",
    body: "Formadores y creadores de contenido que cobran por sesiones presenciales o en línea.",
  },
];

const organizaciones = [
  {
    icon: Building2,
    title: "Empresa o corporativo",
    body: "Conferencias, lanzamientos de producto, capacitaciones internas y eventos de networking empresarial.",
  },
  {
    icon: Briefcase,
    title: "Productora o agencia",
    body: "Equipos que gestionan múltiples eventos al mes con staff distribuido y reportes centralizados.",
  },
  {
    icon: Globe,
    title: "Asociación o comunidad",
    body: "Grupos, clubes y organizaciones sin fines de lucro que organizan eventos recurrentes para sus miembros.",
  },
  {
    icon: Mic2,
    title: "Festival o evento masivo",
    body: "Producciones de gran escala con múltiples escenarios, accesos diferenciados y miles de asistentes.",
  },
];

export function LandingPersonas() {
  return (
    <section className="border-b border-border bg-muted/20 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Para cualquier tipo de evento
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Desde una reunión pequeña hasta un festival masivo, Eventezer se
            adapta al tamaño y la complejidad de tu operación.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ScrollReveal delay={0.02}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Para personas naturales
            </p>
            <StaggerReveal className="grid gap-3 sm:grid-cols-2">
              {naturales.map((p) => (
                <StaggerItem key={p.title}>
                  <Card className="h-full border-border bg-card transition-shadow hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{p.body}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Para organizaciones
            </p>
            <StaggerReveal className="grid gap-3 sm:grid-cols-2">
              {organizaciones.map((p) => (
                <StaggerItem key={p.title}>
                  <Card className="h-full border-border bg-card transition-shadow hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{p.body}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
