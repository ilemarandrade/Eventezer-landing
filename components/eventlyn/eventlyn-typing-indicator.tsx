/** Tres puntos animados + texto opcional ("Calculando costos…"). */
export function EventlynTypingIndicator({ label }: { label?: string | null }) {
  return (
    <span
      className="flex items-center gap-2"
      role="status"
      aria-label={label ?? 'Evelyn está escribiendo'}
    >
      <span className="flex gap-1">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </span>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </span>
  );
}
