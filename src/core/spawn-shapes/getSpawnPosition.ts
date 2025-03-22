import {Vector2Utils} from '../../utils/Vector2Utils';
import {SpawnShapeBehavior, SpawnShapeType} from './spawn-shapes.types';
import {getSpawnPositionOfPolygonalShape} from './shapes/polygonal-shape';
import {Point2d} from '../../types';
import {getSpawnPositionOfRectangle} from './shapes/rectangle-shape';
import {getSpawnPositionOfTorus} from './shapes/torus-shape';

export function getSpawnPosition(spawnShape: SpawnShapeBehavior, relativePoint: Point2d = {x: 0, y: 0}): Point2d {
  switch (spawnShape.type) {
    case SpawnShapeType.Point:
      return Vector2Utils.add(relativePoint, spawnShape);

    case SpawnShapeType.Rectangle:
      return Vector2Utils.add(relativePoint, getSpawnPositionOfRectangle(spawnShape));

    case SpawnShapeType.Torus:
      return Vector2Utils.add(relativePoint, getSpawnPositionOfTorus(spawnShape));

    case SpawnShapeType.Polygon:
      return Vector2Utils.add(relativePoint, getSpawnPositionOfPolygonalShape(spawnShape));
  }
}
