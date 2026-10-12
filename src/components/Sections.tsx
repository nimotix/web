const SERVICES = [
  {
    title: 'Apps móviles',
    text: 'iPhone y Android con una sola base de código en Flutter. Funcionan sin señal, con notificaciones y Live Activities.',
    where: 'En: NimoGym · SentiMenti',
    icon: (
      <>
        <path d="M33.5 18.3335H26.5C24.567 18.3335 23 19.9005 23 21.8335V38.1668C23 40.0998 24.567 41.6668 26.5 41.6668H33.5C35.433 41.6668 37 40.0998 37 38.1668V21.8335C37 19.9005 35.433 18.3335 33.5 18.3335Z" />
        <path d="M28.8333 37H31.1667" />
      </>
    ),
  },
  {
    title: 'Web apps y PWA',
    text: 'Aplicaciones web con React y TypeScript que se instalan en el celular o la compu como una app.',
    where: 'En: Ekkonomy',
    icon: (
      <>
        <path d="M39.3333 20.6665H20.6666C19.378 20.6665 18.3333 21.7112 18.3333 22.9998V34.6665C18.3333 35.9552 19.378 36.9998 20.6666 36.9998H39.3333C40.622 36.9998 41.6666 35.9552 41.6666 34.6665V22.9998C41.6666 21.7112 40.622 20.6665 39.3333 20.6665Z" />
        <path d="M18.3333 25.3335H41.6666M25.3333 41.6668H34.6666M30 37.0002V41.6668" />
      </>
    ),
  },
  {
    title: 'Software de escritorio',
    text: 'Apps para Windows pensadas para el mostrador o la oficina: tablas, grillas y editores completos.',
    where: 'En: NimoGym (profesores)',
    icon: (
      <>
        <path d="M38.1667 20.6665H21.8333C20.5447 20.6665 19.5 21.7112 19.5 22.9998V32.3332C19.5 33.6218 20.5447 34.6665 21.8333 34.6665H38.1667C39.4553 34.6665 40.5 33.6218 40.5 32.3332V22.9998C40.5 21.7112 39.4553 20.6665 38.1667 20.6665Z" />
        <path d="M25.3334 39.3332H34.6667M30 34.6665V39.3332" />
      </>
    ),
  },
  {
    title: 'Backend y mantenimiento',
    text: 'Login, base de datos, archivos y permisos con Supabase. Publicamos, actualizamos y damos soporte.',
    where: 'En: Todas',
    icon: (
      <>
        <path d="M30 25.3335C35.1546 25.3335 39.3333 23.7665 39.3333 21.8335C39.3333 19.9005 35.1546 18.3335 30 18.3335C24.8453 18.3335 20.6666 19.9005 20.6666 21.8335C20.6666 23.7665 24.8453 25.3335 30 25.3335Z" />
        <path d="M20.6666 21.8335V30.0002M20.6666 30.0002C20.6666 31.9835 24.8666 33.5002 30 33.5002C35.1333 33.5002 39.3333 31.9835 39.3333 30.0002M20.6666 30.0002V38.1668C20.6666 40.1502 24.8666 41.6668 30 41.6668C35.1333 41.6668 39.3333 40.1502 39.3333 38.1668V30.0002M39.3333 30.0002V21.8335" />
      </>
    ),
  },
];

export function Services() {
  return (
    <section id="que-hacemos" className="services" aria-labelledby="services-title">
      <div className="container">
        <p className="kicker">Qué hacemos</p>
        <h2 id="services-title" className="section-title">
          Del diseño a la tienda, y después también
        </h2>
        <ul className="services__grid">
          {SERVICES.map((s) => (
            <li key={s.title} className="service">
              <svg className="service__icon" width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true">
                <rect width="60" height="60" rx="18" fill="#141414" />
                <g stroke="#ECE8E1" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </g>
              </svg>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__text">{s.text}</p>
              <p className="service__where">{s.where}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: '01',
    color: '#ece8e1',
    title: 'Charlamos',
    text: 'Entendemos qué necesitás, para quién es y qué tiene que resolver. Te pasamos alcance, plazos y presupuesto por escrito.',
  },
  {
    n: '02',
    color: '#d6fa3b',
    title: 'Diseñamos',
    text: 'Armamos las pantallas en Figma y las probás como prototipo antes de escribir una línea de código.',
  },
  {
    n: '03',
    color: '#ff3d9a',
    title: 'Desarrollamos',
    text: 'Entregas cortas que podés probar en tu celular. Todo el código pasa por la revisión de otra persona del equipo.',
  },
  {
    n: '04',
    color: '#1fa89e',
    title: 'Publicamos y mantenemos',
    text: 'Subimos la app a Play Store, App Store o la web, y seguimos con soporte y mejoras.',
  },
];

export function Process() {
  return (
    <section id="como-trabajamos" className="process" aria-labelledby="process-title">
      <div className="container">
        <p className="kicker">Cómo trabajamos</p>
        <h2 id="process-title" className="section-title section-title--light">
          Cuatro etapas, siempre a la vista
        </h2>
        <ol className="process__steps">
          {STEPS.map((s) => (
            <li key={s.n} className="step">
              <span className="step__marker" style={{ background: s.color }} aria-hidden="true" />
              <span className="step__number" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
