export type PlanId = "free" | "starter" | "pro";

export interface Plan {
  id: PlanId;
  name: string;
  monthlyUsd: number | null;
  commissionPct: number;
  description: string;
  highlight?: boolean;
  simultaneousEvents: number | string;
  staff: number | string;
  analytics: string;
  waitlist: boolean;
  onlineDelivery: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthlyUsd: 0,
    commissionPct: 10,
    description: "Valida tu operación sin costo fijo.",
    simultaneousEvents: 1,
    staff: 1,
    analytics: "Resumen: evento activo + 2 recientes",
    waitlist: false,
    onlineDelivery: false,
  },
  {
    id: "starter",
    name: "Starter",
    monthlyUsd: 20,
    commissionPct: 8,
    description: "Escala tu operación con mejor margen.",
    simultaneousEvents: 5,
    staff: 3,
    analytics: "Ventas y check-ins: activo + 3 recientes",
    waitlist: false,
    onlineDelivery: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyUsd: 40,
    commissionPct: 5,
    description: "Operación y analítica completas, sin límites.",
    highlight: true,
    simultaneousEvents: "Ilimitados",
    staff: "Ilimitados",
    analytics: "Full analytics + overview global + stream en vivo",
    waitlist: true,
    onlineDelivery: true,
  },
];

export function monthlyCostForPlan(
  plan: Plan,
  monthlyGrossSalesUsd: number,
): number {
  const fee = plan.monthlyUsd ?? 0;
  return fee + monthlyGrossSalesUsd * (plan.commissionPct / 100);
}

export function bestPlanForRevenue(monthlyGrossSalesUsd: number): Plan {
  const candidates = PLANS;
  let best = candidates[0]!;
  let bestCost = monthlyCostForPlan(best, monthlyGrossSalesUsd);
  for (const p of candidates.slice(1)) {
    const c = monthlyCostForPlan(p, monthlyGrossSalesUsd);
    if (c < bestCost) {
      bestCost = c;
      best = p;
    }
  }
  return best;
}

export function savingsVsFree(
  plan: Plan,
  monthlyGrossSalesUsd: number,
): number {
  const flex = PLANS.find((p) => p.id === "free")!;
  return (
    monthlyCostForPlan(flex, monthlyGrossSalesUsd) -
    monthlyCostForPlan(plan, monthlyGrossSalesUsd)
  );
}
