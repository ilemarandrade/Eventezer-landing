'use client';

import { useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

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
