import {DeltaBehaviorConfig, DeltaBehavior} from './DeltaBehavior.types';
import {BaseBehaviorType} from '../base-behaviors.types';
import {getMultiplierValue} from '../../../utils/multiplier';

export function getDeltaBehavior(config: DeltaBehaviorConfig): DeltaBehavior {
  return {
    value: config.value * getMultiplierValue(config.multiplier || 1),
    delta: config.delta,
    type: BaseBehaviorType.Delta,
  };
}

export function getDeltaBehaviorValue(behavior: DeltaBehavior, elapsedDelta: number): number {
  return behavior.value + behavior.delta * elapsedDelta;
}
