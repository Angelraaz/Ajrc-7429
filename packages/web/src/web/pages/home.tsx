import { ArrowRight, ArrowUpRight, MessageCircle, ShieldCheck, MapPin, Monitor, Wrench } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { Services } from '../components/services';
import { ProblemForm } from '../components/problem-form';
import { Testimonials } from '../components/testimonials';
import { Contact } from '../components/contact';
import { whatsapp } from '../lib/business';
import { Partners } from '../components/partners';
import { WhatsAppAction } from '../components/whatsapp-action';
import { BackgroundVideo } from '../components/background-video';
import { ServiceChat } from '../components/service-chat';

export default function Home() {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><div className="dark-top" id="inicio"><Navigation /></div><main id="contenido"><div className="dark-top hero-video-section"><BackgroundVideo />
    <section className="hero container" aria-labelledby="hero-title"><div className="hero-copy"><div className="hero-kicker"><span className="status-dot" /> SOPORTE TÉCNICO, TRATO CERCANO</div><h1 id="hero-title">Tu computadora,<br />en <span>buenas manos.</span></h1><p>Reparamos, cuidamos y mejoramos tu equipo.<br className="desktop-br" /> Soporte técnico en Punto Fijo y atención remota.</p><div className="hero-actions"><a className="button" href={whatsapp()} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> Consultar por WhatsApp<ArrowUpRight size={18} /></a><button className="text-link hero-chat-action" onClick={() => window.dispatchEvent(new CustomEvent('ajrc:open-assistant', { detail: 'orientation' }))}>Orientarme sobre un problema<ArrowRight size={17} /></button></div><div className="hero-proof"><ShieldCheck size={21} /><span><strong>8 años de experiencia.</strong> Tecnología con confianza.</span></div></div><div className="hero-video-space" aria-hidden="true" /></section>
    <div className="modalities"><div className="container modalities-inner"><span className="modalities-label">CERCA DE TI, DONDE LO NECESITES</span><span><MapPin size={18} /> En local</span><span><Wrench size={18} /> A domicilio</span><span><Monitor size={18} /> Soporte remoto</span><small>Previa coordinación</small></div></div></div>
    <Services /><ProblemForm /><Testimonials /><Contact /><Partners /></main>
    <WhatsAppAction /><ServiceChat /><footer className="footer"><div className="container footer-top"><a href="#inicio" className="footer-brand">Ajrc<span>Servicios</span><i>.</i></a><span>Tecnología que te acompaña.</span><a href="#inicio">Volver al inicio <ArrowUpRight size={16} /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AjrcServicios. Todos los derechos reservados.</span><span>Reparación · Soporte · Páginas web</span></div></footer>
  </>;
}