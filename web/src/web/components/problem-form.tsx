import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, ShieldCheck, MessageCircle, Copy } from 'lucide-react';
import { requestBody, requestMailto, type ProblemRequest } from '../lib/problem-request';

export function ProblemForm() {
  const [prepared, setPrepared] = useState<ProblemRequest | null>(null);
  const [status, setStatus] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = Object.fromEntries(['name', 'phone', 'email', 'problem'].map(key => [key, String(data.get(key) ?? '').trim()])) as ProblemRequest;
    if (Object.values(request).some(value => !value)) { setStatus('Completa todos los campos con tus datos y el problema del equipo.'); return; }
    setPrepared(request);
    setStatus('Mensaje preparado. Se abrirá tu aplicación de correo; revisa los datos y confirma el envío allí. La web no lo envía automáticamente.');
    window.location.href = requestMailto(request);
  }
  async function copy() {
    if (!prepared) return;
    try { await navigator.clipboard.writeText(requestBody(prepared)); setStatus('Mensaje copiado. Puedes pegarlo en tu aplicación de correo. No se ha enviado automáticamente.'); }
    catch { setStatus('No se pudo copiar. Selecciona el resumen y cópialo manualmente.'); }
  }
  return <section className="section request-section" id="solicitud" aria-labelledby="request-title">
    <div className="container request-grid">
      <div className="request-intro"><span className="eyebrow">VAMOS A REVISAR TU EQUIPO</span><h2 id="request-title">Cuéntanos qué pasa.<br /><span>Te ayudamos a resolverlo.</span></h2><p>Una laptop que no enciende, una PC lenta o una falla inesperada. Déjanos los detalles para coordinar tu revisión.</p><div className="request-note"><ShieldCheck size={23} /><p>No incluyas contraseñas ni archivos privados. Esta solicitud no sustituye un diagnóstico técnico.</p></div><button className="request-bot-link" onClick={() => window.dispatchEvent(new CustomEvent('ajrc:open-assistant', { detail: 'orientation' }))}><MessageCircle size={18} /> ¿No sabes cómo describirlo? Usa el bot <ArrowUpRight size={16} /></button></div>
      <form className="request-form" onSubmit={submit} onChange={() => { setPrepared(null); setStatus(''); }}>
        <div className="request-form-heading"><Mail size={20} /><h3>Solicitar una revisión</h3></div><p className="request-help">Todos los campos son obligatorios.</p>
        <div className="request-fields"><label htmlFor="request-name">Nombre completo<input id="request-name" aria-label="Nombre completo" name="name" autoComplete="name" required maxLength={100} placeholder="Tu nombre" /></label><label htmlFor="request-phone">Teléfono<input id="request-phone" aria-label="Teléfono" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} pattern="[+0-9 ]{7,30}" title="Indica un teléfono con números, por ejemplo +58 412 123 4567" placeholder="+58 412 123 4567" /></label><label className="field-full" htmlFor="request-email">Correo electrónico<input id="request-email" aria-label="Correo electrónico" name="email" type="email" autoComplete="email" required maxLength={150} placeholder="tu@correo.com" /></label><label className="field-full" htmlFor="request-problem">¿Qué le pasa a tu equipo?<textarea id="request-problem" aria-label="¿Qué le pasa a tu equipo?" name="problem" required minLength={10} maxLength={1200} rows={4} placeholder="Tipo de equipo, modelo si lo conoces, qué ocurre y desde cuándo…" /></label></div>
        <button className="button dark-button request-submit" type="submit">Preparar correo de solicitud <ArrowUpRight size={17} /></button><p className="request-privacy">Abre tu aplicación de correo. Tú revisas y envías el mensaje. No guardamos estos datos en la web.</p>
        <output className="request-status" aria-live="polite">{status}</output>{prepared && <div className="request-prepared"><a href={requestMailto(prepared)}>Volver a abrir mi correo <ArrowUpRight size={15} /></a><button type="button" onClick={copy}><Copy size={15} /> Copiar mensaje</button><details><summary>Ver mensaje preparado</summary><textarea readOnly value={requestBody(prepared)} aria-label="Mensaje preparado para copiar" rows={8} onFocus={event => event.target.select()} /></details><p>Si no se abre una aplicación, copia el mensaje y usa el enlace de correo de la sección Contacto.</p></div>}
      </form>
    </div>
  </section>;
}