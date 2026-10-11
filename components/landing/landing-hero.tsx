'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/landing/magnetic-button';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { BackgroundVideo } from '@/components/landing/background-video';
import { APP_REGISTER_URL, DEMO_URL } from '@/lib/constants';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { trackPixelEvent, trackCustomPixelEvent } from '@/lib/pixel';
import { useCountry } from '@/components/providers/country-provider';
import { COUNTRIES } from '@/lib/country';

const HERO_VIDEO_SRC = '/videos/hero-video.mp4';

export function LandingHero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // El video baja más lento que el scroll y el texto sube y se desvanece.
  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '20%'],
  );
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -80]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );
  const { country } = useCountry();
  const { signupEnabled } = COUNTRIES[country];

  return (
    // `dark` fuerza los tokens del tema oscuro: el texto va siempre claro sobre el video.
    <section
      ref={ref}
      className="dark relative -mt-16 flex min-h-[100svh] items-center overflow-hidden bg-black px-4 pb-16 pt-28 text-foreground"
    >
      <motion.div
        aria-hidden
        style={{ y: videoY }}
        className="absolute inset-0 scale-110 will-change-transform"
      >
        <BackgroundVideo src={HERO_VIDEO_SRC} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary),transparent)] opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <ScrollReveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950/80 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Crea, vende y escala eventos sin fricción
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Convierte cada evento en una operación rentable.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-white/80 sm:text-lg">
            Eventezer unifica publicación, ticketing, pagos, check-ins y analítica en una sola
            plataforma. Empieza gratis y reduce comisión al escalar; solo cobramos comisión cuando
            la orden queda <strong className="text-white">APROBADO</strong>.
          </p>
        </ScrollReveal>
        <ScrollReveal
          delay={0.15}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton>
            <Button size="lg" className="rounded-full px-8" asChild>
              {signupEnabled ? (
                <a href={APP_REGISTER_URL} onClick={() => trackPixelEvent('InitiateCheckout')}>
                  Crear mi evento gratis
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <a href="#contacto" onClick={() => trackPixelEvent('Contact')}>
                  Quiero usar Eventezer
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </Button>
          </MagneticButton>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/30 bg-white/5 px-8 text-white backdrop-blur hover:bg-white/15 hover:text-white"
            asChild
          >
            <a href={DEMO_URL} onClick={() => trackCustomPixelEvent('ViewDemo')}>
              Ver Demo
            </a>
          </Button>
        </ScrollReveal>
      </motion.div>

      <ChevronDown
        aria-hidden
        className="absolute bottom-6 left-1/2 h-6 w-6 -translate-x-1/2 animate-bounce text-white/70 motion-reduce:animate-none"
      />
    </section>
  );
}
