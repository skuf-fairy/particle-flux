/**
 * Хранение массивов уникальных значений по ключам
 * @example
 * const vault = new Vault<string, number>();
 * vault.addValue('v1', 1);
 * vault.addValue('v1', 2);
 * vault.addValue('v1', 2);
 * vault.addValue('v2', 1);
 * result:
 * Map({
 *    v1: Set([1, 2]),
 *    v2: Set([1])
 * })
 */
export class KeyUniqValuesVault<K, E> {
  private readonly vault: Map<K, Set<E>>;

  constructor() {
    this.vault = new Map<K, Set<E>>();
  }

  public addValue(key: K, entity: E): void {
    if (this.vault.has(key)) {
      this.vault.get(key)?.add(entity);
    } else {
      this.vault.set(key, new Set([entity]));
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
      if (values.size <= 1) {
        return this.vault.delete(key) ? Array.from(values) : [];
      } else {
        return values.delete(value) ? [value] : [];
      }
    }

    return this.vault.delete(key) ? Array.from(values) : [];
  }

  public getValue(key: K, value?: E): E | undefined {
    const valueByKey = Array.from(this.vault.get(key) || []);
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
    return Array.from(this.vault.values())
      .flat()
      .reduce<E[]>((values, set) => {
        values.push(...set.values());
        return values;
      }, []);
  }

  public clone(): Map<K, Set<E>> {
    return new Map<K, Set<E>>(this.vault);
  }

  public getVault(): Map<K, Set<E>> {
    return this.vault;
  }
}
