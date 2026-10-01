'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Video decorativo en loop (sin audio). Solo se reproduce mientras está visible
 * y, con `prefers-reduced-motion`, se queda en el poster.
 */
export function BackgroundVideo({ src, poster, className }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={cn('h-full w-full object-cover', className)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
