'use client';

import * as React from 'react';
import { type Country, DEFAULT_COUNTRY, isSupportedCountry } from '@/lib/country';
import { detectCountryByIp } from '@/lib/geo';

const STORAGE_KEY = 'evz_country';

interface CountryContextValue {
  country: Country;
  /** true mientras no se ha determinado el país (evita parpadeos de precio/moneda). */
  isLoading: boolean;
  /** true cuando ni localStorage ni la detección por IP resolvieron un país soportado. */
  needsCountryPrompt: boolean;
  setCountry: (country: Country) => void;
}

const CountryContext = React.createContext<CountryContextValue | undefined>(undefined);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = React.useState<Country>(DEFAULT_COUNTRY);
  const [isLoading, setIsLoading] = React.useState(true);
  const [needsCountryPrompt, setNeedsCountryPrompt] = React.useState(false);

  const setCountry = React.useCallback((next: Country) => {
    setCountryState(next);
    setNeedsCountryPrompt(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage no disponible (modo privado, etc.) — se mantiene solo en memoria.
    }
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    async function resolveCountry() {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }

      if (isSupportedCountry(stored)) {
        if (!cancelled) {
          setCountryState(stored);
          setIsLoading(false);
        }
        return;
      }

      const detected = await detectCountryByIp();
      if (cancelled) return;

      if (detected) {
        setCountry(detected);
      } else {
        setNeedsCountryPrompt(true);
      }
      setIsLoading(false);
    }

    resolveCountry();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = React.useMemo(
    () => ({ country, isLoading, needsCountryPrompt, setCountry }),
    [country, isLoading, needsCountryPrompt, setCountry],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry(): CountryContextValue {
  const ctx = React.useContext(CountryContext);
  if (!ctx) {
    throw new Error('useCountry debe usarse dentro de <CountryProvider>');
  }
  return ctx;
}
