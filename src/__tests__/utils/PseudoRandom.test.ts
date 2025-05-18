import {PseudoRandom} from '../../utils/random/PseudoRandom';
import {describe, expect, it} from 'vitest';

describe('PseudoRandom', () => {
  const pseudoRandom = new PseudoRandom(10);

  describe('getCallsCounter', () => {
    it('Метод возвращает 0, если рандомайзер еще не вызывался и нет исходного значения', () => {
      pseudoRandom.init(100);
      expect(pseudoRandom.getCallsCounter()).toBe(0);
    });

    it('Метод возвращает количество вызовов рандомайзера', () => {
      pseudoRandom.init(100);

      pseudoRandom.choice([1, 2]);
      pseudoRandom.choice([2, 3]);
      pseudoRandom.choice([3, 1]);

      expect(pseudoRandom.getCallsCounter()).toBe(3);
    });
  });

  describe('getArrayFromValues', () => {
    it('Возвращает псевдорандомный массив, который имеет заданную длину, и при этом состоит из заданных элементов.', () => {
      pseudoRandom.init(100);
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
      pseudoRandom.init(100);
      const values = [128, 12, 119];
      const length = 0;
      const pseudoRandomArray = pseudoRandom.getArrayFromValues(values, length);
      expect(pseudoRandomArray).toHaveLength(0);
    });

    it('Возвращает массив из одинаковых элементов, если массив значений состоит из одного элемента.', () => {
      pseudoRandom.init(100);
      const values = ['99'];
      const length = 4;
      const pseudoRandomArray = pseudoRandom.getArrayFromValues(values, length);
      expect(pseudoRandomArray).toEqual(['99', '99', '99', '99']);
    });

    it('Возвращает массив из одного элемента, если длина равна единице.', () => {
      pseudoRandom.init(100);
      const values = [128, 75, 13, 754, 23, 64];
      const length = 1;
      const pseudoRandomArray = pseudoRandom.getArrayFromValues(values, length);
      expect(pseudoRandomArray).toHaveLength(1);
      expect(values).toEqual(expect.arrayContaining(pseudoRandomArray));
    });
  });

  describe('getPseudoRandomValueFromArray', () => {
    it('Возвращает элемент массива, который был выбран псевдорандомно.', () => {
      pseudoRandom.init(100);
      const array = [1, 2, '12', '146', Math.PI];
      const value = pseudoRandom.choice(array);
      expect(array).toContain(value);
    });

    it('Кидает ошибку, если в метод был передан пустой массив.', () => {
      pseudoRandom.init(100);
      expect(() => pseudoRandom.choice([])).toThrowError();
    });
  });

  describe('generateNumberArray', () => {
    it('Возвращает массив из заданного элементов определенной длины.', () => {
      pseudoRandom.init(100);
      const array = pseudoRandom.generateNumberArray(10, 0, 5);
      expect(array).toHaveLength(10);
      expect(array).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5]));
    });
  });

  describe('choiceList', () => {
    it('Возвращает псевдорандомный элемент из списка', () => {
      pseudoRandom.init(100);
      const list = [1, 2, 3];
      const array = pseudoRandom.choiceList(list, 20);

      expect(array).toHaveLength(20);
      expect(array).toEqual(expect.arrayContaining(list));
    });
  });
});
