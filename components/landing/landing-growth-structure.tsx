"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarPlus2,
  ShoppingCart,
  LineChart,
  Cog,
  TrendingUp,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const flowSteps = [
  {
    step: "1",
    title: "Crea y publica",
    icon: CalendarPlus2,
    body: "Configura evento, tickets y métodos de pago en minutos para salir a vender sin fricción técnica.",
  },
  {
    step: "2",
    title: "Vende y opera",
    icon: ShoppingCart,
    body: "Gestiona órdenes, asigna titulares y ejecuta check-ins con control por rol para tu equipo.",
  },
  {
    step: "3",
    title: "Mide y optimiza",
    icon: LineChart,
    body: "Analiza ventas y asistencia para decidir el siguiente evento con mayor precisión comercial.",
  },
];

const keyBenefits = [
  {
    icon: Cog,
    title: "Operación",
    body: "Centraliza eventos, tickets, pagos y check-ins en un solo flujo operativo.",
  },
  {
    icon: TrendingUp,
    title: "Conversión",
    body: "Reduce fricción del comprador con experiencia pública clara y stock en tiempo real.",
  },
  {
    icon: Wallet,
    title: "Rentabilidad",
    body: "Empieza en Free y baja comisión por ticket al migrar a planes superiores.",
  },
  {
    icon: ShieldCheck,
    title: "Control",
    body: "Define permisos por rol para delegar sin perder gobierno sobre la operación.",
  },
];

const roleItems = [
  "OWNER/ADMIN operan de punta a punta dentro del tenant.",
  "STAFF trabaja con permisos granulares según responsabilidades.",
  "Permisos claros reducen errores y aceleran ejecución del evento.",
];

const analyticsItems = [
  "Free: resumen de evento activo + 2 eventos recientes.",
  "Starter: visibilidad de ventas y check-ins (activo + 3 recientes).",
  "Pro: full analytics, retención, clientes y monitoreo en tiempo real.",
];

export function LandingGrowthStructure() {
  return (
    <>
      <section className="border-b border-border bg-background px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Crecer sin un sistema operativo para eventos convierte cada avance
              en fricción.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">
              Centraliza ventas, accesos y métricas para escalar con velocidad y
              precisión.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.02} className="mx-auto mt-8 max-w-5xl">
            <div className="grid items-center gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg shadow-primary/10">
                <Image
                  src="/images/operative-chaos.jpg"
                  alt="Escenario de caos operativo en eventos con procesos manuales y equipos saturados."
                  width={626}
                  height={442}
                  sizes="(min-width: 1280px) 360px, (min-width: 1024px) 30vw, 100vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Pierdes horas en tareas manuales que no generan valor.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Pierdes margen por errores en cobros y conciliaciones.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-card">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Pierdes control al decidir sin datos en tiempo real.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="mt-5 text-sm font-medium text-foreground">
                  Sin plataforma, escalar eventos cuesta m&aacute;s tiempo,
                  m&aacute;s dinero y menos control en cada operaci&oacute;n.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Cómo funciona
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="grid gap-4">
              {flowSteps.map((step, index) => (
                <ScrollReveal key={step.title} delay={0.05 * index}>
                  <Card className="h-full border-border bg-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <motion.span
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 22,
                              delay: 0.08 * index,
                            }}
                            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 px-3 text-sm font-semibold text-primary"
                          >
                            {step.step}
                          </motion.span>
                          <CardTitle className="text-lg">
                            {step.title}
                          </CardTitle>
                        </div>

                        <motion.div
                          initial={{ y: 8, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + index * 0.06,
                          }}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground"
                        >
                          <step.icon className="h-5 w-5" />
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {step.body}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.08}>
              <div className="mx-auto w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl shadow-primary/10">
                <Image
                  src="/images/eventezer-light.png"
                  alt="Vista del módulo de ticketing de Eventezer en modo claro."
                  width={1919}
                  height={995}
                  sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                  className="h-auto w-full object-cover dark:hidden"
                />
                <Image
                  src="/images/eventezer-dark.png"
                  alt="Vista del módulo de ticketing de Eventezer en modo oscuro."
                  width={1919}
                  height={996}
                  sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                  className="hidden h-auto w-full object-cover dark:block"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Beneficios clave
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {keyBenefits.map((benefit, index) => (
                <ScrollReveal key={benefit.title} delay={0.04 * index}>
                  <Card className="h-full border-border bg-card">
                    <CardHeader className="pb-2 flex flex-row gap-2">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                        <benefit.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {benefit.body}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.06}>
              <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg shadow-primary/10">
                <Image
                  src="/images/benefits.png"
                  alt="Visual de beneficios clave de Eventezer con enfoque en operación, conversión, rentabilidad y control."
                  width={927}
                  height={1064}
                  sizes="(min-width: 1280px) 280px, (min-width: 1024px) 24vw, 100vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* <section className="border-b border-border bg-muted/20 px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <Card className="h-full border-border bg-card">
              <CardHeader>
                <CardTitle>Roles y seguridad operativa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {roleItems.map((item) => (
                  <p key={item}>- {item}</p>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <Card className="h-full border-border bg-card">
              <CardHeader>
                <CardTitle>Analítica y toma de decisiones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {analyticsItems.map((item) => (
                  <p key={item}>- {item}</p>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section> */}
    </>
  );
}
