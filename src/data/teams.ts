// Member del equipo de TestCorp. Para agregar, quitar o editar a alguien, se cambia solo esta lista:
// index.astro la recorre con .map() y dibuja una tarjeta (TeamCard) por persona.
import type { ImageMetadata } from 'astro'
import claire from '../assets/team/claire_underwood.jpg'
import jackson from '../assets/team/jackson_lamb.jpeg'
import annalise from '../assets/team/annalise_keating.jpg'
import kate from '../assets/team/kate_wyler.jpeg'
import bernard from '../assets/team/bernard_holland.jpeg'
import saul from '../assets/team/saul_goodman.webp'

export interface Member {
	photo: ImageMetadata
	name: string
	title: string
	description: string
}

export const members: Member[] = [
	{
		photo: claire,
		name: 'Claire Underwood',
		title: 'Chief Executive Office (CEO)',
		description: 'Ingeniero en Informática',
	},
	{
		photo: jackson,
		name: 'Jackson Lamb',
		title: 'Chief Technology Officer (CTO)',
		description: 'Licenciado en Informática',
	},
	{
		photo: annalise,
		name: 'Annalise Keating',
		title: 'Chief Security Officer (CSO)',
		description: 'Ingeniero en Telecomunicaciones',
	},
	{
		photo: kate,
		name: 'Kate Wyler',
		title: 'User Experience (UX)',
		description: 'Licenciado en Diseño Gráfico',
	},
	{
		photo: bernard,
		name: 'Bernard Holland',
		title: 'Head of IT Infrastructure',
		description: 'Licenciado en Computación',
	},
	{
		photo: saul,
		name: 'Saul Goodman',
		title: 'Chief Financial Officer (CFO)',
		description: 'Licenciado en Contabilidad',
	},
]
