import {DeltaBehaviorConfig} from './DeltaBehavior.types';

export function isDeltaBehaviorConfig(config: any): config is DeltaBehaviorConfig {
  return 'delta' in config;
}
