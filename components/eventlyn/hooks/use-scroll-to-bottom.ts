'use client';

import { useEffect, useRef } from 'react';

/** Mantiene el contenedor desplazado al final cada vez que cambia `trigger`. */
export function useScrollToBottom(trigger: string) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [trigger]);

  return ref;
}
