import { Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventlynMessageBubble } from './eventlyn-message-bubble';

interface EventlynWelcomeProps {
  /** Si es false, ya hay conversación y no se muestra el botón de inicio. */
  showStart: boolean;
  isStarting: boolean;
  isChecking: boolean;
  unavailableMessage: string | null;
  onStart: () => void;
}

/** Primer mensaje de Eventlyn: saludo y botón para iniciar la conversación. */
export function EventlynWelcome({
  showStart,
  isStarting,
  isChecking,
  unavailableMessage,
  onStart,
}: EventlynWelcomeProps) {
  return (
    <EventlynMessageBubble author="assistant">
      <p>
        ¡Hola! 👋 Soy <strong>Eventlyn</strong>, tu asistente virtual. Bienvenido a{' '}
        <strong>Eventezer</strong> ✨
      </p>
      <p className="mt-1.5">
        Estoy aquí para ayudarte con lo que necesites: planes y costos, cómo vender tus entradas o
        cualquier duda sobre la plataforma. ¡Será un gusto acompañarte!
      </p>

      {showStart && unavailableMessage && (
        <p className="mt-2 rounded-lg bg-background/60 p-2 text-xs text-muted-foreground">
          {unavailableMessage}
        </p>
      )}

      {showStart && !unavailableMessage && (
        <Button
          type="button"
          size="sm"
          onClick={onStart}
          disabled={isStarting || isChecking}
          className="mt-3 w-full rounded-full"
        >
          {isStarting || isChecking ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MessageCircle className="mr-2 h-4 w-4" />
          )}
          {isStarting ? 'Iniciando…' : 'Iniciar conversación'}
        </Button>
      )}
    </EventlynMessageBubble>
  );
}
