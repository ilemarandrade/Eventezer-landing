'use client';

import Image from 'next/image';
import { DecorParallaxLayer, useDecorParallax } from '@/components/landing/use-decor-parallax';
import { cn } from '@/lib/utils';

type ConoSide = 'left' | 'right';

const parallaxBySide: Record<ConoSide, [number, number]> = {
  right: [50, -120],
  left: [-280, 120],
};

/** Decoración inferior; `side` define el lateral (espejo del otro cono). */
export function LandingConoDecor({ side = 'right' }: { side?: ConoSide }) {
  const y = useDecorParallax(undefined, parallaxBySide[side]);

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed bottom-4 z-0 block h-[min(26vh,200px)] w-[min(30vw,110px)] sm:bottom-8 sm:h-[min(34vh,280px)] sm:w-[min(26vw,160px)] md:bottom-12 md:h-[min(40vh,360px)] md:w-[min(24vw,200px)] lg:w-[min(22vw,220px)]',
        side === 'right' ? 'right-0 lg:right-6' : 'left-0 lg:left-6',
      )}
    >
      <DecorParallaxLayer y={y} className="relative h-full w-full">
        <Image
          src="/images/cono.jpg"
          alt=""
          width={793}
          height={1122}
          sizes="(min-width: 768px) 200px, 110px"
          className={cn(
            'h-full w-full object-contain opacity-55 dark:opacity-45 sm:opacity-70 sm:dark:opacity-55 md:opacity-80 md:dark:opacity-65',
            side === 'right' ? 'object-right' : 'object-left',
          )}
        />
        <div
          className={cn(
            'absolute inset-0',
            side === 'right'
              ? 'bg-gradient-to-l from-background via-background/80 to-transparent'
              : 'bg-gradient-to-r from-background via-background/80 to-transparent',
          )}
        />
      </DecorParallaxLayer>
    </div>
  );
}
