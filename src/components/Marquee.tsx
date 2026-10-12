const ITEMS = ['Apps móviles', 'Web apps', 'Software de escritorio', 'Backend y datos', 'Diseño UX/UI', 'Mantenimiento'];

/** Cinta en movimiento: se desplaza en loop infinito (22 s por vuelta, como en el Figma). */
export function Marquee() {
  const row = (hidden: boolean) => (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
      {ITEMS.map((t) => (
        <span key={t} className="marquee__item">
          {t}
          <span className="marquee__star">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
