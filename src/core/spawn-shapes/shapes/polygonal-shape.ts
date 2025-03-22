import {Chain, PolygonalChainShape} from '../spawn-shapes.types';
import {Point2d} from '../../../types';
import {realRandom} from '../../../utils/random/RealRandom';
import {isSinglePolygonalChain} from '../spawn-shapes.typeguards';

const getRandomPointOnLine = (pointA: Point2d, pointB: Point2d): Point2d => {
  const randomFactor = Math.random(); // Generating a random number from 0 to 1

  // Calculating the coordinates of a random point between point and pointB
  const x = pointA.x + randomFactor * (pointB.x - pointA.x);
  const y = pointA.y + randomFactor * (pointB.y - pointA.y);

  return {x, y};
};

const getRandomPointOnChain = (chain: Chain): Point2d => {
  if (chain.length === 1) {
    return {x: chain[0].x, y: chain[0].y};
  } else if (chain.length > 1) {
    const endPointIndex = realRandom.generateIntegerNumber(1, chain.length - 1);
    const endPoint = {x: chain[endPointIndex].x, y: chain[endPointIndex].y};
    const startPoint = {x: chain[endPointIndex - 1].x, y: chain[endPointIndex - 1].y};

    return getRandomPointOnLine(startPoint, endPoint);
  } else {
    return {x: 0, y: 0};
  }
};

export function getSpawnPositionOfPolygonalShape(config: PolygonalChainShape): Point2d {
  const chain = config.chain;

  if (chain.length > 0) {
    if (isSinglePolygonalChain(chain)) {
      return getRandomPointOnChain(chain);
    } else {
      return getRandomPointOnChain(realRandom.choice(chain));
    }
  } else {
    return {x: 0, y: 0};
  }
}
