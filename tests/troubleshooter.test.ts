import { describe, expect, test } from 'bun:test';
import { buildSummary, detailOptions, equipmentOptions, getGuidance, safetyOptions, symptomOptions } from '../packages/web/src/web/lib/troubleshooter';
import { business, whatsapp } from '../packages/web/src/web/lib/business';

describe('Orientador local', () => {
  for (const equipment of equipmentOptions) for (const symptom of symptomOptions) for (const detail of detailOptions[symptom.value]) for (const safety of safetyOptions) {
    test(`${equipment.value}/${symptom.value}/${detail.value}/${safety.value}`, () => {
      const answers = { equipment: equipment.value, symptom: symptom.value, detail: detail.value, safety: safety.value };
      const guidance = getGuidance(answers);
      expect(guidance.urgent).toBe(safety.value !== 'none');
      expect(guidance.steps.length).toBe(3);
      expect(guidance.title.length).toBeGreaterThan(5);
      expect(guidance.next.length).toBeGreaterThan(10);
      const summary = buildSummary(answers);
      for (const item of [equipment, symptom, detail, safety]) expect(summary).toContain(item.label);
      expect(summary).not.toContain('Sin indicar');
      const url = new URL(whatsapp(summary));
      expect(url.hostname).toBe('wa.me');
      expect(url.pathname).toBe(`/${business.phone}`);
      expect(url.searchParams.get('text')).toBe(summary);
      if (guidance.urgent) expect(guidance.steps[0]).toContain('Suspende el uso');
    });
  }
});