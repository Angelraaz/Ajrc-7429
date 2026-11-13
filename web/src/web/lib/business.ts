export const business = {
  name: 'AjrcServicios',
  phone: '584126627894',
  displayPhone: '+58 412 662 7894',
  email: 'ajrc.servicios@gmail.com',
  hours: '8:00 a. m. – 5:00 p. m.',
  address: 'Oasis, calle 19, Terrazas de Oasis, 653-a',
  locality: 'Punto Fijo 4147, Falcón',
};

export function whatsapp(message = 'Hola, AjrcServicios. Me gustaría solicitar información sobre sus servicios.') {
  return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
}

export const services = [
  { id: 'reparacion', number: '01', title: 'Reparación de equipos', text: '¿Tu equipo no enciende o presenta fallas? Revisamos el problema y te explicamos las opciones de solución.', tags: 'Computadoras · Laptops', icon: 'wrench' },
  { id: 'mantenimiento', number: '02', title: 'Mantenimiento', text: 'Limpieza y revisión para cuidar tu equipo, prevenir problemas y mantener un buen funcionamiento.', tags: 'Limpieza · Revisión', icon: 'fan' },
  { id: 'actualizacion', number: '03', title: 'Actualización y mejoras', text: 'Dale una nueva vida a tu computadora. Te orientamos sobre memoria y almacenamiento compatibles.', tags: 'Memoria RAM · SSD', icon: 'cpu' },
  { id: 'soporte', number: '04', title: 'Asesoramiento y soporte', text: 'Resuelve tus dudas con ayuda cercana. Atención en local, a domicilio o remota, según tu necesidad.', tags: 'Presencial · Remoto', icon: 'headphones' },
  { id: 'web', number: '05', title: 'Diseño web para tu proyecto', text: 'Diseño web en Punto Fijo y a distancia. Creamos páginas web personales y sitios para presentar tus proyectos o servicios, adaptables a computadoras y teléfonos.', tags: 'Páginas web · Diseño adaptable', icon: 'globe' },
] as const;