import { RotateCcw, X } from 'lucide-react';
import { EventlynAvatar } from './eventlyn-avatar';

interface EventlynHeaderProps {
  isOnline: boolean;
  canRestart: boolean;
  onRestart: () => void;
  onClose: () => void;
}

export function EventlynHeader({ isOnline, canRestart, onRestart, onClose }: EventlynHeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b bg-gradient-to-r from-primary/10 to-fuchsia-500/10 px-4 py-3">
      <EventlynAvatar online={isOnline} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-tight">Eventlyn</p>
        <p className="truncate text-xs text-muted-foreground">
          {isOnline
            ? 'Asistente virtual de Eventezer · En línea'
            : 'Asistente virtual de Eventezer'}
        </p>
      </div>
      {canRestart && (
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Nueva conversación"
          title="Nueva conversación"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={onClose}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Cerrar chat"
      >
        <X className="h-4 w-4" />
      </button>
    </header>
  );
}
