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
│   │   └── ServiceCard.astro    ← tarjeta de servicio (props: icon, title, description)
│   └── styles/
│       └── global.css           ← carga Tailwind (@import "tailwindcss")
├── public/                      ← se copia tal cual al sitio (favicon, PDFs)
├── docs/
│   └── tailwind-referencia.xlsx ← hoja de referencia de clases Tailwind
├── astro.config.mjs             ← configuración de Astro (plugin de Tailwind)
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
- Referencia de clases: [`docs/tailwind-referencia.xlsx`](docs/tailwind-referencia.xlsx) y
  [tailwindcss.com/docs](https://tailwindcss.com/docs).

---

## Para reutilizar en el proyecto del cliente

1. `nvm use` + `npm create astro@latest -- --template minimal`.
2. Copiar `.gitignore`, `.nvmrc`, `.prettierignore`, `prettier.config.mjs`, `.vscode/extensions.json`.
3. Instalar Prettier y Tailwind **antes del primer commit**, luego `npm run format`.
4. Copiar `BaseLayout.astro` y adaptar `title` / `description`.
5. Token de GitHub nuevo, limitado al repo del proyecto del cliente.
