import {
  LifeTimeBehaviorConfig,
  LifeTimeStaticBehaviorConfig,
  LifeTimeRangeBehaviorConfig,
} from './LifeTimeBehavior.types';

export function isLifeTimeStaticBehaviorConfig(config: LifeTimeBehaviorConfig): config is LifeTimeStaticBehaviorConfig {
  return 'value' in config;
}

export function isLifeTimeRangeBehaviorConfig(config: LifeTimeBehaviorConfig): config is LifeTimeRangeBehaviorConfig {
  return 'min' in config && 'max' in config;
}
