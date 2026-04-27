"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, ScanLine, LayoutDashboard } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { cn } from "@/lib/utils";

type PreviewTab = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string | null;
  imageDark: string | null;
  imageAlt: string;
};

const tabs: PreviewTab[] = [
  {
    id: "entrada",
    label: "Tu entrada por correo",
    icon: Mail,
    title: "El asistente recibe su entrada al instante",
    description:
      "Al completar la compra, cada asistente recibe automáticamente un correo con su entrada y código QR. Sin apps adicionales, sin descargas, sin pasos extra.",
    image: null,
    imageDark: null,
    imageAlt: "Entrada enviada por correo con código QR",
  },
  {
    id: "checkin",
    label: "Check-in en la puerta",
    icon: ScanLine,
    title: "Valida entradas en menos de 3 segundos",
    description:
      "Tu equipo escanea el QR desde cualquier dispositivo con internet. El sistema detecta duplicados en tiempo real y muestra el estado de cada entrada al instante.",
    image: null,
    imageDark: null,
    imageAlt: "Panel de check-in con escáner de código QR",
  },
  {
    id: "panel",
    label: "Panel del organizador",
    icon: LayoutDashboard,
    title: "Todo tu evento desde un solo panel",
    description:
      "Ventas, asistencia, equipo y analíticas centralizadas. Gestiona tickets, órdenes y accesos sin saltar entre herramientas ni planillas.",
    image: "/images/hero-light.png",
    imageDark: "/images/hero-dark.png",
    imageAlt: "Panel de control del organizador en Eventezer",
  },
];

export function LandingProductPreview() {
  const [active, setActive] = useState<string>("entrada");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="border-b border-border bg-background px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Así funciona en la práctica
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Desde la compra de la entrada hasta el acceso al evento, todo
            operando desde un solo sistema.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.06} className="mt-10">
          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active === tab.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
            {/* Image or placeholder */}
            <div className="order-2 lg:order-1 mx-auto w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg shadow-primary/10">
              {/* aspect-video = 16:9 fijo independiente del tamaño real de la imagen */}
              <div className="relative aspect-video w-full">
                {current.image ? (
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
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                {current.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{current.description}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
