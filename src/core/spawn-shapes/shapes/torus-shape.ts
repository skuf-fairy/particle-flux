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
  const radians = NumberUtils.degreesToRadians(realRandom.generateFloatNumber(startAngle, endAngle));

  const [minRadius, maxRadius] = NumberUtils.getOrderedMinMax(innerRadius, outerRadius);

  // Generating a random radius value ranging from the inner to the outer radius
  const r = Math.sqrt(Math.random() * (maxRadius * maxRadius - minRadius * minRadius) + minRadius * minRadius);

  // Calculating the coordinates of a point
  const pointX = x + r * Math.cos(radians);
  const pointY = y + r * Math.sin(radians);

  return {x: pointX, y: pointY};
};

export function getSpawnPositionOfTorus(config: SpawnTorusShape): Point2d {
  return getRandomPointFromTorus(
    config.x,
    config.y,
    config.innerRadius || 0,
    config.outerRadius,
    config.startAngle || 0,
    config.endAngle || 360,
  );
}
