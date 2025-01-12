import {describe, expect, it} from 'vitest';
import {cloneDeep} from '../../utils/cloneDeep';

describe('cloneDeep', () => {
  it('Метод возвращает новый объект с теми же значениями', () => {
    const original = {
      a: 1,
      b: [2, 3, {d: 4}],
      c: {e: 5},
    };

    const copied = cloneDeep(original);

    expect(copied).not.toBe(original);
    expect(copied).toEqual({a: 1, b: [2, 3, {d: 4}], c: {e: 5}});
  });

  it('В скопированном объекте вложенные массивы и объекты новые', () => {
    const original = {
      a: 1,
      b: [2, 3, {d: 4}],
      c: {e: 5},
    };

    const copied = cloneDeep(original);

    expect(copied.b).not.toBe(original.b);
    expect(copied.c).not.toBe(original.c);
  });

  it('Вложенные значения скопированного объекта можно изменить, не влияя на оригинальный объект', () => {
    const original = {
      a: 1,
      b: [2, 3, {d: 4}],
      c: {e: 5},
    };

    const copied = cloneDeep(original);
    original.a = 2;
    expect(original.a).not.toEqual(copied.a);
    original.b[0] = 1;
    expect(original.b[0]).not.toEqual(copied.b[0]);
    original.c.e = 4;
    expect(original.c.e).not.toEqual(copied.c.e);
  });
});
