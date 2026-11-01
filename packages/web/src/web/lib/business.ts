export const business = {
  name: 'AjrcServicios',
  phone: '584126627894',
  displayPhone: '+58 412 662 7894',
  email: 'ajrc.servicios@gmail.com',
  hours: '8:00 a. m. – 5:00 p. m.',
};

export function whatsapp(message = 'Hola, AjrcServicios. Me gustaría solicitar información sobre sus servicios.') {
  return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
}

export const services = [
  { id: 'reparacion', number: '01', title: 'Reparación de equipos', text: '¿Tu equipo no enciende o presenta fallas? Revisamos el problema y te explicamos las opciones de solución.', tags: 'Computadoras · Laptops', icon: 'wrench' },
  { id: 'mantenimiento', number: '02', title: 'Mantenimiento', text: 'Limpieza y revisión para cuidar tu equipo, prevenir problemas y mantener un buen funcionamiento.', tags: 'Limpieza · Revisión', icon: 'fan' },
  { id: 'actualizacion', number: '03', title: 'Actualización y mejoras', text: 'Dale una nueva vida a tu computadora. Te orientamos sobre memoria y almacenamiento compatibles.', tags: 'Memoria RAM · SSD', icon: 'cpu' },
  { id: 'soporte', number: '04', title: 'Asesoramiento y soporte', text: 'Resuelve tus dudas con ayuda cercana. Atención en local, a domicilio o remota, según tu necesidad.', tags: 'Presencial · Remoto', icon: 'headphones' },
  { id: 'web', number: '05', title: 'Tu propia página web', text: 'Tu perfil, tus proyectos o tus servicios, en un solo lugar. Creamos páginas web personales modernas y adaptables a teléfonos.', tags: 'Diseño personal · Adaptable', icon: 'globe' },
] as const;