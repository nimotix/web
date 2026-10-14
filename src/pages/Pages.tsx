import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Navbar } from '../components/Navbar';
import { Projects } from '../components/Projects';
import { Process, Services } from '../components/Sections';
import { Link } from '../router';
import { useReveal } from '../useReveal';

export function Home() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function MessageSent() {
  return (
    <main className="sent">
      <div className="sent__inner">
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
          <rect width="96" height="96" rx="28" fill="#ECE8E1" />
          <path d="M28 49L42 63L68 35" stroke="#141414" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1>¡Gracias! Recibimos tu consulta</h1>
        <p>Te vamos a responder al email que nos dejaste. Si es urgente, escribinos por WhatsApp.</p>
        <Link to="/" className="sent__back">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}

export function NotFound() {
  return (
    <main className="sent">
      <div className="sent__inner">
        <h1>No encontramos esta página</h1>
        <p>Puede que el link esté mal escrito o que la página ya no exista.</p>
        <Link to="/" className="sent__back">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}
