import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ChatNotice } from '@/lib/agents/chat-model';

interface EventlynNoticeProps {
  notice: ChatNotice;
  onRestart: () => void;
}

/** Aviso de límite o error. Si no se puede seguir en esta conversación, ofrece salidas. */
export function EventlynNotice({ notice, onRestart }: EventlynNoticeProps) {
  const isLimit = notice.kind === 'limit';
  const isCreditLimit = notice.code === 'LLM_CREDIT_LIMIT';

  return (
    <div className="mx-auto w-full rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-foreground">
      <p className="flex gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
        <span>{notice.message}</span>
      </p>

      {!notice.retryable && (
        <div className="mt-2 flex flex-wrap gap-2 pl-6">
          {(isLimit || isCreditLimit) && (
            <Button asChild size="sm" variant="outline" className="h-7 rounded-full text-xs">
              <Link href="/#contacto">Escríbenos</Link>
            </Button>
          )}
          {!isCreditLimit && (
            <Button
              type="button"
              size="sm"
              onClick={onRestart}
              className="h-7 rounded-full text-xs"
            >
              Nueva conversación
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
