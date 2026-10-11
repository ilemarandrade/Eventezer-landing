'use client';

import { useEffect, useState } from 'react';
import { getStatus } from '@/lib/agents/public-agents-api';
import type { AgentStatus } from '@/lib/agents/types';

const FALLBACK_STATUS: AgentStatus = { available: false, reason: 'UNAVAILABLE' };

/** Consulta si el chat está disponible. Solo hace la petición cuando `enabled` es true. */
export function useAgentStatus(enabled: boolean) {
  const [status, setStatus] = useState<AgentStatus | null>(null);

  useEffect(() => {
    if (!enabled || status) return;
    let cancelled = false;

    getStatus()
      .then((next) => {
        if (!cancelled) setStatus(next);
      })
      .catch(() => {
        if (!cancelled) setStatus(FALLBACK_STATUS);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, status]);

  return { status, isChecking: enabled && status === null };
}
