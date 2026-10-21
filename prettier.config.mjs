// Configuración de Prettier (formateador de código)
// Opciones: https://prettier.io/docs/options

/** @type {import("prettier").Config} */
export default {
	// Plugin oficial para que Prettier entienda archivos .astro
	plugins: ['prettier-plugin-astro'],
	overrides: [
		{
			files: '*.astro',
			options: { parser: 'astro' },
		},
	],

	// Reglas de estilo del proyecto
	useTabs: true, // indentar con tabs
	singleQuote: true, // comillas simples (')
	semi: false, // sin punto y coma (;) al final de cada línea
	printWidth: 80, // largo máximo de línea antes de cortarla en varias
}
