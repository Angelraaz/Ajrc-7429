import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle, Send, X, RotateCcw, ArrowUpRight, ChevronDown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { getServiceReply, welcomeReply, type ServiceReply } from '../lib/service-chat';
import { whatsapp } from '../lib/business';
import { Troubleshooter } from './troubleshooter';
import { faqs } from '../lib/faqs';

type ChatMessage = { id: number; from: 'assistant' | 'visitor'; text: string; reply?: ServiceReply };
const firstMessage: ChatMessage = { id: 0, from: 'assistant', text: welcomeReply.text };
const suggestions = ['Nuestros servicios', 'Diseño web', 'Reparación de laptops', '¿Cuánto cuesta?', 'Diagnóstico remoto'];

export function ServiceChat() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'chat' | 'orientation' | 'faq'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([firstMessage]);
  const topicRef = useRef('');
  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function launch(event: Event) { const mode = (event as CustomEvent).detail; setView(mode === 'orientation' ? 'orientation' : 'chat'); setOpen(true); }
    window.addEventListener('ajrc:open-assistant', launch);
    return () => window.removeEventListener('ajrc:open-assistant', launch);
  }, []);
  useEffect(() => { if (open) inputRef.current?.focus({ preventScroll: true }); }, [open, view]);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [messages, open]);
  function close() { setOpen(false); launcherRef.current?.focus({ preventScroll: true }); }
  function send(text: string) {
    const question = text.trim().slice(0, 400);
    if (!question) return;
    const reply = getServiceReply(question, topicRef.current);
    topicRef.current = reply.topic ?? topicRef.current;
    const visitorId = idRef.current++;
    const assistantId = idRef.current++;
    setMessages(current => [...current.slice(-18), { id: visitorId, from: 'visitor', text: question }, { id: assistantId, from: 'assistant', text: reply.text, reply }]);
    setInput('');
    inputRef.current?.focus({ preventScroll: true });
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); send(input); }
  function reset() { setView('chat'); topicRef.current = ''; setMessages([firstMessage]); setInput(''); inputRef.current?.focus({ preventScroll: true }); }

  return <>
    <button className="chat-launcher" ref={launcherRef} aria-expanded={open} aria-controls={open ? 'service-chat' : undefined} onClick={() => open ? close() : setOpen(true)} aria-label={open ? 'Cerrar asistente de servicios' : 'Abrir asistente de servicios'}>{open ? <X size={20} /> : <MessageCircle size={22} />}<span>¿Te orientamos?</span></button>
    {open && <dialog open id="service-chat" className="service-chat" aria-labelledby="chat-title" onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); close(); } }}>
      <header className="chat-header"><span className="chat-avatar"><MessageCircle size={21} /></span><div><h2 id="chat-title">Asistente de servicios</h2><p>AjrcServicios · Respuestas automáticas</p></div><button className="chat-icon-button" onClick={close} aria-label="Cerrar chat"><X size={20} /></button></header>
      <div className="chat-views" aria-label="Herramientas del asistente">{([['chat', 'Conversación'], ['orientation', 'Orientador'], ['faq', 'Preguntas frecuentes']] as const).map(([key, label]) => <button key={key} aria-pressed={view === key} onClick={() => setView(key)}>{label}</button>)}</div>
      <div className="chat-tools-content" hidden={view !== 'orientation'}><Troubleshooter /></div>
      <div className="chat-tools-content chat-faq" hidden={view !== 'faq'}><h3>Resolvemos tus dudas</h3><p>Información clara antes de coordinar tu atención.</p><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={16} /></summary><p>{answer}</p></details>)}</div></div>
      <div hidden={view !== 'chat'} className="chat-conversation">
      <div className="chat-log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversación con el asistente">
        {messages.map(message => <div className={`chat-message ${message.from}`} key={message.id}><span className="chat-speaker">{message.from === 'assistant' ? 'AjrcServicios' : 'Tú'}</span><p>{message.text}</p>{message.reply?.cta && <a className="chat-whatsapp" href={whatsapp(message.reply.whatsappMessage)} target="_blank" rel="noopener noreferrer"><FaWhatsapp size={17} aria-hidden="true" />{message.reply.cta}<ArrowUpRight size={14} /><span className="sr-only">, abre una pestaña nueva</span></a>}{message.reply?.orientation && <button className="chat-orientation" onClick={() => setView('orientation')}>Usar el orientador inicial <ArrowUpRight size={13} /></button>}</div>)}
      </div>
      <div className="chat-suggestions" aria-label="Consultas sugeridas">{suggestions.map(suggestion => <button key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}</div>
      <form className="chat-form" onSubmit={submit}><label className="sr-only" htmlFor="chat-question">Escribe tu consulta sobre nuestros servicios</label><input ref={inputRef} id="chat-question" aria-label="Escribe tu consulta sobre nuestros servicios" value={input} onChange={event => setInput(event.target.value)} placeholder="¿En qué podemos ayudarte?" maxLength={400} autoComplete="off" /><button type="submit" disabled={!input.trim()} aria-label="Enviar consulta"><Send size={18} /></button></form>
      </div>
      <div className="chat-footnote"><span>Sin IA. No se guardan tus mensajes.<br />No compartas contraseñas ni datos privados.</span><button onClick={reset} aria-label="Reiniciar conversación"><RotateCcw size={14} /></button></div>
    </dialog>}
  </>;
}