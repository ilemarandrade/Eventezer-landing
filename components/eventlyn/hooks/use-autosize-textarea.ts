'use client';

import { useLayoutEffect, useRef } from 'react';

/** Ajusta la altura del textarea a su contenido, hasta `maxHeight` px (luego hace scroll). */
export function useAutosizeTextarea(value: string, maxHeight = 140) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [value, maxHeight]);

  return ref;
}
