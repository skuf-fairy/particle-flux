export interface GravityRangeBehaviorConfig {
  min: number;
  max: number;
}

export interface GravityStaticBehaviorConfig {
  value: number;
}

export type GravityBehaviorConfig = GravityStaticBehaviorConfig | GravityRangeBehaviorConfig;

export function isGravityStaticBehaviorConfig(config: GravityBehaviorConfig): config is GravityStaticBehaviorConfig {
  return 'value' in config;
}
