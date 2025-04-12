import {describe, expect, it} from 'vitest';
import {Vector2Utils} from '../../utils/Vector2Utils';

describe('Vector2Utils', () => {
  describe('Vector2Utils.pointToAngle', () => {
    it('Перевод из радиан в вектор и обратно должен вернуть то же самое значение', () => {
      expect(Math.round(Vector2Utils.pointToAngleInDegrees(Vector2Utils.angleInDegreesToPoint(30)))).toEqual(30);
    });
  });
});
