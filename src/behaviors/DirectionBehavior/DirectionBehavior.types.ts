export interface DirectionRangeBehaviorConfig {
  minAngle: number;
  maxAngle: number;
}

export interface StaticDirectionBehaviorConfig {
  angle: number;
}

export type DirectionBehaviorConfig = DirectionRangeBehaviorConfig | StaticDirectionBehaviorConfig;
