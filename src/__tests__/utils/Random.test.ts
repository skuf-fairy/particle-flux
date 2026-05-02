import {describe, expect, it} from 'vitest';
import {PseudoRandomGenerator} from '../../utils/random/generators/PseudoRandomGenerator';
import {Random} from '../../utils/random/Random';

describe('PseudoRandom', () => {
  const pseudoRandom = new Random(new PseudoRandomGenerator(10));

  describe('getArrayFromValues', () => {
    it('Возвращает псевдорандомный массив, который имеет заданную длину, и при этом состоит из заданных элементов.', () => {
      // pseudoRandom.init(100);
      const values = [
        '1',
        2,
        undefined,
        null,
        5,
        [1, 2, 3],
        7,
        -Infinity,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        {x: 16},
        17,
        '18',
        19,
      ];
      const length = 3;
      const pseudoRandomArray = pseudoRandom.getArrayFromValues(values, length);
      expect(pseudoRandomArray).toHaveLength(length);
      expect(values).toEqual(expect.arrayContaining(pseudoRandomArray));
    });

    it('Возвращает пустой массив, если задана нулевая длина массива.', () => {
      const values = [128, 12, 119];
      const length = 0;
      const pseudoRandomArray = pseudoRandom.getArrayFromValues(values, length);
      expect(pseudoRandomArray).toHaveLength(0);
    });

    it('Возвращает массив из одинаковых элементов, если массив значений состоит из одного элемента.', () => {
      const values = ['99'];
      const length = 4;
      const pseudoRandomArray = pseudoRandom.getArrayFromValues(values, length);
      expect(pseudoRandomArray).toEqual(['99', '99', '99', '99']);
    });

    it('Возвращает массив из одного элемента, если длина равна единице.', () => {
      const values = [128, 75, 13, 754, 23, 64];
      const length = 1;
      const pseudoRandomArray = pseudoRandom.getArrayFromValues(values, length);
      expect(pseudoRandomArray).toHaveLength(1);
      expect(values).toEqual(expect.arrayContaining(pseudoRandomArray));
    });
  });

  describe('getPseudoRandomValueFromArray', () => {
    it('Возвращает элемент массива, который был выбран псевдорандомно.', () => {
      const array = [1, 2, '12', '146', Math.PI];
      const value = pseudoRandom.choice(array);
      expect(array).toContain(value);
    });

    it('Кидает ошибку, если в метод был передан пустой массив.', () => {
      expect(() => pseudoRandom.choice([])).toThrowError();
    });
  });

  describe('generateNumberArray', () => {
    it('Возвращает массив из заданного элементов определенной длины.', () => {
      const array = pseudoRandom.generateNumberArray(10, 0, 5);
      expect(array).toHaveLength(10);
      expect(array).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
    });
  });

  describe('choiceList', () => {
    it('Возвращает псевдорандомный элемент из списка', () => {
      const list = [1, 2, 3];
      const array = pseudoRandom.choiceList(list, 20);

      expect(array).toHaveLength(20);
      expect(array).toEqual(expect.arrayContaining(list));
    });
  });
});
