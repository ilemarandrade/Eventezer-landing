'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { NumberTicker } from '@/components/landing/number-ticker';
import {
  PLANS_BY_COUNTRY,
  bestPlanForRevenue,
  monthlyCostForPlan,
  formatPrice,
  type Currency,
} from '@/lib/pricing';
import { useCountry } from '@/components/providers/country-provider';

/** Rango del slider de "precio promedio" ajustado a la escala de cada moneda. */
const AVG_PRICE_RANGE: Record<
  Currency,
  { min: number; max: number; step: number; default: number }
> = {
  USD: { min: 5, max: 500, step: 1, default: 45 },
  COP: { min: 5000, max: 500000, step: 1000, default: 45000 },
};

export function LandingCalculator() {
  const { country } = useCountry();
  const plans = PLANS_BY_COUNTRY[country];
  const currency = plans[0]!.currency;
  const formatAmount = (n: number) => formatPrice(n, currency);
  const priceRange = AVG_PRICE_RANGE[currency];

  const [eventsPerMonth, setEventsPerMonth] = useState(6);
  const [ticketsPerEvent, setTicketsPerEvent] = useState(140);
  const [avgPrice, setAvgPrice] = useState(priceRange.default);

  // Al cambiar de país/moneda, reinicia el precio promedio a un valor
  // razonable en la nueva escala (evita, ej., "$45 COP" tras venir de USD).
  useEffect(() => {
    setAvgPrice(AVG_PRICE_RANGE[currency].default);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const monthlyTickets = eventsPerMonth * ticketsPerEvent;
  const monthlyGross = monthlyTickets * avgPrice;
  const recommended = useMemo(() => bestPlanForRevenue(plans, monthlyGross), [plans, monthlyGross]);
  const planComparisons = useMemo(
    () =>
      plans.map((plan) => ({
        ...plan,
        monthlyFee: plan.monthlyAmount ?? 0,
        commissionCost: monthlyGross * (plan.commissionPct / 100),
        estimatedCost: monthlyCostForPlan(plan, monthlyGross),
      })),
    [plans, monthlyGross],
  );

  return (
    <section id="calculadora" className="border-b border-border bg-background px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Calculadora de ahorro
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Ajusta eventos por mes, tickets por evento y precio promedio. Te sugerimos el plan con
            menor costo total estimado (suscripción + comisión).
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
                    <span className="tabular-nums text-muted-foreground">{eventsPerMonth}</span>
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
                    <span className="tabular-nums text-muted-foreground">{ticketsPerEvent}</span>
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
                    <Label htmlFor="price">Precio promedio ({currency})</Label>
                    <span className="tabular-nums text-muted-foreground">
                      {formatAmount(avgPrice)}
                    </span>
                  </div>
                  <input
                    id="price"
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    step={priceRange.step}
                    value={avgPrice}
                    onChange={(e) => setAvgPrice(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
                  <p className="text-muted-foreground">Tickets estimados al mes</p>
                  <p className="text-xl font-semibold text-foreground tabular-nums">
                    <NumberTicker value={monthlyTickets} />
                  </p>
                  <p className="mt-3 text-muted-foreground">Ventas brutas mensuales</p>
                  <p className="text-xl font-semibold text-foreground tabular-nums">
                    {formatAmount(monthlyGross)}
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
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
                    <p className="text-sm text-muted-foreground">Plan sugerido</p>
                    <p className="text-2xl font-bold text-foreground">{recommended.name}</p>
                  </motion.div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {planComparisons.map((plan) => {
                      const isRecommended = plan.id === recommended.id;
                      return (
                        <div
                          key={plan.id}
                          className={`rounded-lg border p-3 transition-colors ${
                            isRecommended
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-muted/30'
                          }`}
                        >
                          <p className="text-md text-muted-foreground">{plan.name}</p>
                          <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                            {formatAmount(plan.estimatedCost)}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">por mes estimado</p>
                          <p className="mt-2 text-[13px] text-foreground">
                            Mensualidad: {formatAmount(plan.monthlyFee)}
                          </p>
                          <p className="text-[13px] text-foreground">
                            Comisión ({plan.commissionPct}%): {formatAmount(plan.commissionCost)}
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
