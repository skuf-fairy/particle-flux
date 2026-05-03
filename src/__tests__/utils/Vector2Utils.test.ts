import {describe, expect, it} from 'vitest';
import {pointToAngleInDegrees} from '../../utils/vector2d/pointToAngleInDegrees';
import {angleInDegreesToPoint} from '../../utils/vector2d/angleInDegreesToPoint';

describe('Vector2Utils', () => {
  describe('Vector2Utils.pointToAngle', () => {
    it('Перевод из радиан в вектор и обратно должен вернуть то же самое значение', () => {
      expect(Math.round(pointToAngleInDegrees(angleInDegreesToPoint(30)))).toEqual(30);
    });
  });
});
