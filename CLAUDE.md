# Proyecto de aprendizaje: Astro + Tailwind

## Quién soy

- Angélica Toro, Technical Delivery Manager / IT Project Manager (10+ años, LATAM, Chile).
- Tengo base de desarrollo de software, pero **nunca he usado Astro ni Tailwind**.
- Escríbeme en español.

## Para qué es este proyecto

Es un mini proyecto **para aprender**, antes de construir el sitio real de un cliente
(Proyecto Piliers: sitio one-page estático, con menú de anclas, secciones Inicio, Quiénes somos,
Equipo, Valores/Misión/Visión, Servicio, Metodología y Contacto por mailto + WhatsApp,
SEO básico y deploy en hosting estático gratuito).

El mini proyecto reproduce esa misma estructura con contenido ficticio
(una landing de una consultora TI inventada), para que lo aprendido se pueda reutilizar tal cual.

## Cómo quiero que me guíes

- Avanza **una lección a la vez** (ver plan abajo). No adelantes lecciones sin que te lo pida.
- En cada lección: 1) explica el concepto en pocas líneas, 2) dime qué voy a construir, 3) déjame escribir yo las partes importantes y revisa mi código, 4) termina con un mini
  ejercicio o pregunta para comprobar que entendí.
- Si me equivoco, explícame por qué antes de corregirlo.
- Prefiere lo simple y lo oficial (documentación de Astro y Tailwind) antes que librerías extra.
- Antes de instalar algo o correr un comando, dime qué hace.
- Al final de cada lección, actualiza la sección "Progreso" de este archivo.

## Plan de lecciones

1. Setup: Node.js, crear proyecto Astro, estructura de carpetas, `npm run dev`, Git + GitHub.
2. Páginas y layouts en Astro: `src/pages`, `src/layouts`, `<slot />`, el `<head>`.
3. Componentes `.astro`: props, componente reutilizable (ej. tarjeta de servicio).
4. Tailwind: instalarlo, clases utilitarias, responsive (`sm:`, `md:`, `lg:`), estados (`hover:`).
5. Sistema de diseño: colores y tipografías de marca centralizados en la configuración de Tailwind; Google Fonts.
6. One-page: header fijo, menú con anclas, scroll suave, menú hamburguesa en móvil (un poco de JS).
7. Secciones con datos: listas de servicios/equipo desde un archivo de datos y `.map()`.
8. Imágenes optimizadas con `astro:assets`; textos alternativos.
9. Contacto: botones mailto y WhatsApp (`wa.me`).
10. SEO: title, description, Open Graph, favicon, sitemap, robots.txt; auditoría Lighthouse.
11. Deploy: conectar GitHub a Cloudflare Pages (o Netlify), dominio de prueba, HTTPS.
12. Repaso: qué reutilizo para Piliers y qué haría distinto.

## Progreso

- [x] Lección 1 (2026-10-20): Node v22.23.3 con nvm (`.nvmrc`), proyecto Astro 7.4 con plantilla minimal,
      `npm run dev` en localhost:4321, frontmatter + `{variables}` en `index.astro`, `.gitignore`,
      repo en GitHub (AngieToro/aprendiendo-astro) con PAT fine-grained.
- [x] Lección 2 (2026-10-21): `src/layouts/BaseLayout.astro` con `interface Props` (title y description
      obligatorias), `Astro.props`, `<slot />`; `index.astro` y `404.astro` usan el layout.
      Aprendido: extensión `.astro` obligatoria en imports, `<X />` no pasa contenido al slot
- [x] Extra (2026-10-21): Prettier + `prettier-plugin-astro` (tabs, comillas simples, sin `;`),
      scripts `format` / `format:check`, `.prettierignore` (package-lock.json),
      `.vscode/extensions.json` versionado.
- [x] Lección 3 (2026-10-21): `src/components/ServiceCard.astro` (props icon/title/description, todas
      obligatorias), usado 3 veces en una `<section>` de `index.astro`.
- [ ] Lección 4
