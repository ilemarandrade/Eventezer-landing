import { AgentApiError } from '@/lib/agents/public-agents-api';
import type { AgentStatus, HistoryMessage } from '@/lib/agents/types';
import type { ChatMessage, ChatNotice } from '@/lib/agents/chat-model';

/** Nombres amables de los agentes del backend (el historial solo trae `agentKey`). */
const AGENT_NAMES: Record<string, string> = {
  'faq-assistant': 'Evelyn',
  'plan-advisor': 'Evelyn · Asesora de planes',
};

/** Texto que se muestra mientras el agente usa una herramienta. */
const TOOL_LABELS: Record<string, string> = {
  calculate_plan_costs: 'Calculando costos…',
  get_tenant_usage: 'Revisando tu uso…',
  capture_lead: 'Guardando tus datos de contacto…',
};

/** Errores SSE que permiten volver a intentar en la misma conversación. */
const RETRYABLE_ERROR_CODES = new Set([
  'LLM_RATE_LIMITED',
  'LLM_UNAVAILABLE',
  'CONTENT_FILTERED',
  'INTERNAL_ERROR',
]);

const STATUS_MESSAGES: Record<NonNullable<AgentStatus['reason']>, string> = {
  CREDIT_LIMIT:
    'Hoy atendí muchísimas consultas y necesito un descanso. Vuelve mañana y con gusto te ayudo, o escríbenos desde el formulario de contacto.',
  UNAVAILABLE:
    'En este momento no estoy disponible. Intenta de nuevo en un rato o escríbenos desde el formulario de contacto.',
};

let localIdCounter = 0;

export function createLocalId(prefix: string): string {
  localIdCounter += 1;
  return `${prefix}-${Date.now()}-${localIdCounter}`;
}

export function getAgentDisplayName(agentKey: string | null | undefined): string {
  return (agentKey && AGENT_NAMES[agentKey]) || 'Evelyn';
}

export function getToolLabel(toolName: string): string {
  return TOOL_LABELS[toolName] ?? 'Pensando…';
}

export function getUnavailableMessage(status: AgentStatus): string | null {
  if (status.available) return null;
  return STATUS_MESSAGES[status.reason ?? 'UNAVAILABLE'];
}

export function historyToChatMessages(history: HistoryMessage[]): ChatMessage[] {
  return history.map((m) => ({
    id: m.id,
    author: m.role === 'human' ? 'user' : 'assistant',
    text: m.text,
    agentName: m.role === 'ai' ? getAgentDisplayName(m.agentKey) : undefined,
    status: 'done',
  }));
}

export function createUserMessage(text: string): ChatMessage {
  return { id: createLocalId('user'), author: 'user', text, status: 'done' };
}

export function createPendingAssistantMessage(): ChatMessage {
  return { id: createLocalId('assistant'), author: 'assistant', text: '', status: 'streaming' };
}

export function limitEventToNotice(message: string): ChatNotice {
  return { kind: 'limit', message, retryable: false };
}

export function errorEventToNotice(code: string, message: string): ChatNotice {
  return { kind: 'error', code, message, retryable: RETRYABLE_ERROR_CODES.has(code) };
}

/** Traduce un error lanzado por el cliente HTTP (o de red) a un aviso para el usuario. */
export function requestErrorToNotice(error: unknown): ChatNotice {
  if (error instanceof AgentApiError) {
    return {
      kind: 'error',
      code: `HTTP_${error.status}`,
      message: error.message,
      // 401/404: la conversación ya no es válida; hay que abrir otra.
      retryable: error.status !== 401 && error.status !== 404,
    };
  }
  return {
    kind: 'error',
    code: 'NETWORK',
    message: 'No pude conectarme. Revisa tu conexión e intenta de nuevo.',
    retryable: true,
  };
}
