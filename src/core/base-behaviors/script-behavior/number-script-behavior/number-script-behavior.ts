import {END_SCRIPT_TIME, START_SCRIPT_TIME} from '../script-behavior.constants';
import {ArrayUtils} from '../../../../utils/ArrayUtils';
import {NumberUtils} from '../../../../utils/NumberUtils';
import {getProgressBetweenScriptItems} from '../script-behavior';
import {NumberScriptBehavior, NumberScriptBehaviorConfig} from './number-script-behavior.types';
import {BaseBehaviorType} from '../../base-behaviors.types';
import {getMultiplierValue} from '../../../../utils/getMultiplierValue';

// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerp;
// eslint-disable-next-line @typescript-eslint/unbound-method
const last = ArrayUtils.last;
// eslint-disable-next-line @typescript-eslint/unbound-method
const first = ArrayUtils.first;

export function getNumberScriptBehavior(config: NumberScriptBehaviorConfig): NumberScriptBehavior {
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
    multiplier: getMultiplierValue(config.multiplier || 1),
    type: BaseBehaviorType.Script,
  };
}

export function getNumberScriptBehaviorValue(
  behavior: NumberScriptBehavior,
  lifeTimeNormalizedProgress: number,
): number {
  const script = behavior.script;

  const progress = lifeTimeNormalizedProgress * END_SCRIPT_TIME;
  const multiplier = behavior.multiplier;

  if (progress === START_SCRIPT_TIME) return first(script)!.value * multiplier;
  if (progress === END_SCRIPT_TIME) return last(script)!.value * multiplier;

  for (let i = behavior.lastValueIndex; i < script.length; i++) {
    if (progress >= script[i - 1].time && progress < script[i].time) {
      behavior.lastValueIndex = i;

      if (behavior.isInterpolate) {
        return (
          lerp(
            script[i - 1].value,
            script[i].value,
            getProgressBetweenScriptItems(progress, script[i - 1].time, script[i].time),
          ) * multiplier
        );
      }

      return script[i - 1].value * multiplier;
    }
  }

  // the check was on initialization, but here we skip
  return last(script)!.value * multiplier;
}
