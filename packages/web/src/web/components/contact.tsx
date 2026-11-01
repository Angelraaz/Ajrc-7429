import { ArrowUpRight, MessageCircle, Mail, Clock, MapPin, ChevronDown } from 'lucide-react';
import { business, whatsapp } from '../lib/business';

const faqs = [
  ['¿Cómo puedo solicitar una revisión?', 'Escríbenos por WhatsApp o correo con el tipo de equipo y una breve descripción del problema. Coordinaremos la modalidad de atención y los siguientes pasos contigo.'],
  ['¿Ofrecen atención a domicilio y remota?', 'Sí. Atendemos en local, a domicilio y de forma remota, según el caso. La ubicación, disponibilidad y modalidad se coordinan previamente por contacto.'],
  ['¿Qué información debo compartir?', 'Indica si es una computadora o laptop, su modelo si lo conoces y qué falla presenta. Puedes usar el orientador para preparar un resumen. Nunca envíes contraseñas ni archivos privados.'],
  ['¿Pueden ayudarme a mejorar un equipo antiguo?', 'Podemos orientarte sobre mejoras de memoria o almacenamiento. Primero hay que revisar la compatibilidad, el estado del equipo y tus necesidades; no todas las computadoras admiten las mismas mejoras.'],
  ['¿También crean páginas web personales?', 'Sí. Podemos ayudarte a presentar tu perfil, tus proyectos o tus servicios con una página moderna y adaptable a teléfonos. Cuéntanos qué quieres mostrar para definir el alcance.'],
];

export function Contact() {
  return <>
    <section className="section faq-section" aria-labelledby="faq-title"><div className="container faq-grid"><div><span className="eyebrow">SIN COMPLICACIONES</span><h2 id="faq-title">Quizás te estás<br />preguntando…</h2><p className="faq-intro">La mejor solución empieza por una conversación clara.</p></div><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} /></summary><p>{a}</p></details>)}</div></div></section>
    <section className="contact-section" id="contacto" aria-labelledby="contact-title"><div className="container contact-grid"><div><span className="eyebrow">ESTAMOS PARA AYUDARTE</span><h2 id="contact-title">Cuéntanos qué necesitas.<br /><span>Nos encargamos de orientarte.</span></h2><p>Una falla, una mejora o una nueva página web.<br />Demos juntos el primer paso.</p><div className="contact-info"><span><Clock size={17} /> {business.hours}</span><span><MapPin size={17} /> Atención presencial y remota, previa coordinación</span></div></div><div className="contact-links"><a className="contact-link" href={whatsapp()} target="_blank" rel="noopener noreferrer"><span className="contact-icon"><MessageCircle size={27} /></span><span><small>ESCRÍBENOS POR WHATSAPP</small><strong>{business.displayPhone}</strong></span><ArrowUpRight size={23} /></a><a className="contact-link" href={`mailto:${business.email}`}><span className="contact-icon"><Mail size={26} /></span><span><small>O ENVÍANOS UN CORREO</small><strong>{business.email}</strong></span><ArrowUpRight size={23} /></a><p>No compartas contraseñas ni información sensible.</p></div></div></section>
  </>;
}