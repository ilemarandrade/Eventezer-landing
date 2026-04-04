export type PlanId = "flex" | "starter" | "pro" | "business" | "enterprise";

export interface Plan {
  id: PlanId;
  name: string;
  monthlyUsd: number | null;
  commissionPct: number;
  description: string;
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "flex",
    name: "Flex (esporádico)",
    monthlyUsd: 0,
    commissionPct: 10,
    description: "Sin mensualidad. Ideal para 1–2 eventos al año.",
  },
  {
    id: "starter",
    name: "Starter",
    monthlyUsd: 29,
    commissionPct: 5,
    description: "Equipos pequeños con ventas recurrentes.",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyUsd: 79,
    commissionPct: 3,
    description: "Waitlist, stock en tiempo real y más control.",
    highlight: true,
  },
  {
    id: "business",
    name: "Business",
    monthlyUsd: 199,
    commissionPct: 1.5,
    description: "Marca blanca parcial y prioridad en soporte.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyUsd: null,
    commissionPct: 0.75,
    description: ", personalización total y SLA.",
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
  const candidates = PLANS.filter((p) => p.id !== "enterprise");
  let best = candidates[0]!;
  let bestCost = monthlyCostForPlan(best, monthlyGrossSalesUsd);
  for (const p of candidates.slice(1)) {
    const c = monthlyCostForPlan(p, monthlyGrossSalesUsd);
    if (c < bestCost) {
      bestCost = c;
      best = p;
    }
  }
  if (monthlyGrossSalesUsd >= 25_000) {
    return PLANS.find((p) => p.id === "enterprise")!;
  }
  return best;
}

export function savingsVsFlex(
  plan: Plan,
  monthlyGrossSalesUsd: number,
): number {
  const flex = PLANS.find((p) => p.id === "flex")!;
  return (
    monthlyCostForPlan(flex, monthlyGrossSalesUsd) -
    monthlyCostForPlan(plan, monthlyGrossSalesUsd)
  );
}
