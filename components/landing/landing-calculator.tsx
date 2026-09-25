'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { NumberTicker } from '@/components/landing/number-ticker';
import {
  PLANS_BY_COUNTRY,
  PAYMENT_GATEWAY_BY_COUNTRY,
  PLATFORM_VAT_PCT,
  bestPlanForRevenue,
  monthlyCostForPlan,
  platformFeePerTicket,
  formatPrice,
  type Currency,
} from '@/lib/pricing';
import { useCountry } from '@/components/providers/country-provider';
import { cn } from '@/lib/utils';

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
  const vatPct = PLATFORM_VAT_PCT[country];
  const gateway = PAYMENT_GATEWAY_BY_COUNTRY[country];
  const hasFixedFee = plans.some((p) => p.fixedFeePerTicket > 0);
  const volume = useMemo(
    () => ({ tickets: monthlyTickets, avgPrice, vatPct }),
    [monthlyTickets, avgPrice, vatPct],
  );
  const recommended = useMemo(() => bestPlanForRevenue(plans, volume), [plans, volume]);
  const planComparisons = useMemo(
    () =>
      plans.map((plan) => {
        const commissionCost = monthlyGross * (plan.commissionPct / 100);
        const fixedFeeCost = monthlyTickets * plan.fixedFeePerTicket;
        return {
          ...plan,
          monthlyFee: plan.monthlyAmount ?? 0,
          commissionCost,
          fixedFeeCost,
          vatCost: (commissionCost + fixedFeeCost) * (vatPct / 100),
          feePerTicket: platformFeePerTicket(plan, avgPrice, vatPct),
          estimatedCost: monthlyCostForPlan(plan, volume),
        };
      }),
    [plans, monthlyGross, monthlyTickets, avgPrice, vatPct, volume],
  );
  const recommendedComparison = planComparisons.find((p) => p.id === recommended.id)!;
  const recommendedNet = monthlyGross - recommendedComparison.estimatedCost;

  return (
    <section id="calculadora" className="border-b border-border bg-background px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Calcula tu plan y tus ganancias
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Ajusta eventos por mes, tickets por evento y precio promedio. Te sugerimos el plan con
            menor costo total estimado (suscripción + comisión).
          </p>
        </ScrollReveal>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          <ScrollReveal className="h-full">
            <Card className="flex h-full flex-col border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Tu proyección</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Ajusta los valores según un mes típico de tu operación.
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-7">
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
                <div className="mt-auto space-y-4">
                  <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-muted/50 text-sm">
                    <div className="border-r border-border p-4">
                      <p className="text-muted-foreground">Tickets al mes</p>
                      <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                        <NumberTicker value={monthlyTickets} />
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground">Ventas brutas / mes</p>
                      <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                        {formatAmount(monthlyGross)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">¿Cómo calculamos lo que pagas?</p>
                    <p className="mt-1">
                      Mensualidad del plan + (comisión % × precio
                      {hasFixedFee ? ` + ${formatAmount(plans[0]!.fixedFeePerTicket)}` : ''}) ×
                      boletas vendidas
                      {vatPct > 0 ? `, más IVA (${vatPct}%)` : ''}. Solo cuentan las órdenes
                      aprobadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.06} className="h-full">
            <LayoutGroup>
              <Card className="relative flex h-full flex-col overflow-hidden border-border bg-card">
                <motion.div
                  layoutId="plan-highlight"
                  className="pointer-events-none absolute inset-0 rounded-lg bg-primary/5"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
                <CardHeader className="relative pb-3">
                  <CardTitle className="text-lg">Recomendación</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Lo que le pagarías a Eventezer cada mes. El resto de tus ventas brutas es tuyo.
                  </p>
                </CardHeader>
                <CardContent className="relative flex flex-1 flex-col gap-4">
                  {/* Resumen del plan sugerido: lo que pagas vs. lo que te queda */}
                  <motion.div
                    key={recommended.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-lg border border-primary/30 bg-primary/5"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-primary/20 px-4 py-2.5">
                      <p className="text-sm text-muted-foreground">
                        Plan sugerido:{' '}
                        <span className="font-semibold text-foreground">{recommended.name}</span>
                      </p>
                      {recommended.fixedFeePerTicket > 0 ? (
                        <p className="text-xs tabular-nums text-muted-foreground">
                          {formatAmount(recommendedComparison.feePerTicket)} por boleta
                        </p>
                      ) : null}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-primary/20">
                      <div className="px-4 py-3">
                        <p className="text-xs text-muted-foreground">Pagas a Eventezer / mes</p>
                        <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                          {formatAmount(recommendedComparison.estimatedCost)}
                        </p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-xs text-muted-foreground">Te queda a ti / mes</p>
                        <p className="mt-1 text-xl font-bold tabular-nums text-primary">
                          {formatAmount(recommendedNet)}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Desglose por plan: una fila por plan con sus conceptos alineados */}
                  <div className="space-y-2">
                    {planComparisons.map((plan) => {
                      const isRecommended = plan.id === recommended.id;
                      const items = [
                        { label: 'Mensualidad', value: plan.monthlyFee },
                        { label: `Comisión ${plan.commissionPct}%`, value: plan.commissionCost },
                        ...(plan.fixedFeePerTicket > 0
                          ? [
                              {
                                label: `Fijo ${formatAmount(plan.fixedFeePerTicket)} × boleta`,
                                value: plan.fixedFeeCost,
                              },
                            ]
                          : []),
                        ...(vatPct > 0 ? [{ label: `IVA ${vatPct}%`, value: plan.vatCost }] : []),
                      ];
                      return (
                        <div
                          key={plan.id}
                          className={cn(
                            'rounded-lg border px-4 py-3 transition-colors',
                            isRecommended
                              ? 'border-primary bg-primary/15 shadow-sm'
                              : 'border-border bg-muted/30',
                          )}
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="flex items-center gap-2 font-medium text-foreground">
                              {plan.name}
                              {isRecommended ? (
                                <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                                  Recomendado
                                </span>
                              ) : null}
                            </p>
                            <p className="font-semibold tabular-nums text-foreground">
                              {formatAmount(plan.estimatedCost)}
                              <span className="text-xs font-normal text-muted-foreground">
                                /mes
                              </span>
                            </p>
                          </div>
                          <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(6.5rem,1fr))] gap-x-3 gap-y-1">
                            {items.map((item) => (
                              <div key={item.label}>
                                <dt className="text-[11px] text-muted-foreground">{item.label}</dt>
                                <dd className="text-sm tabular-nums text-foreground">
                                  {formatAmount(item.value)}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </LayoutGroup>
          </ScrollReveal>
        </div>

        {gateway ? (
          <ScrollReveal delay={0.08} className="mt-6">
            <p className="text-center text-xs text-muted-foreground">
              Este cálculo incluye solo lo que cobra Eventezer. La pasarela de pago ({gateway.name})
              la paga el comprador aparte y varía según cuántas boletas lleve cada compra.{' '}
              <a
                href="#transparencia"
                className="font-medium text-primary underline underline-offset-4"
              >
                Ver cómo se reparte cada peso
              </a>
              .
            </p>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}
