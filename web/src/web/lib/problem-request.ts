import { business } from './business';

export type ProblemRequest = { name: string; phone: string; email: string; problem: string };

export function requestBody(data: ProblemRequest) {
  return `Hola, AjrcServicios. Quisiera solicitar una revisión de mi equipo.\n\nNombre: ${data.name.trim()}\nTeléfono: ${data.phone.trim()}\nCorreo: ${data.email.trim()}\n\nProblema del equipo:\n${data.problem.trim()}\n\nMe gustaría coordinar la atención y conocer los siguientes pasos.`;
}

export function requestMailto(data: ProblemRequest) {
  return `mailto:${business.email}?subject=${encodeURIComponent('Solicitud de revisión de equipo — AjrcServicios')}&body=${encodeURIComponent(requestBody(data))}`;
}