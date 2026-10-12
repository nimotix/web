import { useState, type FormEvent } from 'react';
import { Link, navigate } from '../router';
import { Arrow } from './Button';

const TYPES = ['App móvil', 'Web app', 'Escritorio', 'Otro'];
const EMAIL = 'nimotixsoftware@gmail.com';

/**
 * El formulario se envía por POST a FormSubmit, que lo reenvía por mail a EMAIL (sin backend propio).
 * VITE_CONTACT_ENDPOINT permite usar otro servicio (Formspree, una función de Supabase, etc.).
 */
const ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || `https://formsubmit.co/ajax/${EMAIL}`;

const CHANNELS = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: (
      <>
        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" />
        <path d="M3 7L12 13L21 7" />
      </>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+54 9 343 532-4268',
    href: 'https://wa.me/5493435324268',
    icon: <path d="M4 20L5.3 16.2C4.5 14.9 4 13.5 4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12C20 16.4 16.4 20 12 20C10.5 20 9.1 19.6 7.9 18.8L4 20Z" />,
  },
  {
    label: 'GitHub',
    value: 'github.com/nimotix',
    href: 'https://github.com/nimotix',
    icon: (
      <path d="M9 18.9999C5 20.4999 5 16.9999 3 16.4999M15 20.9999V17.4999C15 16.4999 15.1 16.0999 14.5 15.4999C17.3 15.1999 20 14.0999 20 9.49991C20 8.29991 19.6 7.19991 18.8 6.29991C19.2 5.19991 19.1 3.99991 18.7 2.99991C18.7 2.99991 17.6 2.69991 15.1 4.39991C13.1 3.89991 10.9 3.89991 8.9 4.39991C6.4 2.69991 5.3 2.99991 5.3 2.99991C4.9 3.99991 4.8 5.19991 5.2 6.29991C4.4 7.19991 4 8.29991 4 9.49991C4 14.0999 6.7 15.1999 9.5 15.4999C8.9 16.0999 8.9 16.6999 9 17.4999V20.9999" />
    ),
  },
];

export function Contact() {
  const [type, setType] = useState(TYPES[0]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('nombre') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('mensaje') ?? '').trim();
    setError('');

    // Campo trampa para bots: una persona nunca lo completa.
    if (data.get('_honey')) {
      navigate('/contacto/enviado');
      return;
    }

    setSending(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre: name,
          email,
          tipo: type,
          mensaje: message,
          _subject: `Consulta desde la web: ${type}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || result.success === 'false' || result.success === false) throw new Error(String(res.status));
      navigate('/contacto/enviado');
    } catch {
      setError(`No pudimos enviar el mensaje. Probá de nuevo o escribinos a ${EMAIL}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacto" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__card">
          <div className="contact__intro">
            <p className="kicker">Contacto</p>
            <h2 id="contact-title" className="contact__title">
              Contanos qué querés construir
            </h2>
            <p className="contact__lead">
              Respondemos por mail. Si ya tenés un diseño, un documento o una app parecida, mandalo: nos ayuda a darte un
              presupuesto más preciso.
            </p>
            <ul className="contact__channels">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a
                    className="channel"
                    href={c.href || undefined}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {c.icon}
                      </g>
                    </svg>
                    <span>
                      <span className="channel__label">{c.label}</span>
                      <span className="channel__value">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form className="contact__form" onSubmit={onSubmit}>
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="visually-hidden" />
            <label className="field">
              <span className="field__label">Nombre</span>
              <input name="nombre" type="text" placeholder="Cómo te llamás" required autoComplete="name" />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input name="email" type="email" placeholder="tu@email.com" required autoComplete="email" />
            </label>
            <label className="field">
              <span className="field__label">¿Qué querés hacer?</span>
              <textarea name="mensaje" rows={4} placeholder="Contanos la idea, para quién es y si tenés una fecha en mente" required />
            </label>
            <fieldset className="field">
              <legend className="field__label">Tipo de proyecto</legend>
              <div className="chips">
                {TYPES.map((t) => (
                  <label key={t} className={`type-chip ${type === t ? 'is-active' : ''}`}>
                    <input type="radio" name="tipo" value={t} checked={type === t} onChange={() => setType(t)} />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="consent">
              <input type="checkbox" name="acepto" required />
              <span className="consent__box" aria-hidden="true" />
              <span>
                Leí y acepto la <Link to="/privacidad">Política de privacidad</Link>. Usamos tus datos solo para responder
                esta consulta.
              </span>
            </label>
            {error && (
              <p className="contact__error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn--primario contact__submit" disabled={sending}>
              <span>{sending ? 'Enviando…' : 'Enviar consulta'}</span>
              <Arrow />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
