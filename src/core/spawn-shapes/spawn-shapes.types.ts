import {Point2d} from '../../types';

export enum SpawnShapeType {
  Point = 'Point',
  Rectangle = 'Rectangle',
  Torus = 'Torus',
  Chain = 'Chain',
}

export interface SpawnRectangleShape extends Point2d {
  type: SpawnShapeType.Rectangle;
  width: number;
  height: number;
}

export interface SpawnTorusShape extends Point2d {
  type: SpawnShapeType.Torus;
  outerRadius: number;
  innerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}

export interface SpawnPointShape extends Point2d {
  type: SpawnShapeType.Point;
}

export type Chain = Point2d[];

export interface SpawnChainShape {
  type: SpawnShapeType.Chain;
  chain: Chain;
}

export type SpawnShape = SpawnRectangleShape | SpawnTorusShape | SpawnPointShape | SpawnChainShape;

export interface SpawnShapeBehavior {
  shape: SpawnShape | SpawnShape[];
  isGroupWave?: boolean;
}
