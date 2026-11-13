import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { whatsapp } from '../lib/business';

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <div className="container nav-wrap">
      <a className="brand" href="#inicio" aria-label="AjrcServicios, inicio"><img src="/images/ajrc-logo-transparent.png" alt="Ajrc Servicios" width="900" height="208" /></a>
      <button className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navegación principal">
        {[['Inicio', '#inicio'], ['Servicios', '#servicios'], ['Solicitar revisión', '#solicitud'], ['Contacto', '#contacto']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="button nav-cta" href={whatsapp()} target="_blank" rel="noopener noreferrer">Hablemos <ArrowUpRight size={17} /><span className="sr-only"> por WhatsApp, abre una pestaña nueva</span></a>
      </nav>
    </div>
  </header>;
}