'use client';

import { trackPixelEvent } from '@/lib/pixel';
import { APP_REGISTER_URL } from '@/lib/constants';

interface RegisterLinkProps {
  children: React.ReactNode;
  className?: string;
}

export function RegisterLink({ children, className }: RegisterLinkProps) {
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
