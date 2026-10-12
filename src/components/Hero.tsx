import { Button } from './Button';

const APPS = [
  { name: 'Ekkonomy', color: '#d6fa3b' },
  { name: 'NimoGym', color: '#ff3d9a' },
  { name: 'SentiMenti', color: '#1fa89e' },
];

/** Símbolo de nimotix: el bloque (la "i") gira en su lugar y toma el color de cada app. */
function AnimatedSymbol() {
  return (
    <div className="symbol" aria-hidden="true">
      <svg className="symbol__arc" viewBox="0 0 370 373" fill="none">
        <path
          d="M10 185C10 138.587 28.4374 94.0752 61.2563 61.2563C94.0752 28.4374 138.587 10 185 10C231.413 10 275.925 28.4374 308.744 61.2563C341.563 94.0752 360 138.587 360 185V232H260V185C260 165.109 252.098 146.032 238.033 131.967C223.968 117.902 204.891 110 185 110C165.109 110 146.032 117.902 131.967 131.967C117.902 146.032 110 165.109 110 185V279C110 290.031 108.526 300.954 105.661 311.145C102.797 321.337 98.598 330.597 93.3051 338.397C88.0121 346.197 81.7285 352.384 74.813 356.606C67.8974 360.827 60.4853 363 53 363H10V185Z"
          fill="currentColor"
        />
      </svg>
      <span className="symbol__block" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            Diseñamos y desarrollamos apps web, móviles y de escritorio.
          </h1>
          <p className="hero__lead">
            Somos Nimotix, un equipo de estudiantes desarrolladores. Nos encargamos del diseño, el código, la publicación
            en las tiendas y el mantenimiento. Más abajo podés probar las apps que hicimos.
          </p>
          <div className="hero__actions">
            <Button to="/#proyectos">Ver proyectos</Button>
            <Button to="/#contacto" variant="contorno-claro">
              Contanos tu proyecto
            </Button>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <AnimatedSymbol />
          <ul className="hero__legend" aria-label="Colores de cada app">
            {APPS.map((a) => (
              <li key={a.name} className="chip">
                <span className="chip__dot" style={{ background: a.color }} />
                {a.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
