'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCountry } from '@/components/providers/country-provider';
import {
  getToolLabel,
  getUnavailableMessage,
  historyToChatMessages,
  requestErrorToNotice,
} from '@/lib/agents/chat-adapters';
import { createConversationStorage } from '@/lib/agents/conversation-storage';
import { getHistory } from '@/lib/agents/public-agents-api';
import { useAgentStatus } from './use-agent-status';
import { useChatMessages } from './use-chat-messages';
import { useConversationSession } from './use-conversation-session';
import { isAbortError, useMessageStream } from './use-message-stream';

export const MAX_MESSAGE_LENGTH = 2000;

const storage = createConversationStorage('eventlyn:conversation');

/**
 * Orquesta el chat de Eventlyn: compone el estado del servicio, la sesión,
 * los mensajes y el stream, y expone a la vista solo lo que necesita pintar.
 * `enabled` evita llamar al backend hasta que el usuario abre el chat.
 */
export function useEventlynChat({ enabled }: { enabled: boolean }) {
  const { country } = useCountry();
  const { status, isChecking } = useAgentStatus(enabled);
  const {
    session,
    isStarting,
    start: startSession,
    clear: clearSession,
  } = useConversationSession(storage);
  const chat = useChatMessages();
  const { isStreaming, send: sendStream, stop } = useMessageStream();
  const [isRestoring, setIsRestoring] = useState(false);
  /** Id de la conversación cuyos mensajes ya están cargados en `chat`. */
  const loadedIdRef = useRef<string | null>(null);

  const { hydrate, fail, reset, startTurn, applyEvent, endTurn } = chat;

  // Recupera el historial de una conversación guardada al abrir el chat.
  useEffect(() => {
    if (!enabled || !session || loadedIdRef.current === session.id) return;
    loadedIdRef.current = session.id;
    let cancelled = false;
    setIsRestoring(true);

    getHistory(session.id, session.accessToken)
      .then((history) => {
        if (!cancelled) hydrate(historyToChatMessages(history));
      })
      .catch(() => {
        // Token vencido o conversación borrada: se empieza de cero.
        if (cancelled) return;
        loadedIdRef.current = null;
        clearSession();
        reset();
      })
      .finally(() => {
        if (!cancelled) setIsRestoring(false);
      });

    return () => {
      cancelled = true;
      setIsRestoring(false);
      if (loadedIdRef.current === session.id) loadedIdRef.current = null;
    };
  }, [enabled, session, hydrate, reset, clearSession]);

  const start = useCallback(async () => {
    try {
      const next = await startSession(country);
      loadedIdRef.current = next.id;
      reset();
    } catch (error) {
      fail(requestErrorToNotice(error));
    }
  }, [startSession, country, reset, fail]);

  const restart = useCallback(async () => {
    stop();
    clearSession();
    reset();
    await start();
  }, [stop, clearSession, reset, start]);

  const isAvailable = status?.available === true;
  const isBlocked = chat.notice !== null && !chat.notice.retryable;
  const canSend = !!session && isAvailable && !isStreaming && !isRestoring && !isBlocked;

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!session || !canSend || !content || content.length > MAX_MESSAGE_LENGTH) return false;

      startTurn(content);
      try {
        await sendStream(session, content, applyEvent);
      } catch (error) {
        if (!isAbortError(error)) fail(requestErrorToNotice(error));
      } finally {
        endTurn();
      }
      return true;
    },
    [session, canSend, startTurn, sendStream, applyEvent, fail, endTurn],
  );

  return {
    status,
    isChecking,
    unavailableMessage: status ? getUnavailableMessage(status) : null,
    hasConversation: !!session,
    messages: chat.messages,
    activeToolLabel: chat.activeTool ? getToolLabel(chat.activeTool) : null,
    notice: chat.notice,
    isStarting,
    isRestoring,
    isStreaming,
    canSend,
    start,
    restart,
    send,
    stop,
  };
}

export type EventlynChat = ReturnType<typeof useEventlynChat>;
