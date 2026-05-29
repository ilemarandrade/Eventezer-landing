'use client';

import Image from 'next/image';
import { DecorParallaxLayer, useDecorParallax } from '@/components/landing/use-decor-parallax';

/** Decoración central-derecha; parallax medio para no competir con aro, espiral y cono. */
export function LandingCilindroDecor() {
  const y = useDecorParallax(undefined, [-55, 130]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 top-[48vh] z-0 block h-[min(20vh,160px)] w-[min(28vw,96px)] sm:top-[44vh] sm:h-[min(26vh,220px)] sm:w-[min(24vw,140px)] md:left-[38vh] md:top-[42vh] md:h-[min(32vh,300px)] md:w-[min(20vw,180px)]"
    >
      <DecorParallaxLayer y={y} className="relative h-full w-full">
        <Image
          src="/images/cilindro.png"
          alt=""
          width={863}
          height={1180}
          sizes="(min-width: 768px) 180px, 96px"
          className="h-full w-full object-contain object-right opacity-50 dark:opacity-40 sm:opacity-65 sm:dark:opacity-50 md:opacity-75 md:dark:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-transparent" />
      </DecorParallaxLayer>
    </div>
  );
}
