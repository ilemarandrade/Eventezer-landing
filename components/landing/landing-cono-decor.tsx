'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDecorParallax } from '@/components/landing/use-decor-parallax';

/** Decoración inferior derecha; parallax en sentido opuesto al aro para evitar solapamiento visual. */
export function LandingConoDecor() {
  const y = useDecorParallax(undefined, [50, -120]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-8 right-0 z-0 hidden h-[min(40vh,360px)] w-[min(24vw,200px)] md:bottom-12 md:block lg:right-6 lg:w-[min(22vw,220px)]"
    >
      <motion.div style={{ y }} className="relative h-full w-full">
        <Image
          src="/images/cono.jpg"
          alt=""
          width={793}
          height={1122}
          sizes="(min-width: 768px) 200px, 0px"
          className="h-full w-full object-contain object-right opacity-80 dark:opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-transparent" />
      </motion.div>
    </div>
  );
}
