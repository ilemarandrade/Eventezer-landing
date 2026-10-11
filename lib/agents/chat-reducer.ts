import {
  createPendingAssistantMessage,
  createUserMessage,
  errorEventToNotice,
  limitEventToNotice,
} from '@/lib/agents/chat-adapters';
import type { ChatMessage, ChatNotice } from '@/lib/agents/chat-model';
import type { AgentSseEvent } from '@/lib/agents/types';

/**
 * Estado de los mensajes del chat y cómo cambia con cada evento del stream.
 * Es una función pura: no sabe de fetch, de React ni de storage.
 */
export interface ChatState {
  messages: ChatMessage[];
  /** Id del mensaje del asistente que se está generando. */
  pendingId: string | null;
  /** Herramienta que el agente está usando ahora mismo. */
  activeTool: string | null;
  notice: ChatNotice | null;
}

export type ChatAction =
  | { type: 'hydrated'; messages: ChatMessage[] }
  | { type: 'turnStarted'; text: string }
  | { type: 'streamEvent'; event: AgentSseEvent }
  | { type: 'turnFailed'; notice: ChatNotice }
  | { type: 'turnEnded' }
  | { type: 'reset' };

export const initialChatState: ChatState = {
  messages: [],
  pendingId: null,
  activeTool: null,
  notice: null,
};

function updatePending(state: ChatState, update: (m: ChatMessage) => ChatMessage): ChatState {
  if (!state.pendingId) return state;
  return {
    ...state,
    messages: state.messages.map((m) => (m.id === state.pendingId ? update(m) : m)),
  };
}

function applyStreamEvent(state: ChatState, event: AgentSseEvent): ChatState {
  switch (event.event) {
    case 'agent':
      return updatePending(state, (m) => ({ ...m, agentName: event.data.name }));
    case 'delta':
      return updatePending({ ...state, activeTool: null }, (m) => ({
        ...m,
        text: m.text + event.data.text,
      }));
    case 'tool':
      return { ...state, activeTool: event.data.status === 'started' ? event.data.name : null };
    case 'done':
      return { ...state, activeTool: null };
    case 'limit':
      return { ...state, activeTool: null, notice: limitEventToNotice(event.data.message) };
    case 'error':
      return {
        ...state,
        activeTool: null,
        notice: errorEventToNotice(event.data.code, event.data.message),
      };
    default:
      return state;
  }
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'hydrated':
      return { ...initialChatState, messages: action.messages };

    case 'turnStarted': {
      const pending = createPendingAssistantMessage();
      return {
        messages: [...state.messages, createUserMessage(action.text), pending],
        pendingId: pending.id,
        activeTool: null,
        notice: null,
      };
    }

    case 'streamEvent':
      return applyStreamEvent(state, action.event);

    case 'turnFailed':
      return { ...state, notice: action.notice };

    case 'turnEnded':
      return {
        ...state,
        pendingId: null,
        activeTool: null,
        // Cierra el mensaje en curso y descarta la burbuja si no llegó texto.
        messages: state.messages
          .filter((m) => m.id !== state.pendingId || m.text.length > 0)
          .map((m) => (m.id === state.pendingId ? { ...m, status: 'done' } : m)),
      };

    case 'reset':
      return initialChatState;

    default:
      return state;
  }
}
