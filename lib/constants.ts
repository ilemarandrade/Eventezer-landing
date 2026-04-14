function joinUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

const appBaseUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "";

export const APP_REGISTER_URL = joinUrl(appBaseUrl, "/signup");
export const APP_LOGIN_URL = joinUrl(appBaseUrl, "/signin");
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "#calculadora";
