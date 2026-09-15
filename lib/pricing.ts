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
      commissionPct: 15,
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
      commissionPct: 12,
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
      commissionPct: 10,
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

export function monthlyCostForPlan(plan: Plan, monthlyGrossSales: number): number {
  const fee = plan.monthlyAmount ?? 0;
  return fee + monthlyGrossSales * (plan.commissionPct / 100);
}

export function bestPlanForRevenue(plans: Plan[], monthlyGrossSales: number): Plan {
  let best = plans[0]!;
  let bestCost = monthlyCostForPlan(best, monthlyGrossSales);
  for (const p of plans.slice(1)) {
    const c = monthlyCostForPlan(p, monthlyGrossSales);
    if (c < bestCost) {
      bestCost = c;
      best = p;
    }
  }
  return best;
}

export function savingsVsFree(plans: Plan[], plan: Plan, monthlyGrossSales: number): number {
  const free = plans.find((p) => p.id === 'free')!;
  return monthlyCostForPlan(free, monthlyGrossSales) - monthlyCostForPlan(plan, monthlyGrossSales);
}
