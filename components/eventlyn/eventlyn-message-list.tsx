'use client';

import type { ChatMessage, ChatNotice } from '@/lib/agents/chat-model';
import { EventlynMarkdown, EventlynMessageBubble } from './eventlyn-message-bubble';
import { EventlynNotice } from './eventlyn-notice';
import { EventlynTypingIndicator } from './eventlyn-typing-indicator';
import { useScrollToBottom } from './hooks/use-scroll-to-bottom';

interface EventlynMessageListProps {
  welcome: React.ReactNode;
  messages: ChatMessage[];
  activeToolLabel: string | null;
  isRestoring: boolean;
  notice: ChatNotice | null;
  onRestart: () => void;
}

export function EventlynMessageList({
  welcome,
  messages,
  activeToolLabel,
  isRestoring,
  notice,
  onRestart,
}: EventlynMessageListProps) {
  const last = messages[messages.length - 1];
  const scrollKey = `${messages.length}:${last?.text.length ?? 0}:${activeToolLabel}:${notice?.message}:${isRestoring}`;
  const scrollRef = useScrollToBottom(scrollKey);

  return (
    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
      {welcome}

      {isRestoring && (
        <EventlynMessageBubble author="assistant">
          <EventlynTypingIndicator label="Recuperando la conversación…" />
        </EventlynMessageBubble>
      )}

      {messages.map((m) => (
        <EventlynMessageBubble key={m.id} author={m.author}>
          {m.author === 'user' ? (
            <p className="whitespace-pre-wrap break-words">{m.text}</p>
          ) : m.text ? (
            <EventlynMarkdown text={m.text} />
          ) : (
            <EventlynTypingIndicator label={activeToolLabel} />
          )}
        </EventlynMessageBubble>
      ))}

      {notice && <EventlynNotice notice={notice} onRestart={onRestart} />}
    </div>
  );
}
