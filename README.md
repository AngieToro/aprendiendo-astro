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
│   │   ├── ServiceCard.astro    ← tarjeta de servicio (props: icon, title, description)
│   │   ├── Header.astro         ← logo + menú de anclas + hamburguesa (con <script>)
│   │   └── Logo.astro           ← ícono SVG + nombre (usa tokens de color)
│   └── styles/
│       └── global.css           ← carga Tailwind + tokens de marca (@theme)
├── public/                      ← se copia tal cual al sitio (favicon.svg, PDFs)
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
  `import ServiceCard from '../components/ServiceCard.astro'`.
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
		<ServiceCard {...service} />
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

## Para reutilizar en otros proyecto

1. `nvm use` + `npm create astro@latest -- --template minimal`.
2. Copiar `.gitignore`, `.nvmrc`, `.prettierignore`, `prettier.config.mjs`, `.vscode/extensions.json`.
3. Instalar Prettier y Tailwind **antes del primer commit**, luego `npm run format`.
4. Copiar `BaseLayout.astro` y adaptar `title` / `description`.
5. Token de GitHub nuevo, limitado al repo del nuevo proyecto.
