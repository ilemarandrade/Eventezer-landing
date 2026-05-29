'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState, type ReactNode, type RefObject } from 'react';

type ScrollTarget = RefObject<HTMLElement | null> | undefined;

export function useDecorParallax(
  scrollTarget: ScrollTarget,
  range: [number, number] = [0, 120],
): MotionValue<number> {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll(
    scrollTarget
      ? {
          target: scrollTarget,
          offset: ['start end', 'end start'],
        }
      : undefined,
  );

  return useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : range);
}

/** Evita mismatch de hidratación: el SSR no aplica transform de scroll. */
export function useParallaxReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

export function DecorParallaxLayer({
  y,
  className,
  children,
}: {
  y: MotionValue<number>;
  className?: string;
  children: ReactNode;
}) {
  const ready = useParallaxReady();

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
