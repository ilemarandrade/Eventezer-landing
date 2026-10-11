import type { Country } from '@/lib/country';

export interface AgentStatus {
  available: boolean;
  reason: 'CREDIT_LIMIT' | 'UNAVAILABLE' | null;
}

export interface PublicConversation {
  id: string;
  context: string;
  country: Country;
  createdAt: string;
  /** Token opaco que se envía en el header `X-Conversation-Token`. */
  accessToken: string;
}

export interface HistoryMessage {
  id: string;
  role: 'human' | 'ai';
  agentKey: string | null;
  text: string;
  createdAt: string;
}

/** Envelope estándar de las respuestas JSON del backend. */
export interface ApiEnvelope<T> {
  statusCode: number;
  message: string;
  data: T;
}

export type AgentSseEvent =
  | { event: 'agent'; data: { key: string; name: string } }
  | { event: 'delta'; data: { text: string } }
  | { event: 'tool'; data: { name: string; status: 'started' | 'finished' } }
  | { event: 'done'; data: { messageId: string } }
  | { event: 'limit'; data: { reason: 'TURN_LIMIT'; message: string } }
  | { event: 'error'; data: { code: string; message: string } };

export type AgentSseEventName = AgentSseEvent['event'];
