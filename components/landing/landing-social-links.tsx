'use client';

import { Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

const socialItems = [
  { href: INSTAGRAM_URL, label: 'Instagram', Icon: Instagram },
  { href: FACEBOOK_URL, label: 'Facebook', Icon: Facebook },
] as const;

type LandingSocialLinksProps = {
  className?: string;
  /** Iconos compactos (footer) o botones con texto (contacto, CTA). */
  variant?: 'icons' | 'buttons';
};

export function LandingSocialLinks({ className, variant = 'icons' }: LandingSocialLinksProps) {
  if (variant === 'buttons') {
    return (
      <div className={cn('flex flex-wrap justify-center gap-3', className)}>
        {socialItems.map(({ href, label, Icon }) => (
          <Button key={label} variant="outline" asChild>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Síguenos en ${label}`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </a>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <nav
      aria-label="Redes sociales de Eventezer"
      className={cn('flex items-center gap-2', className)}
    >
      {socialItems.map(({ href, label, Icon }) => (
        <Button key={label} variant="outline" size="icon" asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Síguenos en ${label}`}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        </Button>
      ))}
    </nav>
  );
}
