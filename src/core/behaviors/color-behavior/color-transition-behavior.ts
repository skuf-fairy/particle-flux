import {
  ColorBehaviorType,
  ColorTransitionBehaviorConfig,
  ColorTransitionBehavior,
  ColorStaticBehaviorConfig,
} from './color-behavior.types';
import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';

// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerpColor;

export function getColorTransitionBehavior(config: ColorTransitionBehaviorConfig): ColorTransitionBehavior {
  return {
    startColor: config.start,
    endColor: config.end,
    easing: config.easing ? EASING_FUNCTIONS['linear'] : null,
    type: ColorBehaviorType.Transition,
  };
}

export function getColorStaticBehaviorValue(config: ColorStaticBehaviorConfig): string {
  return config.value;
}

export function getColorTransitionBehaviorValue(
  behavior: ColorTransitionBehavior,
  lifeTimeNormalizedProgress: number,
): string {
  return behavior.easing !== null
    ? lerp(behavior.startColor, behavior.endColor, behavior.easing(lifeTimeNormalizedProgress))
    : lerp(behavior.startColor, behavior.endColor, lifeTimeNormalizedProgress);
}
