import {getProgressBetweenScriptItems} from '../../../base-behaviors/script-behavior/script-behavior';
import {ArrayUtils} from '../../../../utils/ArrayUtils';
import {NumberUtils} from '../../../../utils/NumberUtils';
import {ColorScriptBehavior} from './color-script-behavior.types';

// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerpColor;
// eslint-disable-next-line @typescript-eslint/unbound-method
const last = ArrayUtils.last;

export function getColorScriptBehaviorValue(behavior: ColorScriptBehavior, lifeTimeNormalizedProgress: number): string {
  const script = behavior.script;

  if (lifeTimeNormalizedProgress === 0) return script[0].value;
  if (lifeTimeNormalizedProgress === 1) return last(script)!.value;

  for (let i = behavior.lastValueIndex; i < script.length; i++) {
    if (lifeTimeNormalizedProgress >= script[i - 1].time && lifeTimeNormalizedProgress < script[i].time) {
      behavior.lastValueIndex = i;

      if (behavior.isInterpolate) {
        return lerp(
          script[i - 1].value,
          script[i].value,
          getProgressBetweenScriptItems(lifeTimeNormalizedProgress, script[i - 1].time, script[i].time),
        );
      }

      return script[i - 1].value;
    }
  }

  // the check was on initialization, but here we skip
  return last(script)!.value;
}
