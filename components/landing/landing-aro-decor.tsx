'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDecorParallax } from '@/components/landing/use-decor-parallax';

/** Capa decorativa fija a la derecha (Hero); parallax suave al hacer scroll. */
export function LandingAroDecor() {
  const y = useDecorParallax(undefined, [0, 140]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 top-0 z-10 hidden h-[min(85vh,720px)] w-[min(38vw,340px)] md:block"
    >
      <motion.div style={{ y }} className="relative h-full w-full">
        <Image
          src="/images/aro.jpg"
          alt=""
          width={793}
          height={1122}
          sizes="(min-width: 768px) 340px, 0px"
          className="h-full w-full object-contain object-right opacity-90 dark:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/70 to-transparent" />
      </motion.div>
    </div>
  );
}
