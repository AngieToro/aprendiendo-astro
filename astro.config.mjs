// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	// URL pública del sitio. Provisoria: se cambia por la real en la lección 11 (deploy)
	//site: 'https://testcorp.example',
	site: 'https://aprendiendo-astro-testcorp.angelicatoro88.workers.dev/'

	vite: {
		plugins: [tailwindcss()],
	},

	// Fuentes de Google descargadas en el build y servidas desde el propio sitio
	// (solo se descargan los grosores indicados en weights)
	fonts: [
		{
			// Títulos
			provider: fontProviders.google(),
			name: 'Poppins',
			cssVariable: '--font-poppins',
			weights: [600, 700],
		},
		{
			// Texto
			provider: fontProviders.google(),
			name: 'Open Sans',
			cssVariable: '--font-open-sans',
			weights: [400, 700],
		},
	],

	integrations: [sitemap()],
})
