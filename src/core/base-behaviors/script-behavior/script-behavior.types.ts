import {BaseBehaviorType} from '../base-behaviors.types';

export type ScriptTimeConfig<V> = {time: number; value: V}[];

export interface ScriptBehaviorConfig<V> {
  script: ScriptTimeConfig<V>;
  isInterpolate?: boolean;
}

export interface ScriptBehavior<V> {
  script: ScriptTimeConfig<V>;
  lastValueIndex: number;
  isInterpolate: boolean;
  type: BaseBehaviorType.Script;
}
