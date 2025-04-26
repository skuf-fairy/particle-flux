import {SpawnTorusShape} from '../spawn-shapes.types';
import {Point2d} from '../../../types';
import {realRandom} from '../../../utils/random/RealRandom';
import {NumberUtils} from '../../../utils/NumberUtils';

const getRandomPointFromTorus = (
  x: number,
  y: number,
  // расстояние от центра до центра трубки
  innerRadius: number,
  // радиус трубки
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): Point2d => {
  const theta = NumberUtils.degreesToRadians(realRandom.generateFloatNumber(startAngle, endAngle));
  const phi = Math.random() * Math.PI * 2;

  // Calculating the coordinates of a point
  const pointX = x + (innerRadius + outerRadius * Math.cos(phi)) * Math.cos(theta);
  const pointY = y + (innerRadius + outerRadius * Math.cos(phi)) * Math.sin(theta);

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
