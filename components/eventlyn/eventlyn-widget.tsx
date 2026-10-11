'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EventlynChatPanel } from './eventlyn-chat-panel';
import { EventlynLauncher } from './eventlyn-launcher';
import { useEventlynChat } from './hooks/use-eventlyn-chat';

/**
 * Chat flotante de Eventlyn. El estado del chat vive aquí (no en el panel)
 * para que la conversación y el stream sobrevivan al cerrar y abrir el panel.
 */
export function EventlynWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const reduceMotion = useReducedMotion();
  const chat = useEventlynChat({ enabled: hasOpened });

  const toggle = useCallback(() => {
    setIsOpen((open) => !open);
    setHasOpened(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <EventlynChatPanel chat={chat} onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
      <EventlynLauncher isOpen={isOpen} onToggle={toggle} />
    </div>
  );
}
