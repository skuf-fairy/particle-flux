import {AnyBehaviorConfig} from '../base-behaviors.types';
import {DeltaBehaviorConfig} from './DeltaBehavior.types';

export function isDeltaBehaviorConfig(config: AnyBehaviorConfig): config is DeltaBehaviorConfig {
  return 'delta' in config;
}
