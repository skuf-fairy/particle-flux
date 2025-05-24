import {Point2d} from '../../types';

export interface SpawnParticleDirection {
  vector: Point2d;
  angle: number;
}

export interface RangeDirectionConfig {
  minAngle: number;
  maxAngle: number;
  isRotateByDirection?: boolean;
}

export interface StaticDirectionConfig {
  angle: number;
  isRotateByDirection?: boolean;
}

export interface SpawnBurstDirectionConfig {
  start: number;
  spacing: number;
  isRotateByDirection?: boolean;
}

export type DirectionConfig = RangeDirectionConfig | StaticDirectionConfig | SpawnBurstDirectionConfig;
