import {Point2d} from '../../types';

export enum SpawnShapeType {
  Point = 'Point',
  Rectangle = 'Rectangle',
  Torus = 'Torus',
  Polygon = 'Polygon',
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

export type PolygonalChain = Chain | Chain[];

export interface PolygonalChainShape {
  type: SpawnShapeType.Polygon;
  chain: PolygonalChain;
}

export type SpawnShapeBehavior = SpawnRectangleShape | SpawnTorusShape | SpawnPointShape | PolygonalChainShape;
