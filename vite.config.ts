import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * GitHub Pages no sabe de rutas de una SPA: si alguien entra directo a /terminos
 * sirve 404.html. Copiamos index.html como 404.html para que la app resuelva la ruta.
 */
const STATIC_ROUTES = [
  'terminos',
  'privacidad',
  'nimogym/privacidad',
  'nimogym/eliminar-cuenta',
  'nimogym/soporte',
];

function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const out = resolve(import.meta.dirname, 'dist');
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'));
      // Las rutas legales también como archivos reales: GitHub Pages responde 200
      // (y no 404) a /nimogym/privacidad, que es lo que revisan las tiendas de apps.
      for (const route of STATIC_ROUTES) {
        mkdirSync(resolve(out, route), { recursive: true });
        copyFileSync(resolve(out, 'index.html'), resolve(out, route, 'index.html'));
      }
    },
  };
}

// BASE_PATH: "/web/" para nimotix.github.io/web, "/" con dominio propio.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), spaFallback()],
});
