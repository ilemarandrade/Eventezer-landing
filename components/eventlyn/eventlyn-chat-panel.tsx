'use client';

import type { EventlynChat } from './hooks/use-eventlyn-chat';
import { MAX_MESSAGE_LENGTH } from './hooks/use-eventlyn-chat';
import { EventlynComposer } from './eventlyn-composer';
import { EventlynHeader } from './eventlyn-header';
import { EventlynMessageList } from './eventlyn-message-list';
import { EventlynWelcome } from './eventlyn-welcome';

interface EventlynChatPanelProps {
  chat: EventlynChat;
  onClose: () => void;
}

/** Ensambla el panel: cabecera, mensajes y caja de texto. No tiene lógica propia. */
export function EventlynChatPanel({ chat, onClose }: EventlynChatPanelProps) {
  return (
    <section
      aria-label="Chat con Evelyn"
      className="flex h-[min(600px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border bg-card text-card-foreground shadow-2xl sm:w-[380px]"
    >
      <EventlynHeader
        isOnline={chat.status?.available === true}
        canRestart={chat.hasConversation && !chat.isStreaming}
        onRestart={chat.restart}
        onClose={onClose}
      />

      <EventlynMessageList
        welcome={
          <EventlynWelcome
            showStart={!chat.hasConversation}
            isStarting={chat.isStarting}
            isChecking={chat.isChecking}
            unavailableMessage={chat.unavailableMessage}
            onStart={chat.start}
          />
        }
        messages={chat.messages}
        activeToolLabel={chat.activeToolLabel}
        isRestoring={chat.isRestoring}
        notice={chat.notice}
        onRestart={chat.restart}
      />

      {chat.hasConversation && (
        <EventlynComposer
          maxLength={MAX_MESSAGE_LENGTH}
          canSend={chat.canSend}
          isStreaming={chat.isStreaming}
          onSend={chat.send}
          onStop={chat.stop}
        />
      )}
    </section>
  );
}
