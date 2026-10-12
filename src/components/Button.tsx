import type { ReactNode } from 'react';
import { Link } from '../router';

type Variant = 'primario' | 'contorno-claro' | 'oscuro' | 'contorno-oscuro';

type Props = {
  children: ReactNode;
  variant?: Variant;
  to?: string;
  type?: 'button' | 'submit';
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
};

export function Arrow() {
  return (
    <svg className="btn__arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9H15M10 14L15 9L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Botón de la landing (componente "Botón" del Figma, con su hover). */
export function Button({ children, variant = 'primario', to, type = 'button', arrow = true, disabled, className = '' }: Props) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled}>
      {content}
    </button>
  );
}
