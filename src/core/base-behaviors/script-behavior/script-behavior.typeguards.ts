import {AnyBaseBehaviorConfig} from '../base-behaviors.types';
import {ScriptBehaviorConfig} from './script-behavior.types';

export function isScriptBehaviorConfig<V>(config: AnyBaseBehaviorConfig): config is ScriptBehaviorConfig<V> {
  return 'script' in config;
}
