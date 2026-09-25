'use client';

import { trackPixelEvent } from '@/lib/pixel';
import { APP_REGISTER_URL } from '@/lib/constants';
import { useCountry } from '@/components/providers/country-provider';
import { COUNTRIES } from '@/lib/country';

interface RegisterLinkProps {
  children: React.ReactNode;
  className?: string;
}

/** Enlace al registro. En países sin registro habilitado, lleva al formulario de contacto. */
export function RegisterLink({ children, className }: RegisterLinkProps) {
  const { country } = useCountry();
  if (!COUNTRIES[country].signupEnabled) {
    return (
      <a href="/#contacto" className={className} onClick={() => trackPixelEvent('Contact')}>
        Escríbenos
      </a>
    );
  }

  return (
    <a
      href={APP_REGISTER_URL}
      className={className}
      onClick={() => trackPixelEvent('InitiateCheckout')}
    >
      {children}
    </a>
  );
}
