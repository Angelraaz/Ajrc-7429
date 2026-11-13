import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, RotateCcw, Copy, TriangleAlert, MessageCircle, ChevronRight } from 'lucide-react';
import { buildSummary, detailOptions, detailQuestions, equipmentOptions, getGuidance, safetyOptions, symptomOptions, type Answers } from '../lib/troubleshooter';
import { whatsapp } from '../lib/business';

export function Troubleshooter() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [copyState, setCopyState] = useState('');
  const [manualCopy, setManualCopy] = useState(false);
  const [copying, setCopying] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);
  const keys = ['equipment', 'symptom', 'detail', 'safety'] as const;
  const options = [equipmentOptions, symptomOptions, detailOptions[answers.symptom ?? 'power'], safetyOptions][Math.min(step, 3)];
  const titles = ['¿Qué equipo necesitas revisar?', '¿Qué problema presenta?', detailQuestions[answers.symptom ?? 'power'], '¿Hay alguna señal de riesgo?'];
  const result = getGuidance(answers);
  const summary = buildSummary(answers);
  function select(value: string) {
    const key = keys[step];
    setAnswers(current => {
      const next = { ...current, [key]: value };
      if (step === 0 && value !== current.equipment) { delete next.symptom; delete next.detail; delete next.safety; }
      if (step === 1 && value !== current.symptom) { delete next.detail; delete next.safety; }
      if (step === 2 && value !== current.detail) delete next.safety;
      return next;
    });
  }
  function reset() { setAnswers({}); setStep(0); setCopyState(''); setManualCopy(false); }
  async function copy() {
    setCopying(true);
    try { await navigator.clipboard.writeText(summary); setCopyState('Resumen copiado.'); setManualCopy(false); }
    catch { setManualCopy(true); setCopyState('Selecciona el resumen de abajo y cópialo manualmente.'); }
    finally { setCopying(false); }
  }
  return <div className="chat-wizard">
      <div className="wizard">
        <div className="wizard-label"><span><span className="status-dot" /> ORIENTADOR DE PROBLEMAS</span><small>{step < 4 ? `Paso ${step + 1} de 4` : 'Orientación lista'}</small></div>
        <div className="progress" aria-hidden="true">{[0, 1, 2, 3].map(i => <span key={i} className={i <= step ? 'filled' : ''} />)}</div>
        {step < 4 ? <>
          <h3 ref={headingRef} tabIndex={-1}>{titles[step]}</h3><p className="wizard-subtitle">{step === 3 ? 'Comprueba esto antes de intentar cualquier solución.' : 'Selecciona la opción que mejor describe tu caso.'}</p>
          <fieldset className="option-list" aria-label={titles[step]}>{options.map(option => <button key={option.value} className={`option ${answers[keys[step]] === option.value ? 'selected' : ''}`} aria-pressed={answers[keys[step]] === option.value} onClick={() => select(option.value)}><span className="option-radio">{answers[keys[step]] === option.value && <span />}</span><span>{option.label}{option.note && <small>{option.note}</small>}</span><ChevronRight size={18} /></button>)}</fieldset>
          <div className="wizard-actions"><button className="back-button" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Atrás</button><button className="button dark-button" disabled={!answers[keys[step]]} onClick={() => setStep(step + 1)}>{step === 3 ? 'Ver orientación' : 'Continuar'}<ArrowRight size={17} /></button></div>
        </> : <div className={`wizard-result ${result.urgent ? 'urgent' : ''}`}>
          <div className="result-icon">{result.urgent ? <TriangleAlert size={24} /> : <ShieldCheck size={24} />}</div><h3 ref={headingRef} tabIndex={-1}>{result.title}</h3><p>{result.cause}</p><ol>{result.steps.map(s => <li key={s}>{s}</li>)}</ol><div className="next-step"><strong>Siguiente paso</strong><p>{result.next}</p><p>El diagnóstico técnico es presencial o remoto, según el caso y previa coordinación.</p></div>
          <a className="button" href={whatsapp(summary)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Compartir por WhatsApp<ArrowRight size={17} /><span className="sr-only">, abre una pestaña nueva</span></a>
          <div className="result-tools"><button onClick={copy} disabled={copying}><Copy size={15} />{copying ? 'Copiando…' : 'Copiar resumen'}</button><button onClick={() => { setStep(3); setCopyState(''); }}><ArrowLeft size={15} />Volver</button><button onClick={reset}><RotateCcw size={15} />Empezar de nuevo</button></div>
          <output className="copy-status" aria-live="polite">{copyState}</output>{manualCopy && <textarea className="summary-text" aria-label="Resumen para copiar" readOnly value={summary} onFocus={e => e.target.select()} rows={8} />}
        </div>}
        <div className="wizard-footnote"><ShieldCheck size={13} /> Orientación inicial. Diagnóstico presencial o remoto, según el caso.</div>
      </div>
  </div>;
}