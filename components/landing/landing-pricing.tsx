'use client';

import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import {
  EXAMPLE_TICKET_PRICE,
  PLANS_BY_COUNTRY,
  PLATFORM_VAT_PCT,
  formatCommission,
  formatPrice,
  platformFeePerTicket,
} from '@/lib/pricing';
import { useCountry } from '@/components/providers/country-provider';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { trackPixelEvent } from '@/lib/pixel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, CheckCircle2, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

function PlanFeature({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

export function LandingPricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { country } = useCountry();
  const plans = PLANS_BY_COUNTRY[country];
  const vatPct = PLATFORM_VAT_PCT[country];
  const hasFixedFee = plans.some((p) => p.fixedFeePerTicket > 0);

  useEffect(() => {
    if (isInView) trackPixelEvent('ViewContent', { content_name: 'pricing' });
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="precios"
      className="border-b border-border bg-muted/30 px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Planes para cada etapa de crecimiento
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            Empieza en Free y reduce comisión a medida que escalas.{' '}
            {hasFixedFee
              ? 'Cada plan cobra un porcentaje del precio más un cargo fijo por boleta vendida, sin costos ocultos. '
              : null}
            La comisión se aplica solo cuando la orden está en estado{' '}
            <strong className="text-foreground">APROBADO</strong>.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <ScrollReveal key={p.id} delay={0.05}>
              <Card
                className={`h-full border-border ${p.highlight ? 'ring-2 ring-primary/40' : ''}`}
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
                <CardContent className="space-y-4">
                  {/* Costo del plan: precio y comisión agrupados y jerarquizados */}
                  <div
                    className={cn(
                      'flex items-end justify-between rounded-lg border px-4 py-3',
                      p.highlight ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/40',
                    )}
                  >
                    <div>
                      <p className="text-2xl font-bold leading-none tabular-nums text-foreground sm:text-3xl">
                        {p.monthlyAmount === null
                          ? 'A medida'
                          : formatPrice(p.monthlyAmount, p.currency)}
                      </p>
                      {p.monthlyAmount !== null ? (
                        <p className="mt-1 text-xs text-muted-foreground">por mes</p>
                      ) : null}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold leading-none tabular-nums text-primary">
                        {formatCommission(p)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {p.fixedFeePerTicket > 0 ? 'por boleta vendida' : 'comisión/entrada'}
                      </p>
                    </div>
                  </div>

                  {p.fixedFeePerTicket > 0 ? (
                    <p className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Ticket className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>
                        En una boleta de {formatPrice(EXAMPLE_TICKET_PRICE, p.currency)}, Eventezer
                        cobra{' '}
                        <strong className="tabular-nums text-foreground">
                          {formatPrice(
                            platformFeePerTicket(p, EXAMPLE_TICKET_PRICE, vatPct),
                            p.currency,
                          )}
                        </strong>
                        {vatPct > 0 ? ` (IVA ${vatPct}% incluido)` : null}.
                      </span>
                    </p>
                  ) : null}

                  {/* Beneficios en columna, fáciles de escanear */}
                  <div className="flex flex-col gap-2.5">
                    <PlanFeature label="Eventos" value={p.simultaneousEvents} />
                    <PlanFeature label="Staff" value={p.staff} />
                    <PlanFeature label="Waitlist" value={p.waitlist ? 'Sí' : 'No'} />
                    <PlanFeature label="Entradas" value="Por correo" />
                  </div>

                  <div className="flex items-start gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{p.analytics}</span>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.08} className="mt-8">
          <Card className="overflow-hidden border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle>Comparativa rápida</CardTitle>
              <CardDescription>
                Montos en {plans[0]!.currency}. Usa la{' '}
                <a
                  href="#calculadora"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  calculadora
                </a>{' '}
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
                      {hasFixedFee ? 'Comisión por boleta' : 'Comisión / entrada'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((p) => (
                    <TableRow key={p.id} className={p.highlight ? 'bg-accent/40' : undefined}>
                      <TableCell className="font-medium">
                        {p.name}
                        {p.highlight ? (
                          <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
                            Popular
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {p.monthlyAmount === null
                          ? 'A medida'
                          : formatPrice(p.monthlyAmount, p.currency)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCommission(p)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
