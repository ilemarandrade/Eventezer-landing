'use client';

import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRY_LIST } from '@/lib/country';
import { useCountry } from '@/components/providers/country-provider';
import { cn } from '@/lib/utils';

export function CountrySwitcher({ className }: { className?: string }) {
  const { country, setCountry } = useCountry();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const active = COUNTRY_LIST.find((c) => c.code === country) ?? COUNTRY_LIST[0]!;

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Cambiar país"
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          'flex h-10 items-center gap-1.5 rounded-md bg-transparent px-2.5 text-sm font-medium text-foreground transition-colors',
          'hover:bg-accent/60',
          isOpen && 'bg-accent/60',
        )}
      >
        <span className="text-base leading-none">{active.flag}</span>
        <span className="hidden sm:inline">{active.name}</span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-muted-foreground transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full z-[60] mt-2 w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg"
          >
            {COUNTRY_LIST.map((c) => (
              <motion.li
                key={c.code}
                role="option"
                aria-selected={c.code === country}
                whileHover={{ x: 2 }}
                onClick={() => {
                  setCountry(c.code);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  c.code === country
                    ? 'bg-muted/70 font-medium text-foreground'
                    : 'text-foreground',
                )}
              >
                <span className="text-base leading-none">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                {c.code === country && <Check className="h-4 w-4 text-primary" />}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
