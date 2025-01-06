import {LifeTimeBehaviorConfig, LifeTimeStaticBehaviorConfig} from './LifeTimeBehavior.types';

export function isLifeTimeStaticBehaviorConfig(config: LifeTimeBehaviorConfig): config is LifeTimeStaticBehaviorConfig {
  return 'value' in config;
}
