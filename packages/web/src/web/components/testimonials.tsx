import { Quote } from 'lucide-react';

const testimonials = [
  { name: 'Berthila Rossy', role: 'Fundadora de Rossystilos', initials: 'BR', service: 'Diseño web', text: 'Ángel me diseñó la página web de mi emprendimiento y el cambio fue total. Ahora mis clientas pueden ver mis servicios de forma súper profesional y organizada. 100 recomendado para cualquier negocio que quiera verse más serio en internet.' },
  { name: 'Carlos Mendoza', role: 'Cliente natural', initials: 'CM', service: 'Reparación de laptop', text: 'Se me apagado la laptop y di con él, la revisó en su taller me explicó exactamente qué componente fallaba y la dejó funcionando como nueva. Un crack total' },
  { name: 'Mariana Silva', role: 'Cliente natural', initials: 'MS', service: 'Mantenimiento preventivo', text: 'Lo llamé para mantenimiento preventivo y limpieza porque mi computadora estaba muy lenta. El cambio en la velocidad y el rendimiento se nota de inmediato. Muy buen servicio y atención de primera.' },
];

export function Testimonials() {
  return <section className="section testimonials-section" aria-labelledby="testimonials-title"><div className="container"><div className="section-heading"><div><span className="eyebrow">EXPERIENCIAS CON AJRCSERVICIOS</span><h2 id="testimonials-title">Personas agradecidas<br />con nuestro trabajo.</h2></div><p>Diseño web, reparación y mantenimiento.<br />Así lo cuentan nuestros clientes.</p></div><div className="testimonials-grid">{testimonials.map(item => <figure className="testimonial" key={item.name}><div className="testimonial-top"><Quote size={25} aria-hidden="true" /><span>{item.service}</span></div><blockquote><p>{item.text}</p></blockquote><figcaption><span className="testimonial-initials" aria-hidden="true">{item.initials}</span><div><strong>{item.name}</strong><span>{item.role}</span></div></figcaption></figure>)}</div></div></section>;
}