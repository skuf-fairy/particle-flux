import {AnyBaseBehaviorConfig} from '../base-behaviors.types';
import {ScriptBehaviorConfig} from './script-behavior.types';

export function isScriptBehaviorConfig<T>(config: AnyBaseBehaviorConfig): config is ScriptBehaviorConfig<T> {
  return 'script' in config;
}
