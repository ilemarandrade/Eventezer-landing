'use client';

import { useCallback, useState } from 'react';
import { SendHorizontal, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAutosizeTextarea } from './hooks/use-autosize-textarea';
import { useEnterToSubmit } from './hooks/use-enter-to-submit';

interface EventlynComposerProps {
  maxLength: number;
  canSend: boolean;
  isStreaming: boolean;
  onSend: (text: string) => Promise<boolean>;
  onStop: () => void;
}

/** Caja de texto: Enter envía, Shift+Enter hace salto de línea. Es dueña del borrador. */
export function EventlynComposer({
  maxLength,
  canSend,
  isStreaming,
  onSend,
  onStop,
}: EventlynComposerProps) {
  const [draft, setDraft] = useState('');
  const textareaRef = useAutosizeTextarea(draft);
  const length = draft.trim().length;
  const isValid = length > 0 && length <= maxLength;

  const submit = useCallback(() => {
    if (!canSend || !isValid) return;
    const text = draft;
    setDraft('');
    void onSend(text).then((sent) => {
      if (!sent) setDraft(text);
    });
  }, [canSend, isValid, draft, onSend]);

  const handleKeyDown = useEnterToSubmit(submit);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="border-t bg-card p-3"
    >
      <div className="flex items-end gap-2 rounded-2xl border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Escribe tu mensaje…"
          aria-label="Mensaje para Evelyn"
          className="max-h-[140px] flex-1 resize-none bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80"
            aria-label="Detener respuesta"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSend || !isValid}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            aria-label="Enviar mensaje"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="mt-1 flex justify-between px-1 text-[11px] text-muted-foreground">
        <span>Enter para enviar · Shift + Enter para nueva línea</span>
        {length > maxLength * 0.9 && (
          <span className={cn(length > maxLength && 'text-destructive')}>
            {length}/{maxLength}
          </span>
        )}
      </div>
    </form>
  );
}
