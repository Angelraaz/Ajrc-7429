import { ArrowUpRight, Wrench, Fan, Cpu, Headphones, Globe, Code2 } from 'lucide-react';
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
          <h3>{service.title}</h3><p>{service.text}</p><div className="service-bottom"><span>{service.tags}</span><a href={whatsapp(`Hola, AjrcServicios. Me interesa el servicio de ${service.title.toLowerCase()}. ¿Podrían orientarme?`)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por WhatsApp: ${service.title}`}><ArrowUpRight size={23} /></a></div>
          {service.id === 'web' && <div className="mini-browser" aria-hidden="true"><div className="mini-browser-bar"><i /><i /><i /><span>tu-espacio.web</span></div><div className="mini-browser-body"><Code2 size={30} /><strong>Tu idea.<br />Tu espacio.</strong><div className="mini-line" /><div className="mini-button" /></div></div>}
        </article>;
      })}</div>
    </div>
  </section>;
}