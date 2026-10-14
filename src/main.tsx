import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/figtree';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/montserrat';
import '@fontsource/kadwa/400.css';
import '@fontsource/kadwa/700.css';
import '@fontsource/arimo/400.css';
import '@fontsource/arimo/700.css';
import '@fontsource/arimo/400-italic.css';
import '@fontsource/averia-libre/400.css';
import './styles/global.css';
import { NimoGymDelete, NimoGymPrivacy, NimoGymSupport, Privacy, Terms } from './pages/Legal';
import { Home, MessageSent, NotFound } from './pages/Pages';
import { usePath } from './router';

const TITLES: Record<string, string> = {
  '/': 'Nimotix · Sistematizamos tu idea',
  '/terminos': 'Términos y condiciones · Nimotix',
  '/privacidad': 'Política de privacidad · Nimotix',
  '/contacto/enviado': 'Mensaje enviado · Nimotix',
  '/nimogym/privacidad': 'Política de privacidad de NimoGym · Nimotix',
  '/nimogym/eliminar-cuenta': 'Eliminar cuenta de NimoGym · Nimotix',
  '/nimogym/soporte': 'Soporte de NimoGym · Nimotix',
};

function App() {
  const path = usePath();

  useEffect(() => {
    document.title = TITLES[path] ?? 'Página no encontrada · Nimotix';
  }, [path]);

  // Al entrar con un #ancla (por ejemplo /#contacto), bajar hasta esa sección.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 80);
  }, []);

  switch (path) {
    case '/':
      return <Home />;
    case '/terminos':
      return <Terms />;
    case '/privacidad':
      return <Privacy />;
    case '/nimogym/privacidad':
      return <NimoGymPrivacy />;
    case '/nimogym/eliminar-cuenta':
      return <NimoGymDelete />;
    case '/nimogym/soporte':
      return <NimoGymSupport />;
    case '/contacto/enviado':
      return <MessageSent />;
    default:
      return <NotFound />;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
