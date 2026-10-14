import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react';

/**
 * Router mínimo (sin dependencias) para las 4 páginas del sitio.
 * Respeta BASE_URL para que funcione en GitHub Pages bajo /web/.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export type Route = '/' | '/terminos' | '/privacidad' | '/contacto/enviado' | '/nimogym/privacidad' | '/nimogym/eliminar-cuenta' | '/nimogym/soporte';

function currentPath(): string {
  const p = window.location.pathname.slice(BASE.length) || '/';
  return p.replace(/\/$/, '') || '/';
}

export function href(path: string) {
  return BASE + path;
}

export function navigate(path: string) {
  const [routePart, hash] = path.split('#');
  const route = routePart || '/';
  const changed = route !== currentPath();
  window.history.pushState({}, '', href(route) + (hash ? `#${hash}` : ''));
  if (changed) window.dispatchEvent(new PopStateEvent('popstate'));
  if (hash) {
    window.setTimeout(
      () => document.getElementById(hash)?.scrollIntoView({ behavior: changed ? 'auto' : 'smooth' }),
      changed ? 60 : 0,
    );
  } else {
    // Mismo lugar sin ancla (por ejemplo, el logo estando en la landing): volver arriba.
    window.scrollTo({ top: 0, behavior: changed ? 'auto' : 'smooth' });
  }
}

export function usePath() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return path;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Link interno: "/terminos", "/#proyectos", "#contacto". */
export function Link({ to, onClick, ...rest }: LinkProps) {
  const isHashOnly = to.startsWith('#');
  const resolved = isHashOnly ? `/${to}` : to;
  return (
    <a
      {...rest}
      href={href(resolved)}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(resolved);
      }}
    />
  );
}
