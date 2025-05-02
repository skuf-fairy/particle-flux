import {START_SCRIPT_TIME, END_SCRIPT_TIME} from '../../../../constants';
import {Point2d} from '../../../../types';
import {ArrayUtils} from '../../../../utils/ArrayUtils';
import {NumberUtils} from '../../../../utils/NumberUtils';
import {getProgressBetweenScriptItems} from '../script-behavior';
import {Point2dScriptBehavior} from './point2d-script-behavior.types';

// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerp;
// eslint-disable-next-line @typescript-eslint/unbound-method
const last = ArrayUtils.last;
// eslint-disable-next-line @typescript-eslint/unbound-method
const first = ArrayUtils.first;

const cachePoint2d: Point2d = {x: 0, y: 0};

export function getPoint2dScriptBehaviorValue(
  behavior: Point2dScriptBehavior,
  lifeTimeNormalizedProgress: number,
): Point2d {
  const script = behavior.script;

  if (lifeTimeNormalizedProgress === START_SCRIPT_TIME) return first(script)!.value;
  if (lifeTimeNormalizedProgress === END_SCRIPT_TIME) return last(script)!.value;

  for (let i = behavior.lastValueIndex; i < script.length; i++) {
    if (lifeTimeNormalizedProgress >= script[i - 1].time && lifeTimeNormalizedProgress < script[i].time) {
      behavior.lastValueIndex = i;

      if (behavior.isInterpolate) {
        cachePoint2d.x = lerp(
          script[i - 1].value.x,
          script[i].value.x,
          getProgressBetweenScriptItems(lifeTimeNormalizedProgress, script[i - 1].time, script[i].time),
        );
        cachePoint2d.y = lerp(
          script[i - 1].value.y,
          script[i].value.y,
          getProgressBetweenScriptItems(lifeTimeNormalizedProgress, script[i - 1].time, script[i].time),
        );

        return cachePoint2d;
      }

      return script[i - 1].value;
    }
  }

  // the check was on initialization, but here we skip
  return last(script)!.value;
}
