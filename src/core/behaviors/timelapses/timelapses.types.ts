import {RandomRange} from '../../../types';

export type TimelapsesArray<V> = {time: number; value: V}[];

export interface TimelapsesConfig<V> {
  timelapses: TimelapsesArray<V>;
}

export interface StaticBehavior<V> {
  value: V;
  isStatic: true;
}

export interface TransitionBehavior<V> {
  min: V;
  max: V;
  isTransition: true;
}

export interface TimelapsesBehavior<V> {
  timelapses: TimelapsesArray<V>;
  index: number;
}

export type AnyBehavior<V> = StaticBehavior<V> | TransitionBehavior<V> | TimelapsesBehavior<V>;

export interface NumberTimelapsesConfig extends TimelapsesConfig<number> {
  randomRange?: RandomRange;
}

export type lerpFunction<T> = (a: T, b: T, p: number) => T;
