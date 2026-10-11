import type { ConversationSession } from '@/lib/agents/chat-model';

/**
 * Persistencia de la conversación pública en `sessionStorage`. El `accessToken`
 * se entrega una sola vez al crear la conversación, así que se guarda junto al id.
 */
export function createConversationStorage(key: string) {
  return {
    read(): ConversationSession | null {
      try {
        const raw = window.sessionStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<ConversationSession>;
        return parsed.id && parsed.accessToken
          ? { id: parsed.id, accessToken: parsed.accessToken }
          : null;
      } catch {
        return null;
      }
    },

    write(session: ConversationSession): void {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(session));
      } catch {
        // sessionStorage no disponible — la conversación queda solo en memoria.
      }
    },

    clear(): void {
      try {
        window.sessionStorage.removeItem(key);
      } catch {
        // sessionStorage no disponible.
      }
    },
  };
}

export type ConversationStorage = ReturnType<typeof createConversationStorage>;
