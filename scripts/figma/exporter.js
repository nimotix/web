// Exporta pantallas de las apps del Figma al formato JSON que usa src/apps/Screen.tsx.
//
// Uso: pegar este código en el MCP de Figma (use_figma) o en un plugin de desarrollo,
// ajustando IDS (ids de las variantes "pantalla=…" de cada componente App / …).
// El resultado tiene un límite de ~20 KB por llamada: usar OFF para pedirlo en partes.
// SKIPNAV = true reemplaza la barra de navegación inferior por {"ref":"nav"};
// scripts/figma/merge.mjs la vuelve a generar con la pestaña activa correcta.

const IDS = ['16:349']; // ej. NimoGym · Bienvenida
const OFF = 0;
const SKIPNAV = false;

const VEC = new Set(['VECTOR', 'BOOLEAN_OPERATION', 'LINE', 'STAR', 'POLYGON']);
const r2 = (v) => Math.round(v * 100) / 100;
const rgba = (c, o = 1) => {
  const a = r2((c.a === undefined ? 1 : c.a) * o);
  const h = [c.r, c.g, c.b].map((v) => Math.round(v * 255));
  return a >= 1 ? '#' + h.map((v) => v.toString(16).padStart(2, '0')).join('') : `rgba(${h.join(',')},${a})`;
};
function paintCss(p, w, h) {
  if (p.visible === false) return null;
  const o = p.opacity === undefined ? 1 : p.opacity;
  if (p.type === 'SOLID') return rgba(p.color, o);
  if (p.type === 'GRADIENT_LINEAR' || p.type === 'GRADIENT_RADIAL') {
    const stops = p.gradientStops.map((s) => `${rgba(s.color, o)} ${r2(s.position * 100)}%`).join(',');
    if (p.type === 'GRADIENT_RADIAL') return `radial-gradient(closest-side,${stops})`;
    const t = p.gradientTransform;
    const [a, b] = t[0];
    const [c, d] = t[1];
    const det = a * d - b * c || 1;
    const dx = d / det;
    const dy = -c / det;
    return `linear-gradient(${Math.round((Math.atan2(dy * h, dx * w) * 180) / Math.PI + 90)}deg,${stops})`;
  }
  if (p.type === 'IMAGE') return 'IMAGE:' + p.imageHash.slice(0, 8);
  return null;
}
const cleanSvg = (s) => {
  s = s.replace(/\n/g, '').replace(/ xmlns="http:\/\/www.w3.org\/2000\/svg"/, '');
  const m = s.match(
    /^<svg width="([\d.]+)" height="([\d.]+)"([^>]*)><g clip-path="url\(#(clip[\w]+)\)">(.*)<\/g><defs><clipPath id="\4"><rect width="\1" height="\2" fill="white"\/><\/clipPath><\/defs><\/svg>$/,
  );
  if (m) s = `<svg width="${m[1]}" height="${m[2]}"${m[3]}>${m[5]}</svg>`;
  return s;
};
const isVecTree = (n) => {
  if (VEC.has(n.type)) return true;
  if (!('children' in n) || !n.children.length) return false;
  return n.children.every(isVecTree);
};

let navPushed = false;
async function walk(n, origin, out, depth) {
  if (n.visible === false) return;
  const tx = n.absoluteTransform[0][2];
  const ty = n.absoluteTransform[1][2];
  const isNav =
    n.name === 'BottomNav' ||
    /^hotspot · tab /.test(n.name) ||
    (depth === 1 && ty - origin[1] >= 789 && !/^hotspot/.test(n.name));
  if (SKIPNAV && isNav) {
    if (!navPushed) out.push({ ref: 'nav' });
    navPushed = true;
    return;
  }
  if (n.type === 'GROUP' && !isVecTree(n)) {
    for (const c of n.children) await walk(c, origin, out, depth);
    return;
  }
  const o = { x: r2(tx - origin[0]), y: r2(ty - origin[1]), w: r2(n.width), h: r2(n.height) };
  if (/^hotspot/.test(n.name)) o.nm = n.name.replace(/^hotspot · /, '');
  for (const re of n.reactions || [])
    for (const a of re.actions || [])
      if (a && a.type === 'NODE' && a.destinationId) {
        const d = await figma.getNodeByIdAsync(a.destinationId);
        if (d) o.to = d.name.replace(/^pantalla=/, '');
      }
  if (n.opacity !== undefined && n.opacity < 1) o.op = r2(n.opacity);
  const isEllipse = n.type === 'ELLIPSE';
  const arc =
    isEllipse && n.arcData && (n.arcData.endingAngle - n.arcData.startingAngle < 6.28 || n.arcData.innerRadius > 0);
  if (isVecTree(n) || arc) {
    try {
      o.svg = cleanSvg(await n.exportAsync({ format: 'SVG_STRING' }));
      out.push(o);
    } catch (e) {
      /* nodo sin capas visibles */
    }
    return;
  }
  const fills = Array.isArray(n.fills) ? n.fills : [];
  const bg = fills
    .slice()
    .reverse()
    .map((p) => paintCss(p, n.width, n.height))
    .filter(Boolean);
  if (n.type === 'TEXT') {
    o.t = 1;
    const segs = n.getStyledTextSegments(['fontName', 'fontSize', 'fontWeight', 'fills', 'letterSpacing', 'lineHeight', 'textCase', 'textDecoration']);
    const seg = (s) => {
      const f = { f: s.fontName.family, w: s.fontWeight, s: r2(s.fontSize), c: (s.fills[0] && paintCss(s.fills[0])) || '#000' };
      if (s.fontName.style.includes('Italic')) f.it = 1;
      if (s.letterSpacing && s.letterSpacing.value)
        f.ls = s.letterSpacing.unit === 'PERCENT' ? r2((s.letterSpacing.value / 100) * s.fontSize) : r2(s.letterSpacing.value);
      if (s.lineHeight && s.lineHeight.unit === 'PIXELS') f.lh = r2(s.lineHeight.value);
      else if (s.lineHeight && s.lineHeight.unit === 'PERCENT') f.lh = r2((s.lineHeight.value / 100) * s.fontSize);
      if (s.textCase === 'UPPER') f.up = 1;
      if (s.textDecoration === 'STRIKETHROUGH') f.st = 1;
      if (s.textDecoration === 'UNDERLINE') f.ul = 1;
      return f;
    };
    if (segs.length === 1) {
      o.txt = n.characters;
      o.f = seg(segs[0]);
    } else o.sp = segs.map((s) => [n.characters.slice(s.start, s.end), seg(s)]);
    if (n.textAlignHorizontal !== 'LEFT') o.al = n.textAlignHorizontal.toLowerCase();
    if (n.textAlignVertical !== 'TOP') o.va = n.textAlignVertical.toLowerCase();
    if (n.textAutoResize === 'WIDTH_AND_HEIGHT') o.nw = 1;
    if (n.textTruncation === 'ENDING') o.tr = 1;
    out.push(o);
    return;
  }
  if (bg.length) o.bg = bg.join(',');
  if (isEllipse) o.br = '50%';
  else if ('cornerRadius' in n) {
    if (n.cornerRadius === figma.mixed)
      o.br = [n.topLeftRadius, n.topRightRadius, n.bottomRightRadius, n.bottomLeftRadius].map((v) => r2(v) + 'px').join(' ');
    else if (n.cornerRadius) o.br = r2(n.cornerRadius);
  }
  const strokes = (n.strokes || []).filter((p) => p.visible !== false);
  if (strokes.length) {
    const col = paintCss(strokes[0]);
    if (n.strokeWeight === figma.mixed)
      o.bd = [n.strokeTopWeight, n.strokeRightWeight, n.strokeBottomWeight, n.strokeLeftWeight].map(r2).concat([col]);
    else if (n.strokeWeight) o.bd = [r2(n.strokeWeight), col];
  }
  const sh = [];
  for (const e of n.effects || []) {
    if (e.visible === false) continue;
    if (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW')
      sh.push(`${e.type === 'INNER_SHADOW' ? 'inset ' : ''}${r2(e.offset.x)}px ${r2(e.offset.y)}px ${r2(e.radius)}px ${r2(e.spread || 0)}px ${rgba(e.color)}`);
    if (e.type === 'LAYER_BLUR') o.blur = r2(e.radius);
    if (e.type === 'BACKGROUND_BLUR') o.bblur = r2(e.radius);
  }
  if (sh.length) o.sh = sh.join(',');
  if ('clipsContent' in n && n.clipsContent) o.clip = 1;
  if ('overflowDirection' in n && n.overflowDirection !== 'NONE') o.scroll = n.overflowDirection === 'HORIZONTAL' ? 'x' : 'y';
  if ('children' in n && n.children.length) {
    o.ch = [];
    for (const c of n.children) await walk(c, [tx, ty], o.ch, depth + 1);
  }
  out.push(o);
}

const res = {};
for (const id of IDS) {
  navPushed = false;
  const root = await figma.getNodeByIdAsync(id);
  const out = [];
  await walk(root, [root.absoluteTransform[0][2], root.absoluteTransform[1][2]], out, 0);
  res[root.name.replace('pantalla=', '')] = out[0];
}
const s = JSON.stringify(res);
return s.length + '|' + s.slice(OFF, OFF + 19500);
