import {ScriptBehavior, ScriptBehaviorConfig} from './script-behavior.types';
import {BaseBehaviorType} from '../base-behaviors.types';
import {ArrayUtils} from '../../../utils/ArrayUtils';
import {END_SCRIPT_TIME, START_SCRIPT_TIME} from '../../../constants';

export function getScriptBehavior<V>(config: ScriptBehaviorConfig<V>): ScriptBehavior<V> {
  if (config.script.length === 0) {
    throw new Error('Script config must contain at least 1 item');
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
    script: config.script
      .map((item) => ({value: item.value, time: item.time / END_SCRIPT_TIME}))
      .sort((a, b) => a.time - b.time),
    lastValueIndex: 1,
    isInterpolate: config.isInterpolate === undefined && config.isInterpolate === true,
    type: BaseBehaviorType.Script,
  };
}

export function getProgressBetweenScriptItems(
  lifeTimeNormalizedProgress: number,
  prevScriptItemTime: number,
  currentScriptItemTime: number,
) {
  const delta = currentScriptItemTime - prevScriptItemTime;
  return (lifeTimeNormalizedProgress - prevScriptItemTime) / (delta || 1);
}
