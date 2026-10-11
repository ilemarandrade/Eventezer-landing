'use client';

import { useCallback, type KeyboardEvent } from 'react';

/**
 * `onKeyDown` para un textarea: Enter envía y Shift+Enter inserta un salto de línea.
 * Ignora el Enter que confirma una composición IME (teclados asiáticos, acentos, etc.).
 */
export function useEnterToSubmit(onSubmit: () => void) {
  return useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;
      event.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );
}
