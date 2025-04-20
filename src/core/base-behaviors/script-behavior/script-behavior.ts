import {ScriptBehaviorConfig, ScriptBehavior} from './script-behavior.types';
import {ArrayUtils} from '../../../utils/ArrayUtils';
import {NumberUtils} from '../../../utils/NumberUtils';
import {BaseBehaviorType} from '../base-behaviors.types';

export function getScriptBehavior<V>(config: ScriptBehaviorConfig<V>): ScriptBehavior<V> {
  if (config.script.length === 0) {
    throw new Error('Script config must contain at least 1 item');
  }

  return {
    script: config.script.slice().sort((a, b) => a.time - b.time),
    lastValueIndex: 1,
    type: BaseBehaviorType.Script,
  };
}

export function getScriptBehaviorValue<V>(behavior: ScriptBehavior<V>, lifeTimeNormalizedProgress: number): V {
  const script = behavior.script;

  if (lifeTimeNormalizedProgress === 0) return script[0].value;
  if (lifeTimeNormalizedProgress === 1) return ArrayUtils.last(script)!.value;

  for (let i = behavior.lastValueIndex; i < script.length; i++) {
    if (lifeTimeNormalizedProgress >= script[i - 1].time && lifeTimeNormalizedProgress < script[i].time) {
      behavior.lastValueIndex = i;
      return script[i - 1].value;
    }
  }

  // the check was on initialization, but here we skip
  return ArrayUtils.last(script)!.value;
}
