import { type Country, isSupportedCountry } from '@/lib/country';

const GEO_IP_URL = 'https://ipapi.co/json/';
const GEO_IP_TIMEOUT_MS = 2500;

/**
 * Intenta detectar el país del visitante consultando una API pública de
 * geolocalización por IP desde el cliente (no depende de headers de un
 * proveedor de hosting específico, por lo que funciona en cualquier
 * despliegue). Devuelve `null` si la API falla, da timeout, o el país
 * detectado no está entre los soportados (COUNTRIES) — en ese caso quien
 * llama debe mostrar el diálogo de selección manual.
 */
export async function detectCountryByIp(): Promise<Country | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEO_IP_TIMEOUT_MS);

  try {
    const res = await fetch(GEO_IP_URL, { signal: controller.signal });
    if (!res.ok) return null;

    const data = (await res.json()) as { country_code?: string };
    const countryCode = data.country_code?.toUpperCase();

    return isSupportedCountry(countryCode) ? countryCode : null;
  } catch {
    // Timeout, bloqueado por ad-blocker, sin red, respuesta inválida, etc.
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
