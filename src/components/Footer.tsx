import { Link } from '../router';
import { Logo } from './Logo';

const COLUMNS = [
  {
    title: 'Proyectos',
    links: [
      { to: '/#ekkonomy', label: 'Ekkonomy' },
      { to: '/#nimogym', label: 'NimoGym' },
      { to: '/#sentimientos', label: 'Sentimientos' },
    ],
  },
  {
    title: 'Estudio',
    links: [
      { to: '/#que-hacemos', label: 'Qué hacemos' },
      { to: '/#como-trabajamos', label: 'Cómo trabajamos' },
      { to: '/#contacto', label: 'Contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terminos', label: 'Términos y condiciones' },
      { to: '/privacidad', label: 'Política de privacidad' },
      { to: '/nimogym/privacidad', label: 'Privacidad de NimoGym' },
      { to: '/nimogym/soporte', label: 'Soporte de NimoGym' },
      { href: 'https://www.argentina.gob.ar/defensadelconsumidor', label: 'Defensa del consumidor' },
    ],
  },
];

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo width={190} />
            <p>Estudio de desarrollo de software. Hecho en Argentina.</p>
          </div>
          {COLUMNS.map((c) => (
            <nav key={c.title} className="footer__col" aria-label={c.title}>
              <p className="footer__heading">{c.title}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    {'href' in l ? (
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.to}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer__bottom">
          <p>© {YEAR} Nimotix. Todos los derechos reservados.</p>
          <p className="footer__legal">
            La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, órgano de control de la Ley N° 25.326, atiende denuncias y
            reclamos sobre el incumplimiento de las normas de protección de datos personales.
          </p>
        </div>
      </div>
    </footer>
  );
}
