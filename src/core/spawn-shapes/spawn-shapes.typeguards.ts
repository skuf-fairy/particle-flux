import {
  PolygonalChain,
  Chain,
  SpawnShapeType,
  SpawnRectangleShape,
  SpawnPointShape,
  SpawnTorusShape,
  SpawnPolygonalChainShape,
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

export function isSpawnTorusShape(spawnShape: SpawnShape): spawnShape is SpawnTorusShape {
  return spawnShape.type === SpawnShapeType.Torus;
}

export function isSpawnPolygonalShape(spawnShape: SpawnShape): spawnShape is SpawnPolygonalChainShape {
  return spawnShape.type === SpawnShapeType.Polygon;
}
