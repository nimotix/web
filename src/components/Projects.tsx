import type { CSSProperties } from 'react';
import ekkonomy from '../apps/data/ekkonomy.json';
import nimogym from '../apps/data/nimogym.json';
import sentimenti from '../apps/data/sentimenti.json';
import { Phone } from '../apps/Phone';
import type { AppData } from '../apps/Screen';

type Project = {
  id: string;
  name: string;
  badge: string;
  kicker: string;
  headline: string;
  features: string[];
  meta: [string, string][];
  app: AppData;
  phoneSide: 'left' | 'right';
  statusColor: string;
  theme: {
    bg: string;
    text: string;
    muted: string;
    accent: string;
    badgeText: string;
    tick: string;
    line: string;
    glow: string;
    titleFont: string;
  };
};

const PROJECTS: Project[] = [
  {
    id: 'ekkonomy',
    name: 'Ekkonomy',
    badge: 'Beta por invitación',
    kicker: 'Finanzas personales | Web app instalable (PWA)',
    headline: 'Muestra cuánto entró, cuánto salió y cuánto queda, sumando todas tus cuentas.',
    features: [
      'Naida, asistente con IA: le escribís o le hablás y arma los movimientos',
      'Foto del ticket y carga por voz',
      'Presupuestos mensuales por categoría',
      'Gastos recurrentes: sueldo, alquiler, suscripciones',
      'Grupos para gastos compartidos y quién le debe a quién',
      'Notificaciones en el celular y por mail',
    ],
    meta: [
      ['Plataforma', 'Web instalable en celular y compu'],
      ['Tecnología', 'React, TypeScript, Supabase'],
      ['Para quién', 'Uso personal y grupos de confianza'],
    ],
    app: ekkonomy as AppData,
    phoneSide: 'right',
    statusColor: '#f5f5f0',
    theme: {
      bg: '#0f2a1d',
      text: '#eaf3ec',
      muted: '#9fb5a8',
      accent: '#d6fa3b',
      badgeText: '#141414',
      tick: '#141414',
      line: 'rgba(234,243,236,0.2)',
      glow: 'rgba(214,250,59,0.12)',
      titleFont: "'Plus Jakarta Sans Variable', system-ui, sans-serif",
    },
  },
  {
    id: 'nimogym',
    name: 'NimoGym',
    badge: 'En uso',
    kicker: 'Gestión de gimnasios | iOS, Android y Windows',
    headline: 'Conecta al profe con sus alumnos: rutinas, turnos, planes y progreso en un solo lugar.',
    features: [
      'Rutina del día con timer guiado set por set',
      'Funciona sin señal y sincroniza al volver',
      'Turnos: reservar, cancelar y recuperar',
      'Progreso semanal, rachas y pesos máximos',
      'Story para Instagram con las stats del entreno',
      'App de escritorio para el mostrador del gimnasio',
    ],
    meta: [
      ['Plataforma', 'iPhone, Android y Windows'],
      ['Tecnología', 'Flutter, Supabase'],
      ['Para quién', 'Dueños de gimnasios, profes y alumnos'],
    ],
    app: nimogym as AppData,
    phoneSide: 'left',
    statusColor: '#f5f5f0',
    theme: {
      bg: '#1c1b17',
      text: '#f5f5f0',
      muted: '#8f8e85',
      accent: '#ff3d9a',
      badgeText: '#141414',
      tick: '#1c1b17',
      line: 'rgba(245,245,240,0.2)',
      glow: 'rgba(255,61,154,0.12)',
      titleFont: "'Montserrat Variable', system-ui, sans-serif",
    },
  },
  {
    id: 'sentimientos',
    name: 'Sentimientos',
    badge: 'En diseño',
    kicker: 'Bienestar docente | App móvil para una escuela',
    headline: 'Una práctica diaria para que los docentes aprendan, registren y enseñen competencias emocionales.',
    features: [
      'Feed con conceptos y recursos para el aula',
      'Registro de desempeños y evidencias',
      'Matriz de cinco competencias con progreso',
      'Seguimiento de quienes acompañan la práctica',
      'Perfil con días seguidos y registros',
    ],
    meta: [
      ['Plataforma', 'iPhone y Android'],
      ['Etapa', 'Diseño terminado, desarrollo en curso'],
      ['Para quién', 'Docentes y equipos de una escuela'],
    ],
    app: sentimenti as AppData,
    phoneSide: 'right',
    statusColor: '#1f1b16',
    theme: {
      bg: '#f6efe0',
      text: '#1f1b16',
      muted: '#6e6052',
      accent: '#1fa89e',
      badgeText: '#ffffff',
      tick: '#fffaf0',
      line: 'rgba(31,27,22,0.2)',
      glow: 'rgba(31,168,158,0.12)',
      titleFont: "'Kadwa', Georgia, serif",
    },
  },
];

function Check() {
  return (
    <svg className="project__check" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="var(--p-accent)" />
      <path d="M6.5 11.2L9.6 14.2L15.5 8" stroke="var(--p-tick)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hint() {
  return (
    <div className="hint" aria-hidden="true">
      <span className="hint__halo" />
      <span className="hint__chip">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M9.9998 9.16671V4.58337C9.9998 3.91671 9.41647 3.33337 8.7498 3.33337C8.08314 3.33337 7.4998 3.91671 7.4998 4.58337V9.16671V12.75L5.66647 10.9167C5.2498 10.5 4.58314 10.4167 4.08314 10.75C3.4998 11.0834 3.33314 11.8334 3.66647 12.4167L5.41647 15.1667C6.33314 16.5834 7.83314 17.5 9.58314 17.5H9.9998C12.7498 17.5 14.9998 15.25 14.9998 12.5V8.75004C14.9998 8.08337 14.4165 7.50004 13.7498 7.50004C13.0831 7.50004 12.4998 8.08337 12.4998 8.75004M9.9998 8.33337V7.08337C9.9998 6.41671 10.5831 5.83337 11.2498 5.83337C11.9165 5.83337 12.4998 6.41671 12.4998 7.08337V9.16671"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Tocá la pantalla y usala
      </span>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const vars = {
    '--p-bg': p.theme.bg,
    '--p-text': p.theme.text,
    '--p-muted': p.theme.muted,
    '--p-accent': p.theme.accent,
    '--p-badge-text': p.theme.badgeText,
    '--p-tick': p.theme.tick,
    '--p-line': p.theme.line,
    '--p-glow': p.theme.glow,
    '--p-title-font': p.theme.titleFont,
  } as CSSProperties;

  return (
    <article id={p.id} className={`project project--phone-${p.phoneSide}`} style={vars} aria-labelledby={`${p.id}-title`}>
      <div className="project__copy">
        <div className="project__head">
          <h3 id={`${p.id}-title`} className="project__name">
            {p.name}
          </h3>
          <span className="project__badge">{p.badge}</span>
        </div>
        <p className="project__kicker">{p.kicker}</p>
        <p className="project__headline">{p.headline}</p>
        <ul className="project__features">
          {p.features.map((f) => (
            <li key={f}>
              <Check />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <dl className="project__meta">
          {p.meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="project__demo">
        <span className="project__glow" aria-hidden="true" />
        <div className="project__phone-wrap">
          <Phone app={p.app} label={p.name} statusColor={p.statusColor} />
        </div>
        <Hint />
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="proyectos" className="projects" aria-label="Proyectos">
      <h2 className="visually-hidden">Proyectos</h2>
      <div className="container projects__list">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
