import { FaWhatsapp } from 'react-icons/fa6';
import { whatsapp } from '../lib/business';

export function WhatsAppAction() {
  return <a className="floating-whatsapp" href={whatsapp('Hola, AjrcServicios. Me gustaría solicitar atención. ¿Podrían ayudarme?')} target="_blank" rel="noopener noreferrer" aria-label="Solicitar ayuda por WhatsApp, abre una pestaña nueva"><FaWhatsapp size={23} aria-hidden="true" /><span>WhatsApp</span></a>;
}