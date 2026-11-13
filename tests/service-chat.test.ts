import { describe, test, expect } from 'bun:test';
import { getServiceReply, welcomeReply } from '../packages/web/src/web/lib/service-chat';
import { whatsapp } from '../packages/web/src/web/lib/business';

describe('Asistente de servicios local', () => {
  for (const [query, topic] of [['DISEÑO DE PÁGINAS WEB', 'diseño web'], ['Limpieza y mantenimiento', 'mantenimiento'], ['Mejorar RAM y SSD', 'actualización'], ['Reparación de laptops', 'reparación'], ['Soporte técnico', 'soporte']]) {
    test(query, () => {
      const reply = getServiceReply(query);
      expect(reply.topic).toContain(topic);
      expect(reply.text).toContain('Con mucho gusto');
      const url = new URL(whatsapp(reply.whatsappMessage));
      expect(url.pathname).toBe('/584126627894');
      expect(url.searchParams.get('text')).toContain(query);
    });
  }
  for (const query of ['¿Cuánto cuesta?', 'precio', 'COSTO', 'cotización', 'presupuesto', 'tarifa', '¿Cuánto cobran?', 'valor', '¿Es gratis?', '¿Cuánto vale?', '¿Cuánto sale?', '50 dólares', '100 bolívares', '$', 'Bs']) {
    test(`Cotización: ${query}`, () => {
      const reply = getServiceReply(query, 'diseño web');
      expect(reply.cta).toBe('Solicitar cotización por WhatsApp');
      expect(reply.text).toContain('No tengo tarifas confirmadas');
      expect(reply.whatsappMessage).toContain('diseño web');
      expect(reply.whatsappMessage).toContain(query);
    });
  }
  test('Contexto, ubicación, horarios y límites', () => {
    const service = getServiceReply('Página web');
    expect(getServiceReply('¿Y cuánto cuesta?', service.topic).whatsappMessage).toContain('diseño web');
    expect(getServiceReply('¿Dónde están?').text).toContain('653-a');
    expect(getServiceReply('¿Abren el domingo?').text).toContain('confirmar días');
    expect(getServiceReply('¿Cuánto dura?').text).toContain('no tengo plazos');
    expect(getServiceReply('¿Qué garantía ofrecen?').text).toContain('no tengo plazos ni garantías');
    expect(getServiceReply('Diagnóstico remoto').text).toContain('no un diagnóstico definitivo');
    expect(getServiceReply('Qué servicios ofrecen').text).toContain('reparación y mantenimiento');
    expect(getServiceReply('Buenos días!').text).toBe(welcomeReply.text);
    expect(getServiceReply('Hola').text).toBe(welcomeReply.text);
    expect(getServiceReply('Gracias').text).toContain('Gracias a ti');
    expect(getServiceReply('Una consulta no relacionada').cta).toBe('Consultar por WhatsApp');
    expect(getServiceReply('<script>alert(1)</script>').text).not.toContain('<script>');
  });
});