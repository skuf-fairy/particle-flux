import {
  PolygonalChain,
  Chain,
  SpawnShapeBehavior,
  SpawnShapeType,
  SpawnRectangleShape,
  SpawnPointShape,
  SpawnTorusShape,
  PolygonalChainShape,
} from './spawn-shapes.types';

export function isSinglePolygonalChain(chain: PolygonalChain): chain is Chain {
  return !Array.isArray(chain[0]);
}

export function isSpawnPointShape(shape: SpawnShapeBehavior): shape is SpawnPointShape {
  return shape.type === SpawnShapeType.Point;
}

export function isSpawnRectangleShape(shape: SpawnShapeBehavior): shape is SpawnRectangleShape {
  return shape.type === SpawnShapeType.Rectangle;
}

export function isTorusShape(shape: SpawnShapeBehavior): shape is SpawnTorusShape {
  return shape.type === SpawnShapeType.Torus;
}

export function isPolygonalShape(shape: SpawnShapeBehavior): shape is PolygonalChainShape {
  return shape.type === SpawnShapeType.Polygon;
}
