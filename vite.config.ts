import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * GitHub Pages no sabe de rutas de una SPA: si alguien entra directo a /terminos
 * sirve 404.html. Copiamos index.html como 404.html para que la app resuelva la ruta.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const out = resolve(import.meta.dirname, 'dist');
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'));
    },
  };
}

// BASE_PATH: "/web/" para nimotix.github.io/web, "/" con dominio propio.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), spaFallback()],
});
