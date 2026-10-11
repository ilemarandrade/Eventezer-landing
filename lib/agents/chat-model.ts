/**
 * Modelo de vista del chat. Es independiente del contrato del backend: los
 * adaptadores (`chat-adapters.ts`) traducen las respuestas de la API a estas
 * formas, y la UI solo conoce estas.
 */

export type ChatAuthor = 'assistant' | 'user';

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  text: string;
  /** Nombre del agente que respondió (solo mensajes del asistente). */
  agentName?: string;
  /** `streaming` mientras llegan los `delta` del turno en curso. */
  status: 'streaming' | 'done';
}

export type ChatNoticeKind = 'limit' | 'error';

export interface ChatNotice {
  kind: ChatNoticeKind;
  message: string;
  /** Código del evento SSE `error` o `HTTP_<status>` para errores antes del stream. */
  code?: string;
  /** Si el usuario puede reintentar en esta misma conversación. */
  retryable: boolean;
}

export interface ConversationSession {
  id: string;
  accessToken: string;
}
