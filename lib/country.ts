export type Country = 'VE' | 'CO';

export interface CountryConfig {
  code: Country;
  name: string;
  flag: string;
  currency: 'USD' | 'COP';
  /** Locale usado con Intl.NumberFormat/toLocaleString para esta moneda. */
  locale: string;
  /** Rutas de los documentos legales vigentes para este país. */
  legal: {
    privacyPath: string;
    termsPath: string;
  };
}

/**
 * Única fuente de verdad para los países soportados por la landing.
 * La detección automática (lib/geo.ts), el diálogo de fallback y el
 * switcher manual del navbar leen todos de aquí — agregar un país nuevo
 * es un solo cambio en este archivo.
 */
export const COUNTRIES: Record<Country, CountryConfig> = {
  VE: {
    code: 'VE',
    name: 'Venezuela',
    flag: '🇻🇪',
    currency: 'USD',
    locale: 'es-VE',
    legal: {
      privacyPath: '/politica-de-privacidad',
      termsPath: '/terminos-de-uso',
    },
  },
  CO: {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    currency: 'COP',
    locale: 'es-CO',
    legal: {
      privacyPath: '/politica-de-privacidad-colombia',
      termsPath: '/terminos-de-uso-colombia',
    },
  },
};

export const DEFAULT_COUNTRY: Country = 'VE';

export const COUNTRY_LIST: CountryConfig[] = Object.values(COUNTRIES);

export function isSupportedCountry(value: string | null | undefined): value is Country {
  return !!value && value in COUNTRIES;
}

export type LegalDocKind = 'privacy' | 'terms';

/**
 * Si `pathname` es la política de privacidad o los términos de uso de
 * CUALQUIER país soportado, devuelve de qué documento se trata — así el
 * switcher puede redirigir a la versión equivalente del país recién
 * elegido en vez de dejar al usuario viendo el documento del país anterior.
 */
export function getLegalDocKind(pathname: string): LegalDocKind | null {
  for (const c of COUNTRY_LIST) {
    if (pathname === c.legal.privacyPath) return 'privacy';
    if (pathname === c.legal.termsPath) return 'terms';
  }
  return null;
}
