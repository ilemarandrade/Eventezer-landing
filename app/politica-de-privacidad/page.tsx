import type { Metadata } from "next";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";

export const metadata: Metadata = {
  title: "Política de Privacidad — Eventezer",
  description:
    "Política de privacidad de Eventezer: cómo recopilamos, usamos y protegemos tus datos personales.",
};

const EFFECTIVE_DATE = "15 de abril de 2025";
const CONTACT_EMAIL = "ilemarandrade@gmail.com";
const SERVICE_NAME = "Eventezer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <LandingNavbar />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Política de Privacidad
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Servicio: <span className="font-medium text-foreground">{SERVICE_NAME}</span>
            {" · "}Vigente desde: <span className="font-medium text-foreground">{EFFECTIVE_DATE}</span>
          </p>
        </div>

        {/* Table of Contents */}
        <nav
          aria-label="Tabla de contenido"
          className="mb-10 rounded-lg border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tabla de contenido
          </h2>
          <ol className="space-y-1.5 text-sm">
            {[
              ["#quienes-somos", "1. Quiénes somos"],
              ["#datos-que-recopilamos", "2. Datos que recopilamos"],
              ["#finalidad-del-tratamiento", "3. Finalidad del tratamiento"],
              ["#terceros", "4. Terceros que reciben datos"],
              ["#cookies-publicidad", "5. Cookies y publicidad (Google AdSense)"],
              ["#retencion-datos", "6. Retención y eliminación de datos"],
              ["#seguridad", "7. Seguridad de la información"],
              ["#derechos-usuario", "8. Derechos del usuario"],
              ["#menores-edad", "9. Menores de edad"],
              ["#cambios-politica", "10. Cambios en esta política"],
              ["#contacto", "11. Contacto"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-primary hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12 text-sm leading-7 text-foreground">
          {/* 1 */}
          <section id="quienes-somos">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              1. Quiénes somos
            </h2>
            <p>
              <strong>{SERVICE_NAME}</strong> es una plataforma en línea para la gestión, venta y
              validación de entradas para eventos, operada desde Venezuela. A través de esta
              plataforma, los organizadores de eventos pueden crear y gestionar sus eventos, y los
              compradores pueden adquirir entradas de forma segura.
            </p>
            <p className="mt-3">
              Para cualquier consulta relacionada con esta política, puedes contactarnos en{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          {/* 2 */}
          <section id="datos-que-recopilamos">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              2. Datos que recopilamos
            </h2>
            <p className="mb-4">
              Recopilamos distintas categorías de datos según el rol que desempeñas en nuestra
              plataforma:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  A) Datos de compradores (clientes finales)
                </h3>
                <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
                  <li>Nombre y apellido</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono (opcional)</li>
                  <li>
                    Documento de identidad: cédula, RIF o pasaporte (opcional)
                  </li>
                  <li>
                    Datos de titulares de entradas: nombre, apellido y correo electrónico por cada
                    entrada dentro de una orden
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  B) Datos de pago
                </h3>
                <p className="mb-2 text-muted-foreground">
                  <strong className="text-foreground">No procesamos ni almacenamos datos de tarjetas de crédito o débito.</strong>{" "}
                  Los pagos son manuales. Recopilamos únicamente:
                </p>
                <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
                  <li>
                    Método de pago elegido: efectivo, transferencia bancaria o pago móvil
                  </li>
                  <li>Referencia de pago reportada por el cliente</li>
                  <li>Monto declarado por el cliente en moneda local (VES)</li>
                  <li>
                    Tasa de cambio vigente al momento del pago (USD/EUR → VES, fuente: Banco Central
                    de Venezuela)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  C) Datos de lista de espera (waitlist)
                </h3>
                <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
                  <li>Nombre, apellido y correo electrónico</li>
                  <li>Número de teléfono (opcional)</li>
                  <li>Cantidad de entradas solicitadas</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  D) Datos de organizadores (tenants / staff)
                </h3>
                <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
                  <li>Nombre, apellido y correo electrónico</li>
                  <li>
                    Contraseña (almacenada con hash criptográfico; nunca en texto plano)
                  </li>
                  <li>Número de teléfono (opcional)</li>
                  <li>Foto de perfil (opcional)</li>
                  <li>
                    Datos bancarios del organizador: banco, número de cuenta, nombre del titular,
                    documento de identidad y teléfono, necesarios para configurar los métodos de
                    cobro a sus compradores
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  E) Datos de eventos
                </h3>
                <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
                  <li>Título, descripción, fecha y ubicación del evento</li>
                  <li>URL de streaming (si aplica)</li>
                  <li>Imágenes de portada del evento</li>
                  <li>Precios y tipos de entradas</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  F) Datos técnicos
                </h3>
                <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
                  <li>Tokens de sesión (refresh tokens con fecha de expiración)</li>
                  <li>Tokens QR únicos por entrada, utilizados para validación en puerta</li>
                  <li>
                    Registro de uso de QR: fecha, hora de escaneo y quién realizó el escaneo
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3 */}
          <section id="finalidad-del-tratamiento">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              3. Finalidad del tratamiento
            </h2>
            <p className="mb-4">Utilizamos los datos recopilados para las siguientes finalidades:</p>
            <ol className="ml-5 list-decimal space-y-2 text-muted-foreground">
              <li>Procesar y confirmar la compra de entradas.</li>
              <li>Enviar las entradas al comprador por correo electrónico (en formato PDF/QR).</li>
              <li>
                Notificar la disponibilidad de entradas a los usuarios registrados en la lista de
                espera.
              </li>
              <li>Validar entradas mediante el escaneo del código QR en el acceso al evento.</li>
              <li>
                Gestionar el ciclo de vida del pago: reserva → pago reportado → validación →
                aprobación o rechazo.
              </li>
              <li>
                Calcular las comisiones de la plataforma y emitir reportes de facturación a los
                organizadores.
              </li>
              <li>
                Proveer analíticas a los organizadores: ventas realizadas, check-ins y métricas de
                retención de clientes.
              </li>
              <li>
                Enviar correos de invitación a los miembros del equipo (staff) de los organizadores.
              </li>
            </ol>
          </section>

          {/* 4 */}
          <section id="terceros">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              4. Terceros que reciben datos
            </h2>
            <p className="mb-4">
              Compartimos datos con los siguientes terceros únicamente en la medida necesaria para
              prestar el servicio:
            </p>

            <div className="space-y-5">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-1 font-semibold text-foreground">
                  Resend (resend.com)
                </h3>
                <p className="text-muted-foreground">
                  Servicio de envío de correos electrónicos transaccionales. Recibe la dirección de
                  correo del destinatario y el contenido del mensaje (entradas, invitaciones de
                  staff). Los datos se transmiten exclusivamente con el fin de entregar los correos
                  solicitados.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-1 font-semibold text-foreground">
                  Google AdSense / DoubleClick (Google LLC)
                </h3>
                <p className="text-muted-foreground">
                  Utilizamos Google AdSense para mostrar publicidad en nuestra plataforma. Google
                  puede utilizar cookies y tecnologías similares para mostrar anuncios basados en tus
                  visitas anteriores a este u otros sitios web. Consulta la sección 5 de esta
                  política para más información.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-1 font-semibold text-foreground">
                  Banco Central de Venezuela (BCV)
                </h3>
                <p className="text-muted-foreground">
                  Consultamos la tasa de cambio oficial a través de la API pública del BCV.{" "}
                  <strong className="text-foreground">No transmitimos ningún dato de usuarios</strong>{" "}
                  a este organismo; es una consulta unidireccional de datos públicos.
                </p>
              </div>
            </div>
          </section>

          {/* 5 */}
          <section id="cookies-publicidad">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              5. Cookies y publicidad (Google AdSense)
            </h2>

            <h3 className="mb-2 font-semibold text-foreground">¿Qué son las cookies?</h3>
            <p className="mb-4 text-muted-foreground">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en tu
              dispositivo. Permiten recordar preferencias, mantener sesiones iniciadas y, en el caso
              de la publicidad, mostrar anuncios relevantes para ti.
            </p>

            <h3 className="mb-2 font-semibold text-foreground">Cookies propias</h3>
            <p className="mb-4 text-muted-foreground">
              Utilizamos cookies de sesión y tokens de autenticación para mantener tu sesión activa
              dentro de la plataforma. Estas cookies son necesarias para el funcionamiento del
              servicio y expiran automáticamente.
            </p>

            <h3 className="mb-2 font-semibold text-foreground">Cookies de terceros — Google AdSense</h3>
            <p className="mb-3 text-muted-foreground">
              Esta plataforma utiliza Google AdSense, un servicio de publicidad de Google LLC. Google
              AdSense emplea cookies de DoubleClick para mostrar anuncios personalizados basados en
              tu historial de navegación. Esto significa que Google puede:
            </p>
            <ul className="mb-4 ml-5 list-disc space-y-1 text-muted-foreground">
              <li>
                Utilizar cookies para recordar tu actividad en este y otros sitios web.
              </li>
              <li>
                Mostrar anuncios adaptados a tus intereses inferidos a partir de dicha actividad.
              </li>
              <li>
                Compartir esa información con sus socios publicitarios según sus propias políticas.
              </li>
            </ul>

            <h3 className="mb-2 font-semibold text-foreground">Cómo controlar las cookies publicitarias</h3>
            <p className="mb-3 text-muted-foreground">
              Puedes optar por no recibir publicidad personalizada de Google visitando:
            </p>
            <ul className="mb-4 ml-5 list-disc space-y-1">
              <li>
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Configuración de anuncios de Google
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Política de publicidad de Google
                </a>
              </li>
            </ul>
            <p className="text-muted-foreground">
              También puedes desactivar las cookies de terceros desde la configuración de tu
              navegador, aunque esto puede afectar la funcionalidad de algunos sitios web.
            </p>
          </section>

          {/* 6 */}
          <section id="retencion-datos">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              6. Retención y eliminación de datos
            </h2>
            <p className="mb-4">
              Conservamos los datos durante el tiempo estrictamente necesario para cumplir con las
              finalidades descritas en esta política:
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Tipo de dato</th>
                    <th className="px-4 py-3 text-left font-medium">Período de retención</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Tokens de sesión", "Expiran automáticamente según configuración del sistema"],
                    ["Códigos OTP", "Expiran en minutos y se invalidan tras su primer uso"],
                    ["Invitaciones de staff", "Expiran a las 48 horas de su emisión"],
                    ["Tokens de lista de espera", "Expiran según la configuración del organizador"],
                    [
                      "Datos de compradores y órdenes",
                      "Retenidos mientras la cuenta del organizador esté activa",
                    ],
                    [
                      "Datos de organizadores",
                      "Retenidos mientras la cuenta esté activa; eliminados a solicitud del usuario",
                    ],
                  ].map(([tipo, periodo]) => (
                    <tr key={tipo} className="bg-card hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium text-foreground">{tipo}</td>
                      <td className="px-4 py-3 text-muted-foreground">{periodo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 7 */}
          <section id="seguridad">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              7. Seguridad de la información
            </h2>
            <p className="mb-3 text-muted-foreground">
              Implementamos medidas técnicas y organizativas razonables para proteger tus datos
              personales contra accesos no autorizados, pérdidas, alteraciones o divulgaciones
              indebidas. Entre ellas:
            </p>
            <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
              <li>
                Almacenamiento de contraseñas mediante algoritmos de hash criptográfico; nunca en
                texto plano.
              </li>
              <li>Uso de tokens de sesión con fechas de expiración definidas.</li>
              <li>
                Generación de tokens QR únicos por entrada para evitar duplicaciones o fraudes.
              </li>
              <li>Transmisión de datos mediante conexiones cifradas (HTTPS/TLS).</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Aunque adoptamos medidas razonables de seguridad, ningún sistema de transmisión o
              almacenamiento de datos en Internet puede garantizarse como 100 % seguro. En caso de
              detectar una vulnerabilidad que afecte tus datos, te notificaremos según lo exija la
              normativa aplicable.
            </p>
          </section>

          {/* 8 */}
          <section id="derechos-usuario">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              8. Derechos del usuario
            </h2>
            <p className="mb-4">
              Como titular de los datos personales que tratamos, tienes los siguientes derechos:
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Acceso",
                  desc: "Puedes solicitarnos información sobre los datos personales que tenemos sobre ti y cómo los utilizamos.",
                },
                {
                  title: "Rectificación",
                  desc: "Puedes solicitarnos la corrección de datos inexactos o incompletos.",
                },
                {
                  title: "Eliminación",
                  desc: "Puedes solicitarnos la eliminación de tus datos personales cuando ya no sean necesarios para las finalidades para las que fueron recogidos, o cuando retires tu consentimiento.",
                },
                {
                  title: "Oposición y limitación",
                  desc: "Puedes oponerte al tratamiento de tus datos o solicitar que lo limitemos en determinadas circunstancias.",
                },
                {
                  title: "Portabilidad",
                  desc: "Puedes solicitar una copia de tus datos en un formato estructurado y de uso común.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-muted-foreground">
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
              . Responderemos dentro de un plazo razonable conforme a la normativa venezolana
              aplicable, en particular la{" "}
              <strong className="text-foreground">
                Ley Especial contra los Delitos Informáticos (LECDI)
              </strong>{" "}
              y demás normativas de protección de datos vigentes.
            </p>
          </section>

          {/* 9 */}
          <section id="menores-edad">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              9. Menores de edad
            </h2>
            <p className="text-muted-foreground">
              {SERVICE_NAME} no está dirigido a menores de 18 años. No recopilamos conscientemente
              datos personales de menores de edad. Si eres padre, madre o tutor y crees que tu hijo
              nos ha proporcionado datos personales, contáctanos a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              para que podamos eliminar dicha información.
            </p>
          </section>

          {/* 10 */}
          <section id="cambios-politica">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              10. Cambios en esta política
            </h2>
            <p className="text-muted-foreground">
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en
              nuestras prácticas o en la normativa aplicable. Cuando realicemos cambios materiales,
              notificaremos a los usuarios registrados por correo electrónico y/o mediante un aviso
              prominente en la plataforma. La fecha de vigencia al inicio de este documento indicará
              cuándo fue actualizada por última vez.
            </p>
          </section>

          {/* 11 */}
          <section id="contacto">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              11. Contacto
            </h2>
            <p className="mb-3 text-muted-foreground">
              Si tienes preguntas, solicitudes o inquietudes relacionadas con esta Política de
              Privacidad o con el tratamiento de tus datos personales, puedes contactarnos:
            </p>
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="font-semibold text-foreground">{SERVICE_NAME}</p>
              <p className="text-muted-foreground">Venezuela</p>
              <p className="mt-1">
                <span className="text-muted-foreground">Correo: </span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-12 border-t border-border pt-6">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
