import {BaseBehaviorType} from '../base-behaviors.types';

export type TimeScriptConfig<V> = {time: number; value: V}[];

export interface ScriptBehaviorConfig<V> {
  script: TimeScriptConfig<V>;
}

export interface ScriptBehavior<V> {
  script: TimeScriptConfig<V>;
  type: BaseBehaviorType.Script;
}
