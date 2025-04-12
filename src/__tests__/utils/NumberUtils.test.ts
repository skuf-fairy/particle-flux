import {describe, expect, it} from 'vitest';
import {NumberUtils} from '../../utils/NumberUtils';

// eslint-disable-next-line @typescript-eslint/unbound-method
const roundWith2Precision = NumberUtils.roundWith2Precision;

describe('NumberUtils', () => {
  describe('normalizedDegrees', () => {
    it('Функция должна избавляться от лишних оборотов', () => {
      expect(NumberUtils.normalizedDegrees(240)).toEqual(NumberUtils.normalizedDegrees(240 * 4));
      expect(NumberUtils.normalizedDegrees(-240)).toEqual(NumberUtils.normalizedDegrees(-240 * 4));
    });
  });

  describe('radiansToDegrees', () => {
    it('Угол вне диапазона [0...Math.PI] должен конвертироваться к значению из диапазона', () => {
      expect(Math.round(NumberUtils.radiansToDegrees(1.12))).toEqual(
        Math.round(NumberUtils.radiansToDegrees(roundWith2Precision(1.12 + roundWith2Precision(2 * Math.PI)))),
      );
    });
  });

  describe('degreesToRadians', () => {
    it('Угол вне диапазона [0...360] должен конвертироваться к значению из диапазона', () => {
      expect(roundWith2Precision(NumberUtils.degreesToRadians(240))).toEqual(
        roundWith2Precision(NumberUtils.degreesToRadians(240 + 360)),
      );
    });
  });

  describe('radiansToDegrees <=> NumberUtils.degreesToRadians', () => {
    it('Перевод из радиан в градусы и обратно должен возвращать то же самое значение в градусах', () => {
      expect(Math.round(NumberUtils.radiansToDegrees(NumberUtils.degreesToRadians(90)))).toEqual(90);
    });
  });
});
