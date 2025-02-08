import {KeyUniqValuesVault} from '../../utils/vaults/KeyUniqValuesVault';
import {describe, expect, it} from 'vitest';

describe('KeyUniqValuesVault', () => {
  describe('Adding to the repository', () => {
    const vault = new KeyUniqValuesVault<string, number>();

    vault.addValue('v1', 1);
    vault.addValue('v1', 2);
    vault.addValue('v1', 3);
    vault.addValue('v2', 1);

    it('Checking for storage size', () => {
      expect(vault.size).toEqual(2);
      expect(vault.valuesList.length).toEqual(4);
    });

    it('Checking added values by keys', () => {
      expect(vault.getValueByKey('v1')).toEqual([1, 2, 3]);
      expect(vault.getValue('v1')).toEqual(1);
      expect(vault.getValueByKey('v2')).toEqual([1]);
      expect(vault.getValue('v2')).toEqual(1);

      expect(vault.getValue('v1', 2)).toEqual(2);
      expect(vault.getValue('v1', 4)).toEqual(undefined);
      expect(vault.getValue('v2', 1)).toEqual(1);
    });
  });

  describe('Deleting from storage', () => {
    const vault = new KeyUniqValuesVault<string, number>();

    vault.addValue('v1', 1);
    vault.addValue('v1', 2);
    vault.addValue('v1', 3);
    vault.addValue('v2', 1);

    it('Deleting by key', () => {
      vault.dropKey('v2');
      expect(vault.size).toEqual(1);
      expect(vault.valuesList.length).toEqual(3);
      expect(vault.getValueByKey('v1')).toEqual([1, 2, 3]);
      expect(vault.getValueByKey('v2')).toEqual(undefined);
    });

    it('Deleting by key and value', () => {
      vault.dropSetValue('v1', 2);
      expect(vault.size).toEqual(1);
      expect(vault.valuesList.length).toEqual(2);
      expect(vault.getValueByKey('v1')).toEqual([1, 3]);
    });
  });
});
