import {ScriptBehaviorConfig, ScriptBehaviorState, TimeScriptConfig} from './ScriptBehavior.types';
import {ArrayUtils} from '../../../utils/ArrayUtils';
import {NumberUtils} from '../../../utils/NumberUtils';
import {BehaviorStateType} from '../base-behaviors.types';

function getCurrentScriptItem<V>(script: TimeScriptConfig<V>, time: number): V {
  for (let i = 1; i < script.length; i++) {
    if (NumberUtils.inRange(script[i - 1].time, script[i].time, time)) {
      return script[i - 1].value;
    }
  }

  // the check was on initialization, but here we skip
  return ArrayUtils.last(script)!.value;
}

export function getScriptBehaviorState<V>(config: ScriptBehaviorConfig<V>): ScriptBehaviorState<V> {
  if (config.script.length === 0) {
    throw new Error('Script config must contain at least 1 item');
  }

  return {script: config.script.slice().sort((a, b) => a.time - b.time), type: BehaviorStateType.Script};
}

export function getScriptBehaviorValue<V>(state: ScriptBehaviorState<V>, lifeTimeNormalizedProgress: number): V {
  return getCurrentScriptItem<V>(state.script, lifeTimeNormalizedProgress);
}
