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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LandingPricing() {
  return (
    <section id="precios" className="border-b border-border bg-muted/30 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Planes y comisiones
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            Precio mensual + porcentaje por entrada. La comisión se aplica solo
            cuando la orden está en estado <strong className="text-foreground">APPROVED</strong>.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-10">
          <Card className="overflow-hidden border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle>Comparativa rápida</CardTitle>
              <CardDescription>
                Montos referenciales en USD. Ajusta volumen en la calculadora más abajo.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Mensual</TableHead>
                    <TableHead className="text-right">Comisión / entrada</TableHead>
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
          {PLANS.filter((p) => p.id !== "enterprise").map((p) => (
            <ScrollReveal key={p.id} delay={0.05}>
              <Card
                className={`h-full border-border ${
                  p.highlight ? "ring-2 ring-primary/40" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Mensual: </span>
                    {p.monthlyUsd === 0
                      ? "Gratis"
                      : p.monthlyUsd === null
                        ? "Custom"
                        : `$${p.monthlyUsd}`}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Comisión: </span>
                    {p.commissionPct}%
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
