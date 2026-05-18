'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDecorParallax } from '@/components/landing/use-decor-parallax';
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
        'pointer-events-none fixed bottom-8 z-0 hidden h-[min(40vh,360px)] w-[min(24vw,200px)] md:bottom-12 md:block lg:w-[min(22vw,220px)]',
        side === 'right' ? 'right-0 lg:right-6' : 'left-0 lg:left-6',
      )}
    >
      <motion.div style={{ y }} className="relative h-full w-full">
        <Image
          src="/images/cono.jpg"
          alt=""
          width={793}
          height={1122}
          sizes="(min-width: 768px) 200px, 0px"
          className={cn(
            'h-full w-full object-contain opacity-80 dark:opacity-65',
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
      </motion.div>
    </div>
  );
}
