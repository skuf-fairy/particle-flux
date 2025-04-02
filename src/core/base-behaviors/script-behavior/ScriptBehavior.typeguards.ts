import {AnyBehaviorConfig} from '../base-behaviors.types';
import {ScriptBehaviorConfig} from './ScriptBehavior.types';

export function isScriptBehaviorConfig<T>(config: AnyBehaviorConfig): config is ScriptBehaviorConfig<T> {
  return 'script' in config;
}
