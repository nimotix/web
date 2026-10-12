import type { CSSProperties, ReactNode } from 'react';

/**
 * Renderiza una pantalla exportada del Figma (formato compacto, ver scripts/README).
 * Cada nodo tiene posición absoluta relativa a su padre, igual que en el diseño.
 */
export type TextStyle = {
  f: string; // familia
  w: number; // peso
  s: number; // tamaño
  c: string; // color
  ls?: number; // letter-spacing (px)
  lh?: number; // line-height (px)
  up?: 1; // mayúsculas
  st?: 1; // tachado
  ul?: 1; // subrayado
  it?: 1; // itálica
};

export type ScreenNode = {
  x: number;
  y: number;
  w: number;
  h: number;
  ch?: ScreenNode[];
  bg?: string;
  br?: number | string;
  bd?: (number | string)[];
  sh?: string;
  op?: number;
  blur?: number;
  bblur?: number;
  clip?: 1;
  scroll?: 'x' | 'y';
  svg?: string;
  img?: string;
  t?: 1;
  txt?: string;
  f?: TextStyle;
  sp?: [string, TextStyle][];
  al?: 'center' | 'right' | 'justified';
  va?: 'center' | 'bottom';
  nw?: 1;
  tr?: 1;
  nm?: string;
  to?: string;
};

export type AppData = { start: string; screens: Record<string, ScreenNode> };

const FONT_FALLBACK: Record<string, string> = {
  'Plus Jakarta Sans': "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', system-ui, sans-serif",
  Montserrat: "'Montserrat Variable', 'Montserrat', system-ui, sans-serif",
  Kadwa: "'Kadwa', Georgia, serif",
  Arimo: "'Arimo', Arial, sans-serif",
  'Averia Libre': "'Averia Libre', Georgia, serif",
  Figtree: "'Figtree Variable', 'Figtree', system-ui, sans-serif",
};

function textCss(f: TextStyle): CSSProperties {
  return {
    fontFamily: FONT_FALLBACK[f.f] ?? `'${f.f}', system-ui, sans-serif`,
    fontWeight: f.w,
    fontSize: f.s,
    color: f.c,
    letterSpacing: f.ls ? `${f.ls}px` : undefined,
    lineHeight: f.lh ? `${f.lh}px` : 'normal',
    textTransform: f.up ? 'uppercase' : undefined,
    fontStyle: f.it ? 'italic' : undefined,
    textDecoration: f.st ? 'line-through' : f.ul ? 'underline' : undefined,
  };
}

/** Bordes "inside" del Figma como box-shadow inset, así no desplazan a los hijos. */
function borderShadow(bd: (number | string)[]): string {
  if (bd.length === 2) return `inset 0 0 0 ${bd[0]}px ${bd[1]}`;
  const [t, r, b, l, c] = bd as [number, number, number, number, string];
  const parts: string[] = [];
  if (t) parts.push(`inset 0 ${t}px 0 0 ${c}`);
  if (r) parts.push(`inset -${r}px 0 0 0 ${c}`);
  if (b) parts.push(`inset 0 -${b}px 0 0 ${c}`);
  if (l) parts.push(`inset ${l}px 0 0 0 ${c}`);
  return parts.join(',');
}

/** El SVG exportado puede ser más grande que el nodo (sombras) — lo centramos sobre el nodo. */
function svgOffset(svg: string, w: number, h: number) {
  const m = svg.match(/^<svg width="([\d.]+)" height="([\d.]+)"/);
  if (!m) return { dx: 0, dy: 0 };
  const sw = Number(m[1]);
  const sh = Number(m[2]);
  if (sw <= w + 1 && sh <= h + 1) return { dx: 0, dy: 0 };
  const t = svg.match(/<clipPath[^>]*><rect[^>]*transform="translate\(([\d.]+) ([\d.]+)\)"/);
  if (t) return { dx: -Number(t[1]), dy: -Number(t[2]) };
  return { dx: -(sw - w) / 2, dy: -(sh - h) / 2 };
}

type RenderProps = { node: ScreenNode; onGo: (to: string) => void };

export function RenderNode({ node: n, onGo }: RenderProps): ReactNode {
  const style: CSSProperties = {
    position: 'absolute',
    left: n.x,
    top: n.y,
    width: n.w,
    height: n.h,
    opacity: n.op,
  };
  const clickable = !!n.to;
  const interactive = clickable
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-label': n.nm ?? n.to,
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          onGo(n.to!);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onGo(n.to!);
          }
        },
        className: 'scr-hit',
      }
    : {};

  if (n.svg) {
    const { dx, dy } = svgOffset(n.svg, n.w, n.h);
    return (
      <div style={{ ...style, overflow: 'visible' }} {...interactive}>
        <div
          style={{ position: 'absolute', left: dx, top: dy, lineHeight: 0, pointerEvents: 'none' }}
          dangerouslySetInnerHTML={{ __html: n.svg }}
        />
      </div>
    );
  }

  if (n.img === 'sentimenti-logo') {
    // Logo de Sentimientos (en el Figma es una imagen): lo dibujamos como wordmark tipográfico.
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center' }} aria-label="Sentimientos">
        <span style={{ fontFamily: "'Kadwa', Georgia, serif", fontWeight: 700, fontSize: 24, color: '#1f1b16', letterSpacing: '-0.5px' }}>
          Senti<span style={{ color: '#1fa89e' }}>mientos</span>
        </span>
      </div>
    );
  }

  if (n.t) {
    const base = n.f ? textCss(n.f) : {};
    const justify = n.va === 'center' ? 'center' : n.va === 'bottom' ? 'flex-end' : 'flex-start';
    // Textos de una sola línea en el diseño: evitamos que salten de línea por diferencias de métrica.
    const lineH = n.f ? n.f.lh ?? n.f.s * 1.25 : 16;
    const singleLine = !n.sp && n.h < lineH * 1.6;
    return (
      <div
        style={{
          ...style,
          ...base,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: justify,
          textAlign: n.al === 'justified' ? 'justify' : n.al ?? 'left',
          whiteSpace: n.nw || singleLine ? 'nowrap' : 'normal',
          overflow: n.tr ? 'hidden' : 'visible',
          width: n.nw ? 'max-content' : n.w,
          minWidth: n.nw ? n.w : undefined,
        }}
        {...interactive}
      >
        <span
          style={
            n.tr
              ? { display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
              : undefined
          }
        >
          {n.sp
            ? n.sp.map(([txt, f], i) => (
                <span key={i} style={textCss(f)}>
                  {txt}
                </span>
              ))
            : n.txt}
        </span>
      </div>
    );
  }

  const shadows = [n.sh, n.bd ? borderShadow(n.bd) : ''].filter(Boolean).join(',');
  const frameStyle: CSSProperties = {
    ...style,
    background: n.bg && n.bg !== 'rgba(255,255,255,0)' ? n.bg : undefined,
    borderRadius: typeof n.br === 'number' ? n.br : n.br,
    boxShadow: shadows || undefined,
    overflow: n.scroll ? undefined : n.clip ? 'hidden' : undefined,
    overflowX: n.scroll === 'x' ? 'auto' : n.scroll === 'y' ? 'hidden' : undefined,
    overflowY: n.scroll === 'y' ? 'auto' : n.scroll === 'x' ? 'hidden' : undefined,
    filter: n.blur ? `blur(${n.blur}px)` : undefined,
    backdropFilter: n.bblur ? `blur(${n.bblur}px)` : undefined,
  };

  return (
    <div style={frameStyle} className={n.scroll ? 'scr-scroll' : undefined} {...interactive}>
      {n.ch?.map((c, i) => <RenderNode key={i} node={c} onGo={onGo} />)}
    </div>
  );
}
