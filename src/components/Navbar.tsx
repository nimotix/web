import { useEffect, useState } from 'react';
import { Link } from '../router';
import { Button } from './Button';
import { Logo } from './Logo';

const LINKS = [
  { to: '/#proyectos', label: 'Proyectos' },
  { to: '/#que-hacemos', label: 'Qué hacemos' },
  { to: '/#como-trabajamos', label: 'Cómo trabajamos' },
];

/** Navbar fija. En la landing los links van a la derecha; en las páginas legales, al centro. */
export function Navbar({ centered = false }: { centered?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, [open]);

  return (
    <header className={`navbar ${centered ? 'navbar--centered' : ''} ${open ? 'is-open' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="nimotix, inicio" onClick={() => setOpen(false)}>
          <Logo width={152} />
        </Link>
        <nav className="navbar__links" aria-label="Principal">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="navbar__link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Button to="/#contacto" className="navbar__cta">
          Escribinos
        </Button>
        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
