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
    'El formulario se envía a través de FormSubmit (formsubmit.co), un servicio que reenvía el mensaje a nuestro correo. Se guardan en el correo de Nimotix (Gmail) mientras dure la conversación y hasta 12 meses después. Pasado ese plazo los borramos.',
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


const NIMOGYM_PRIVACY: Section[] = [
  [
    'Quiénes somos',
    'NimoGym es una aplicación de gestión de gimnasios desarrollada por Nimotix (Argentina). Cada gimnasio que usa NimoGym es el responsable de los datos de sus alumnos y profesores; Nimotix actúa como proveedor del software y trata esos datos solo para hacer funcionar la aplicación. Contacto: nimotixsoftware@gmail.com.',
  ],
  [
    'Cómo se crea tu cuenta',
    'No te registrás vos: tu gimnasio te crea la cuenta con tu email y tus datos. Si no sos alumno o profesor de un gimnasio que usa NimoGym, no podés usar la aplicación y no tenemos datos tuyos.',
  ],
  [
    'Qué datos tratamos',
    'Datos de la cuenta: nombre y apellido, email, DNI y teléfono. Datos del gimnasio sobre vos: plan contratado y fecha de pago, fecha de nacimiento y objetivos que cargue tu profesor. Datos de uso: rutinas asignadas, entrenamientos realizados (ejercicios, series, repeticiones, pesos y duración), check-ins, turnos y asistencia, y estadísticas derivadas. Contenido que vos elegís subir: foto de perfil y, si querés, la foto de tu entrenamiento al terminar una rutina. Datos técnicos: tus preferencias dentro de la app (tema, sonidos), que se guardan en tu dispositivo.',
  ],
  [
    'Permisos del dispositivo',
    'Cámara: para sacar tu foto de perfil o la foto de tu entrenamiento. Galería: para elegir una foto de perfil. Notificaciones: para avisos locales del temporizador de descanso. Solo se usan cuando lo pedís y podés quitarlos en los ajustes de tu teléfono. La app no usa tu ubicación, no accede a tus contactos y no muestra publicidad.',
  ],
  [
    'Qué NO hacemos',
    'No vendemos tus datos, no los usamos para publicidad, no te rastreamos entre apps ni sitios de terceros y no incluimos herramientas de analítica o publicidad de terceros dentro de la aplicación.',
  ],
  [
    'Para qué los usamos',
    'Para que puedas iniciar sesión, ver y registrar tus entrenamientos, reservar turnos, que tu profesor te acompañe y gestione tu plan, y para que el gimnasio administre su actividad. No tomamos decisiones automatizadas sobre vos.',
  ],
  [
    'Quién ve tus datos',
    'Los profesores y administradores de tu gimnasio ven los datos de sus alumnos. Los alumnos solo ven los propios. Los datos de un gimnasio no son visibles para otro. Tu foto de entrenamiento solo se comparte fuera de la app si vos la compartís.',
  ],
  [
    'Proveedores que intervienen',
    'Los datos se alojan en Supabase (base de datos, autenticación y archivos), con servidores en Estados Unidos. Las copias de resguardo del historial antiguo se guardan en una carpeta de Google Drive controlada por Nimotix. Estos proveedores tratan los datos por cuenta nuestra y no los usan para sus propios fines.',
  ],
  [
    'Cuánto tiempo los conservamos',
    'Mientras tu cuenta esté activa en el gimnasio. El historial detallado de series de más de 3 meses se archiva y queda resumido en la aplicación. Cuando eliminás tu cuenta se borran tus datos personales, tu foto y tu historial; las copias de resguardo ya archivadas se depuran en forma periódica y, si querés que se borren antes, escribinos.',
  ],
  [
    'Cómo eliminar tu cuenta',
    'Desde la app: Perfil → Eliminar mi cuenta. Se borra tu cuenta y sus datos de forma definitiva. Si no podés ingresar, escribinos a nimotixsoftware@gmail.com desde el email de tu cuenta, o mirá la página de eliminación de cuenta. Si sos el único profesor de tu gimnasio, primero hay que sumar otro profesor.',
  ],
  [
    'Tus derechos',
    'Según la Ley 25.326 podés acceder a tus datos, pedir que los corrijamos, actualicemos o borremos, escribiendo a nimotixsoftware@gmail.com o consultando a tu gimnasio. El acceso es gratuito en intervalos no menores a seis meses, salvo interés legítimo (art. 14, inc. 3).',
  ],
  [
    'Menores de edad',
    'Si sos menor de edad, tu cuenta la crea tu gimnasio con autorización de tu madre, padre o tutor, que puede pedirnos acceso o eliminación.',
  ],
  [
    'Órgano de control',
    'La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.',
  ],
  ['Cambios', 'Si cambiamos esta política, publicamos la versión nueva en esta página con su fecha.'],
];

const NIMOGYM_DELETE: Section[] = [
  [
    'Desde la aplicación (lo más rápido)',
    '1. Abrí NimoGym e iniciá sesión. 2. Entrá a Perfil. 3. Tocá "Eliminar mi cuenta" y confirmá. Tu cuenta, tu foto y tu historial de entrenamientos se borran de forma definitiva.',
  ],
  [
    'Si no podés ingresar',
    'Escribinos a nimotixsoftware@gmail.com desde el email de tu cuenta con el asunto "Eliminar mi cuenta NimoGym", indicando tu nombre y tu gimnasio. Respondemos dentro de los 10 días hábiles.',
  ],
  [
    'Qué se borra',
    'Datos de la cuenta (nombre, email, DNI, teléfono, fecha de nacimiento, objetivos), foto de perfil, rutinas propias, entrenamientos, series, estadísticas, asistencia, turnos, check-ins y tokens de notificación.',
  ],
  [
    'Qué puede quedar',
    'Copias de resguardo del historial archivado (más de 3 meses de antigüedad), que se depuran en forma periódica; si querés que se borren antes, pedilo por mail. Las rutinas que un profesor armó para sus alumnos se conservan para ellos.',
  ],
  [
    'Profesores',
    'Si sos el único profesor de un gimnasio no podés eliminar tu cuenta hasta que haya otro profesor activo. Las rutinas que creaste para tus alumnos pasan a otro profesor del gimnasio.',
  ],
];

const NIMOGYM_SUPPORT: Section[] = [
  [
    'Escribinos',
    'Soporte de NimoGym: nimotixsoftware@gmail.com o WhatsApp al +54 9 343 532-4268. Respondemos de lunes a viernes.',
  ],
  [
    'No puedo ingresar',
    'Tu cuenta la crea tu gimnasio: pedile a tu profesor tus datos de acceso. Si olvidaste la contraseña, usá "¿Olvidaste tu contraseña?" en la pantalla de ingreso. Si tu cuenta figura inactiva, consultá en tu gimnasio por el estado de tu plan.',
  ],
  [
    'Privacidad y datos',
    'Mirá la política de privacidad de NimoGym y cómo eliminar tu cuenta.',
  ],
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
            Última actualización: 13 de octubre de 2026.
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

export function NimoGymPrivacy() {
  return <LegalPage title="Política de privacidad de NimoGym" sections={NIMOGYM_PRIVACY} />;
}

export function NimoGymDelete() {
  return <LegalPage title="Eliminar tu cuenta de NimoGym" sections={NIMOGYM_DELETE} />;
}

export function NimoGymSupport() {
  return <LegalPage title="Soporte de NimoGym" sections={NIMOGYM_SUPPORT} />;
}
