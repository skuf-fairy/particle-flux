import {describe, expect, it} from 'vitest';
import {normalizeDegrees} from '../../utils/rotation/normalizeDegrees';
import {radiansToDegrees} from '../../utils/rotation/radiansToDegrees';
import {degreesToRadians} from '../../utils/rotation/degreesToRadians';
import {roundWith2Precision} from '../../utils/roundWith2Precision';

describe('NumberUtils', () => {
  describe('normalizeDegrees', () => {
    it('Функция должна избавляться от лишних оборотов', () => {
      expect(normalizeDegrees(240)).toEqual(normalizeDegrees(240 * 4));
      expect(normalizeDegrees(-240)).toEqual(normalizeDegrees(-240 * 4));
    });
  });

  describe('radiansToDegrees', () => {
    it('Угол вне диапазона [0...Math.PI] должен конвертироваться к значению из диапазона', () => {
      expect(Math.round(radiansToDegrees(1.12))).toEqual(
        Math.round(radiansToDegrees(roundWith2Precision(1.12 + roundWith2Precision(2 * Math.PI)))),
      );
    });
  });

  describe('degreesToRadians', () => {
    it('Угол вне диапазона [0...360] должен конвертироваться к значению из диапазона', () => {
      expect(roundWith2Precision(degreesToRadians(240))).toEqual(roundWith2Precision(degreesToRadians(240 + 360)));
    });
  });

  describe('radiansToDegrees <=> NumberUtils.degreesToRadians', () => {
    it('Перевод из радиан в градусы и обратно должен возвращать то же самое значение в градусах', () => {
      expect(Math.round(radiansToDegrees(degreesToRadians(90)))).toEqual(90);
    });
  });
});
