import { business } from './business';
import { faqs } from './faqs';

export type ServiceReply = { text: string; topic?: string; cta?: string; whatsappMessage?: string; orientation?: boolean };
export const welcomeReply: ServiceReply = { text: '¡Hola! Soy el asistente automático de AjrcServicios. Con gusto te orientaré sobre nuestros servicios. ¿Necesitas ayuda con tu computadora o quieres una página web?' };

function normalize(text: string) { return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

export function getServiceReply(question: string, previousTopic = ''): ServiceReply {
  const q = normalize(question).slice(0, 400);
  const topics = [
    { key: 'diseño web', match: /web|pagina|sitio|portafolio|portfolio|landing/ },
    { key: 'mantenimiento', match: /manten|limpieza|limpiar|polvo/ },
    { key: 'actualización', match: /actualiz|mejora|\bram\b|\bssd\b|memoria|almacenamiento|upgrade/ },
    { key: 'reparación', match: /repar|no enciende|pantalla|falla|laptop|computador|portatil|lenta|calienta|error/ },
    { key: 'soporte', match: /soporte|asesor|ayuda tecnica|configur/ },
  ];
  const matched = topics.filter(t => t.match.test(q));
  const topic = matched.map(t => t.key).join(' y ') || previousTopic;
  const quote = /preci|cost|cotiz|tarifa|presupuest|cobr|\bvalor\b|gratis|gratuit|\$|dolar|bolivar|\bbs\b|cuanto.*vale|cuanto.*sale/.test(q)
    || (/\bcuanto\b/.test(q) && !/tiempo|tarda|demora|dura/.test(q));

  if (quote) return {
    text: '¡Con mucho gusto! Para darte una cotización adecuada, necesitamos conocer tu equipo o proyecto. No tengo tarifas confirmadas y prefiero no darte un precio incorrecto. Escríbenos por WhatsApp y te orientaremos personalmente.',
    topic, cta: 'Solicitar cotización por WhatsApp',
    whatsappMessage: `Hola, AjrcServicios. Me gustaría solicitar una cotización${topic ? ` sobre ${topic}` : ''}. Mi consulta: ${question.slice(0, 400)}`,
  };
  const faq = faqs.find(([title]) => normalize(title).replace(/[¿?]/g, '').trim() === q.replace(/[¿?]/g, '').trim());
  if (faq) return { text: faq[1], topic, orientation: /orientador|informacion.*compartir/.test(q) };
  if (/orientador|orientacion|por donde empezar/.test(q)) return { text: 'Te guiaré con cuatro preguntas y un chequeo de seguridad. Es una orientación inicial, no un diagnóstico. Tus respuestas no se guardan.', topic, orientation: true };
  if (/persona|humano|asesor real|hablar con|contact|whatsapp|correo|telefono|agendar|reservar|cita/.test(q)) return {
    text: 'Claro, será un gusto atenderte personalmente. Puedes escribirnos por WhatsApp para coordinar atención presencial, a domicilio o remota, según tu caso. No necesitas compartir contraseñas ni archivos privados.',
    topic, cta: 'Hablar con AjrcServicios', whatsappMessage: `Hola, AjrcServicios. Quisiera recibir atención personal. ${question.slice(0, 400)}`,
  };
  if (/ubic|direcc|donde|local|punto fijo|oasis|llegar/.test(q)) return {
    text: `Con gusto. Estamos en ${business.address}, ${business.locality}, Venezuela. La visita al local y la atención a domicilio se coordinan previamente. ¿Te ayudamos a coordinar tu atención?`,
    topic, cta: 'Coordinar una visita por WhatsApp', whatsappMessage: 'Hola, AjrcServicios. Me gustaría coordinar una visita al local en Oasis, Punto Fijo.',
  };
  if (/^(hola|buenos dias|buenas tardes|buenas noches|saludos)[!¡.,\s]*$/.test(q.trim())) return { ...welcomeReply, topic };
  if (/hora|lunes|martes|miercoles|jueves|viernes|sabado|domingo|festivo|abiert|atienden|dias/.test(q)) return {
    text: `Nuestro horario informado es de ${business.hours}. Para confirmar días y disponibilidad, con gusto te atendemos por WhatsApp antes de tu visita.`,
    topic, cta: 'Confirmar disponibilidad', whatsappMessage: 'Hola, AjrcServicios. Quisiera confirmar los días y la disponibilidad de atención.',
  };
  if (/tiempo|tarda|demora|dura|garantia/.test(q)) return {
    text: 'Con gusto te orientamos. Los tiempos y las condiciones de atención deben confirmarse según tu equipo o proyecto; no tengo plazos ni garantías establecidos para prometerte. Podemos revisar tu caso por WhatsApp.',
    topic, cta: 'Consultar mi caso por WhatsApp', whatsappMessage: `Hola, AjrcServicios. Quisiera consultar: ${question.slice(0, 400)}`,
  };
  if (/diagnos|remot|domicilio|presencial/.test(q)) return {
    text: 'Sí, coordinamos diagnóstico técnico presencial o remoto, según el problema. Algunas fallas requieren revisar físicamente el equipo. Este chat y el orientador solo ofrecen información inicial, no un diagnóstico definitivo. También atendemos a domicilio, previa coordinación.',
    topic: 'diagnóstico y soporte', cta: 'Coordinar diagnóstico', whatsappMessage: 'Hola, AjrcServicios. Quisiera coordinar un diagnóstico presencial o remoto de mi equipo.', orientation: true,
  };
  if (matched.length) {
    const texts: Record<string, string> = {
      'diseño web': 'Creamos páginas web personales y sitios para presentar proyectos o servicios, adaptables a teléfonos y computadoras. Cuéntanos qué deseas mostrar y te ayudaremos a definir el alcance.',
      mantenimiento: 'Ofrecemos limpieza y revisión de computadoras y laptops para cuidar su funcionamiento. Coordinamos la revisión según el estado del equipo.',
      actualización: 'Te orientamos sobre mejoras de memoria RAM o almacenamiento SSD. Primero revisamos compatibilidad y estado del equipo para recomendar una opción adecuada.',
      reparación: 'Revisamos fallas en computadoras y laptops y te explicamos las opciones de solución. El diagnóstico es presencial o remoto según el caso; si hay líquidos, olor a quemado o batería hinchada, suspende el uso y solicita asistencia técnica.',
      soporte: 'Ofrecemos asesoramiento y soporte técnico en local, a domicilio o de forma remota, según el caso y previa coordinación.',
    };
    return {
      text: `¡Con mucho gusto! ${matched.map(t => texts[t.key]).join('\n\n')}`,
      topic, cta: 'Consultar este servicio por WhatsApp', whatsappMessage: `Hola, AjrcServicios. Me interesa ${topic}. Mi consulta: ${question.slice(0, 400)}`,
      orientation: matched.some(t => t.key === 'reparación'),
    };
  }
  if (/gracia|amable|perfecto|excelente/.test(q)) return { text: '¡Gracias a ti! Será un gusto ayudarte. Si necesitas conocer un servicio o coordinar atención, aquí estoy.', topic };
  if (/hola|buenos dias|buenas tardes|buenas noches|saludo/.test(q)) return { ...welcomeReply, topic };
  if (/servicio|ofrec|hacen|dedican|informacion/.test(q)) return {
    text: 'Con gusto. Ofrecemos reparación y mantenimiento de computadoras y laptops, mejoras de memoria y almacenamiento, soporte técnico y diseño de páginas web. Atendemos en Punto Fijo y también de forma remota según el caso. ¿Sobre qué servicio te gustaría saber más?',
    topic,
  };
  return {
    text: 'Gracias por tu consulta. Mi información se limita a los servicios de AjrcServicios. Puedo orientarte sobre reparación, mantenimiento, mejoras, soporte técnico y páginas web. Si tu consulta necesita una respuesta personal, con gusto te atenderemos por WhatsApp.',
    topic, cta: 'Consultar por WhatsApp', whatsappMessage: `Hola, AjrcServicios. Quisiera orientación sobre esta consulta: ${question.slice(0, 400)}`,
  };
}
