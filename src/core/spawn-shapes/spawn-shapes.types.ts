import {Point2d} from '../../types';

export type SpawnShapeType = 'Point' | 'Rectangle' | 'Torus' | 'Chain';

export interface SpawnRectangleShape extends Point2d {
  type: 'Rectangle';
  width: number;
  height: number;
}

export interface SpawnTorusShape extends Point2d {
  type: 'Torus';
  outerRadius: number;
  innerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}

export interface SpawnPointShape extends Point2d {
  type: 'Point';
}

export type Chain = Point2d[];

export interface SpawnChainShape {
  type: 'Chain';
  chain: Chain;
}

export type SpawnShape = SpawnRectangleShape | SpawnTorusShape | SpawnPointShape | SpawnChainShape;

export interface SpawnShapeBehavior {
  shape: SpawnShape | SpawnShape[];
  isGroupWave?: boolean;
}
