// Merges the exported screen JSON into one file per app, expanding {"ref":"nav"} placeholders.
import fs from 'node:fs';
const S = new URL('./screens/', import.meta.url).pathname;
const OUT = new URL('../../src/apps/data/', import.meta.url).pathname;
const read = f => JSON.parse(fs.readFileSync(S + f, 'utf8'));

// ---------- Ekkonomy ----------
const ekk = { ...read('ekk-inicio.json'), ...read('ekk-movimientos.json'), ...read('ekk-plan.json'), ...read('ekk-grupos-cuentas.json') };
const ekkTabs = ['Inicio', 'Movimientos', 'Plan', 'Grupos', 'Cuentas'];
const inicioCh = ekk.Inicio.ch;
const ekkNavTpl = inicioCh.find(n => n.y === 790 && n.h === 84 && n.ch);
const ekkHot = inicioCh.filter(n => n.nm && n.nm.startsWith('tab '));
function ekkNav(active) {
  const nav = structuredClone(ekkNavTpl);
  // children: [icon, label] x5, then home indicator
  for (let i = 0; i < 5; i++) {
    const icon = nav.ch[i * 2], label = nav.ch[i * 2 + 1];
    const on = i === active;
    icon.svg = icon.svg.replace(/#D6FA3B|#8FA096/g, on ? '#D6FA3B' : '#8FA096').replace(/stroke-width="(2\.4|2)"/g, `stroke-width="${on ? 2.4 : 2}"`);
    label.f.c = on ? '#d6fa3b' : '#8fa096';
  }
  const hots = ekkHot.map((h, i) => { const c = { ...h }; if (i === active) delete c.to; else c.to = ekkTabs[i]; return c; });
  return [nav, ...hots];
}
for (const [name, scr] of Object.entries(ekk)) {
  const idx = ekkTabs.indexOf(name);
  scr.ch = scr.ch.flatMap(n => (n.ref ? ekkNav(idx) : [n]));
}

// ---------- SentiMenti ----------
const sm = { ...read('sm-feed.json'), ...read('sm-registro.json'), ...read('sm-matriz.json'), ...read('sm-rest.json') };
const smTabs = ['Feed', 'Registro', 'Matriz', 'Perfil'];
const smIcons = [
  '<svg width="18" height="16" viewBox="0 0 18 16" fill="none"><path d="M0.959999 7.36996L8.75 0.959961L16.54 7.36996M2.33 6.45996V14.71H15.17V6.45996" stroke="C" stroke-width="W" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="19" height="11" viewBox="0 0 19 11" fill="none"><path d="M0.770004 5.36002H4.44L6.27 0.77002L9.02 9.94002L11.77 2.61002L13.61 5.36002H17.27" stroke="C" stroke-width="W" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.72999 0.77002H2.14999C1.38999 0.77002 0.769989 1.39002 0.769989 2.15002V6.73002C0.769989 7.49002 1.38999 8.11002 2.14999 8.11002H6.72999C7.48999 8.11002 8.10999 7.49002 8.10999 6.73002V2.15002C8.10999 1.39002 7.48999 0.77002 6.72999 0.77002ZM15.93 0.77002H11.35C10.59 0.77002 9.96999 1.39002 9.96999 2.15002V6.73002C9.96999 7.49002 10.59 8.11002 11.35 8.11002H15.93C16.69 8.11002 17.31 7.49002 17.31 6.73002V2.15002C17.31 1.39002 16.69 0.77002 15.93 0.77002ZM6.72999 9.87002H2.14999C1.38999 9.87002 0.769989 10.49 0.769989 11.25V15.83C0.769989 16.59 1.38999 17.21 2.14999 17.21H6.72999C7.48999 17.21 8.10999 16.59 8.10999 15.83V11.25C8.10999 10.49 7.48999 9.87002 6.72999 9.87002ZM15.93 9.87002H11.35C10.59 9.87002 9.96999 10.49 9.96999 11.25V15.83C9.96999 16.59 10.59 17.21 11.35 17.21H15.93C16.69 17.21 17.31 16.59 17.31 15.83V11.25C17.31 10.49 16.69 9.87002 15.93 9.87002Z" stroke="C" stroke-width="W" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="15" height="17" viewBox="0 0 15 17" fill="none"><path d="M0.769989 14.16C2.14999 10.95 4.43999 9.57002 7.18999 9.57002C9.93999 9.57002 12.23 10.95 13.61 14.16M7.17999 7.19002C8.94999 7.19002 10.39 5.75002 10.39 3.98002C10.39 2.21002 8.94999 0.77002 7.17999 0.77002C5.40999 0.77002 3.96999 2.21002 3.96999 3.98002C3.96999 5.75002 5.40999 7.19002 7.17999 7.19002Z" stroke="C" stroke-width="W" stroke-linecap="round" stroke-linejoin="round"/></svg>',
];
const smIconBox = [[53, 806.7, 18, 16], [146, 809.4, 19, 11], [239.5, 805.8, 18, 18], [334.8, 808, 15, 17]];
const smLabels = [[48.8, 24], [134.8, 39], [233.3, 29], [329.3, 24]];
function smNav(active) {
  const out = [{ x: 0, y: 790, w: 402, h: 84, bg: '#fffaf0', bd: [1, 0, 0, 0, 'rgba(31,27,22,0.1)'] }];
  for (let i = 0; i < 4; i++) {
    const on = i === active;
    const [x, y, w, h] = smIconBox[i];
    out.push({ x, y, w, h, svg: smIcons[i].replace('stroke="C"', `stroke="${on ? '#1FA89E' : '#8C7B68'}"`).replace('stroke-width="W"', `stroke-width="${on ? 1.92 : 1.55}"`) });
    out.push({ x: smLabels[i][0], y: 829, w: smLabels[i][1], h: 11, t: 1, txt: smTabs[i], f: { f: 'Arimo', w: on ? 700 : 400, s: 10, c: on ? '#1fa89e' : '#8c7b68', ls: 0.2 }, nw: 1 });
  }
  for (let i = 0; i < 4; i++) {
    const h = { x: i * 100.5, y: 790, w: 100.5, h: 60, nm: 'tab ' + smTabs[i], bg: 'rgba(255,255,255,0)', br: 12 };
    if (i !== active) h.to = smTabs[i];
    out.push(h);
  }
  return out;
}
const smActive = { Feed: 0, Registro: 1, Registrado: 1, Matriz: 2, Competencia: 2, Perfil: 3, Post: 0 };
for (const [name, scr] of Object.entries(sm)) {
  scr.ch = scr.ch.flatMap(n => (n.ref ? smNav(smActive[name]) : [n]));
}

const nimo = JSON.parse(fs.readFileSync(OUT + 'nimogym.json', 'utf8'));
const wrap = (start, screens) => ({ start, screens });
fs.writeFileSync(OUT + 'ekkonomy.json', JSON.stringify(wrap('Inicio', ekk)));
fs.writeFileSync(OUT + 'sentimenti.json', JSON.stringify(wrap('Feed', sm)));
if (!nimo.screens) fs.writeFileSync(OUT + 'nimogym.json', JSON.stringify(wrap('Bienvenida', nimo)));

// sanity: every "to" target exists
for (const [app, scr] of [['ekk', ekk], ['sm', sm], ['nimo', nimo.screens || nimo]]) {
  const names = new Set(Object.keys(scr)); const bad = [];
  const walk = n => { if (n.to && !names.has(n.to)) bad.push(n.to); (n.ch || []).forEach(walk); };
  Object.values(scr).forEach(walk);
  console.log(app, Object.keys(scr).join(','), 'bad targets:', bad);
}
