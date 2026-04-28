import type { Metadata } from "next";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { ContactForm } from "@/components/contact/contact-form";
import { APP_REGISTER_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre Nosotros · Eventezer",
  description:
    "Conoce a Eventezer: la plataforma de gestión de eventos y ticketing pensada para organizadores latinoamericanos que quieren operar con profesionalismo.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Somos Eventezer
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Construimos la plataforma que los organizadores de eventos en
              Latinoamérica necesitan para operar con orden, vender con confianza
              y crecer con datos.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-3xl space-y-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Nuestra misión
              </h2>
              <p className="mt-4 text-muted-foreground">
                Eventezer nació para eliminar la fricción operativa que enfrenta
                cualquier persona que organiza eventos: la gestión manual de
                listas, los cobros por transferencia, el check-in en papel y los
                reportes que nunca llegan a tiempo.
              </p>
              <p className="mt-3 text-muted-foreground">
                Nuestra misión es dar a cada organizador —desde el que hace su
                primer evento hasta la agencia que opera decenas al mes— un
                sistema centralizado que gestione entradas, pagos, accesos y
                analíticas en un solo lugar.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Por qué lo construimos
              </h2>
              <p className="mt-4 text-muted-foreground">
                Después de ver a organizadores perder horas en tareas repetitivas,
                perder dinero por errores en cobros y perder el control de sus
                eventos por falta de datos en tiempo real, decidimos construir una
                herramienta que resolviera todos esos problemas de una sola vez.
              </p>
              <p className="mt-3 text-muted-foreground">
                Eventezer es el resultado de entender profundamente cómo operan
                los eventos en nuestra región y diseñar una solución que se ajuste
                a esa realidad: simple de usar, flexible para cualquier tamaño de
                evento y transparente en sus costos.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Qué ofrecemos
              </h2>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">Gestión de entradas:</strong>{" "}
                    crea múltiples tipos de ticket, define stock, precios y fechas de venta.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">Gestión de órdenes:</strong>{" "}
                    registra y gestiona órdenes de compra, lleva el control de reservas, pagos pendientes y ventas confirmadas en un solo panel.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">Check-in digital:</strong>{" "}
                    valida entradas por código QR con múltiples dispositivos en simultáneo.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">Analíticas:</strong>{" "}
                    reportes de ventas, asistencia y rendimiento para cada evento.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">Gestión de equipo:</strong>{" "}
                    asigna roles con permisos granulares para Propietario, Administrador y Personal.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Contacto
              </h2>
              <p className="mt-4 text-muted-foreground">
                ¿Tienes preguntas sobre Eventezer o quieres saber si es la
                herramienta correcta para tu operación? Crea una cuenta gratis
                para explorar la plataforma sin compromiso, o escríbenos
                directamente aquí.
              </p>
              <div className="mt-4">
                <a
                  href={APP_REGISTER_URL}
                  className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Crear cuenta gratis
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
