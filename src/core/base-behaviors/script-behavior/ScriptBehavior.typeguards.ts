import {AnyBehaviorConfig} from '../base-behaviors.types';
import {ScriptBehaviorConfig} from './ScriptBehavior.types';

export function isScriptBehaviorConfig(config: AnyBehaviorConfig): config is ScriptBehaviorConfig<any> {
  return 'script' in config;
}
