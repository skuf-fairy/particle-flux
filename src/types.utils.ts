export type UnknownConstructor<T extends Object = Object> = new (...args: never[]) => T;

export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type ValueOf<T> = T[keyof T];
