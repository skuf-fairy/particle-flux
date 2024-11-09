export interface DirectionRangeBehaviorConfig {
  minAngle: number;
  maxAngle: number;
}

export interface SingleDirectionBehaviorConfig {
  angle: number;
}

export type DirectionBehaviorConfig = DirectionRangeBehaviorConfig | SingleDirectionBehaviorConfig;

export function isSingleDirectionBehaviorConfig(
  config: DirectionBehaviorConfig,
): config is SingleDirectionBehaviorConfig {
  return 'angle' in config;
}
