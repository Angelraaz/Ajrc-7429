export type Answers = { equipment?: string; symptom?: string; detail?: string; safety?: string };
export type Option = { value: string; label: string; note?: string };
export const equipmentOptions: Option[] = [
  { value: 'laptop', label: 'Laptop', note: 'Equipo portátil' },
  { value: 'desktop', label: 'Computadora de escritorio', note: 'PC o todo en uno' },
];
export const symptomOptions: Option[] = [
  { value: 'power', label: 'No enciende' }, { value: 'slow', label: 'Está lenta' },
  { value: 'heat', label: 'Se calienta mucho' }, { value: 'internet', label: 'Falla la conexión' },
  { value: 'error', label: 'Muestra errores' },
];
export const detailOptions: Record<string, Option[]> = {
  power: [{ value: 'silent', label: 'No hay luces ni sonido' }, { value: 'lights', label: 'Hay luces, pero la pantalla está negra' }, { value: 'off', label: 'Enciende y se apaga' }],
  slow: [{ value: 'startup', label: 'Al encender el equipo' }, { value: 'apps', label: 'Al abrir programas' }, { value: 'always', label: 'En todo momento' }],
  heat: [{ value: 'work', label: 'Al usar programas exigentes' }, { value: 'idle', label: 'Incluso con poco uso' }, { value: 'shutdown', label: 'Se apaga por sí sola' }],
  internet: [{ value: 'wifi', label: 'Solo falla el Wi-Fi' }, { value: 'all', label: 'También fallan otros dispositivos' }, { value: 'one', label: 'Solo falla esta computadora' }],
  error: [{ value: 'blue', label: 'Pantalla azul o reinicios' }, { value: 'program', label: 'Error en un programa' }, { value: 'boot', label: 'Error al iniciar el sistema' }],
};
export const safetyOptions: Option[] = [
  { value: 'none', label: 'No, ninguna de estas señales' },
  { value: 'liquid', label: 'Hubo contacto con líquidos' },
  { value: 'burn', label: 'Hay olor a quemado o humo' },
  { value: 'battery', label: 'La batería parece hinchada' },
];
export const detailQuestions: Record<string, string> = {
  power: '¿Qué ocurre al intentar encenderla?', slow: '¿Cuándo notas la lentitud?', heat: '¿Cuándo se calienta?',
  internet: '¿Cómo falla la conexión?', error: '¿Qué tipo de error aparece?',
};
export function optionLabel(options: Option[], value?: string) {
  return options.find(o => o.value === value)?.label ?? 'Sin indicar';
}

export function getGuidance(a: Answers) {
  if (a.safety && a.safety !== 'none') return {
    urgent: true, title: 'Primero, protege tu seguridad.', cause: 'Esta señal requiere una revisión técnica. No sigas probando el equipo.',
    steps: [
      'Suspende el uso. Apágalo y desconecta la alimentación solo si puedes hacerlo sin exponerte a calor, humo o electricidad.',
      a.safety === 'liquid' ? 'No lo enciendas de nuevo, no uses secador ni lo conectes para probar si funciona.' : a.safety === 'battery' ? 'No presiones, perfores ni intentes retirar la batería. No vuelvas a cargar el equipo.' : 'No manipules cables ni componentes calientes. Si hay fuego o humo persistente, aléjate y contacta los servicios de emergencia locales.',
      'Solicita asistencia técnica antes de volver a usarlo. No abras el equipo.',
    ], next: 'Contacta a un técnico y menciona esta señal de seguridad antes de coordinar la atención.',
  };
  const guides: Record<string, { title: string; cause: string; steps: string[]; next: string }> = {
    power: { title: 'Revisemos la alimentación.', cause: a.detail === 'lights' ? 'La pantalla, la alimentación o algún componente interno podrían estar involucrados; las luces no confirman que el sistema haya iniciado.' : 'Podría relacionarse con la toma de corriente, el cargador o una falla interna. No se puede confirmar sin una revisión.', steps: ['Comprueba visualmente las conexiones externas. No uses un cable o cargador dañado ni uno de voltaje desconocido.', 'Si no hay daños visibles, verifica la toma con otro dispositivo seguro. Usa únicamente el cargador compatible con tu equipo.', a.detail === 'lights' ? 'Si usas un monitor externo, verifica que esté encendido y tenga la entrada correcta.' : 'No insistas en encenderlo si se apaga repetidamente.'], next: 'Si sigue sin iniciar, solicita una revisión. No abras el equipo ni retires componentes.' },
    slow: { title: 'Menos carga, más claridad.', cause: a.detail === 'startup' ? 'Los programas de inicio, poco espacio libre o el estado del almacenamiento pueden influir en el arranque.' : 'Muchas aplicaciones abiertas, poco espacio o limitaciones de memoria pueden afectar el rendimiento.', steps: ['Guarda tu trabajo y cierra las aplicaciones que no necesitas.', 'Revisa el espacio libre sin borrar archivos desconocidos. No uses “optimizadores” de origen dudoso.', 'Si no hay ruidos extraños ni bloqueos constantes, reinicia después de guardar. Si los hay, evita pruebas repetidas.'], next: 'Si persiste, conviene revisar el equipo antes de comprar RAM o SSD: hay que comprobar compatibilidad y estado del almacenamiento.' },
    heat: { title: 'Dale espacio para respirar.', cause: 'La ventilación obstruida, polvo o una carga de trabajo alta pueden elevar la temperatura. Hace falta revisar para identificar la causa.', steps: ['Apaga el equipo y deja que se enfríe antes de continuar.', 'Colócalo sobre una superficie firme y despejada, nunca sobre una cama o almohada.', 'Comprueba desde fuera que las rejillas no estén tapadas. No desmontes ni introduzcas objetos.'], next: a.detail === 'shutdown' ? 'Como se apaga por sí sola, suspende el uso y solicita una revisión técnica.' : 'Si vuelve a calentarse con poco uso o se apaga, suspende el uso y solicita mantenimiento o revisión.' },
    internet: { title: 'Separemos la red del equipo.', cause: a.detail === 'all' ? 'Si varios dispositivos fallan, el origen podría estar en la red, el router o el proveedor de internet.' : 'La conexión Wi-Fi, la configuración del equipo o la red pueden estar involucradas.', steps: ['Comprueba que el modo avión esté desactivado y que estés en la red correcta.', 'Prueba la misma red con otro dispositivo, sin compartir contraseñas ni datos privados.', 'Si puedes, acércate al router. No restablezcas su configuración de fábrica.'], next: a.detail === 'all' ? 'Consulta con tu proveedor si todos los dispositivos siguen sin conexión. Podemos ayudarte a orientar la revisión.' : 'Si solo falla esta computadora, solicita soporte para revisar su conexión y configuración.' },
    error: { title: 'El mensaje nos da una pista.', cause: a.detail === 'program' ? 'Podría ser una falla de la aplicación o de su configuración; el texto exacto del error ayuda a orientarse.' : 'Los errores pueden tener causas de software o hardware. Un mensaje aislado no permite confirmarlas.', steps: ['Anota el texto o código del error. Si tomas una foto, oculta datos personales.', 'Guarda tu trabajo si el sistema lo permite. No fuerces reinicios repetidos si el error vuelve.', 'No formatees, reinstales el sistema ni descargues reparadores automáticos sin una revisión y respaldo previo.'], next: 'Si el error impide iniciar o se repite, solicita revisión e indica el mensaje exacto, sin enviar contraseñas.' },
  };
  return { urgent: false, ...(guides[a.symptom ?? 'error'] ?? guides.error) };
}

export function buildSummary(a: Answers) {
  const result = getGuidance(a);
  return `Hola, AjrcServicios. Completé la orientación inicial.\nEquipo: ${optionLabel(equipmentOptions, a.equipment)}.\nProblema: ${optionLabel(symptomOptions, a.symptom)}.\nDetalle: ${optionLabel(detailOptions[a.symptom ?? ''] ?? [], a.detail)}.\nSeguridad: ${optionLabel(safetyOptions, a.safety)}.\nOrientación: ${result.title}\nSiguiente paso: ${result.next}\nMe gustaría coordinar una revisión o asesoría.`;
}