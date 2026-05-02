import {getProgressBetweenScriptItems} from '../../../base-behaviors/script-behavior/script-behavior';
import {ArrayUtils} from '../../../../utils/ArrayUtils';
import {NumberUtils} from '../../../../utils/NumberUtils';
import {ColorScriptBehavior, ColorScriptBehaviorConfig} from './color-script-behavior.types';
import {END_SCRIPT_TIME, START_SCRIPT_TIME} from '../../../base-behaviors/script-behavior/script-behavior.constants';
import {BaseBehaviorType} from '../../../../core/base-behaviors/base-behaviors.types';

// статические методы
// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerpColor;
// eslint-disable-next-line @typescript-eslint/unbound-method
const last = ArrayUtils.last;
// eslint-disable-next-line @typescript-eslint/unbound-method
const first = ArrayUtils.first;

export function getColorScriptBehavior(config: ColorScriptBehaviorConfig): ColorScriptBehavior {
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
    type: BaseBehaviorType.Script,
  };
}

export function getColorScriptBehaviorValue(behavior: ColorScriptBehavior, lifeTimeNormalizedProgress: number): string {
  const script = behavior.script;

  const progress = lifeTimeNormalizedProgress * END_SCRIPT_TIME;

  if (progress === START_SCRIPT_TIME) return first(script)!.value;
  if (progress === END_SCRIPT_TIME) return last(script)!.value;

  for (let i = behavior.lastValueIndex; i < script.length; i++) {
    if (progress >= script[i - 1].time && progress < script[i].time) {
      behavior.lastValueIndex = i;

      if (behavior.isInterpolate) {
        return lerp(
          script[i - 1].value,
          script[i].value,
          getProgressBetweenScriptItems(progress, script[i - 1].time, script[i].time),
        );
      }

      return script[i - 1].value;
    }
  }

  return last(script)!.value;
}
