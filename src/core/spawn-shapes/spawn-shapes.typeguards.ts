import {SpawnRectangleShape, SpawnPointShape, SpawnTorusShape, SpawnChainShape, SpawnShape} from './spawn-shapes.types';

export function isSpawnPointShape(spawnShape: SpawnShape): spawnShape is SpawnPointShape {
  return spawnShape.type === 'Point';
}

export function isSpawnRectangleShape(spawnShape: SpawnShape): spawnShape is SpawnRectangleShape {
  return spawnShape.type === 'Rectangle';
}

export function isSpawnTorusShape(spawnShape: SpawnShape): spawnShape is SpawnTorusShape {
  return spawnShape.type === 'Torus';
}

export function isSpawnPolygonalShape(spawnShape: SpawnShape): spawnShape is SpawnChainShape {
  return spawnShape.type === 'Chain';
}
