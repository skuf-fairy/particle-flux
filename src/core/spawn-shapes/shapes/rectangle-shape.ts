import {SpawnRectangleShape} from '../spawn-shapes.types';
import {realRandom} from '../../../utils/random/RealRandom';
import {Point2d} from '../../../types';

export function getSpawnPositionOfRectangle(config: SpawnRectangleShape): Point2d {
  return {
    x: realRandom.generateFloatNumber(config.x, config.x + config.width),
    y: realRandom.generateFloatNumber(config.y, config.y + config.height),
  };
}
