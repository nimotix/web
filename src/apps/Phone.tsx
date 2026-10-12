import { useCallback, useState } from 'react';
import { RenderNode, type AppData } from './Screen';

type Props = {
  app: AppData;
  label: string;
  /** Color del texto de la barra de estado (9:41, señal, batería). */
  statusColor?: string;
};

/** Un teléfono navegable: la pantalla cambia al tocar, como en el prototipo de Figma. */
export function Phone({ app, label, statusColor = '#f5f5f0' }: Props) {
  const [screen, setScreen] = useState(app.start);
  const [visits, setVisits] = useState(0);
  const go = useCallback(
    (to: string) => {
      if (!app.screens[to]) return;
      setScreen(to);
      setVisits((v) => v + 1);
    },
    [app],
  );
  const node = app.screens[screen];

  return (
    <div className="phone" role="group" aria-label={`Demo interactiva de ${label}`}>
      <div className="phone__screen">
        <div className="phone__app" key={`${screen}-${visits}`}>
          <RenderNode node={{ ...node, x: 0, y: 0 }} onGo={go} />
        </div>
        <div className="phone__status" style={{ color: statusColor }} aria-hidden="true">
          <span className="phone__time">9:41</span>
          <span className="phone__island" />
          <svg className="phone__icons" width="49" height="11" viewBox="0 0 49 11" fill="none">
            <g fill="currentColor">
              <rect x="0" y="6.24" width="2.34" height="3.51" rx="0.62" />
              <rect x="3.59" y="4.29" width="2.34" height="5.46" rx="0.62" />
              <rect x="7.18" y="2.34" width="2.34" height="7.41" rx="0.62" />
              <rect x="10.76" y="0.39" width="2.34" height="9.36" rx="0.62" />
              <rect x="29.25" y="1.95" width="14.82" height="6.63" rx="1.56" />
            </g>
            <rect x="28.08" y="0.78" width="17.94" height="8.97" rx="2.73" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.78" />
          </svg>
        </div>
      </div>
    </div>
  );
}
