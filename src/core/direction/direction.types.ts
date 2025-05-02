export interface RangeDirectionConfig {
  minAngle: number;
  maxAngle: number;
  isRotateByDirection?: boolean;
}

export interface StaticDirectionConfig {
  angle: number;
  isRotateByDirection?: boolean;
}

export type DirectionConfig = RangeDirectionConfig | StaticDirectionConfig;
