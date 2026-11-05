# Aprendiendo Astro + Tailwind

Mini proyecto de aprendizaje: una landing one-page de una consultora TI ficticia (TestCorp), construida
con **Astro** y **Tailwind CSS**. Reproduce la estructura del sitio real de un proyecto clasico, para que
todo lo aprendido se pueda reutilizar.

Este README es el **manual del proyecto**: cómo levantarlo, cómo se armó paso a paso y los tips
importantes aprendidos en cada lección.

---

## Requisitos

| Herramienta | Versión                                                     | Cómo verificar   |
| ----------- | ----------------------------------------------------------- | ---------------- |
| Node.js     | `>= 22.22.0` (se usa `v22.23.3`)                            | `node --version` |
| npm         | viene con Node                                              | `npm --version`  |
| Git         | cualquiera reciente                                         | `git --version`  |
| nvm         | recomendado para manejar Node                               | `nvm --version`  |
| VS Code     | con extensiones Astro, Prettier y Tailwind CSS IntelliSense | —                |

## Levantar el proyecto (después de clonarlo)

```bash
git clone https://github.com/AngieToro/aprendiendo-astro.git
cd aprendiendo-astro
nvm use          # activa la versión de Node indicada en .nvmrc
npm install      # descarga las dependencias a node_modules/
npm run dev      # servidor local en http://localhost:4321
```

Al abrir la carpeta en VS Code, acepta instalar las **extensiones recomendadas** (Astro, Prettier y Tailwind CSS IntelliSense).

## Comandos

| Comando                | Qué hace                                                                   |
| ---------------------- | -------------------------------------------------------------------------- |
| `npm install`          | Instala las dependencias (una vez tras clonar, y si cambia `package.json`) |
| `npm run dev`          | Servidor de desarrollo con recarga automática en `localhost:4321`          |
| `npm run build`        | Genera el sitio final (HTML/CSS estático) en `dist/`                       |
| `npm run preview`      | Sirve localmente lo que quedó en `dist/`, para revisarlo antes del deploy  |
| `npm run format`       | Prettier **reescribe** todos los archivos con el estilo del proyecto       |
| `npm run format:check` | Prettier **solo revisa** y lista los archivos sin formato (no cambia nada) |
| `npx astro dev stop`   | Detiene un servidor de desarrollo que quedó corriendo en otra terminal     |

## Estructura

```text
aprendiendo-astro/
├── src/                         ← código que Astro procesa
│   ├── pages/                   ← cada archivo = una URL
│   │   ├── index.astro          → /
│   │   └── 404.astro            → página para URLs que no existen
│   ├── layouts/
│   │   └── BaseLayout.astro     ← <html>, <head> y <body> comunes (props: title, description)
│   ├── components/
│   │   ├── InfoCard.astro       ← tarjeta con ícono, título y texto (servicios, valores)
│   │   ├── SectionTitle.astro   ← título de sección: h2 + línea de acento (prop: title)
│   │   ├── Header.astro         ← logo + menú de anclas + hamburguesa (con <script>)
│   │   ├── TeamCard.astro       ← tarjeta de persona con foto optimizada
│   │   └── Logo.astro           ← ícono SVG + nombre (usa tokens de color)
│   ├── data/
│   │   ├── services.ts          ← lista de servicios
│   │   ├── teams.ts             ← lista del equipo
│   │   └── contact.ts           ← correo, WhatsApp y sus URL (mailtoUrl, whatsappUrl)
│   ├── assets/team/             ← fotos que Astro optimiza
│   └── styles/
│       └── global.css           ← carga Tailwind + tokens de marca (@theme)
├── public/                      ← se copia tal cual al sitio (favicon.svg, og-image.png, robots.txt)
├── docs/
│   └── tailwind-referencia.xlsx ← referencia de clases Tailwind (solo local, no se versiona)
├── astro.config.mjs             ← configuración de Astro (plugin de Tailwind y fuentes)
├── prettier.config.mjs          ← reglas de formato del proyecto
├── .prettierignore              ← archivos que Prettier no toca
├── .gitignore                   ← archivos que Git no versiona
├── .nvmrc                       ← versión de Node del proyecto
├── .vscode/extensions.json      ← extensiones recomendadas de VS Code
└── package.json                 ← scripts y dependencias
```

---

## Cómo se armó, paso a paso

### 1. Node.js con nvm (lección 1)

Astro 7 exige Node `>= 22.22.0`. Se instaló con **nvm** (no pide `sudo` y permite varias versiones):

```bash
nvm install 22              # instala la última v22 y la deja como predeterminada
echo "v22.23.3" > .nvmrc    # fija la versión del proyecto
```

### 2. Crear el proyecto Astro (lección 1)

```bash
npm create astro@latest -- --template minimal
```

Respuestas: carpeta `.`, instalar dependencias **sí**, inicializar git **no** (se hizo a mano).

### 3. Git y GitHub (lección 1)

1. Crear `.gitignore` **antes** del primer commit (ver tips).
2. Inicializar y subir:

```bash
git init -b main
git add .
git commit -m "Mensaje"
git remote add origin https://github.com/AngieToro/aprendiendo-astro.git
git push -u origin main
```

3. Autenticación: GitHub no acepta la contraseña de la cuenta. Se usa un **Personal Access Token
   fine-grained**: _Settings → Developer settings → Fine-grained tokens_, limitado a este repo, permiso
   _Contents: Read and write_, 90 días. Se pega como contraseña en el primer `push` y queda guardado en
   el llavero de macOS.

### 4. Prettier (extra, después de la lección 2)

```bash
npm install --save-dev prettier prettier-plugin-astro
```

- Configuración en `prettier.config.mjs`: tabs, comillas simples, sin `;`, `printWidth: 100`,
  `singleAttributePerLine: true`.
- `.prettierignore` con `package-lock.json` (lo administra npm).
- Scripts `format` y `format:check` en `package.json`.
- VS Code (configuración de **usuario**, `Cmd + Shift + P` → _Open User Settings (JSON)_):

```json
"editor.formatOnSave": true,
"[astro]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
"[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
"[json]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
```

### 5. Tailwind CSS 4 (lección 4)

```bash
npx astro add tailwind
npm run format              # los archivos generados no siguen el estilo del proyecto
```

`astro add` instala `tailwindcss` y `@tailwindcss/vite`, agrega el plugin en `astro.config.mjs` y crea
`src/styles/global.css`. Después hay que **importar el CSS en el layout**:

```astro
---
import '../styles/global.css'
---
```

Extensión de VS Code **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`, de Tailwind Labs):
autocompleta las clases mientras escribes `class="..."` y, al pasar el mouse, muestra el CSS que aplica.
Quedó agregada a `.vscode/extensions.json`.

### 6. Sistema de diseño: colores y fuentes de marca (lección 5)

**Colores** como tokens en `src/styles/global.css` (Tailwind 4 no usa `tailwind.config.js`):

```css
@theme {
	--color-primario: #001a3f; /* genera bg-primario, text-primario, border-primario... */
	--color-primario-hover: #0a2f66;
	--color-secundario: #5ca7e0;
	--color-acento: #f55a1e;
	--color-fondo: #eef6fc;
}
```

**Fuentes** con el sistema oficial de Astro (descarga las fuentes en el build y las sirve desde el sitio):

1. `astro.config.mjs`: importar `fontProviders` y agregar `fonts: [{ provider: fontProviders.google(),
name: 'Poppins', cssVariable: '--font-poppins', weights: [600, 700] }, ...]`.
2. `BaseLayout.astro`: `import { Font } from 'astro:assets'` y en el `<head>`
   `<Font cssVariable="--font-poppins" preload />` + `<Font cssVariable="--font-open-sans" />`.
3. `global.css`: conectar con Tailwind.

```css
@theme inline {
	--font-sans: var(--font-open-sans); /* fuente por defecto de toda la página */
	--font-titulos: var(--font-poppins); /* clase font-titulos */
}
```

### 7. One-page: header fijo, anclas y menú hamburguesa (lección 6)

- Cada sección de `index.astro` tiene un `id` (`inicio`, `nosotros`, `servicios`, `contacto`).
- `src/components/Header.astro` (incluido en `BaseLayout`): logo (`Logo.astro`, SVG inline con
  `fill-primario`…) + `<nav>` con enlaces `href="/#id"`.
- Header pegado arriba: `sticky top-0 z-10`. Scroll suave: `scroll-smooth` en `<html>`. Para que el
  header no tape el título al saltar: `scroll-mt-20` en cada sección.
- Menú hamburguesa: botón `md:hidden` con `aria-expanded` y texto `sr-only`; menú
  `hidden md:block`; un `<script>` en el componente pone/quita `hidden` y actualiza `aria-expanded`.
- Favicon: `public/favicon.svg` con el ícono del logo (colores en hex, no ve las clases de Tailwind).
  Se eliminó `favicon.ico` de la plantilla.

### 8. Datos, equipo, fotos y desplegable (lecciones 7 y 8)

- `src/data/services.ts` y `src/data/teams.ts`: interfaz + lista exportada. `index.astro` las recorre con `.map()`.
- `src/components/TeamCard.astro` con `<Image />` de `astro:assets`; fotos en `src/assets/team/` importadas en
  `teams.ts`.
- En `Header.astro`, "Nosotros" es un desplegable (Quiénes somos + Equipo) con su `<script>`.

### 9. Contacto: correo y WhatsApp (lección 9)

No se instala nada: son enlaces normales.

- `src/data/contact.ts`: objeto `contact` con los datos, y `mailtoUrl` / `whatsappUrl` calculadas a partir de él.
- `index.astro` importa las dos URL y las usa en dos `<a>` dentro de un padre `flex flex-wrap justify-center gap-4`.
- Para el proyecto del cliente: cambiar solo los datos del objeto `contact` y probar los dos botones.

### 10. SEO (lección 10)

1. `site` en `astro.config.mjs`: URL pública del sitio. Es necesaria para las URL completas y el sitemap.
2. En `BaseLayout.astro`: URL canónica, etiquetas Open Graph, imagen para compartir y `twitter:card`.
3. Imagen para compartir: `public/og-image.png`, de 1200 × 630 px.
4. Sitemap con la integración oficial (instala `@astrojs/sitemap` y lo agrega a `astro.config.mjs`):

   ```bash
   npx astro add sitemap
   npm run format
   ```

   `format` hace falta porque `astro add` no respeta el estilo de Prettier.

5. `<link rel="sitemap" href="/sitemap-index.xml" />` en el `<head>`.
6. `public/robots.txt` con las reglas y la URL del sitemap.

Al publicar con el dominio definitivo, cambiarlo en **dos lugares**: `site` en `astro.config.mjs` y la línea
`Sitemap:` de `public/robots.txt`, que es texto fijo.

#### Auditoría con Lighthouse

Lighthouse es la herramienta de auditoría de Google, gratuita y de código abierto. Viene incluida en Chrome, así
que no se instala nada. Analiza una página, le da un puntaje de 0 a 100 en cuatro categorías y lista qué corregir.

| Categoría      | Qué revisa                                           |
| -------------- | ---------------------------------------------------- |
| Performance    | Qué tan rápido carga                                 |
| Accessibility  | Contraste, textos `alt`, orden de títulos, landmarks |
| Best Practices | Seguridad y errores en consola                       |
| SEO            | `title`, `description`, enlaces y `robots.txt`       |

Colores del puntaje: verde (90 a 100) es bueno, naranja (50 a 89) es mejorable y rojo (0 a 49) es un problema.

Cómo correrla:

1. Generar el sitio final y levantarlo (`build` crea `dist/`, `preview` lo muestra como quedará publicado):

   ```bash
   npm run build
   npm run preview
   ```

2. Abrir `http://localhost:4321/` en una ventana de incógnito (`Cmd + Shift + N`), para que las extensiones no
   alteren el resultado.
3. Abrir DevTools (`Cmd + Option + I`) y entrar en la pestaña **Lighthouse** (si no aparece, está en `>>`).
4. Elegir **Mode:** Navigation, **Device:** Mobile y las cuatro categorías.
5. Hacer clic en **Analyze page load** y esperar, sin cambiar de pestaña.
6. Repetir con **Device:** Desktop.
7. Abrir cada categoría que no tenga 100, corregir, y repetir desde el paso 1.

Qué tener en cuenta:

- No usar `npm run dev`: entrega código sin optimizar y los puntajes salen mucho más bajos. En este proyecto, con
  `dev` quedó todo bajo 50 y con `preview` llegó a 98-100.
- Performance varía entre pruebas, porque depende del computador. La medición definitiva es la del sitio publicado.
- Si `canonical` apunta a otro dominio, puede salir un aviso en local que se resuelve con el dominio definitivo.
- Un 100 en Accessibility no reemplaza probar con teclado o lector de pantalla: solo cubre revisiones automáticas.

Resultado de este proyecto: 100 en las cuatro categorías, en Mobile y Desktop.

### 11. Deploy en Cloudflare Workers (lección 11)

Cloudflare se conecta al repo de GitHub y, desde entonces, cada `git push` a `main` publica el sitio solo:

```text
git push → GitHub avisa a Cloudflare → Cloudflare corre el build → publica dist/
```

Se usa Workers y no Pages porque es lo que Cloudflare recomienda hoy para proyectos nuevos. El HTTPS viene incluido.
Un sitio estático no necesita el adaptador `@astrojs/cloudflare`.

#### Preparar el proyecto

1. Instalar Wrangler, la herramienta oficial de Cloudflare para publicar (queda como dependencia de desarrollo):

   ```bash
   npm install wrangler@latest --save-dev
   ```

2. Crear `wrangler.jsonc` en la raíz, con `name`, `compatibility_date` y `assets`:

   ```jsonc
   {
   	"name": "nombre-del-proyecto",
   	"compatibility_date": "AAAA-MM-DD",
   	"assets": {
   		"directory": "./dist",
   		"not_found_handling": "404-page",
   	},
   }
   ```

   - `name`: aparece en la URL. Solo minúsculas y guiones.
   - `compatibility_date`: la fecha del primer deploy.
   - `not_found_handling`: muestra la página 404 cuando una URL no existe.

3. Agregar `.wrangler/` a `.gitignore` (carpeta temporal de Wrangler).
4. Probar sin publicar nada (hace todo el proceso menos el paso final):

   ```bash
   npm run build
   npx wrangler deploy --dry-run
   ```

5. Subir los cambios con `git push`: Cloudflare lee `wrangler.jsonc` desde GitHub.

#### A. Crear la cuenta

1. Registrarse en [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2. Confirmar el correo.

#### B. Crear la aplicación

1. En el panel, ir a **Compute** → **Workers & Pages**.
2. Hacer clic en **Create application**.
3. En **Import a repository**, conectar la cuenta de GitHub.
4. Cuando GitHub pregunte a qué repositorios dar acceso, elegir **Only select repositories** y marcar solo el repo
   del proyecto.
5. De vuelta en Cloudflare, seleccionar ese repo.

#### C. Configurar el build

| Campo              | Valor                               |
| ------------------ | ----------------------------------- |
| **Project name**   | El mismo `name` de `wrangler.jsonc` |
| **Build command**  | `npx astro build`                   |
| **Deploy command** | `npx wrangler deploy`               |

No hace falta agregar variables de entorno ni indicar la carpeta de salida: `dist` está en `wrangler.jsonc` y la
versión de Node se toma de `.nvmrc`.

#### D. Publicar

1. Hacer clic en **Save and Deploy**.
2. Esperar un par de minutos mientras se ve el registro del build.
3. Al terminar, Cloudflare muestra la URL, que termina en `workers.dev`. Desde ese momento el sitio es público.

Si el build falla, revisar las últimas líneas del registro. Cloudflare instala todo desde GitHub: lo que no se subió
con `git push` no existe allá, aunque en el computador local funcione.

Los nombres de los botones pueden variar, porque Cloudflare cambia su panel seguido.

#### Dominio propio (para el proyecto del cliente)

Lo único que se paga es el dominio, cada año. El hosting sigue en el plan gratuito y la conexión con GitHub no cambia:
cada `git push` a `main` sigue publicando.

1. Comprar el dominio. Cloudflare Registrar lo vende a precio de costo y sirve para `.com`. Si se compra en otro lado
   (por ejemplo, un `.cl` en NIC Chile), hay que apuntar sus nameservers a Cloudflare.
2. Agregar el dominio a Cloudflare, si no se compró ahí: debe quedar como zona activa.
3. En el Worker, ir a **Settings** → **Domains & Routes** → **Add** → **Custom Domain** y escribir el dominio.
   Cloudflare crea el certificado HTTPS.
4. Cambiar la URL en `site` de `astro.config.mjs` y en la línea `Sitemap:` de `public/robots.txt`.
5. Activar **Always Use HTTPS**.

`ejemplo.com` y `www.ejemplo.com` son direcciones distintas: para que `www` funcione, hay que configurar una redirección.

El dominio y la cuenta de Cloudflare conviene dejarlos a nombre del cliente, para que no dependan de quien hizo el sitio.

---

## Tips importantes

### Node y npm

- `package.json` → `engines` declara la versión de Node requerida; el hosting la respeta.
- `--save-dev` = herramienta de desarrollo (Prettier). Sin flag = necesaria para construir (Astro, Tailwind).
- `package-lock.json` **sí** se sube (fija versiones exactas); `node_modules/` **no**.
- npm escribe el lock con la **misma indentación** que tenga `package.json`.

### Git

- `.gitignore`: no se versiona lo que **se regenera** (`node_modules/`, `dist/`, `.astro`), lo
  **personal** (`.DS_Store`, config del editor) ni lo **secreto** (`.env`).
- Para excluir una carpeta salvo un archivo: `.vscode/*` + `!.vscode/extensions.json` (con `.vscode/`
  la excepción no funciona).
- Revisar con `git status` y `git diff --stat` **antes** de cada commit. `git diff -w` ignora cambios
  de espacios.
- Un commit por tema. No reescribir commits que ya están subidos.
- Para dejar de versionar algo que ya se subió **sin borrarlo del disco**: agregarlo al `.gitignore` y
  `git rm -r --cached <ruta>`. Agregarlo solo al `.gitignore` no basta (solo afecta a archivos nuevos).
- `~$*` en el `.gitignore`: archivos temporales que crea Office mientras un documento está abierto.

### Astro

- `src/pages/` = rutas: `servicios.astro` → `/servicios`. `404.astro` → `404.html`.
- Frontmatter (`---`) corre en el **build**, nunca en el navegador. La plantilla usa `{variables}`.
- Los imports de `.astro` llevan **la extensión** y van **sin llaves** (export por defecto):
  `import InfoCard from '../components/InfoCard.astro'`.
- Props: se definen con `interface Props`, se leen con `Astro.props` (p minúscula). Opcional = `?`.
- `<slot />` recibe lo que va **entre** `<Componente>` y `</Componente>`. `<Componente />` no pasa contenido.
- Cada componente tiene su propio alcance: el `title` del layout y el de la tarjeta no chocan.
- Lo que pertenece a la página (secciones, títulos de sección) va en la página, no en el componente.
- Los tipos de TypeScript avisan **en el editor**; `npm run build` no los revisa.
- `.astro` sin la extensión oficial de VS Code se ve de un solo color y sin errores marcados.

### HTML semántico y accesibilidad

- Un solo `<h1>` por página. Jerarquía sin saltos: `h1` → `h2` (sección) → `h3` (tarjeta).
- La etiqueta se elige por lo que **significa**, no por cómo se ve (el tamaño lo dan los estilos).
- `<section>` = capítulo de la página con su `h2`. `<article>` = bloque que se entiende solo (tarjeta).
- `lang="es"` en `<html>`. Íconos decorativos con `aria-hidden="true"`.

### Sistema de diseño (colores y fuentes)

- Tokens con nombre por **función** (`primario`, `acento`, `fondo`), no por apariencia (`navy`,
  `naranja`): si la marca cambia un color, se edita una línea y las clases siguen teniendo sentido.
- Cada token se usa solo para su función: `primario-hover` es para hover de botones, no para títulos.
- El prefijo de la variable define la clase: `--color-X` → `bg-X`, `text-X`, `border-X`; `--font-X` →
  `font-X`. `--font-sans` reemplaza la fuente por defecto. Opacidad: `border-secundario/30`.
- Tailwind 4 solo incluye en el CSS final los tokens que se usan en alguna clase.
- Contraste mínimo (WCAG AA): 4.5 para texto normal, 3.0 para texto grande y en negrita. Al poner un
  `bg-` oscuro, revisar el `text-` del mismo elemento. Celeste con texto blanco no pasa (2.6).
- El acento se usa **poco**: si todo destaca, nada destaca.
- Además de los colores de la marca, el sitio necesita colores de **soporte** (fondo) y **neutros**
  (grises para texto secundario y bordes).
- Fuentes: si no se indica `weights`, Astro descarga solo el 400. Pedir solo los grosores que se usan.
- `preload` solo para la fuente que se ve primero; acepta filtro: `preload={[{ weight: 700, subset: 'latin' }]}`.
- Cadena de una fuente: `astro.config.mjs` (descarga) → `<Font>` en el `<head>` (publica la variable) →
  `@theme inline` (crea la clase). Si una fuente no aparece, revisar los tres en ese orden.
- `import { Font } from 'astro:assets'` va **con llaves** (export con nombre); los `.astro` van sin llaves.

### One-page y JavaScript

- Enlaces del menú con `/#seccion` (no solo `#seccion`): así funcionan también desde la 404 u otra página.
- `sticky top-0` mejor que `fixed`: `fixed` saca el header del flujo y el contenido queda debajo.
  Agregar `z-10` para que el contenido no lo pise. Nunca copiar `hover:-translate-y-1` de las tarjetas.
- `scroll-mt-N` ≈ alto del header (64px → `scroll-mt-20`). Sin número (`scroll-mt`) no hace nada.
- `hidden md:block`: oculto en celular, visible desde `md`. En escritorio `md:block` gana sobre
  `hidden`, así el JS no necesita saber el tamaño de pantalla. Para menús largos, usar `lg:`.
- Botones interactivos con `<button>` (no `<div>`): teclado y lector de pantalla funcionan solos.
  Ícono sin texto → `<span class="sr-only">` con la descripción.
- Patrón de JS: buscar (`querySelector`) → verificar (`if (a && b)`) → escuchar (`addEventListener`)
  → cambiar una clase (`classList.toggle/add`). Los estilos los pone Tailwind; el JS solo cambia clases.
- `classList.toggle('hidden')` devuelve `true` si la clase quedó puesta (menú oculto):
  `aria-expanded` = `String(!quedoOculto)`. `aria-expanded` va en el **botón**.
- Nombres de variables que digan qué guardan (`quedoOculto`, no `botonActivo`).
- Un `<script>` en un componente `.astro` se procesa y se incluye una sola vez.
- El logo siempre enlaza al inicio (`<a href="/"><Logo /></a>`).
- Favicon: es un archivo aparte que el navegador descarga (no un componente). Si no cambia, recargar
  con `Cmd + Shift + R` (caché).

### Datos, imágenes y desplegable

- Patrón datos → `.map()` → componente: la lista vive en `src/data/*.ts` y se importa con llaves.
  Agregar o reordenar elementos no toca el HTML. El `.map()` corre en el build: el navegador recibe HTML.
- `=> ( ... )` devuelve el componente; `=> { ... }` es un bloque y necesita `return`. Si Prettier agrega un
  `;` antes de un componente, ese componente no se está devolviendo.
- `{...objeto}` pasa todos los campos de un objeto como props, si se llaman igual.
- Reutilizar tipos: `import type { Member } from '../data/teams'` + `type Props = Member`.
- Fotos de contenido en `src/assets/` (Astro las optimiza), importadas con tipo `ImageMetadata`. `alt` es obligatorio.
- Usar solo fotos con licencia libre (Unsplash, Pexels) o autorizadas: que una foto sea visible en internet
  no da permiso para publicarla. No subir datos de terceros a repositorios públicos sin consentimiento.
- Desplegable: `<button>` con `aria-expanded` + lista `hidden`. `relative` en el `<li>` y `md:absolute` en la
  lista: flota en escritorio y empuja en celular. Debe cerrarse con Escape y con clic fuera (escuchadores en
  `document`), excluyendo el botón con `.contains()`. Flecha sin JS: `group` + `group-aria-expanded:rotate-180`.
- Repetir la misma lógica 3 veces = sacarla a una función (`cerrarSubmenu`). Con paréntesis se ejecuta.

### Contacto (mailto y WhatsApp)

- Correo: `mailto:correo?subject=...`. WhatsApp: `https://wa.me/NUMERO?text=...`.
- El número de `wa.me` va solo con dígitos: código de país, sin `+`, espacios ni guiones.
- `encodeURIComponent` es obligatorio en textos dentro de una URL: convierte espacios, tildes y símbolos. Sin él,
  un `&` en el mensaje lo cortaría, porque en una URL `&` separa parámetros.
- En un template string las variables se escriben `${variable}`. Sin el `$` queda texto literal y no hay error:
  para comprobarlo, pasar el mouse por el botón y mirar la URL en la esquina del navegador.
- `target="_blank"` + `rel="noopener noreferrer"` en WhatsApp (es una página web). No en `mailto:`, que abre la app
  de correo.
- Un botón es un `<a>` con estilos, no una `<table>`: la tabla es para datos, y el color debe estar en el `<a>`
  para que toda la zona sea clicable.
- Un número ficticio da error en WhatsApp aunque el enlace esté bien. Para probar, usar uno real temporalmente y
  quitarlo antes del commit, sin dejarlo comentado: Git también guarda los comentarios.
- `.env` es para secretos o valores que cambian por ambiente. Lo que se ve en el sitio publicado puede ir en un
  archivo de datos versionado.

### SEO

- Open Graph usa `property` y URL completas: WhatsApp y LinkedIn leen la página desde sus servidores.
- Comillas = texto literal; llaves = valor de la variable. `content="canonicalUrl"` publica esa palabra, sin error.
- `og:site_name` es fijo (nombre del sitio); `og:title` cambia en cada página. Probar también la 404.
- `new URL(ruta, Astro.site)` arma URL completas, y se actualizan solas si cambia `site`.
- `og:image` va en `public/` (dirección fija), en PNG o JPG de 1200 × 630 px, con el texto importante al centro.
- Texto suelto dentro de `<head>`, aunque sea un `.`, cierra el `<head>` y deja lo siguiente en `<body>`. No da
  error. Para comprobarlo, en la consola:
  `document.head.querySelectorAll('meta[property^="og:"]').length`
- "Ver código fuente" muestra el HTML recibido; Elements muestra cómo lo interpretó el navegador.
- `<!-- -->` llega al HTML publicado; `{/* */}` no. Los comentarios van arriba de la línea que explican.
- El sitemap lo genera Astro en el build: no existe con `npm run dev`, se ve con `npm run build` + `npm run preview`.
- `robots.txt` es una petición a los buscadores, no una protección.
- Lighthouse se corre sobre `preview`, en incógnito, primero en Mobile. Sobre 90 es bueno. Con `dev` los puntajes no
  sirven: entrega código sin optimizar y herramientas de desarrollo.
- Un solo `<main>` por página, en `BaseLayout` alrededor de `<slot />`: permite saltar al contenido con lector de
  pantalla. Sin él, Lighthouse avisa "Document does not have a main landmark".
- Después de aceptar una sugerencia de VS Code, revisar los imports: puede agregar alguno que no se usa.

### Deploy

- Flujo para un cambio: crear una rama, editar, probar con `npm run format` y `npm run build`, y hacer el merge a
  `main`. Al llegar a `main`, Cloudflare publica solo.
- Si el build falla en Cloudflare, los visitantes siguen viendo la última versión que funcionó. La causa está en el
  registro del build, en el panel del proyecto.
- Los errores se leen buscando el archivo y la línea, pero el problema suele estar justo antes de la línea indicada.
- Después del primer deploy, cambiar `site` y `robots.txt` por la URL real. Con un dominio que no existe, el sitio se
  ve bien, pero la tarjeta al compartir sale sin imagen.
- Sitio estático = se genera completo en el build, y Cloudflare solo entrega archivos: no necesita
  `@astrojs/cloudflare`. Ese adaptador es para páginas que se generan en el servidor en cada visita.
- Con dominio propio, activar **Always Use HTTPS** en Cloudflare para redirigir `http://` a `https://`.
- Dar acceso solo al repo necesario, y definir quién es dueño de la cuenta de Cloudflare en proyectos de clientes.

### Prettier

- Formatear al guardar solo afecta al archivo guardado: correr `npm run format:check` antes del commit.
- Los generadores (`astro add`, `npm create`) no conocen tu estilo: `npm run format` después de usarlos.
- Si cambias una regla, `npm run format` y commit aparte.

### Tailwind 4

- Clases separadas por **espacios**, nunca comas: `class="border border-slate-200"`.
- Preflight borra los estilos por defecto del navegador (por eso el `h1` se ve como texto normal).
- Mobile-first: sin prefijo = celular; `md:` / `lg:` = pantallas más grandes. `hover:` = estado.
- `border` sin color usa el color del texto (en v3 era gris): agrega siempre `border-{color}`.
- No existe `tailwind.config.js` en v4 (la configuración va en CSS). Los tutoriales con ese archivo o
  con `@astrojs/tailwind` son de la versión 3.
- Una clase mal escrita **no da error**, simplemente no hace nada (ej. `mb2` en vez de `mb-2`). Si
  IntelliSense no muestra el CSS al pasar el mouse, la clase no existe.
- `flex` y `grid` se ponen en el **padre** y ordenan a sus **hijos directos**. Si quieres ordenar solo
  algunos elementos, agrúpalos en un `<div>` y pon ahí el `flex` / `grid`.
- Algunas clases van en pareja: `grid` (activa) + `grid-cols-N` (configura); `border` + `border-{color}`.
- `padding` (`p-`) = espacio **dentro** de la caja; `margin` (`m-`) = espacio **fuera**, con las vecinas.
- Método para estilar sin prueba y error, de afuera hacia adentro: 1) la caja (fondo, borde, padding), 2) espacios entre elementos, 3) texto (tamaño, grosor, color), 4) interacción (`hover:`). Probar
  clases en vivo con el inspector del navegador (clic derecho → Inspeccionar → editar `class`).
- Centrar: `text-center` en el **padre** centra contenido en línea (texto, `<a>`, `inline-block`);
  `mx-auto` centra un **bloque** con ancho máximo.
- Un `<a>` es en línea: para que su `py-` ocupe espacio de verdad (botón), agrega `inline-block`.
- Patrón de botón: `inline-block px-4 py-2 rounded bg-blue-600 text-white font-bold transition
hover:bg-blue-700`.
- Los espacios de elementos vecinos **se suman** (`py` del h1 + `pt` de la sección + `py` del h2). Una
  responsabilidad por elemento: la sección da el aire del bloque, el título solo su `mb-`.
- Definir `bg-white text-slate-900` en el `<body>`: si no, el fondo es transparente y cada navegador
  (o el modo oscuro) decide el color.
- Referencia de clases: `docs/tailwind-referencia.xlsx` (archivo local, ignorado por Git) y
  [tailwindcss.com/docs](https://tailwindcss.com/docs).

## Recetas de layout

Cuando algo se ve raro, recorrer estas preguntas **antes** de cambiar clases al azar:

| Pregunta                                        | Respuesta                                                                                                                    |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ¿El tamaño es **fijo** o **depende del padre**? | `w-full` = ancho del padre (cambia con la grilla). `w-28 h-36` = fijo, siempre igual                                         |
| ¿**Quién** decide la distribución?              | El **padre**: `grid`/`flex` en el contenedor. Desde la página se puede dar ancho a todos los hijos con `*:w-72`              |
| ¿**`grid`** o **`flex`**?                       | `grid` = columnas exactas, filas completas. `flex flex-wrap justify-center` = la última fila incompleta queda centrada       |
| ¿Cómo **centro** esto?                          | Texto o elemento en línea → `text-center` (en el padre). Bloque con ancho → `mx-auto`. Hijos de un `flex` → `justify-center` |
| ¿Por qué se **estira** tanto?                   | Falta un límite: `max-w-4xl mx-auto`                                                                                         |

Diagnóstico rápido cuando una clase "no hace nada": ¿la clase existe (IntelliSense muestra el CSS)? →
¿está en el elemento correcto (padre/hijo)? → ¿falta su pareja (`grid` + `grid-cols-N`, `border` + color)
o su prefijo (`hover:`, `md:`)? → ¿el valor es suficientemente grande?

### Sección con título y línea de acento

```astro
<section id="servicios" class="py-8 px-4 bg-fondo scroll-mt-20">
	<h2 class="font-semibold text-center text-2xl md:text-3xl mb-4 text-primario font-titulos">
		Título
	</h2>
	<div class="w-16 h-1 bg-acento mx-auto mb-8" aria-hidden="true"></div>
	<!-- contenido -->
</section>
```

### Grilla con filas completas (ej. 6 personas: 2 / 3 columnas)

```astro
<div class="grid gap-4 grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
	{members.map((member) => (
		<TeamCard {...member} />
	))}
</div>
```

Elegir columnas según la cantidad: con 6 elementos, 2, 3 y 6 columnas dan filas completas.

### Grilla con la última fila centrada (ej. 5 servicios)

```astro
<div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto *:w-full sm:*:w-72">
	{services.map((service) => (
		<InfoCard {...service} />
	))}
</div>
```

En `flex` los elementos de una fila se estiran al alto del más alto (`items-stretch`): todas las tarjetas
de una fila quedan iguales aunque el texto tenga largos distintos.

### Tarjeta con foto pequeña centrada

```astro
<article
	class="p-4 text-center bg-white border border-secundario/30 rounded-lg shadow-sm
	transition hover:-translate-y-1 hover:border-acento"
>
	<Image
		src={photo}
		alt={`Foto de ${name}`}
		width={224}
		height={288}
		class="w-28 h-36 mx-auto mb-3 rounded-md object-cover object-top"
	/>
	<h3 class="font-semibold text-primario font-titulos">{name}</h3>
	<div class="w-10 h-0.5 bg-acento mx-auto my-2" aria-hidden="true"></div>
	<p class="text-sm text-slate-600">{title}</p>
</article>
```

- `object-cover` + tamaño fijo (o `aspect-*`) = todas las fotos del mismo tamaño aunque los originales
  sean distintos; `object-top` evita cortar la cabeza.
- `width`/`height` del `<Image>` = píxeles del **archivo** (el doble de lo que se muestra, por Retina);
  `w-28 h-36` = tamaño **en pantalla**.
- Foto que toca los bordes de una tarjeta redondeada: `overflow-hidden` en la tarjeta.

### Tarjeta con ícono y título en la misma fila (centrados)

```astro
<article class="p-4 text-center ...">
	<div class="flex items-center justify-center gap-2 mb-2">
		<span aria-hidden="true">{icon}</span>
		<h3 class="font-semibold text-primario font-titulos">{title}</h3>
	</div>
	<p class="text-sm text-slate-600">{description}</p>
</article>
```

`text-center` no centra los hijos de un `flex`: para eso es `justify-center`.

---

## Para reutilizar en otros proyectos

### 1. Crear el proyecto

1. `nvm use` + `npm create astro@latest -- --template minimal`.
2. Copiar `.gitignore`, `.nvmrc`, `.prettierignore`, `prettier.config.mjs`, `.vscode/extensions.json`.
3. Instalar Prettier y Tailwind **antes del primer commit**, luego `npm run format`.
4. Token de GitHub nuevo, limitado al repo del nuevo proyecto. Repo privado si tiene datos del cliente.

### 2. Qué se reutiliza

| Pieza                                                    | Qué hacer                                            |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `BaseLayout.astro`                                       | Copiar. Cambiar `og:site_name` y el texto del footer |
| `Header.astro`                                           | Copiar. Cambiar los enlaces según las secciones      |
| `InfoCard.astro`, `SectionTitle.astro`, `TeamCard.astro` | Copiar. Ajustar los campos si el cliente pide otros  |
| `src/data/*.ts`                                          | Copiar la estructura. Reemplazar los datos           |
| `src/styles/global.css`                                  | Copiar. Cambiar colores y revisar su contraste       |
| Fuentes en `astro.config.mjs`                            | Copiar. Cambiar por las fuentes de la marca          |
| `Logo.astro`, `favicon.svg`, `og-image.png`              | Reemplazar por los del cliente                       |
| `wrangler.jsonc`                                         | Copiar. Cambiar `name` y `compatibility_date`        |
| `public/robots.txt`                                      | Copiar. Cambiar el dominio                           |

### 3. Secciones nuevas del proyecto del cliente

Otros módulos que no existen en este proyecto. Se arman con el mismo patrón: datos en `src/data/`,
un componente de tarjeta, `.map()` y un `id` para el menú.

### 4. Antes de publicar

- Textos, fotos autorizadas y `alt` del cliente.
- `title` y `description` propios de cada página.
- Correo y WhatsApp reales en `contact.ts`, y probar los dos botones.
- `npm run format` y `npm run build` sin errores.
- Lighthouse sobre `preview`, y de nuevo en el sitio publicado.
- URL real en `site` y `robots.txt`.
- Probar la 404 y la tarjeta al compartir.
- Dominio y cuenta de Cloudflare a nombre del cliente.
