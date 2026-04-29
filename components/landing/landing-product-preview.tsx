'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, ScanLine, LayoutDashboard, ShoppingCart, MonitorPlay } from 'lucide-react';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { cn } from '@/lib/utils';

type PreviewTab = {
  id: string;
  label: string;
  labelMobile: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string | null;
  imageDark: string | null;
  imageAlt: string;
  phoneFrame?: boolean;
};

const tabs: PreviewTab[] = [
  {
    id: 'compra',
    label: 'Flujo de compra',
    labelMobile: 'Compra',
    icon: ShoppingCart,
    title: 'Tus clientes compran en segundos',
    description:
      'Una experiencia de compra fluida y sin fricciones. El cliente elige su ticket, completa el pago y recibe su entrada de forma inmediata, todo desde cualquier dispositivo.',
    image: '/images/paywall-white.gif',
    imageDark: '/images/paywall-dark.gif',
    imageAlt: 'Flujo de compra de tickets en Eventezer',
    phoneFrame: true,
  },
  {
    id: 'entrada',
    label: 'Tu entrada por correo',
    labelMobile: 'Entrada',
    icon: Mail,
    title: 'El asistente recibe su entrada al instante',
    description:
      'Al completar la compra, cada asistente recibe automáticamente un correo con su entrada y código QR. Sin apps adicionales, sin descargas, sin pasos extra.',
    image: '/images/tickets-mail.gif',
    imageDark: '/images/tickets-mail.gif',
    imageAlt: 'Entrada enviada por correo con código QR',
    phoneFrame: false,
  },
  {
    id: 'online',
    label: 'Evento online',
    labelMobile: 'Online',
    icon: MonitorPlay,
    title: 'Acceso directo al live desde la entrada',
    description:
      'Con un clic en el enlace del correo, el asistente entra al evento en vivo desde cualquier dispositivo. Solo quienes compraron su ticket pueden ingresar, y cada entrada permite una única sesión activa a la vez para evitar el fraude.',
    image: '/images/online.gif',
    imageDark: '/images/online.gif',
    imageAlt: 'Acceso a evento online desde la entrada por correo',
    phoneFrame: false,
  },
  {
    id: 'checkin',
    label: 'Check-in en la puerta',
    labelMobile: 'Check-in',
    icon: ScanLine,
    title: 'Valida entradas en menos de 3 segundos',
    description:
      'Tu equipo escanea el QR desde cualquier dispositivo con internet. El sistema detecta duplicados en tiempo real y muestra el estado de cada entrada al instante.',
    image: '/images/checkin.gif',
    imageDark: '/images/checkin.gif',
    imageAlt: 'Panel de check-in con escáner de código QR',
    phoneFrame: true,
  },
  {
    id: 'panel',
    label: 'Panel del organizador',
    labelMobile: 'Panel',
    icon: LayoutDashboard,
    title: 'Todo tu evento desde un solo panel',
    description:
      'Ventas, asistencia, equipo y analíticas centralizadas. Gestiona tickets, órdenes y accesos sin saltar entre herramientas ni planillas.',
    image: '/images/hero-light.png',
    imageDark: '/images/hero-dark.png',
    imageAlt: 'Panel de control del organizador en Eventezer',
  },
];

export function LandingProductPreview() {
  const [active, setActive] = useState<string>('compra');
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="border-b border-border bg-background px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Así funciona en la práctica
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Desde la compra de la entrada hasta el acceso al evento, todo operando desde un solo
            sistema.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.06} className="mt-10">
          {/* Tab buttons */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center [&>*:last-child:nth-child(odd)]:col-span-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors sm:rounded-full sm:py-2',
                  active === tab.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40',
                )}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                <span className="truncate sm:hidden">{tab.labelMobile}</span>
                <span className="hidden sm:inline truncate">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
            {/* Image or placeholder */}
            <div className="order-2 lg:order-1 mx-auto w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg shadow-primary/10">
              <div
                className={cn(
                  'relative w-full',
                  current.phoneFrame ? 'aspect-[3/4] sm:aspect-video' : 'aspect-video',
                )}
              >
                {current.image && current.phoneFrame ? (
                  <div className="absolute inset-2 sm:inset-4 flex items-center justify-center">
                    <div className="relative flex h-full flex-col rounded-[1.25rem] border-[5px] border-foreground/20 bg-background aspect-[9/19]">
                      {/* notch */}
                      <div className="flex justify-center py-1">
                        <div className="h-1.5 w-10 rounded-full bg-foreground/15" />
                      </div>
                      <div className="relative flex-1 overflow-hidden rounded-lg mx-1">
                        <Image
                          src={current.image}
                          alt={current.imageAlt}
                          fill
                          className="object-cover dark:hidden"
                          sizes="220px"
                        />
                        <Image
                          src={current.imageDark ?? current.image}
                          alt={current.imageAlt}
                          fill
                          className="hidden object-cover dark:block"
                          sizes="220px"
                        />
                      </div>
                      {/* home indicator */}
                      <div className="flex justify-center py-1">
                        <div className="h-1 w-10 rounded-full bg-foreground/20" />
                      </div>
                    </div>
                  </div>
                ) : current.image ? (
                  <>
                    <Image
                      src={current.image}
                      alt={current.imageAlt}
                      fill
                      className="object-contain dark:hidden"
                      sizes="(min-width: 1280px) 560px, (min-width: 1024px) 48vw, 100vw"
                    />
                    <Image
                      src={current.imageDark ?? current.image}
                      alt={current.imageAlt}
                      fill
                      className="hidden object-contain dark:block"
                      sizes="(min-width: 1280px) 560px, (min-width: 1024px) 48vw, 100vw"
                    />
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 bg-muted/30">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                      <current.icon className="h-7 w-7" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Captura de pantalla próximamente
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <current.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">{current.title}</h3>
              <p className="mt-3 text-muted-foreground">{current.description}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
