"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/landing/magnetic-button";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { APP_REGISTER_URL, DEMO_URL } from "@/lib/constants";
import { ArrowRight, Sparkles } from "lucide-react";

export function LandingHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background px-4 py-16 sm:py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary),transparent)] opacity-20 dark:opacity-30" />
      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Suscripción + comisión solo en ventas aprobadas
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Gestiona tus eventos, escala tus ventas.
          </h1>
        </ScrollReveal>
        <motion.p
          style={{ y }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          Eventezer combina una suscripción mensual transparente con una comisión
          por entrada vendida. Pagas menos fijo cuando vendes más, y solo
          aplicamos comisión cuando la orden queda{" "}
          <strong className="text-foreground">APPROVED</strong>.
        </motion.p>
        <ScrollReveal delay={0.15} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <MagneticButton>
            <Button size="lg" className="rounded-full px-8" asChild>
              <a href={APP_REGISTER_URL}>
                Empezar Gratis
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </MagneticButton>
          <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
            <a href={DEMO_URL}>Ver Demo</a>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
