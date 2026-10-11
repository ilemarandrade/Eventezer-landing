'use client';

import { CreditCard, Ticket } from 'lucide-react';
import {
  EXAMPLE_TICKET_PRICE,
  PAYMENT_GATEWAY_BY_COUNTRY,
  PLANS_BY_COUNTRY,
  PLATFORM_VAT_PCT,
  formatCommission,
  formatPrice,
  gatewayFeePerTransaction,
  platformFeePerTicket,
} from '@/lib/pricing';
import { useCountry } from '@/components/providers/country-provider';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Explica qué parte de una compra va a Eventezer y qué parte a la pasarela de pago.
 * Solo se muestra en países con pasarela configurada.
 */
export function LandingPaymentBreakdown() {
  const { country } = useCountry();
  const gateway = PAYMENT_GATEWAY_BY_COUNTRY[country];
  if (!gateway) return null;

  const plan = PLANS_BY_COUNTRY[country][0]!;
  const format = (n: number) => formatPrice(n, plan.currency);
  const eventezerFee = platformFeePerTicket(plan, EXAMPLE_TICKET_PRICE, PLATFORM_VAT_PCT[country]);
  const gatewayFee = gatewayFeePerTransaction(gateway, EXAMPLE_TICKET_PRICE);

  return (
    <section id="transparencia" className="border-b border-border bg-muted/30 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ¿A dónde va cada peso?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            En cada compra intervienen dos cobros independientes. Te los mostramos por separado para
            que veas que no hay sobreprecio.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.06} className="mt-10">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-5">
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <Ticket className="h-4 w-4 text-primary" />
                  Eventezer
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  La comisión de tu plan (por ejemplo, {formatCommission(plan)} en {plan.name}). Se
                  cobra <strong className="text-foreground">por cada boleta vendida</strong> y se
                  descuenta de lo que recibes como organizador. Es el único ingreso de Eventezer.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-5">
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  <CreditCard className="h-4 w-4 text-primary" />
                  {gateway.name} (pasarela de pago)
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {gateway.pct.toLocaleString('es-CO')}% + {format(gateway.fixedFee)} + IVA (
                  {gateway.vatPct}%) <strong className="text-foreground">por transacción</strong>.
                  Lo paga el comprador al momento de la compra y va directo a {gateway.name}:
                  Eventezer no recibe nada de ese valor.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-4">
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-foreground">
                Ejemplo: 1 boleta de {format(EXAMPLE_TICKET_PRICE)} con el plan {plan.name}
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Precio de la boleta</dt>
                  <dd className="tabular-nums text-foreground">{format(EXAMPLE_TICKET_PRICE)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">
                    Comisión Eventezer ({formatCommission(plan)})
                  </dt>
                  <dd className="tabular-nums text-foreground">− {format(eventezerFee)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-border pt-2 font-semibold">
                  <dt className="text-foreground">Recibes como organizador</dt>
                  <dd className="tabular-nums text-primary">
                    {format(EXAMPLE_TICKET_PRICE - eventezerFee)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 pt-2">
                  <dt className="text-muted-foreground">
                    Tarifa {gateway.name} que paga el comprador (aprox.)
                  </dt>
                  <dd className="tabular-nums text-foreground">+ {format(gatewayFee)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                La tarifa de {gateway.name} es variable: se cobra por transacción y una transacción
                puede incluir varias boletas. Si el comprador lleva varias en la misma compra, el
                cargo fijo de {format(gateway.fixedFee)} se cobra una sola vez.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
