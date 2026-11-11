// Preguntas frecuentes de TestCorp. Para agregar, quitar o editar una pregunta, se cambia solo esta lista:
// index.astro la recorre con .map() y dibuja una pregunta (FaqItem) por cada elemento.

export interface Question {
	question: string
	answer: string
}

export const questions: Question[] = [
	{
		question: '¿Trabajan solo con pymes?',
		answer:
			'Sí, nos especializamos en pequeñas y medianas empresas. Conocemos sus tiempos y presupuestos, y adaptamos cada propuesta a su realidad.',
	},
	{
		question: '¿Cuánto cuesta un proyecto?',
		answer:
			'Depende del alcance. Después de una primera reunión sin costo, te enviamos una propuesta con el valor y los plazos detallados.',
	},
	{
		question: '¿Cuánto tiempo toma ver resultados?',
		answer:
			'Los primeros avances se ven en pocas semanas. Trabajamos por etapas cortas para que puedas revisar el progreso desde el inicio.',
	},
	{
		question: '¿Pueden trabajar de forma remota?',
		answer:
			'Sí. Trabajamos de forma remota con empresas de todo Latinoamérica, y nos reunimos en persona cuando el proyecto lo necesita.',
	},
	{
		question: '¿Qué pasa cuando termina el proyecto?',
		answer:
			'Te entregamos documentación y capacitación para tu equipo, y puedes contratar un plan de soporte para mantener todo funcionando.',
	},
]
