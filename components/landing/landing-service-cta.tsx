'use client';

import Link from 'next/link';
import { trackPixelEvent } from '@/lib/pixel';

const SERVICE_MESSAGE =
  'Hola, me interesa obtener información sobre el servicio de equipo operativo. ¿Podrían encargarse de la logística, check-in y staff para mi evento?';
import { HeadphonesIcon } from 'lucide-react';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { BackgroundVideo } from '@/components/landing/background-video';

// Video de ejemplo (Mixkit, licencia gratuita): reemplazar por uno del equipo operativo en un evento.
const SERVICE_VIDEO_SRC = 'https://assets.mixkit.co/videos/4043/4043-720.mp4';
const SERVICE_VIDEO_POSTER = 'https://assets.mixkit.co/videos/4043/4043-thumb-720-0.jpg';

export function LandingServiceCta() {
  return (
    // `dark` fuerza texto claro sobre el video, sin importar el tema.
    <section className="dark relative overflow-hidden border-b border-border bg-black px-4 py-20 text-foreground sm:py-28">
      <div aria-hidden className="absolute inset-0">
        <BackgroundVideo src={SERVICE_VIDEO_SRC} poster={SERVICE_VIDEO_POSTER} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/60" />
      <div className="relative mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="rounded-2xl border border-white/15 bg-black/30 px-8 py-10 text-center shadow-sm backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HeadphonesIcon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              ¿No tienes equipo para el día del evento?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Podemos encargarnos de todo lo necesario para llevar a cabo tu evento: coordinación,
              check-in, staff en puerta y control de accesos. Tú enfócate en el contenido, nosotros
              en la operación.
            </p>
            <Link
              href={`/?mensaje=${encodeURIComponent(SERVICE_MESSAGE)}#contacto`}
              className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              onClick={() => trackPixelEvent('Contact')}
            >
              Consultar este servicio
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
