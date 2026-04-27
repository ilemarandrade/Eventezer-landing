import Link from "next/link";

const SERVICE_MESSAGE =
  "Hola, me interesa obtener información sobre el servicio de equipo operativo. ¿Podrían encargarse de la logística, check-in y staff para mi evento?";
import { HeadphonesIcon } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

export function LandingServiceCta() {
  return (
    <section className="border-b border-border bg-muted/20 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="rounded-2xl border border-primary/20 bg-card px-8 py-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HeadphonesIcon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              ¿No tienes equipo para el día del evento?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Podemos encargarnos de todo lo necesario para llevar a cabo tu
              evento: coordinación, check-in, staff en puerta y control de
              accesos. Tú enfócate en el contenido, nosotros en la operación.
            </p>
            <Link
              href={`/?mensaje=${encodeURIComponent(SERVICE_MESSAGE)}#contacto`}
              className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Consultar este servicio
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
