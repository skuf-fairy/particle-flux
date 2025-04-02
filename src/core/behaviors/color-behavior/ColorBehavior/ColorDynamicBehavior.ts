import {
  ColorBehaviorStateType,
  ColorDynamicBehaviorConfig,
  ColorDynamicBehaviorState,
  ColorStaticBehaviorConfig,
} from '../ColorBehavior.types';
import {NumberUtils} from '../../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../../utils/easing/easing-functions';
import {EasingName} from '../../../../utils/easing/easing.types';
import {isColorStaticBehaviorConfig} from '../ColorBehavior.typeguards';

export function getColorDynamicBehaviorState(
  config: ColorDynamicBehaviorConfig | ColorStaticBehaviorConfig,
): ColorDynamicBehaviorState {
  if (isColorStaticBehaviorConfig(config)) {
    return {
      startColor: config.value,
      endColor: config.value,
      easing: EASING_FUNCTIONS[EasingName.linear],
      type: ColorBehaviorStateType.Dynamic,
    };
  } else {
    return {
      startColor: config.start,
      endColor: config.end,
      easing: EASING_FUNCTIONS[EasingName.linear],
      type: ColorBehaviorStateType.Dynamic,
    };
  }
}

export function updateColorDynamicState(state: ColorDynamicBehaviorState, lifeTimeNormalizedProgress: number): string {
  return NumberUtils.lerpColor(state.startColor, state.endColor, state.easing(lifeTimeNormalizedProgress));
}
