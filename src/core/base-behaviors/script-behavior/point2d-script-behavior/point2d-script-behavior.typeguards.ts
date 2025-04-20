import {isScriptBehavior} from '../../base-behaviors.typeguards';
import {AnyBaseBehavior, AnyBaseBehaviorConfig} from '../../base-behaviors.types';
import {isScriptBehaviorConfig} from '../script-behavior.typeguards';
import {Point2dScriptBehavior} from './point2d-script-behavior.types';

export function isPoint2dScriptBehaviorConfig(config: AnyBaseBehaviorConfig): config is Point2dScriptBehavior {
  return (
    isScriptBehaviorConfig<any>(config) && 'x' in config.script[0].value && typeof config.script[0].value.x === 'number'
  );
}

export function isPoint2dScriptBehavior(behavior: AnyBaseBehavior): behavior is Point2dScriptBehavior {
  return (
    isScriptBehavior<any>(behavior) && 'x' in behavior.script[0].value && typeof behavior.script[0].value.x === 'number'
  );
}
