'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { sendMessage } from '@/lib/agents/public-agents-api';
import type { ConversationSession } from '@/lib/agents/chat-model';
import type { AgentSseEvent } from '@/lib/agents/types';

export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

/**
 * Envía un mensaje y entrega los eventos SSE a `onEvent`. Maneja el
 * `AbortController`: `stop()` corta la respuesta y se aborta al desmontar.
 */
export function useMessageStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  useEffect(() => stop, [stop]);

  const send = useCallback(
    async (
      session: ConversationSession,
      content: string,
      onEvent: (event: AgentSseEvent) => void,
    ) => {
      const controller = new AbortController();
      controllerRef.current = controller;
      setIsStreaming(true);
      try {
        await sendMessage(session.id, session.accessToken, content, onEvent, controller.signal);
      } finally {
        if (controllerRef.current === controller) controllerRef.current = null;
        setIsStreaming(false);
      }
    },
    [],
  );

  return { isStreaming, send, stop };
}
