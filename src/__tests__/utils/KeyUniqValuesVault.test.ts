import {KeyUniqValuesVault} from '../../utils/vaults/KeyUniqValuesVault';
import {describe, expect, it} from 'vitest';

describe('KeyUniqValuesVault', () => {
  describe('Добавление в хранилище', () => {
    const vault = new KeyUniqValuesVault<string, number>();

    vault.addValue('v1', 1);
    vault.addValue('v1', 2);
    vault.addValue('v1', 3);
    vault.addValue('v2', 1);

    it('Проверка на размер хранилища', () => {
      expect(vault.size).toEqual(2);
      expect(vault.valuesList.length).toEqual(4);
    });

    it('Проверка добавленных значений по ключам', () => {
      expect(vault.getValueByKey('v1')).toEqual([1, 2, 3]);
      expect(vault.getValue('v1')).toEqual(1);
      expect(vault.getValueByKey('v2')).toEqual([1]);
      expect(vault.getValue('v2')).toEqual(1);

      expect(vault.getValue('v1', 2)).toEqual(2);
      expect(vault.getValue('v1', 4)).toEqual(undefined);
      expect(vault.getValue('v2', 1)).toEqual(1);
    });
  });

  describe('Удаление из хранилища', () => {
    const vault = new KeyUniqValuesVault<string, number>();

    vault.addValue('v1', 1);
    vault.addValue('v1', 2);
    vault.addValue('v1', 3);
    vault.addValue('v2', 1);

    it('Удаление по ключу', () => {
      vault.dropKey('v2');
      expect(vault.size).toEqual(1);
      expect(vault.valuesList.length).toEqual(3);
      expect(vault.getValueByKey('v1')).toEqual([1, 2, 3]);
      expect(vault.getValueByKey('v2')).toEqual(undefined);
    });

    it('Удаление по ключу и значению', () => {
      vault.dropSetValue('v1', 2);
      expect(vault.size).toEqual(1);
      expect(vault.valuesList.length).toEqual(2);
      expect(vault.getValueByKey('v1')).toEqual([1, 3]);
    });
  });
});
