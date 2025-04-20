import {isScriptBehavior} from '../../base-behaviors.typeguards';
import {AnyBaseBehavior, AnyBaseBehaviorConfig} from '../../base-behaviors.types';
import {isScriptBehaviorConfig} from '../script-behavior.typeguards';
import {NumberScriptBehavior, NumberScriptBehaviorConfig} from './number-script-behavior.types';

export function isNumberScriptBehaviorConfig(config: AnyBaseBehaviorConfig): config is NumberScriptBehaviorConfig {
  return isScriptBehaviorConfig(config) && typeof config.script[0].value === 'number';
}

export function isNumberScriptBehavior(behavior: AnyBaseBehavior): behavior is NumberScriptBehavior {
  return isScriptBehavior<any>(behavior) && typeof behavior.script[0].value === 'number';
}
