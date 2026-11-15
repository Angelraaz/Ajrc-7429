import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { partners } from '../lib/partners';
import { Partners } from './partners';
import { ComputerMascot } from './computer-mascot';

describe('Partners y mascota del asistente', () => {
  test('Los dos partners tienen los enlaces confirmados, sin URLs visibles', () => {
    expect(partners.map(partner => partner.url)).toEqual([
      'https://rossystylos.vercel.app/',
      'https://jcarrc-nine.vercel.app',
    ]);
    const html = renderToStaticMarkup(<Partners />);
    expect(html).toContain('jcarrc-partner.svg');
    expect(html).toContain('Logo de JcarRc');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html.replace(/<[^>]*>/g, '')).not.toContain('https://');
  });
  test('La PC está enojada con el chat cerrado y contenta al abrirlo', () => {
    const closed = renderToStaticMarkup(<ComputerMascot happy={false} />);
    const open = renderToStaticMarkup(<ComputerMascot happy />);
    expect(closed).toContain('data-mood="angry"');
    expect(open).toContain('data-mood="happy"');
    expect(open).toContain('aria-hidden="true"');
    expect(open).not.toEqual(closed);
  });
});