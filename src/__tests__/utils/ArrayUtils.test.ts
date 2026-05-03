import {describe, expect, it} from 'vitest';
import {range} from '../../utils/array/range';

describe('ArrayUtils', () => {
  describe('ArrayUtils.range', () => {
    it('The method returns a valid array in the positive direction', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('The method returns a valid array in the positive direction with an invalid step', () => {
      expect(range(1, 5, -1)).toEqual([1, 2, 3, 4, 5]);
    });

    it('The method returns a valid array with a valid step.', () => {
      expect(range(1, 5, 2)).toEqual([1, 3, 5]);
    });

    it('The method returns a valid array in the negative direction', () => {
      expect(range(5, 1)).toEqual([5, 4, 3, 2, 1]);
    });

    it('The method returns a valid array from a negative initial value to a positive final value', () => {
      expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    });

    it('The method returns a valid array from a positive initial value to a negative final value', () => {
      expect(range(2, -2)).toEqual([2, 1, 0, -1, -2]);
    });
  });
});
