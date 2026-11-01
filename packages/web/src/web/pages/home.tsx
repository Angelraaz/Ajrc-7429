import { ArrowRight, ArrowUpRight, MessageCircle, ShieldCheck, MapPin, Monitor, Wifi, Check, Cpu, Wrench, Activity } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { Services } from '../components/services';
import { Troubleshooter } from '../components/troubleshooter';
import { Contact } from '../components/contact';
import { whatsapp } from '../lib/business';

function TechIllustration() {
  return <div className="tech-scene" aria-hidden="true"><div className="scene-orbit orbit-one" /><div className="scene-orbit orbit-two" /><span className="scene-cross cross-one">+</span><span className="scene-cross cross-two">+</span>
    <div className="floating-tag tag-top"><span className="tag-icon"><ShieldCheck size={21} /></span><span>Tu equipo, bien cuidado<small>Reparación · Mantenimiento</small></span><span className="tag-check"><Check size={14} /></span></div>
    <div className="laptop"><div className="laptop-screen"><div className="screen-camera" /><div className="screen-content"><div className="screen-top"><span><span className="status-dot" /> AJRC / SOPORTE TÉCNICO</span><Activity size={17} /></div><div className="screen-center"><div className="screen-symbol"><Wrench size={33} strokeWidth={1.6} /></div><span>Hagamos que todo</span><strong>vuelva a funcionar.</strong></div><div className="screen-stats"><div><Cpu size={16} /><span>Rendimiento</span><div className="stat-line"><i /></div></div><div><ShieldCheck size={16} /><span>Cuidado</span><div className="stat-line"><i /></div></div><div><Wifi size={16} /><span>Conexión</span><div className="stat-line"><i /></div></div></div><div className="screen-bottom"><span>Soluciones para tu día a día</span><span>AJRC<span className="mint">.</span></span></div></div></div><div className="laptop-base"><div className="laptop-notch" /></div><div className="laptop-shadow" /></div>
    <div className="floating-tag tag-bottom"><span className="experience-number">8<span>+</span></span><span>Años de experiencia<small>Soluciones con criterio</small></span></div>
    <span className="scene-caption">TECNOLOGÍA CON UN LADO HUMANO</span>
  </div>;
}

export default function Home() {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><div className="dark-top" id="inicio"><Navigation /></div><main id="contenido"><div className="dark-top">
    <section className="hero container" aria-labelledby="hero-title"><div className="hero-copy"><div className="hero-kicker"><span className="status-dot" /> SOPORTE TÉCNICO, TRATO CERCANO</div><h1 id="hero-title">Tu computadora,<br />en <span>buenas manos.</span></h1><p>Reparamos, cuidamos y mejoramos tu equipo.<br className="desktop-br" /> Soluciones claras para que sigas con lo tuyo.</p><div className="hero-actions"><a className="button" href={whatsapp()} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> Consultar por WhatsApp<ArrowUpRight size={18} /></a><a className="text-link" href="#orientacion">Orientarme sobre un problema<ArrowRight size={17} /></a></div><div className="hero-proof"><ShieldCheck size={21} /><span><strong>8 años de experiencia.</strong> Tecnología con confianza.</span></div></div><TechIllustration /></section>
    <div className="modalities"><div className="container modalities-inner"><span className="modalities-label">CERCA DE TI, DONDE LO NECESITES</span><span><MapPin size={18} /> En local</span><span><Wrench size={18} /> A domicilio</span><span><Monitor size={18} /> Soporte remoto</span><small>Previa coordinación</small></div></div></div>
    <Services /><section className="process-section" aria-labelledby="process-title"><div className="container"><div className="process-heading"><span className="eyebrow">ASÍ DE SENCILLO</span><h2 id="process-title">De la duda a la solución.</h2></div><div className="process-grid">{[
      ['01', 'Cuéntanos qué necesitas', 'Una breve descripción por WhatsApp o correo es suficiente para comenzar.'],
      ['02', 'Coordinamos contigo', 'Definimos una revisión o asesoría en la modalidad adecuada para tu caso.'],
      ['03', 'Tú decides con claridad', 'Te explicamos las opciones antes de realizar cualquier intervención.'],
    ].map(([n, title, description]) => <article key={n}><span className="process-number">{n}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section><Troubleshooter /><Contact /></main>
    <footer className="footer"><div className="container footer-top"><a href="#inicio" className="footer-brand">Ajrc<span>Servicios</span><i>.</i></a><span>Tecnología que te acompaña.</span><a href="#inicio">Volver al inicio <ArrowUpRight size={16} /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AjrcServicios. Todos los derechos reservados.</span><span>Reparación · Soporte · Páginas web</span></div></footer>
  </>;
}