export interface LifeTimeRangeBehaviorConfig {
  min: number;
  max: number;
}

export interface LifeTimeStaticBehaviorConfig {
  value: number;
}

export type LifeTimeBehaviorConfig = LifeTimeRangeBehaviorConfig | LifeTimeStaticBehaviorConfig;
