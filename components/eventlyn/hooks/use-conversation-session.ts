'use client';

import { useCallback, useEffect, useState } from 'react';
import { createConversation } from '@/lib/agents/public-agents-api';
import type { ConversationSession } from '@/lib/agents/chat-model';
import type { ConversationStorage } from '@/lib/agents/conversation-storage';
import type { Country } from '@/lib/country';

/** Crea, recupera y descarta la conversación pública persistida en `storage`. */
export function useConversationSession(storage: ConversationStorage) {
  const [session, setSession] = useState<ConversationSession | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    setSession(storage.read());
  }, [storage]);

  /** Crea una conversación nueva. Lanza el error del backend para que lo maneje quien llama. */
  const start = useCallback(
    async (country: Country): Promise<ConversationSession> => {
      setIsStarting(true);
      try {
        const conversation = await createConversation(country);
        const next = { id: conversation.id, accessToken: conversation.accessToken };
        storage.write(next);
        setSession(next);
        return next;
      } finally {
        setIsStarting(false);
      }
    },
    [storage],
  );

  const clear = useCallback(() => {
    storage.clear();
    setSession(null);
  }, [storage]);

  return { session, isStarting, start, clear };
}
