import {SpawnTorusShape} from '../spawn-shapes.types';
import {Point2d} from '../../../types';
import {realRandom} from '../../../utils/random/RealRandom';
import {NumberUtils} from '../../../utils/NumberUtils';

const getRandomPointFromTorus = (
  x: number,
  y: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): Point2d => {
  // Generating a random angle in radians
  const angle = realRandom.generateFloatNumber(startAngle, endAngle);

  // Generating a random radius value ranging from the inner to the outer radius
  const r = realRandom.generateFloatNumber(innerRadius, outerRadius);

  // Calculating the coordinates of a point
  const pointX = x + r * Math.cos(angle);
  const pointY = y + r * Math.sin(angle);

  return {x: pointX, y: pointY};
};

export function getSpawnPositionOfTorus(config: SpawnTorusShape): Point2d {
  return getRandomPointFromTorus(
    config.x,
    config.y,
    config.innerRadius || 0,
    config.outerRadius,
    NumberUtils.degreesToRadians(config.startAngle || 0),
    NumberUtils.degreesToRadians(config.endAngle || 360),
  );
}
