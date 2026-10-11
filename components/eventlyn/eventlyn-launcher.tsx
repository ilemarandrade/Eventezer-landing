'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { EventlynAvatar } from './eventlyn-avatar';
import { useLauncherTeaser } from './hooks/use-launcher-teaser';

interface EventlynLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

/** Botón flotante con pulso, rebote periódico y burbuja de invitación (llamado a la acción). */
export function EventlynLauncher({ isOpen, onToggle }: EventlynLauncherProps) {
  const reduceMotion = useReducedMotion();
  const teaser = useLauncherTeaser({ delayMs: 3500, suppressed: isOpen });
  const animate = !reduceMotion && !isOpen;

  function handleToggle() {
    teaser.dismiss();
    onToggle();
  }

  return (
    <div className="flex items-end gap-3">
      <AnimatePresence>
        {teaser.isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative mb-2 max-w-[220px] rounded-2xl rounded-br-sm border bg-card px-4 py-3 text-sm text-card-foreground shadow-lg"
          >
            <button
              type="button"
              onClick={teaser.dismiss}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border bg-card text-muted-foreground hover:text-foreground"
              aria-label="Cerrar invitación"
            >
              <X className="h-3 w-3" />
            </button>
            <button type="button" onClick={handleToggle} className="text-left">
              <span className="font-semibold">¡Hola! Soy Eventlyn 👋</span>
              <br />
              <span className="text-muted-foreground">¿Te ayudo con tu evento?</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {animate && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full bg-primary"
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 1.8 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              aria-hidden
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-primary"
              initial={{ opacity: 0.4, scale: 1 }}
              animate={{ opacity: 0, scale: 1.8 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
              aria-hidden
            />
          </>
        )}
        <motion.button
          type="button"
          onClick={handleToggle}
          aria-label={isOpen ? 'Cerrar chat con Eventlyn' : 'Abrir chat con Eventlyn'}
          aria-expanded={isOpen}
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          animate={animate ? { y: [0, -8, 0, -4, 0], rotate: [0, -8, 8, -4, 0] } : { y: 0 }}
          transition={
            animate ? { duration: 1.2, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' } : {}
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
              >
                <EventlynAvatar size="lg" online />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
