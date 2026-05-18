'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDecorParallax } from '@/components/landing/use-decor-parallax';

/** Decoración central-derecha; parallax medio para no competir con aro, espiral y cono. */
export function LandingCilindroDecor() {
  const y = useDecorParallax(undefined, [-55, 130]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 left-[38vh] z-0 hidden h-[min(32vh,300px)] w-[min(20vw,180px)] md:top-[42vh] md:block"
    >
      <motion.div style={{ y }} className="relative h-full w-full">
        <Image
          src="/images/cilindro.png"
          alt=""
          width={863}
          height={1180}
          sizes="(min-width: 768px) 180px, 0px"
          className="h-full w-full object-contain object-right opacity-75 dark:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-transparent" />
      </motion.div>
    </div>
  );
}
