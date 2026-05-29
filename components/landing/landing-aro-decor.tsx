'use client';

import Image from 'next/image';
import { DecorParallaxLayer, useDecorParallax } from '@/components/landing/use-decor-parallax';

/** Capa decorativa fija a la derecha (Hero); parallax suave al hacer scroll. */
export function LandingAroDecor() {
  const y = useDecorParallax(undefined, [0, 140]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 top-0 z-0 block h-[min(42vh,260px)] w-[min(34vw,130px)] sm:h-[min(55vh,400px)] sm:w-[min(36vw,200px)] md:h-[min(85vh,720px)] md:w-[min(38vw,340px)]"
    >
      <DecorParallaxLayer y={y} className="relative h-full w-full">
        <Image
          src="/images/aro.jpg"
          alt=""
          width={793}
          height={1122}
          sizes="(min-width: 768px) 340px, 130px"
          className="h-full w-full object-contain object-right opacity-55 dark:opacity-45 sm:opacity-75 sm:dark:opacity-60 md:opacity-90 md:dark:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/70 to-transparent" />
      </DecorParallaxLayer>
    </div>
  );
}
