import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';
import {ScalarBehavior, ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig} from './ScalarBehavior.types';
import {BaseBehaviorType} from '../base-behaviors.types';
import {getMultiplierValue} from '../../../utils/multiplier';

// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerp;

export function getScalarBehavior(config: ScalarDynamicBehaviorConfig): ScalarBehavior {
  return {
    startValue: config.start * getMultiplierValue(config.multiplier || 1),
    endValue: config.end * getMultiplierValue(config.multiplier || 1),
    easing: config.easing ? EASING_FUNCTIONS[config.easing] : null,
    type: BaseBehaviorType.Scalar,
  };
}

export function getStaticBehaviorValue(config: ScalarStaticBehaviorConfig): number {
  return config.value * getMultiplierValue(config.multiplier || 1);
}

export function getScalarBehaviorValue(behavior: ScalarBehavior, lifeTimeNormalizedProgress: number): number {
  return behavior.easing !== null
    ? lerp(behavior.startValue, behavior.endValue, behavior.easing(lifeTimeNormalizedProgress))
    : lerp(behavior.startValue, behavior.endValue, lifeTimeNormalizedProgress);
}
