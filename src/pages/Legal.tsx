import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Link } from '../router';

type Section = [title: string, body: string];

const TERMS: Section[] = [
  [
    '1. Quiénes somos',
    'Este sitio pertenece a Nimotix, un equipo de desarrolladores de Argentina. Para cualquier consulta podés escribirnos a nimotixsoftware@gmail.com o por WhatsApp al +54 9 343 532-4268.',
  ],
  [
    '2. Uso del sitio',
    'El sitio informa sobre nuestros servicios de desarrollo de software y muestra proyectos realizados. Al usarlo aceptás estos términos. Si no estás de acuerdo, te pedimos que no lo uses.',
  ],
  [
    '3. Proyectos mostrados',
    'Las pantallas de Ekkonomy, NimoGym y Sentimientos son demostraciones con datos ficticios. Las marcas y contenidos de cada proyecto pertenecen a sus titulares y se muestran con su autorización.',
  ],
  [
    '4. Consultas y presupuestos',
    'Enviar una consulta no genera ningún compromiso. Cada trabajo se rige por una propuesta o contrato escrito que detalla alcance, plazos, precio, propiedad del código y mantenimiento.',
  ],
  [
    '5. Propiedad intelectual',
    'Los textos, el diseño y la marca Nimotix de este sitio son nuestros. No pueden copiarse ni usarse con fines comerciales sin autorización escrita.',
  ],
  [
    '6. Responsabilidad',
    'Hacemos lo posible para que la información sea correcta y esté actualizada, pero puede contener errores u omisiones. No respondemos por sitios de terceros enlazados desde aquí.',
  ],
  [
    '7. Defensa del consumidor',
    'Si sos consumidor, te asisten los derechos de la Ley 24.240. Podés hacer reclamos en la Ventanilla Única Federal de Defensa del Consumidor (argentina.gob.ar/defensadelconsumidor).',
  ],
  [
    '8. Ley aplicable',
    'Estos términos se rigen por las leyes de la República Argentina.',
  ],
];

const PRIVACY: Section[] = [
  ['Responsable', 'Nimotix. Contacto: nimotixsoftware@gmail.com.'],
  [
    'Qué datos juntamos',
    'Solo los que nos das en el formulario de contacto: nombre, email, tipo de proyecto y el mensaje. Si activamos estadísticas de visitas, se informará acá qué herramienta usamos y qué datos registra.',
  ],
  [
    'Para qué los usamos',
    'Para responder tu consulta y, si avanzamos, preparar un presupuesto. No vendemos ni cedemos tus datos, y no te mandamos publicidad sin tu consentimiento.',
  ],
  [
    'Dónde se guardan y por cuánto tiempo',
    'El formulario se envía a través de FormSubmit (formsubmit.co), un servicio que reenvía el mensaje a nuestro correo. Se guardan en el correo de Nimotix (Gmail) mientras dure la conversación y hasta [plazo] después. Pasado ese plazo los borramos.',
  ],
  [
    'Tus derechos',
    'Según la Ley 25.326 podés acceder a tus datos, pedir que los corrijamos, actualicemos o borremos, escribiendo a nimotixsoftware@gmail.com. El acceso es gratuito en intervalos no menores a seis meses, salvo interés legítimo (art. 14, inc. 3).',
  ],
  [
    'Órgano de control',
    'La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.',
  ],
  ['Cambios', 'Si cambiamos esta política, publicamos la versión nueva en esta página con su fecha.'],
];

function LegalPage({ title, sections }: { title: string; sections: Section[] }) {
  return (
    <>
      <Navbar centered />
      <main className="legal">
        <article className="legal__content">
          <Link to="/" className="legal__back">
            ← Volver al inicio
          </Link>
          <h1 className="legal__title">{title}</h1>
          <p className="legal__updated">
            Última actualización: 12 de octubre de 2026.
            {sections.some(([, b]) => b.includes('[')) && ' Los datos entre corchetes se completan antes de publicar.'}
          </p>
          {sections.map(([t, b]) => (
            <section key={t}>
              <h2>{t}</h2>
              <p>{b}</p>
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}

export function Terms() {
  return <LegalPage title="Términos y condiciones" sections={TERMS} />;
}

export function Privacy() {
  return <LegalPage title="Política de privacidad" sections={PRIVACY} />;
}
