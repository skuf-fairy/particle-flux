export interface DirectionRangeConfig {
  minAngle: number;
  maxAngle: number;
}

export interface StaticDirectionConfig {
  angle: number;
}

export type DirectionConfig = DirectionRangeConfig | StaticDirectionConfig;
