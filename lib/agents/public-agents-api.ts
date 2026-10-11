import type { Country } from '@/lib/country';
import type {
  AgentSseEvent,
  AgentStatus,
  ApiEnvelope,
  HistoryMessage,
  PublicConversation,
} from '@/lib/agents/types';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/public/agents`;
const TOKEN_HEADER = 'X-Conversation-Token';

/** Error HTTP del backend (antes de abrir el stream), con el status y el mensaje del envelope. */
export class AgentApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'AgentApiError';
  }
}

/** Construye un `AgentApiError` con el `message` del envelope; si no se puede, usa el status HTTP. */
async function toApiError(res: Response): Promise<AgentApiError> {
  try {
    const body = (await res.json()) as Partial<ApiEnvelope<unknown>>;
    const message = Array.isArray(body.message) ? body.message.join(', ') : body.message;
    if (message) return new AgentApiError(res.status, message);
  } catch {
    // Cuerpo vacío o no JSON.
  }
  return new AgentApiError(res.status, res.statusText || 'Error en la solicitud');
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  if (!res.ok) throw await toApiError(res);
  const body = (await res.json()) as ApiEnvelope<T>;
  return body.data;
}

export function getStatus(): Promise<AgentStatus> {
  return requestJson<AgentStatus>('/status');
}

export function createConversation(country: Country): Promise<PublicConversation> {
  return requestJson<PublicConversation>('/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country }),
  });
}

export function getHistory(id: string, token: string): Promise<HistoryMessage[]> {
  return requestJson<HistoryMessage[]>(`/conversations/${encodeURIComponent(id)}/messages`, {
    headers: { [TOKEN_HEADER]: token },
  });
}

/** Parsea un bloque SSE (líneas `event:` / `data:`) a un evento tipado. */
function parseSseBlock(block: string): AgentSseEvent | null {
  let event = 'message';
  const dataLines: string[] = [];

  for (const line of block.split('\n')) {
    if (!line || line.startsWith(':')) continue;
    const sep = line.indexOf(':');
    const field = sep === -1 ? line : line.slice(0, sep);
    let value = sep === -1 ? '' : line.slice(sep + 1);
    if (value.startsWith(' ')) value = value.slice(1);

    if (field === 'event') event = value;
    else if (field === 'data') dataLines.push(value);
  }

  if (dataLines.length === 0) return null;

  try {
    const data: unknown = JSON.parse(dataLines.join('\n'));
    return { event, data } as AgentSseEvent;
  } catch {
    return null;
  }
}

/**
 * Envía un mensaje y consume la respuesta SSE (sobre POST, sin envelope).
 * Llama `onEvent` por cada evento recibido. Resuelve cuando el stream termina.
 */
export async function sendMessage(
  id: string,
  token: string,
  content: string,
  onEvent: (event: AgentSseEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/conversations/${encodeURIComponent(id)}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      [TOKEN_HEADER]: token,
    },
    body: JSON.stringify({ content }),
    signal,
  });

  if (!res.ok) throw await toApiError(res);
  if (!res.body) throw new Error('La respuesta no tiene cuerpo para leer el stream.');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      // Se normaliza sobre el buffer completo para no romper un `\r\n` partido entre chunks.
      buffer = (buffer + decoder.decode(value, { stream: true })).replace(/\r\n/g, '\n');

      let boundary = buffer.indexOf('\n\n');
      while (boundary !== -1) {
        const block = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const parsed = parseSseBlock(block);
        if (parsed) onEvent(parsed);
        boundary = buffer.indexOf('\n\n');
      }
    }

    // Último evento sin línea en blanco final.
    buffer = (buffer + decoder.decode()).replace(/\r\n?/g, '\n');
    const parsed = parseSseBlock(buffer.trim());
    if (parsed) onEvent(parsed);
  } finally {
    reader.releaseLock();
  }
}
