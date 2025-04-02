import {ScriptBehaviorConfig, TimeScriptConfig} from './ScriptBehavior.types';
import {ArrayUtils} from '../../../utils/ArrayUtils';
import {NumberUtils} from '../../../utils/NumberUtils';
import {UpdateFunction} from '../../../types';

function getCurrentScriptItem<V>(script: TimeScriptConfig<V>, time: number): V {
  for (let i = 1; i < script.length; i++) {
    if (NumberUtils.inRange(script[i - 1].time, script[i].time, time)) {
      return script[i - 1].value;
    }
  }

  // the check was on initialization, but here we skip
  return ArrayUtils.last(script)!.value;
}

export function getScriptBehavior<V>(config: ScriptBehaviorConfig<V>): UpdateFunction<V> {
  if (config.script.length === 0) {
    throw new Error('Script config must contain at least 1 item');
  }

  const script: TimeScriptConfig<V> = config.script.slice().sort((a, b) => a.time - b.time);

  return (lifeTimeNormalizedProgress: number): V => getCurrentScriptItem<V>(script, lifeTimeNormalizedProgress);
}
