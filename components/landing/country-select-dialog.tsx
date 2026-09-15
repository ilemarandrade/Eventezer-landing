'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { COUNTRY_LIST, DEFAULT_COUNTRY } from '@/lib/country';
import { useCountry } from '@/components/providers/country-provider';

export function CountrySelectDialog() {
  const { needsCountryPrompt, setCountry } = useCountry();

  return (
    <AnimatePresence>
      {needsCountryPrompt && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="country-dialog-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lg"
          >
            <button
              type="button"
              aria-label="Cerrar y continuar con Venezuela"
              onClick={() => setCountry(DEFAULT_COUNTRY)}
              className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              ✕
            </button>

            <h2 id="country-dialog-title" className="text-lg font-semibold text-foreground">
              ¿Desde qué país nos visitas?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Elige tu país para ver precios y condiciones correctas.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {COUNTRY_LIST.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCountry(c.code)}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background p-4 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
                >
                  <span className="text-2xl">{c.flag}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
