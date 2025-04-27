import {
  SpawnShapeType,
  SpawnRectangleShape,
  SpawnPointShape,
  SpawnTorusShape,
  SpawnChainShape,
  SpawnShape,
} from './spawn-shapes.types';

export function isSpawnPointShape(spawnShape: SpawnShape): spawnShape is SpawnPointShape {
  return spawnShape.type === SpawnShapeType.Point;
}

export function isSpawnRectangleShape(spawnShape: SpawnShape): spawnShape is SpawnRectangleShape {
  return spawnShape.type === SpawnShapeType.Rectangle;
}

export function isSpawnTorusShape(spawnShape: SpawnShape): spawnShape is SpawnTorusShape {
  return spawnShape.type === SpawnShapeType.Torus;
}

export function isSpawnPolygonalShape(spawnShape: SpawnShape): spawnShape is SpawnChainShape {
  return spawnShape.type === SpawnShapeType.Chain;
}
