export interface LifeTimeRangeBehaviorConfig {
  min: number;
  max: number;
}

export interface LifeTimeStaticBehaviorConfig {
  value: number;
}

export type LifeTimeBehaviorConfig = LifeTimeRangeBehaviorConfig | LifeTimeStaticBehaviorConfig;

export function isLifeTimeStaticBehaviorConfig(config: LifeTimeBehaviorConfig): config is LifeTimeStaticBehaviorConfig {
  return 'value' in config;
}
