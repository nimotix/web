import { useEffect } from 'react';

const GLOWS = ['#d6fa3b', '#ff3d9a', '#1fa89e'];

/** Cada vez que se pasa el mouse por un botón, su brillo toma el siguiente color: lima, rosa, turquesa y vuelta a empezar. */
export function useButtonGlow() {
  useEffect(() => {
    const counts = new WeakMap<Element, number>();
    const onOver = (e: MouseEvent) => {
      const btn = (e.target as Element | null)?.closest<HTMLElement>('.btn');
      if (!btn || btn.contains(e.relatedTarget as Node | null)) return;
      const n = counts.get(btn) ?? 0;
      btn.style.setProperty('--glow', GLOWS[n % GLOWS.length]);
      counts.set(btn, n + 1);
    };
    document.addEventListener('mouseover', onOver);
    return () => document.removeEventListener('mouseover', onOver);
  }, []);
}
