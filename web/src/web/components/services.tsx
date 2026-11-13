import { ArrowUpRight, Wrench, Fan, Cpu, Headphones, Globe, MessageCircle } from 'lucide-react';
import { services, whatsapp } from '../lib/business';

const icons = { wrench: Wrench, fan: Fan, cpu: Cpu, headphones: Headphones, globe: Globe };
export function Services() {
  return <section className="section services-section" id="servicios" aria-labelledby="services-title">
    <div className="container">
      <div className="section-heading"><div><span className="eyebrow">SOLUCIONES PARA TU DÍA A DÍA</span><h2 id="services-title">Tecnología que funciona.<br /><span className="muted-heading">Ayuda que se entiende.</span></h2></div><p>Desde cuidar tu computadora hasta crear tu espacio en internet. Encuentra lo que necesitas.</p></div>
      <div className="services-grid">{services.map(service => {
        const Icon = icons[service.icon];
        return <article className={`service-card ${service.id === 'web' ? 'web-card' : ''}`} key={service.id}>
          <div className="service-top"><span className="icon-box"><Icon size={25} strokeWidth={1.6} /></span><span className="service-number">{service.number}</span></div>
          <h3>{service.title}</h3><p>{service.text}</p><div className="service-bottom"><span>{service.tags}</span><a href={whatsapp(`Hola, AjrcServicios. Me interesa el servicio de ${service.title.toLowerCase()}. ¿Podrían orientarme?`)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por WhatsApp: ${service.title}`}><MessageCircle size={16} /><span>{service.id === 'web' ? 'Quiero mi página web' : 'Consultar'}</span><ArrowUpRight size={16} /></a></div>
          {service.id === 'web' && <figure className="project-preview"><img src="/images/proyecto-rossystilos.webp" alt="Vista de una página web de Rossystilos con galería y botón para agendar citas" width="621" height="390" loading="lazy" /><figcaption>Diseño que conecta con tus clientes.</figcaption></figure>}
        </article>;
      })}</div>
    </div>
  </section>;
}