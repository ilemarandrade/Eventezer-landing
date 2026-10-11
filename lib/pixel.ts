type FbqStandardEvent =
  | 'PageView'
  | 'Lead'
  | 'Contact'
  | 'CompleteRegistration'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Search'
  | 'ViewContent'
  | 'AddToCart'
  | 'AddPaymentInfo';

type FbqCommand = 'init' | 'track' | 'trackCustom';

type Fbq = {
  (command: 'init', pixelId: string): void;
  (command: 'track', event: FbqStandardEvent, data?: Record<string, unknown>): void;
  (command: 'trackCustom', event: string, data?: Record<string, unknown>): void;
};

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export function trackPixelEvent(event: FbqStandardEvent, data?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, data);
  }
}

export function trackCustomPixelEvent(event: string, data?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', event, data);
  }
}
