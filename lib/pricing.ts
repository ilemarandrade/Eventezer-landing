import type { Country } from '@/lib/country';
import { COUNTRIES } from '@/lib/country';

export type PlanId = 'free' | 'starter' | 'pro';
export type Currency = 'USD' | 'COP';

export interface Plan {
  id: PlanId;
  name: string;
  monthlyAmount: number | null;
  currency: Currency;
  commissionPct: number;
  /** Cargo fijo por boleta vendida, en la moneda del plan (0 si no aplica). */
  fixedFeePerTicket: number;
  description: string;
  highlight?: boolean;
  simultaneousEvents: number | string;
  staff: number | string;
  analytics: string;
  waitlist: boolean;
  onlineDelivery: boolean;
}

export const PLANS_BY_COUNTRY: Record<Country, Plan[]> = {
  VE: [
    {
      id: 'free',
      name: 'Free',
      monthlyAmount: 0,
      currency: 'USD',
      commissionPct: 10,
      fixedFeePerTicket: 0,
      description: 'Valida tu operación sin costo fijo.',
      simultaneousEvents: 1,
      staff: 1,
      analytics: 'Resumen: evento activo + 2 recientes',
      waitlist: false,
      onlineDelivery: true,
    },
    {
      id: 'starter',
      name: 'Starter',
      monthlyAmount: 20,
      currency: 'USD',
      commissionPct: 8,
      fixedFeePerTicket: 0,
      description: 'Escala tu operación con mejor margen.',
      simultaneousEvents: 5,
      staff: 3,
      analytics: 'Ventas y check-ins: activo + 3 recientes',
      waitlist: false,
      onlineDelivery: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyAmount: 40,
      currency: 'USD',
      commissionPct: 5,
      fixedFeePerTicket: 0,
      description: 'Operación y analítica completas, sin límites.',
      highlight: true,
      simultaneousEvents: 'Ilimitados',
      staff: 'Ilimitados',
      analytics: 'Full analytics + overview global + stream en vivo',
      waitlist: true,
      onlineDelivery: true,
    },
  ],
  CO: [
    {
      id: 'free',
      name: 'Free',
      monthlyAmount: 0,
      currency: 'COP',
      commissionPct: 9,
      fixedFeePerTicket: 500,
      description: 'Valida tu operación sin costo fijo.',
      simultaneousEvents: 1,
      staff: 1,
      analytics: 'Resumen: evento activo + 2 recientes',
      waitlist: false,
      onlineDelivery: true,
    },
    {
      id: 'starter',
      name: 'Starter',
      monthlyAmount: 62000,
      currency: 'COP',
      commissionPct: 6,
      fixedFeePerTicket: 500,
      description: 'Escala tu operación con mejor margen.',
      simultaneousEvents: 5,
      staff: 3,
      analytics: 'Ventas y check-ins: activo + 3 recientes',
      waitlist: false,
      onlineDelivery: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyAmount: 125000,
      currency: 'COP',
      commissionPct: 4,
      fixedFeePerTicket: 500,
      description: 'Operación y analítica completas, sin límites.',
      highlight: true,
      simultaneousEvents: 'Ilimitados',
      staff: 'Ilimitados',
      analytics: 'Full analytics + overview global + stream en vivo',
      waitlist: true,
      onlineDelivery: true,
    },
  ],
};

/** Formatea un monto en la moneda indicada usando el locale del país correspondiente. */
export function formatPrice(amount: number, currency: Currency): string {
  const locale = Object.values(COUNTRIES).find((c) => c.currency === currency)?.locale ?? 'es-ES';
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
}

/** Precio de referencia para los ejemplos de costo por boleta (solo COP por ahora). */
export const EXAMPLE_TICKET_PRICE = 50000;

/**
 * IVA que Eventezer aplica sobre su comisión, por país. Si es 0 no se suma ni se
 * muestra en la UI.
 */
export const PLATFORM_VAT_PCT: Record<Country, number> = { VE: 0, CO: 0 };

export interface PaymentGateway {
  name: string;
  /** Porcentaje sobre el monto de la transacción. */
  pct: number;
  /** Cargo fijo por transacción (no por boleta). */
  fixedFee: number;
  /** IVA aplicado sobre la tarifa de la pasarela. */
  vatPct: number;
}

/** Pasarela de pago por país. Su tarifa la paga el comprador, no el organizador. */
export const PAYMENT_GATEWAY_BY_COUNTRY: Partial<Record<Country, PaymentGateway>> = {
  CO: { name: 'Wompi', pct: 2.65, fixedFee: 700, vatPct: 19 },
};

export function applyVat(amount: number, vatPct: number): number {
  return vatPct === 0 ? amount : amount * (1 + vatPct / 100);
}

/** Lo que Eventezer cobra por una boleta vendida. Las boletas gratuitas no generan comisión. */
export function platformFeePerTicket(plan: Plan, price: number, vatPct: number): number {
  if (price <= 0) return 0;
  return applyVat(price * (plan.commissionPct / 100) + plan.fixedFeePerTicket, vatPct);
}

/** Tarifa de la pasarela por una transacción (puede incluir varias boletas). */
export function gatewayFeePerTransaction(gateway: PaymentGateway, amount: number): number {
  return (amount * (gateway.pct / 100) + gateway.fixedFee) * (1 + gateway.vatPct / 100);
}

export interface SalesVolume {
  tickets: number;
  avgPrice: number;
  vatPct: number;
}

export function monthlyCostForPlan(plan: Plan, volume: SalesVolume): number {
  const fee = plan.monthlyAmount ?? 0;
  return fee + volume.tickets * platformFeePerTicket(plan, volume.avgPrice, volume.vatPct);
}

export function bestPlanForRevenue(plans: Plan[], volume: SalesVolume): Plan {
  let best = plans[0]!;
  let bestCost = monthlyCostForPlan(best, volume);
  for (const p of plans.slice(1)) {
    const c = monthlyCostForPlan(p, volume);
    if (c < bestCost) {
      bestCost = c;
      best = p;
    }
  }
  return best;
}

export function savingsVsFree(plans: Plan[], plan: Plan, volume: SalesVolume): number {
  const free = plans.find((p) => p.id === 'free')!;
  return monthlyCostForPlan(free, volume) - monthlyCostForPlan(plan, volume);
}

/** Etiqueta de la comisión por boleta, ej. "9% + $500" o "10%". */
export function formatCommission(plan: Plan): string {
  if (plan.fixedFeePerTicket <= 0) return `${plan.commissionPct}%`;
  return `${plan.commissionPct}% + ${formatPrice(plan.fixedFeePerTicket, plan.currency)}`;
}
