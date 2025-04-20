import {isScriptBehavior} from '../../../base-behaviors/base-behaviors.typeguards';
import {AnyBaseBehaviorConfig, AnyBaseBehavior} from '../../../base-behaviors/base-behaviors.types';
import {Point2dScriptBehavior} from '../../../base-behaviors/script-behavior/point2d-script-behavior/point2d-script-behavior.types';
import {isScriptBehaviorConfig} from '../../../base-behaviors/script-behavior/script-behavior.typeguards';

export function isColorScriptBehaviorConfig(config: AnyBaseBehaviorConfig): config is Point2dScriptBehavior {
  return isScriptBehaviorConfig<any>(config) && typeof config.script[0].value === 'string';
}

export function isColorScriptBehavior(behavior: AnyBaseBehavior): behavior is Point2dScriptBehavior {
  return isScriptBehavior<any>(behavior) && typeof behavior.script[0].value === 'string';
}
