import type { Metadata } from 'next';
import {
  LegalPageLayout,
  LegalPlaceholder,
  LegalReviewNotice,
} from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: 'Términos de Uso — Eventezer',
  description:
    'Términos de Uso y Contrato de Mandato entre Eventezer y los organizadores de eventos en Venezuela.',
};

const EFFECTIVE_DATE = '15 de septiembre de 2026';
const CONTACT_EMAIL = 'ilemarandrade@gmail.com';
const SERVICE_NAME = 'Eventezer';

const TOC: Array<[string, string]> = [
  ['#objeto', '1. Objeto del contrato'],
  ['#naturaleza-mandato', '2. Naturaleza de la relación: mandato y recaudo por cuenta de terceros'],
  ['#definiciones', '3. Definiciones'],
  ['#obligaciones-eventezer', '4. Obligaciones de Eventezer'],
  ['#obligaciones-organizador', '5. Obligaciones del Organizador'],
  ['#comision-liquidacion', '6. Comisión y forma de liquidación'],
  ['#impuestos', '7. Impuestos y retenciones'],
  ['#cancelaciones', '8. Cancelaciones y reembolsos'],
  ['#propiedad-intelectual', '9. Propiedad intelectual y uso de marca'],
  ['#responsabilidad', '10. Limitación de responsabilidad'],
  ['#proteccion-datos', '11. Protección de datos'],
  ['#vigencia', '12. Vigencia y terminación'],
  ['#ley-aplicable', '13. Ley aplicable y jurisdicción'],
  ['#resolucion-conflictos', '14. Resolución de conflictos'],
  ['#aceptacion', '15. Aceptación'],
];

export default function TermsOfUseVenezuelaPage() {
  return (
    <LegalPageLayout
      title="Términos de Uso — Contrato de Mandato"
      serviceLabel={`${SERVICE_NAME} (Venezuela)`}
      effectiveDate={EFFECTIVE_DATE}
      toc={TOC}
    >
      <section id="objeto">
        <h2 className="mb-4 text-xl font-semibold text-foreground">1. Objeto del contrato</h2>
        <p>
          Estos Términos de Uso regulan la relación entre <strong>{SERVICE_NAME}</strong> (en
          adelante, &quot;la Plataforma&quot;) y toda persona natural o jurídica que cree y publique
          eventos a través de la Plataforma (en adelante, el &quot;Organizador&quot;). Al
          registrarse como Organizador y publicar un evento, se acepta expresamente el contenido de
          este documento.
        </p>
        <p className="mt-3">
          La Plataforma provee un servicio tecnológico de gestión, venta y validación de entradas.{' '}
          {SERVICE_NAME} no es organizador, productor ni responsable del evento en sí — esa
          responsabilidad recae exclusivamente sobre el Organizador.
        </p>
      </section>

      <section id="naturaleza-mandato">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          2. Naturaleza de la relación: mandato y recaudo por cuenta de terceros
        </h2>
        <p>
          La relación entre el Organizador y {SERVICE_NAME} se estructura como un{' '}
          <strong className="text-foreground">contrato de mandato</strong>: el Organizador
          (mandante) encarga a {SERVICE_NAME} (mandatario) la gestión del cobro de las entradas
          vendidas a los Compradores, en su nombre y por su cuenta.
        </p>
        <p className="mt-3">
          En consecuencia,{' '}
          <strong className="text-foreground">
            el 100% del monto recaudado por la venta de entradas pertenece al Organizador
          </strong>{' '}
          desde el momento en que la orden queda en estado APROBADO. {SERVICE_NAME} no adquiere la
          propiedad de esos fondos en ningún momento; actúa únicamente como intermediario
          tecnológico de recaudo. El único ingreso que corresponde a {SERVICE_NAME} es la comisión
          y/o la suscripción mensual pactada según el plan contratado por el Organizador (ver
          sección 6), en contraprestación por el servicio tecnológico prestado.
        </p>
        <p className="mt-3 text-muted-foreground">
          Este documento constituye el fundamento legal de dicha figura de{' '}
          <em>recaudo por cuenta de terceros</em>, y debe leerse en conjunto con la sección de
          Precios de la Plataforma, donde se detallan los planes y porcentajes de comisión vigentes.
        </p>
      </section>

      <section id="definiciones">
        <h2 className="mb-4 text-xl font-semibold text-foreground">3. Definiciones</h2>
        <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
          <li>
            <strong className="text-foreground">Organizador:</strong> persona natural o jurídica que
            crea y gestiona uno o más eventos en la Plataforma.
          </li>
          <li>
            <strong className="text-foreground">Comprador:</strong> persona que adquiere una o más
            entradas para un evento publicado por un Organizador.
          </li>
          <li>
            <strong className="text-foreground">Plataforma:</strong> el software, sitio web y demás
            sistemas operados por {SERVICE_NAME} para la gestión, venta y validación de entradas.
          </li>
          <li>
            <strong className="text-foreground">Comisión:</strong> porcentaje que {SERVICE_NAME}{' '}
            retiene sobre cada orden en estado APROBADO, según el plan vigente del Organizador.
          </li>
          <li>
            <strong className="text-foreground">Recaudo:</strong> el proceso por el cual la
            Plataforma recibe, en nombre del Organizador, el pago realizado por el Comprador.
          </li>
        </ul>
      </section>

      <section id="obligaciones-eventezer">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          4. Obligaciones de {SERVICE_NAME}
        </h2>
        <ol className="ml-5 list-decimal space-y-2 text-muted-foreground">
          <li>
            Poner a disposición del Organizador las herramientas para crear, publicar y gestionar
            eventos.
          </li>
          <li>
            Procesar el recaudo de las órdenes de compra y llevar un registro auditable de cada
            transacción.
          </li>
          <li>
            Transferir al Organizador el monto neto recaudado (100% de la venta menos la comisión
            aplicable) según la periodicidad y medio de pago acordados.
          </li>
          <li>
            Emitir automáticamente las entradas a los Compradores tras la aprobación del pago.
          </li>
          <li>Proveer reportes de ventas, check-ins y liquidaciones al Organizador.</li>
          <li>Mantener medidas razonables de seguridad sobre los datos y fondos gestionados.</li>
        </ol>
      </section>

      <section id="obligaciones-organizador">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          5. Obligaciones del Organizador
        </h2>
        <ol className="ml-5 list-decimal space-y-2 text-muted-foreground">
          <li>
            Proveer información veraz, completa y actualizada sobre el evento (fecha, lugar,
            precios, condiciones).
          </li>
          <li>
            Cumplir con toda la normativa aplicable a la realización de espectáculos públicos y a la
            protección al consumidor en Venezuela.
          </li>
          <li>
            Responder directamente ante los Compradores y ante cualquier autoridad por la ejecución,
            calidad, seguridad y legalidad del evento — {SERVICE_NAME} no asume responsabilidad
            alguna sobre estos aspectos.
          </li>
          <li>Mantener actualizados sus datos bancarios para la correcta liquidación de fondos.</li>
          <li>
            Notificar oportunamente cualquier cambio, cancelación o reprogramación del evento.
          </li>
        </ol>
      </section>

      <section id="comision-liquidacion">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          6. Comisión y forma de liquidación
        </h2>
        <p className="mb-3">
          {SERVICE_NAME} retiene, sobre cada orden en estado APROBADO, la comisión correspondiente
          al plan contratado por el Organizador, según se detalla en la sección de Precios de la
          Plataforma. Las órdenes pendientes, rechazadas o canceladas no generan comisión.
        </p>
        <p className="text-muted-foreground">
          La liquidación de los fondos netos al Organizador se realiza según la periodicidad y el
          medio de pago acordados entre ambas partes al momento del registro o mediante acuerdo
          posterior.
        </p>
      </section>

      <section id="impuestos">
        <h2 className="mb-4 text-xl font-semibold text-foreground">7. Impuestos y retenciones</h2>
        <p className="text-muted-foreground">
          Cada parte es responsable del cumplimiento de sus propias obligaciones tributarias
          derivadas de esta relación (impuesto sobre la renta, IVA, IGTF u otros tributos
          aplicables).{' '}
          <LegalPlaceholder>
            REVISAR CON CONTADOR — retenciones aplicables en Venezuela sobre comisiones de
            intermediación y emisión de facturas
          </LegalPlaceholder>
          .
        </p>
      </section>

      <section id="cancelaciones">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          8. Cancelaciones y reembolsos
        </h2>
        <p className="text-muted-foreground">
          La decisión de cancelar o reprogramar un evento, así como la política de reembolsos
          aplicable a los Compradores, es responsabilidad exclusiva del Organizador. {SERVICE_NAME}{' '}
          facilita los medios técnicos para procesar reembolsos cuando el Organizador así lo
          indique, pero no garantiza ni se hace responsable por la devolución de fondos ya
          transferidos al Organizador.
        </p>
      </section>

      <section id="propiedad-intelectual">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          9. Propiedad intelectual y uso de marca
        </h2>
        <p className="text-muted-foreground">
          El software, marca, logotipos y demás elementos de la Plataforma son propiedad de{' '}
          {SERVICE_NAME}. El Organizador conserva la titularidad sobre el contenido de sus eventos
          (nombre, imágenes, descripciones) y autoriza a {SERVICE_NAME} a usarlo únicamente para la
          promoción y operación del evento dentro de la Plataforma.
        </p>
      </section>

      <section id="responsabilidad">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          10. Limitación de responsabilidad
        </h2>
        <p className="text-muted-foreground">
          {SERVICE_NAME} no es responsable por el contenido, calidad, seguridad, legalidad ni
          ejecución de los eventos publicados por los Organizadores. La responsabilidad de{' '}
          {SERVICE_NAME} se limita a la correcta prestación del servicio tecnológico de gestión,
          recaudo y liquidación descrito en este documento.
        </p>
      </section>

      <section id="proteccion-datos">
        <h2 className="mb-4 text-xl font-semibold text-foreground">11. Protección de datos</h2>
        <p className="text-muted-foreground">
          El tratamiento de los datos personales de Compradores y Organizadores se rige por la{' '}
          <a href="/politica-de-privacidad" className="text-primary hover:underline">
            Política de Privacidad
          </a>{' '}
          de {SERVICE_NAME}, la cual forma parte integral de estos Términos de Uso.
        </p>
      </section>

      <section id="vigencia">
        <h2 className="mb-4 text-xl font-semibold text-foreground">12. Vigencia y terminación</h2>
        <p className="text-muted-foreground">
          Este contrato entra en vigencia desde el registro del Organizador y permanece vigente
          mientras mantenga una cuenta activa en la Plataforma. Cualquiera de las partes puede
          terminarlo en cualquier momento, sin perjuicio de las liquidaciones pendientes por órdenes
          ya aprobadas antes de la terminación.
        </p>
      </section>

      <section id="ley-aplicable">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          13. Ley aplicable y jurisdicción
        </h2>
        <p className="text-muted-foreground">
          Este documento se rige por las leyes de la República Bolivariana de Venezuela. Para
          cualquier controversia derivada de su interpretación o ejecución, las partes se someten a
          los tribunales competentes de Venezuela, salvo que acuerden un mecanismo alternativo de
          resolución de conflictos conforme a la sección siguiente.
        </p>
      </section>

      <section id="resolucion-conflictos">
        <h2 className="mb-4 text-xl font-semibold text-foreground">14. Resolución de conflictos</h2>
        <p className="text-muted-foreground">
          Ante cualquier controversia, las partes procurarán primero una solución amistosa mediante
          comunicación directa a través de{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>
          . De no llegar a un acuerdo, podrán acudir a los mecanismos de resolución de conflictos
          previstos en la legislación venezolana.
        </p>
      </section>

      <section id="aceptacion">
        <h2 className="mb-4 text-xl font-semibold text-foreground">15. Aceptación</h2>
        <p className="text-muted-foreground">
          Al registrarte como Organizador y publicar un evento en la Plataforma, declaras haber
          leído, entendido y aceptado en su totalidad estos Términos de Uso, incluyendo la
          naturaleza de mandato y recaudo por cuenta de terceros descrita en la sección 2.
        </p>
      </section>

      <LegalReviewNotice />
    </LegalPageLayout>
  );
}
