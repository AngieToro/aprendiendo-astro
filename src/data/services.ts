// Servicios que ofrece TestCorp. Para agregar, quitar o editar un servicio, se cambia solo esta lista:
// index.astro la recorre con .map() y dibuja una tarjeta (ServiceCard) por cada elemento.

export interface Service {
	icon: string
	title: string
	description: string
}

export const services: Service[] = [
	{
		icon: '🛡️',
		title: 'Auditoría de seguridad',
		description: 'Encontramos tus vulnerabilidades',
	},
	{
		icon: '💻',
		title: 'Desarrollo de aplicaciones',
		description: 'Aplicaciones a medida',
	},
	{
		icon: '💼',
		title: 'Gemelo digital',
		description: 'Creamos la representación virtual de tu organización',
	},
	{
		icon: '☁️',
		title: 'Migración a la nube',
		description: 'Te actualizamos a modernas SaaS',
	},
	{
		icon: '🎧',
		title: 'Soporte TI',
		description: 'Resolvemos todos tus problemas',
	},
]
