import {ColorDynamicBehaviorConfig} from '../ColorBehavior.types';
import {NumberUtils} from '../../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../../utils/easing/easing-functions';
import {EasingName} from '../../../../utils/easing/easing.types';
import {UpdateFunction} from '../../../../types';

export function getColorDynamicBehavior(config: ColorDynamicBehaviorConfig): UpdateFunction<string> {
  const startColor = config.start;
  const endColor = config.end;
  const easing = EASING_FUNCTIONS[config.easing || EasingName.linear];

  return (lifeTimeNormalizedProgress: number) =>
    NumberUtils.lerpColor(startColor, endColor, easing(lifeTimeNormalizedProgress));
}
