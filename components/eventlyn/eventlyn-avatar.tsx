import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventlynAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  /** Muestra el punto verde de "en línea". */
  online?: boolean;
  className?: string;
}

const SIZES = {
  sm: { box: 'h-7 w-7', icon: 'h-3.5 w-3.5' },
  md: { box: 'h-10 w-10', icon: 'h-5 w-5' },
  lg: { box: 'h-14 w-14', icon: 'h-6 w-6' },
};

export function EventlynAvatar({ size = 'md', online = false, className }: EventlynAvatarProps) {
  const s = SIZES[size];
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-md',
          s.box,
        )}
      >
        <Sparkles className={s.icon} aria-hidden />
      </span>
      {online && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
      )}
    </span>
  );
}
