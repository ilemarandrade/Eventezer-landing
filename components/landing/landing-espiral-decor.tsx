'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDecorParallax } from '@/components/landing/use-decor-parallax';

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
      className="pointer-events-none absolute bottom-0 left-0 top-32 z-0 hidden w-[min(34vw,300px)] md:top-48 md:block"
    >
      <div className="sticky top-48 h-[min(75vh,640px)] overflow-hidden pt-8 md:top-56 md:pt-12">
        <motion.div style={{ y }} className="relative h-full w-full">
          <Image
            src="/images/espiral.jpg"
            alt=""
            width={793}
            height={1122}
            sizes="(min-width: 768px) 340px, 0px"
            className="h-full w-full object-contain object-right opacity-90 dark:opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/70 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
