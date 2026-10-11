import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatAuthor } from '@/lib/agents/chat-model';
import { cn } from '@/lib/utils';
import { EventlynAvatar } from './eventlyn-avatar';

interface EventlynMessageBubbleProps {
  author: ChatAuthor;
  children: React.ReactNode;
}

/** Burbuja base: Eventlyn a la izquierda (con avatar), el usuario a la derecha en color primario. */
export function EventlynMessageBubble({ author, children }: EventlynMessageBubbleProps) {
  const isUser = author === 'user';

  return (
    <div className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && <EventlynAvatar size="sm" />}
      <div className={cn('flex max-w-[80%] flex-col', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-3.5 py-2.5 text-sm shadow-sm',
            isUser
              ? 'rounded-br-sm bg-primary text-primary-foreground'
              : 'rounded-bl-sm bg-muted text-foreground',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** Texto del asistente con soporte de markdown (listas, negritas, enlaces). */
export function EventlynMarkdown({ text }: { text: string }) {
  return (
    <div className="prose prose-sm max-w-none break-words dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
