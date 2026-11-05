// Propósito y valores de TestCorp. Para editarlos, se cambian solo estas listas:
// index.astro las recorre con .map() y dibuja una tarjeta (InfoCard) por cada elemento.

export interface Value {
	icon: string
	title: string
	description: string
}

export const purpose: Value[] = [
	{
		icon: '🎯',
		title: 'Misión',
		description:
			'Acompañar a las pymes en su transformación digital con tecnología simple, segura y a su medida, para que puedan ver con claridad su negocio y tomar mejores decisiones.',
	},
	{
		icon: '🔭',
		title: 'Visión',
		description:
			'Ser la consultora TI de confianza de las pymes de Latinoamérica, reconocida por hacer que la tecnología sea clara y útil para cualquier empresa.',
	},
]

export const values: Value[] = [
	{
		icon: '🤝',
		title: 'Confianza',
		description: 'Decimos lo que hacemos y hacemos lo que decimos',
	},
	{
		icon: '💡',
		title: 'Simplicidad',
		description: 'Explicamos la tecnología sin complicaciones',
	},
	{
		icon: '🔒',
		title: 'Seguridad',
		description: 'Cuidamos tus datos como si fueran nuestros',
	},
	{
		icon: '🚀',
		title: 'Mejora continua',
		description: 'Aprendemos y mejoramos en cada proyecto',
	},
]
