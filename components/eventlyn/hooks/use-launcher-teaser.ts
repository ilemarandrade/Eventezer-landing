'use client';

import { useCallback, useEffect, useState } from 'react';

const DISMISSED_KEY = 'eventlyn:teaser-dismissed';

function wasDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISSED_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Burbuja de invitación junto al botón flotante: aparece tras `delayMs` y no
 * vuelve a mostrarse en la sesión una vez que el usuario la cierra o abre el chat.
 */
export function useLauncherTeaser({
  delayMs,
  suppressed,
}: {
  delayMs: number;
  suppressed: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (suppressed || wasDismissed()) return;
    const timer = window.setTimeout(() => setIsVisible(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs, suppressed]);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, '1');
    } catch {
      // sessionStorage no disponible.
    }
  }, []);

  return { isVisible: isVisible && !suppressed, dismiss };
}
