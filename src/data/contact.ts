// Datos de contacto de TestCorp (ficticios). Si cambian, se editan solo aquí.
export const contact = {
	email: 'hola@testcorp.example',
	emailSubject: 'Consulta desde el sitio web TestCorp',
	// Debe incluir el código de país pero sin el signo +, sin guiones y sin espacios
	// (ejemplo: 56912345678 para Chile, 34612345678 para España o 5215512345678 para México).
	whatsapp: '56900000000',
	whatsappMessage: 'Hola, TestCorp quiero más información sobre sus servicios',
}

export const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`
export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`
