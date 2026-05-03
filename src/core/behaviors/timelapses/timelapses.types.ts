import {RandomRange} from '../../../types';

export type TimelapsesArray<V> = {time: number; value: V}[];

export interface TimelapsesConfig<V> {
  timelapses: TimelapsesArray<V>;
}

export interface TimelapsesBehavior<V> {
  timelapses: TimelapsesArray<V>;
  index: number;
}

export interface NumberTimelapsesConfig extends TimelapsesConfig<number> {
  randomRange?: RandomRange;
}
