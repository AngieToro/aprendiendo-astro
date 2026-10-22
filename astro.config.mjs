// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
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
})
