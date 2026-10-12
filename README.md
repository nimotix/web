# nimotix · web

Landing de Nimotix, hecha a partir del diseño de Figma [nimotix-web](https://www.figma.com/design/m4ijBQ1wzzP2tyxS525Vup/nimotix-web).

- **Stack:** Vite + React + TypeScript, CSS plano (sin frameworks de estilos).
- **Tipografías:** self-hosted con `@fontsource` (Figtree para la landing; Plus Jakarta Sans, Montserrat, Kadwa y Arimo para las apps de ejemplo).
- **Diseño base:** pantalla de 1920 px con columna de contenido de 1200 px. Se adapta a notebook, tablet y celular.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve dist/ para probar el build
npm run lint
```

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Landing: hero, cinta, proyectos con demos interactivas, servicios, proceso, contacto |
| `/terminos` | Términos y condiciones |
| `/privacidad` | Política de privacidad |
| `/contacto/enviado` | Confirmación después de enviar el formulario |

El ruteo es propio (`src/router.tsx`), sin dependencias. Para que las rutas funcionen en GitHub Pages, el build copia `index.html` como `404.html`.

## Estructura

```
src/
  components/   Navbar, Hero, Marquee, Projects, Sections (servicios y proceso), Contact, Footer, Button, Logo
  pages/        Home, páginas legales, mensaje enviado, 404
  apps/         Demos de Ekkonomy, NimoGym y SentiMenti
    Screen.tsx  Renderiza una pantalla exportada del Figma (posiciones absolutas)
    Phone.tsx   Marco del teléfono + navegación entre pantallas al tocar
    data/       Pantallas de cada app en JSON
  styles/global.css
scripts/figma/  Exportador de pantallas desde Figma y script para armar los JSON
```

### Demos de las apps

Las pantallas de los teléfonos no son imágenes: se exportan del Figma como datos (posición, colores, textos, íconos SVG y a qué pantalla lleva cada botón) y se dibujan con HTML. Por eso el texto es nítido en cualquier resolución y se puede tocar y navegar igual que en el prototipo.

Para actualizarlas después de cambiar el Figma:

1. Correr `scripts/figma/exporter.js` en Figma (con el MCP `use_figma` o un plugin de desarrollo) para cada pantalla y guardar el resultado en `scripts/figma/screens/`.
2. `node scripts/figma/merge.mjs` arma `src/apps/data/*.json` y avisa si algún botón apunta a una pantalla que no existe.

El logo de SentiMenti es una imagen en el Figma; en la demo se dibuja como texto.

## Formulario de contacto

El sitio es estático, así que el formulario no puede mandar mails por sí solo:

- Si se define `VITE_CONTACT_ENDPOINT` (por ejemplo un formulario de [Formspree](https://formspree.io) o una Edge Function de Supabase), se envía por `POST` con `{ nombre, email, mensaje, tipo }`.
- Si no está definida, abre el cliente de mail del visitante con el mensaje ya armado para `hola@nimotix.com`.

Ver `.env.example`. En GitHub se configura como variable del repo (Settings → Secrets and variables → Actions → Variables).

## Publicación

`.github/workflows/deploy.yml` publica en GitHub Pages en cada push a `main`.

1. En el repo: **Settings → Pages → Source: GitHub Actions**.
2. Queda en `https://nimotix.github.io/web/`.
3. Con dominio propio: configurarlo en Settings → Pages y crear la variable `BASE_PATH` con valor `/`.

## Pendientes antes de publicar

- Completar los datos entre corchetes de Términos y Privacidad (razón social, CUIT, domicilio, fechas, plazos).
- Número real de WhatsApp (en `src/components/Contact.tsx`; hoy se muestra el de ejemplo sin link).
- Definir cómo se reciben los mensajes del formulario (`VITE_CONTACT_ENDPOINT`).
