"use client";

import { useMemo, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { NumberTicker } from "@/components/landing/number-ticker";
import { PLANS, bestPlanForRevenue, monthlyCostForPlan } from "@/lib/pricing";

function formatUsd(n: number) {
  return n.toLocaleString("es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function LandingCalculator() {
  const [eventsPerMonth, setEventsPerMonth] = useState(6);
  const [ticketsPerEvent, setTicketsPerEvent] = useState(140);
  const [avgPrice, setAvgPrice] = useState(45);

  const monthlyTickets = eventsPerMonth * ticketsPerEvent;
  const monthlyGross = monthlyTickets * avgPrice;
  const recommended = useMemo(
    () => bestPlanForRevenue(monthlyGross),
    [monthlyGross],
  );
  const planComparisons = useMemo(
    () =>
      PLANS.map((plan) => ({
        ...plan,
        monthlyFee: plan.monthlyUsd ?? 0,
        commissionCost: monthlyGross * (plan.commissionPct / 100),
        estimatedCost: monthlyCostForPlan(plan, monthlyGross),
      })),
    [monthlyGross],
  );

  return (
    <section
      id="calculadora"
      className="border-b border-border bg-background px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Calculadora de ahorro
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Ajusta eventos por mes, tickets por evento y precio promedio. Te
            sugerimos el plan con menor costo total estimado (suscripción +
            comisión).
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Tus supuestos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <Label htmlFor="eventsPerMonth">Eventos por mes</Label>
                    <span className="tabular-nums text-muted-foreground">
                      {eventsPerMonth}
                    </span>
                  </div>
                  <input
                    id="eventsPerMonth"
                    type="range"
                    min={1}
                    max={60}
                    step={1}
                    value={eventsPerMonth}
                    onChange={(e) => setEventsPerMonth(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <Label htmlFor="ticketsPerEvent">Tickets por evento</Label>
                    <span className="tabular-nums text-muted-foreground">
                      {ticketsPerEvent}
                    </span>
                  </div>
                  <input
                    id="ticketsPerEvent"
                    type="range"
                    min={20}
                    max={2000}
                    step={10}
                    value={ticketsPerEvent}
                    onChange={(e) => setTicketsPerEvent(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <Label htmlFor="price">Precio promedio (USD)</Label>
                    <span className="tabular-nums text-muted-foreground">
                      ${avgPrice}
                    </span>
                  </div>
                  <input
                    id="price"
                    type="range"
                    min={5}
                    max={500}
                    step={1}
                    value={avgPrice}
                    onChange={(e) => setAvgPrice(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
                  <p className="text-muted-foreground">
                    Tickets estimados al mes
                  </p>
                  <p className="text-xl font-semibold text-foreground tabular-nums">
                    <NumberTicker value={monthlyTickets} />
                  </p>
                  <p className="mt-3 text-muted-foreground">
                    Ventas brutas mensuales
                  </p>
                  <p className="text-xl font-semibold text-foreground tabular-nums">
                    <NumberTicker value={monthlyGross} prefix="$" />
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <LayoutGroup>
              <Card className="relative overflow-hidden border-border bg-card">
                <motion.div
                  layoutId="plan-highlight"
                  className="pointer-events-none absolute inset-0 rounded-lg bg-primary/5"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <CardHeader className="relative">
                  <CardTitle className="text-lg">Recomendación</CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <motion.div
                    key={recommended.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm text-muted-foreground">
                      Plan sugerido
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {recommended.name}
                    </p>
                  </motion.div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {planComparisons.map((plan) => {
                      const isRecommended = plan.id === recommended.id;
                      return (
                        <div
                          key={plan.id}
                          className={`rounded-lg border p-3 transition-colors ${
                            isRecommended
                              ? "border-primary bg-primary/10"
                              : "border-border bg-muted/30"
                          }`}
                        >
                          <p className="text-md text-muted-foreground">
                            {plan.name}
                          </p>
                          <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                            {formatUsd(plan.estimatedCost)}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            por mes estimado
                          </p>
                          <p className="mt-2 text-[13px] text-foreground">
                            Mensualidad: {formatUsd(plan.monthlyFee)}
                          </p>
                          <p className="text-[13px] text-foreground">
                            Comisión ({plan.commissionPct}%):{" "}
                            {formatUsd(plan.commissionCost)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </LayoutGroup>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
