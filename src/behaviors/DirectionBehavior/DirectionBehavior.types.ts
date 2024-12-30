export interface DirectionRangeBehaviorConfig {
  minAngle: number;
  maxAngle: number;
}

export interface StaticDirectionBehaviorConfig {
  angle: number;
}

export type DirectionBehaviorConfig = DirectionRangeBehaviorConfig | StaticDirectionBehaviorConfig;

export function isStaticDirectionBehaviorConfig(
  config: DirectionBehaviorConfig,
): config is StaticDirectionBehaviorConfig {
  return 'angle' in config;
}
