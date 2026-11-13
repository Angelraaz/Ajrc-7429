import { describe, test, expect } from 'bun:test';
import { requestBody, requestMailto } from '../packages/web/src/web/lib/problem-request';
import { faqs } from '../packages/web/src/web/lib/faqs';
import { getServiceReply } from '../packages/web/src/web/lib/service-chat';

describe('Solicitud por correo y FAQ del bot', () => {
  test('Prepara el correo con los cuatro campos, sin perder acentos o caracteres especiales', () => {
    const data = { name: ' Ángel & Rossy ', phone: '+58 412 123 4567', email: 'cliente+prueba@example.com', problem: 'Mi PC no enciende.\nAparece un error: #10 & reinicia.' };
    const url = new URL(requestMailto(data));
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe('ajrc.servicios@gmail.com');
    expect(url.searchParams.get('body')).toBe(requestBody(data));
    expect(url.searchParams.get('body')).toContain('Nombre: Ángel & Rossy');
    expect(url.searchParams.get('body')).toContain(data.email);
    expect(url.searchParams.get('body')).toContain(data.phone);
    expect(url.searchParams.get('body')).toContain(data.problem);
    expect([...url.searchParams.keys()]).toEqual(['subject', 'body']);
  });
  for (const [question, answer] of faqs) test(question, () => { expect(getServiceReply(question).text).toBe(answer); });
  test('Permite abrir el orientador desde una consulta', () => { expect(getServiceReply('Quiero usar el orientador').orientation).toBe(true); });
});