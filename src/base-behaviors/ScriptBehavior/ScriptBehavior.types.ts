export type TimeScriptConfig<V> = {time: number; value: V}[];

export interface ScriptBehaviorConfig<V> {
  script: TimeScriptConfig<V>;
}
