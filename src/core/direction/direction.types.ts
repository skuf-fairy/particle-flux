export interface DirectionRangeConfig {
  minAngle: number;
  maxAngle: number;
  isFollow?: boolean;
}

export interface StaticDirectionConfig {
  angle: number;
  isFollow?: boolean;
}

export type DirectionConfig = DirectionRangeConfig | StaticDirectionConfig;
