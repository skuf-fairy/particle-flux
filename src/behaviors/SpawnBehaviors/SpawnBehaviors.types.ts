import type {Point2d} from '../../types';

export enum SpawnShapeType {
  Point = 'Point',
  Rectangle = 'Rectangle',
  Circle = 'Circle',
  Polygon = 'Polygon',
}

export interface SpawnRectangleShape extends Point2d {
  type: SpawnShapeType.Rectangle;
  width: number;
  height: number;
}

export interface SpawnCircleShape extends Point2d {
  type: SpawnShapeType.Circle;
  radius: number;
}

export interface SpawnPointShape extends Point2d {
  type: SpawnShapeType.Point;
}

export type Chain = Point2d[];

export interface PolygonalChainShape {
  type: SpawnShapeType.Polygon;
  chain: Chain | Chain[];
}

export type SpawnShape = SpawnRectangleShape | SpawnCircleShape | SpawnPointShape | PolygonalChainShape;
