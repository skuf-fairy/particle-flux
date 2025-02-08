import {ArrayUtils} from '../../utils/ArrayUtils';
import {describe, expect, it} from 'vitest';

describe('ArrayUtils', () => {
  describe('ArrayUtils.last', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const last = ArrayUtils.last;

    it('The method returns the last element of the array', () => {
      expect(last([1, 2])).toEqual(2);
    });

    it('The method returns undefined because the array is empty', () => {
      expect(last([])).toEqual(undefined);
    });
  });

  describe('ArrayUtils.range', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const range = ArrayUtils.range;

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
