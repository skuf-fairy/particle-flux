import {
  PolygonalChain,
  Chain,
  SpawnShapeType,
  SpawnRectangleShape,
  SpawnPointShape,
  SpawnTorusShape,
  PolygonalChainShape,
  SpawnShape,
} from './spawn-shapes.types';

export function isSinglePolygonalChain(chain: PolygonalChain): chain is Chain {
  return !Array.isArray(chain[0]);
}

export function isSpawnPointShape(spawnShape: SpawnShape): spawnShape is SpawnPointShape {
  return spawnShape.type === SpawnShapeType.Point;
}

export function isSpawnRectangleShape(spawnShape: SpawnShape): spawnShape is SpawnRectangleShape {
  return spawnShape.type === SpawnShapeType.Rectangle;
}

export function isTorusShape(spawnShape: SpawnShape): spawnShape is SpawnTorusShape {
  return spawnShape.type === SpawnShapeType.Torus;
}

export function isPolygonalShape(spawnShape: SpawnShape): spawnShape is PolygonalChainShape {
  return spawnShape.type === SpawnShapeType.Polygon;
}
