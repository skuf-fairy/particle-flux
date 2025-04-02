import {BehaviorStateType} from '../base-behaviors.types';

export type TimeScriptConfig<V> = {time: number; value: V}[];

export interface ScriptBehaviorConfig<V> {
  script: TimeScriptConfig<V>;
}

export interface ScriptBehaviorState<V> {
  script: TimeScriptConfig<V>;
  type: BehaviorStateType.Script;
}
