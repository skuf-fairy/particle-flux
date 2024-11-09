export class UniqValuesVault<T> {
  private values: Set<T>;

  constructor(initialValues?: T[]) {
    this.values = new Set<T>(initialValues);
  }

  public clear() {
    this.values.clear();
    this.values = new Set<T>([]);
  }

  public getValuesList(): T[] {
    return Array.from(this.values);
  }

  public addValue(...values: T[]): void {
    values.forEach((v) => this.values.add(v));
  }

  public dropValue(...values: T[]): void {
    values.map((v) => this.values.delete(v));
  }

  public has(v: T): boolean {
    return this.values.has(v);
  }

  public hasAll(values: T[]): boolean {
    return values.every((item) => this.values.has(item));
  }

  get size(): number {
    return this.values.size;
  }
}
