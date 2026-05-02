import {describe, expect, it} from 'vitest';
import {PseudoRandomGenerator} from '../../../utils/random/generators/PseudoRandomGenerator';

describe('PseudoRandom', () => {
  const pseudoRandomGenerator = new PseudoRandomGenerator(10);

  describe('getCallsCounter', () => {
    it('Метод возвращает 0, если рандомайзер еще не вызывался и нет исходного значения', () => {
      pseudoRandomGenerator.init(100);
      expect(pseudoRandomGenerator.getCallsCounter()).toBe(0);
    });

    it('Метод возвращает количество вызовов рандомайзера', () => {
      pseudoRandomGenerator.init(100);

      pseudoRandomGenerator.generateIntegerNumber(1, 5);
      pseudoRandomGenerator.generateIntegerNumber(1, 5);
      pseudoRandomGenerator.generateIntegerNumber(1, 5);

      expect(pseudoRandomGenerator.getCallsCounter()).toBe(3);
    });
  });
});
