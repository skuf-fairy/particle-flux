import {AnyBaseBehaviorConfig} from '../base-behaviors.types';
import {DeltaBehaviorConfig} from './delta-behavior.types';

export function isDeltaBehaviorConfig(config: AnyBaseBehaviorConfig): config is DeltaBehaviorConfig {
  return 'delta' in config;
}
