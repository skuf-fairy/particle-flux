import {ScriptBehavior, ScriptBehaviorConfig} from './script-behavior.types';
import {BaseBehaviorType} from '../base-behaviors.types';

export function getScriptBehavior<V>(config: ScriptBehaviorConfig<V>): ScriptBehavior<V> {
  if (config.script.length === 0) {
    throw new Error('Script config must contain at least 1 item');
  }

  if (config.script.some((item) => item.time < 0 || item.time > 1)) {
    throw new Error('Значения времени в скрипте должны быть от 0 до 1');
  }

  return {
    script: config.script.slice().sort((a, b) => a.time - b.time),
    lastValueIndex: 1,
    isInterpolate: config.isInterpolate === true,
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
