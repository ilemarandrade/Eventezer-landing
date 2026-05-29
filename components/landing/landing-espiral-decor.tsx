'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { DecorParallaxLayer, useDecorParallax } from '@/components/landing/use-decor-parallax';

/**
 * Decoración derecha desde la 2.ª sección; parallax ligado al scroll de ese bloque.
 */
export function LandingEspiralDecor() {
  const regionRef = useRef<HTMLDivElement>(null);
  const y = useDecorParallax(regionRef, [-70, 110]);

  return (
    <div
      ref={regionRef}
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 top-24 z-0 block w-[min(32vw,130px)] sm:top-36 sm:w-[min(32vw,200px)] md:top-48 md:w-[min(34vw,300px)]"
    >
      <div className="sticky top-24 h-[min(50vh,420px)] overflow-hidden pt-4 sm:top-40 sm:h-[min(65vh,520px)] sm:pt-6 md:top-56 md:h-[min(75vh,640px)] md:pt-12">
        <DecorParallaxLayer y={y} className="relative h-full w-full">
          <Image
            src="/images/espiral.jpg"
            alt=""
            width={793}
            height={1122}
            sizes="(min-width: 768px) 340px, 130px"
            className="h-full w-full object-contain object-right opacity-55 dark:opacity-45 sm:opacity-75 sm:dark:opacity-60 md:opacity-90 md:dark:opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/70 to-transparent" />
        </DecorParallaxLayer>
      </div>
    </div>
  );
}
