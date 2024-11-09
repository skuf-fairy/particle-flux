/**
 * Хранение массивов значений по ключам
 * @example
 * const vault = new Vault<string, number>();
 * vault.addValue('v1', 1);
 * vault.addValue('v1', 2);
 * vault.addValue('v1', 3);
 * vault.addValue('v2', 1);
 * result:
 * Map({
 *    v1: [1, 2, 3],
 *    v2: [1]
 * })
 */
export class KeyValuesVault<K, E> {
  private readonly vault: Map<K, E[]>;

  constructor() {
    this.vault = new Map<K, E[]>();
  }

  public addValue(key: K, entity: E): void {
    if (this.vault.has(key)) {
      this.vault.get(key)?.push(entity);
    } else {
      this.vault.set(key, [entity]);
    }
  }

  public dropKey(key: K): E[] {
    return this.dropValue(key);
  }

  public dropSetValue(key: K, value: E): E[] {
    return this.dropValue(key, value);
  }

  private dropValue(key: K, value?: E): E[] {
    const values = this.vault.get(key);
    if (!values) return [];

    if (value) {
      if (values.length <= 1) {
        return this.vault.delete(key) ? values : [];
      } else {
        const newValues = values.filter((v) => v !== value);
        this.vault.set(key, newValues);
        return newValues;
      }
    }

    return this.vault.delete(key) ? values : [];
  }

  public getValue(key: K, value?: E): E | undefined {
    const valueByKey = this.vault.get(key) || [];
    if (valueByKey.length === 0) return;

    if (value) {
      return valueByKey.find((v) => v === value);
    } else {
      return valueByKey[0];
    }
  }

  public getValueByKey(key: K): E[] | undefined {
    const value = this.vault.get(key);
    return value ? Array.from(value) : undefined;
  }

  public getValueCountByKey(key: K): number {
    const valueByKey = this.getValueByKey(key);

    return valueByKey ? valueByKey.length : 0;
  }

  public clear(): void {
    this.vault.clear();
  }

  get size(): number {
    return this.vault.size;
  }

  get valuesList(): E[] {
    return Array.from(this.vault.values()).flat();
  }

  public clone(): Map<K, E[]> {
    return new Map<K, E[]>(this.vault);
  }

  public getVault(): Map<K, E[]> {
    return this.vault;
  }
}
