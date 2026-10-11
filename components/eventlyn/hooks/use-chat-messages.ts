'use client';

import { useCallback, useMemo, useReducer } from 'react';
import { chatReducer, initialChatState } from '@/lib/agents/chat-reducer';
import type { ChatMessage, ChatNotice } from '@/lib/agents/chat-model';
import type { AgentSseEvent } from '@/lib/agents/types';

/** Expone el estado de los mensajes y acciones con nombre sobre `chatReducer`. */
export function useChatMessages() {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  const hydrate = useCallback(
    (messages: ChatMessage[]) => dispatch({ type: 'hydrated', messages }),
    [],
  );
  const startTurn = useCallback((text: string) => dispatch({ type: 'turnStarted', text }), []);
  const applyEvent = useCallback(
    (event: AgentSseEvent) => dispatch({ type: 'streamEvent', event }),
    [],
  );
  const fail = useCallback((notice: ChatNotice) => dispatch({ type: 'turnFailed', notice }), []);
  const endTurn = useCallback(() => dispatch({ type: 'turnEnded' }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  return useMemo(
    () => ({ ...state, hydrate, startTurn, applyEvent, fail, endTurn, reset }),
    [state, hydrate, startTurn, applyEvent, fail, endTurn, reset],
  );
}
