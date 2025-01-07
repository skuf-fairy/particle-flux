import {ArrayUtils} from '../../utils/ArrayUtils';
import {describe, expect, it} from 'vitest';

describe('ArrayUtils', () => {
  describe('ArrayUtils.last', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const last = ArrayUtils.last;

    it('Метод возвращает последний элемент массива', () => {
      expect(last([1, 2])).toEqual(2);
    });

    it('Метод возвращает undefined, так как массив пустой', () => {
      expect(last([])).toEqual(undefined);
    });
  });

  describe('ArrayUtils.range', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const range = ArrayUtils.range;

    it('Метод возвращает валидный массив в положительном направлении', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('Метод возвращает валидный массив в положительном направлении с невалидным шагом', () => {
      expect(range(1, 5, -1)).toEqual([1, 2, 3, 4, 5]);
    });

    it('Метод возвращает валидный массив с валидным шагом', () => {
      expect(range(1, 5, 2)).toEqual([1, 3, 5]);
    });

    it('Метод возвращает валидный массив в отрицательном направлении', () => {
      expect(range(5, 1)).toEqual([5, 4, 3, 2, 1]);
    });

    it('Метод возвращает валидный массив от отрицательного начального значения к положительному конечному значению', () => {
      expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    });

    it('Метод возвращает валидный массив от положительного начального значения к отрицательному конечному значению', () => {
      expect(range(2, -2)).toEqual([2, 1, 0, -1, -2]);
    });
  });
});
