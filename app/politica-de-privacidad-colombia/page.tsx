import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad — Habeas Data (Colombia) — Eventezer',
  description:
    'Aviso de Privacidad y tratamiento de datos personales de Eventezer para Colombia, conforme a la Ley 1581 de 2012.',
};

const EFFECTIVE_DATE = '15 de septiembre de 2026';
const CONTACT_EMAIL = 'ilemarsdf@gmail.com';
const SERVICE_NAME = 'Eventezer';
const OPERATOR_NAME = 'Ilemar Andrade';
const OPERATOR_LOCATION = 'Fusagasugá, Colombia';

const TOC: Array<[string, string]> = [
  ['#responsable', '1. Responsable del tratamiento'],
  ['#datos-recolectados', '2. Datos personales recolectados'],
  ['#finalidad', '3. Finalidad del tratamiento'],
  ['#autorizacion', '4. Autorización del titular'],
  ['#derechos-titular', '5. Derechos del titular (Habeas Data)'],
  ['#procedimiento', '6. Procedimiento y plazos para ejercer sus derechos'],
  ['#transferencia-terceros', '7. Transferencia a terceros y tratamiento transfronterizo'],
  ['#seguridad', '8. Medidas de seguridad'],
  ['#vigencia-bd', '9. Vigencia de la base de datos'],
  ['#rnbd', '10. Inscripción en el Registro Nacional de Bases de Datos (RNBD)'],
  ['#contacto-quejas', '11. Contacto y quejas ante la SIC'],
];

export default function PrivacyPolicyColombiaPage() {
  return (
    <LegalPageLayout
      title="Aviso de Privacidad — Habeas Data"
      serviceLabel={`${SERVICE_NAME} (Colombia)`}
      effectiveDate={EFFECTIVE_DATE}
      toc={TOC}
    >
      <section id="responsable">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          1. Responsable del tratamiento
        </h2>
        <p>
          El responsable del tratamiento de los datos personales recolectados a través de{' '}
          <strong>{SERVICE_NAME}</strong> para el mercado colombiano es {OPERATOR_NAME}, persona
          natural con domicilio en {OPERATOR_LOCATION}, y correo de contacto{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="mt-3 text-muted-foreground">
          Este Aviso de Privacidad se emite en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377
          de 2013, que regulan la protección de datos personales y el derecho de Habeas Data en
          Colombia.
        </p>
      </section>

      <section id="datos-recolectados">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          2. Datos personales recolectados
        </h2>
        <p className="mb-3">
          Al comprar entradas o interactuar con la Plataforma, recolectamos los siguientes datos:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
          <li>Nombre y apellido</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono (opcional)</li>
          <li>
            Documento de identidad: cédula de ciudadanía, cédula de extranjería o pasaporte
            (opcional)
          </li>
          <li>
            Datos de titulares de entradas: nombre, apellido y correo por cada entrada dentro de una
            orden
          </li>
          <li>Método de pago elegido y referencia de pago reportada</li>
          <li>Datos técnicos: tokens de sesión y códigos QR de validación de entrada</li>
        </ul>
        <p className="mt-3 text-muted-foreground">
          No procesamos ni almacenamos los números completos de tarjetas de crédito o débito; esa
          información es gestionada directamente por la pasarela de pagos utilizada al momento de la
          compra.
        </p>
      </section>

      <section id="finalidad">
        <h2 className="mb-4 text-xl font-semibold text-foreground">3. Finalidad del tratamiento</h2>
        <p className="mb-3">Los datos recolectados se utilizan para las siguientes finalidades:</p>
        <ol className="ml-5 list-decimal space-y-2 text-muted-foreground">
          <li>Procesar y confirmar la compra de entradas.</li>
          <li>Enviar las entradas al comprador por correo electrónico (formato PDF/QR).</li>
          <li>
            Compartir los datos estrictamente necesarios (nombre, correo y/o teléfono de los
            titulares de entrada) con el Organizador del evento correspondiente, exclusivamente para
            fines logísticos: control de acceso, listas de asistentes y comunicaciones propias del
            evento.
          </li>
          <li>Validar entradas mediante el escaneo del código QR en el acceso al evento.</li>
          <li>
            Gestionar el ciclo de vida del pago y emitir reportes de facturación al Organizador.
          </li>
          <li>Atender solicitudes, quejas y reclamos relacionados con la compra.</li>
        </ol>
      </section>

      <section id="autorizacion">
        <h2 className="mb-4 text-xl font-semibold text-foreground">4. Autorización del titular</h2>
        <p className="text-muted-foreground">
          Al completar el proceso de compra de una entrada, el Comprador otorga de forma libre,
          previa, expresa e informada su autorización para que {SERVICE_NAME} trate sus datos
          personales conforme a las finalidades descritas en este Aviso, incluyendo su entrega al
          Organizador del evento para fines logísticos. Esta autorización se recaba mediante la
          aceptación explícita (casilla de verificación) en el formulario de compra.
        </p>
      </section>

      <section id="derechos-titular">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          5. Derechos del titular (Habeas Data)
        </h2>
        <p className="mb-4">
          Como titular de los datos personales, y de conformidad con el artículo 8 de la Ley 1581 de
          2012, tienes derecho a:
        </p>
        <div className="space-y-3">
          {[
            {
              title: 'Conocer, actualizar y rectificar',
              desc: 'Tus datos personales frente al responsable del tratamiento, en especial cuando sean parciales, inexactos, incompletos o induzcan a error.',
            },
            {
              title: 'Solicitar prueba de la autorización',
              desc: 'Otorgada al responsable del tratamiento, salvo en los casos en que la ley no lo requiera.',
            },
            {
              title: 'Ser informado',
              desc: 'Previa solicitud, sobre el uso que se ha dado a tus datos personales.',
            },
            {
              title: 'Presentar quejas ante la SIC',
              desc: 'Por infracciones a la Ley 1581 de 2012 y demás normas que la modifiquen o complementen, una vez agotado el trámite de consulta o reclamo ante el responsable.',
            },
            {
              title: 'Revocar la autorización y/o solicitar la supresión del dato',
              desc: 'Cuando no se respeten los principios, derechos y garantías constitucionales y legales, salvo que exista un deber legal o contractual de permanencia de los datos.',
            },
            {
              title: 'Acceder gratuitamente',
              desc: 'A tus datos personales que hayan sido objeto de tratamiento.',
            },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="procedimiento">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          6. Procedimiento y plazos para ejercer sus derechos
        </h2>
        <p className="mb-3 text-muted-foreground">
          Puedes ejercer tus derechos escribiendo a{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>
          , indicando tu nombre completo, documento de identidad y una descripción clara de tu
          solicitud. Los plazos de respuesta, conforme a la Ley 1581 de 2012, son:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Tipo de solicitud</th>
                <th className="px-4 py-3 text-left font-medium">Plazo de respuesta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                [
                  'Consultas',
                  'Máximo 10 días hábiles desde su recepción (prorrogable 5 días hábiles más, informando los motivos)',
                ],
                [
                  'Reclamos',
                  'Máximo 15 días hábiles desde su recepción (si no es posible atenderlo en ese plazo, se informará al titular indicando los motivos y la fecha en que se atenderá)',
                ],
              ].map(([tipo, plazo]) => (
                <tr key={tipo} className="bg-card hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{tipo}</td>
                  <td className="px-4 py-3 text-muted-foreground">{plazo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="transferencia-terceros">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          7. Transferencia a terceros y tratamiento transfronterizo
        </h2>
        <p className="mb-3 text-muted-foreground">
          Compartimos los datos estrictamente necesarios con los siguientes terceros, únicamente
          para los fines descritos en la sección 3:
        </p>
        <ul className="mb-4 ml-5 list-disc space-y-1 text-muted-foreground">
          <li>
            El Organizador del evento correspondiente (datos logísticos de los titulares de
            entrada).
          </li>
          <li>La pasarela de pagos utilizada para procesar la transacción.</li>
          <li>Proveedores de correo transaccional, para el envío de entradas y notificaciones.</li>
        </ul>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Declaración de tratamiento transfronterizo:</strong>{' '}
          La infraestructura tecnológica de la Plataforma (API y base de datos) opera sobre
          servicios de alojamiento en la nube (Railway), cuyos servidores para esta operación se
          encuentran ubicados en Estados Unidos (región US East, Virginia). En consecuencia, los
          datos personales de titulares en Colombia son transmitidos y almacenados en el extranjero
          para efectos de la prestación del servicio. Este tratamiento se realiza bajo los mismos
          estándares de seguridad y confidencialidad descritos en este Aviso, y solo para las
          finalidades aquí autorizadas. Esta transferencia internacional se realiza con fundamento
          en la autorización previa, expresa e informada otorgada por el Titular al momento de la
          compra (sección 4), la cual cubre expresamente el tratamiento y almacenamiento de sus
          datos en el extranjero.
        </p>
      </section>

      <section id="seguridad">
        <h2 className="mb-4 text-xl font-semibold text-foreground">8. Medidas de seguridad</h2>
        <p className="text-muted-foreground">
          Implementamos medidas técnicas y organizativas razonables para proteger tus datos
          personales contra pérdida, uso indebido, acceso no autorizado o divulgación, incluyendo el
          cifrado de las conexiones (HTTPS/TLS), el almacenamiento de contraseñas mediante
          algoritmos de hash criptográfico y la generación de tokens únicos para la validación de
          entradas.
        </p>
      </section>

      <section id="vigencia-bd">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          9. Vigencia de la base de datos
        </h2>
        <p className="text-muted-foreground">
          Los datos personales se conservarán durante el tiempo necesario para cumplir con las
          finalidades descritas en este Aviso y con las obligaciones legales aplicables, y serán
          eliminados o anonimizados cuando dejen de ser necesarios, salvo que exista una obligación
          legal de conservación.
        </p>
      </section>

      <section id="rnbd">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          10. Inscripción en el Registro Nacional de Bases de Datos (RNBD)
        </h2>
        <p className="text-muted-foreground">
          De conformidad con la Ley 1581 de 2012 y el Decreto 1074 de 2015, la inscripción de esta
          base de datos en el Registro Nacional de Bases de Datos (RNBD) de la Superintendencia de
          Industria y Comercio (SIC) se realizará en caso de que la operación supere los umbrales de
          ingresos o activos que hacen obligatoria dicha inscripción.
        </p>
      </section>

      <section id="contacto-quejas">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          11. Contacto y quejas ante la SIC
        </h2>
        <p className="mb-3 text-muted-foreground">
          Para ejercer tus derechos o resolver dudas sobre el tratamiento de tus datos personales,
          contáctanos:
        </p>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="font-semibold text-foreground">{SERVICE_NAME}</p>
          <p className="text-muted-foreground">Servicio prestado a Colombia</p>
          <p className="mt-1">
            <span className="text-muted-foreground">Correo: </span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <p className="mt-4 text-muted-foreground">
          Si consideras que tu solicitud no fue atendida adecuadamente, puedes presentar una queja
          ante la Superintendencia de Industria y Comercio (SIC), autoridad de control en materia de
          protección de datos personales en Colombia, a través de su sitio web{' '}
          <a
            href="https://www.sic.gov.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            www.sic.gov.co
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
