import {END_SCRIPT_TIME, START_SCRIPT_TIME} from '../script-behavior.constants';
import {Point2d} from '../../../../types';
import {ArrayUtils} from '../../../../utils/ArrayUtils';
import {NumberUtils} from '../../../../utils/NumberUtils';
import {getProgressBetweenScriptItems} from '../script-behavior';
import {Point2dScriptBehavior, Point2dScriptBehaviorConfig} from './point2d-script-behavior.types';
import {BaseBehaviorType} from '../../base-behaviors.types';
import {getMultiplierValue} from '../../../../utils/getMultiplierValue';

// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerp;
// eslint-disable-next-line @typescript-eslint/unbound-method
const last = ArrayUtils.last;
// eslint-disable-next-line @typescript-eslint/unbound-method
const first = ArrayUtils.first;

const cachePoint2d: Point2d = {x: 0, y: 0};

export function getPoint2dScriptBehavior(config: Point2dScriptBehaviorConfig): Point2dScriptBehavior {
  if (config.script.length === 0) {
    throw new Error('Скрипт должен содержать хотя бы 1 элемент');
  }

  if (config.script.some((item) => item.time < START_SCRIPT_TIME || item.time > END_SCRIPT_TIME)) {
    throw new Error('Значения времени в скрипте должны быть от 0 до 100');
  }

  const first = ArrayUtils.first(config.script);

  if (first!.time !== START_SCRIPT_TIME) {
    config.script.push({time: START_SCRIPT_TIME, value: first!.value});
  }

  const last = ArrayUtils.last(config.script);
  if (last!.time !== END_SCRIPT_TIME) {
    config.script.push({time: END_SCRIPT_TIME, value: last!.value});
  }

  return {
    script: config.script.sort((a, b) => a.time - b.time),
    lastValueIndex: 1,
    isInterpolate: config.isInterpolate === undefined || config.isInterpolate === true,
    multiplierX: getMultiplierValue(config.multiplierX || 1),
    multiplierY: getMultiplierValue(config.multiplierY || 1),
    type: BaseBehaviorType.Script,
  };
}

export function getPoint2dScriptBehaviorValue(
  behavior: Point2dScriptBehavior,
  lifeTimeNormalizedProgress: number,
): Point2d {
  const script = behavior.script;

  const progress = lifeTimeNormalizedProgress * END_SCRIPT_TIME;

  const multiplierX = behavior.multiplierX;
  const multiplierY = behavior.multiplierY;

  if (progress === START_SCRIPT_TIME) {
    cachePoint2d.x = first(script)!.value.x * multiplierX;
    cachePoint2d.y = first(script)!.value.y * multiplierY;

    return cachePoint2d;
  }
  if (progress === END_SCRIPT_TIME) {
    cachePoint2d.x = last(script)!.value.x * multiplierX;
    cachePoint2d.y = last(script)!.value.y * multiplierY;

    return cachePoint2d;
  }

  for (let i = behavior.lastValueIndex; i < script.length; i++) {
    if (progress >= script[i - 1].time && progress < script[i].time) {
      behavior.lastValueIndex = i;

      if (behavior.isInterpolate) {
        cachePoint2d.x =
          lerp(
            script[i - 1].value.x,
            script[i].value.x,
            getProgressBetweenScriptItems(progress, script[i - 1].time, script[i].time),
          ) * multiplierX;
        cachePoint2d.y =
          lerp(
            script[i - 1].value.y,
            script[i].value.y,
            getProgressBetweenScriptItems(progress, script[i - 1].time, script[i].time),
          ) * multiplierY;

        return cachePoint2d;
      }

      cachePoint2d.x = script[i - 1].value.x * multiplierX;
      cachePoint2d.y = script[i - 1].value.y * multiplierY;

      return cachePoint2d;
    }
  }

  cachePoint2d.x = last(script)!.value.x * multiplierX;
  cachePoint2d.y = last(script)!.value.y * multiplierY;

  return cachePoint2d;
}
