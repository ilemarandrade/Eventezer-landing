"use client";

import { PLANS } from "@/lib/pricing";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, CheckCircle2 } from "lucide-react";

export function LandingPricing() {
  return (
    <section
      id="precios"
      className="border-b border-border bg-muted/30 px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Planes para cada etapa de crecimiento
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            Empieza en Free y reduce comisión a medida que escalas. La comisión
            se aplica solo cuando la orden está en estado{" "}
            <strong className="text-foreground">APROBADO</strong>.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-10">
          <Card className="overflow-hidden border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle>Comparativa rápida</CardTitle>
              <CardDescription>
                Montos en USD. Usa la{" "}
                <a
                  href="#calculadora"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  calculadora
                </a>{" "}
                para estimar el punto de equilibrio según eventos por mes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Mensual</TableHead>
                    <TableHead className="text-right">
                      Comisión / entrada
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PLANS.map((p) => (
                    <TableRow
                      key={p.id}
                      className={p.highlight ? "bg-accent/40" : undefined}
                    >
                      <TableCell className="font-medium">
                        {p.name}
                        {p.highlight ? (
                          <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
                            Popular
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {p.monthlyUsd === null
                          ? "A medida"
                          : p.monthlyUsd === 0
                            ? "$0"
                            : `$${p.monthlyUsd}`}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {p.commissionPct}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((p) => (
            <ScrollReveal key={p.id} delay={0.05}>
              <Card
                className={`h-full border-border ${
                  p.highlight ? "ring-2 ring-primary/40" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    {p.name}
                  </CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-3 font-medium text-foreground">
                    Lo que incluye este plan
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <span className="text-muted-foreground">
                          Eventos activos simultáneos:
                        </span>{" "}
                        {p.simultaneousEvents}
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <span className="text-muted-foreground">Staff:</span>{" "}
                        {p.staff}
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <span className="text-muted-foreground">Analítica:</span>{" "}
                        {p.analytics}
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <span className="text-muted-foreground">
                          Waitlist avanzada:
                        </span>{" "}
                        {p.waitlist ? "Sí" : "No"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <span className="text-muted-foreground">
                          Entrega online:
                        </span>{" "}
                        {p.onlineDelivery ? "Sí" : "No"}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
