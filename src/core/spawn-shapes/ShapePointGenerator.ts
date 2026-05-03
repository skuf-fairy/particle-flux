import {Random, realRandom} from '../../utils/random/Random';
import {Point2d} from '../../types';
import {SpawnChainShape, SpawnRectangleShape, SpawnShape} from './spawn-shapes.types';
import {PseudoRandomGenerator} from '../../utils/random/generators/PseudoRandomGenerator';
import {degreesToRadians} from '../../utils/rotation/degreesToRadians';
import {getOrderedMinMax} from '../../utils/getOrderedMinMax';

const MAX_RANDOM_SEED = 100000;
const MIN_RANDOM_SEED = 1;

export class ShapePointGenerator {
  private pseudoRandom: Random;
  private pointCache: Point2d;

  constructor() {
    this.pseudoRandom = new Random(new PseudoRandomGenerator(realRandom.randomInt(MIN_RANDOM_SEED, MAX_RANDOM_SEED)));
    this.pointCache = {x: 0, y: 0};
  }

  public refresh(): void {
    this.pseudoRandom = new Random(new PseudoRandomGenerator(realRandom.randomInt(MIN_RANDOM_SEED, MAX_RANDOM_SEED)));
  }

  public reset(): void {
    this.pseudoRandom.reset();
  }

  public getShapeRandomPoint(spawnShape: SpawnShape | SpawnShape[], relativePoint?: Point2d): Point2d {
    const shape = Array.isArray(spawnShape) ? this.pseudoRandom.choice(spawnShape) : spawnShape;

    switch (shape.type) {
      case 'Point':
        this.pointCache.x = shape.x;
        this.pointCache.y = shape.y;
        break;

      case 'Rectangle':
        this.setSpawnPositionOfRectangle(shape);
        break;

      case 'Torus':
        this.setRandomPointFromTorus(
          shape.x,
          shape.y,
          shape.innerRadius || 0,
          shape.outerRadius,
          shape.startAngle || 0,
          shape.endAngle || 360,
        );
        break;

      case 'Chain':
        this.setRandomPointOnChain(shape);
        break;
    }

    this.pointCache.x = (relativePoint?.x || 0) + this.pointCache.x;
    this.pointCache.y = (relativePoint?.y || 0) + this.pointCache.y;

    return this.pointCache;
  }

  private setRandomPointFromTorus(
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
  ): void {
    // Generating a random angle in radians
    const radians = degreesToRadians(this.pseudoRandom.randomFloat(startAngle, endAngle));

    const [minRadius, maxRadius] = getOrderedMinMax(innerRadius, outerRadius);

    // Generating a random radius value ranging from the inner to the outer radius
    const r = Math.sqrt(this.pseudoRandom.randomFloat(minRadius * minRadius, maxRadius * maxRadius));

    // Calculating the coordinates of a point
    this.pointCache.x = x + r * Math.cos(radians);
    this.pointCache.y = y + r * Math.sin(radians);
  }

  private setSpawnPositionOfRectangle(shape: SpawnRectangleShape): void {
    this.pointCache.x = this.pseudoRandom.randomFloat(shape.x, shape.x + shape.width);
    this.pointCache.y = this.pseudoRandom.randomFloat(shape.y, shape.y + shape.height);
  }

  private setRandomPointOnChain(shape: SpawnChainShape): void {
    const chain = shape.chain;

    if (chain.length === 1) {
      this.pointCache.x = chain[0].x;
      this.pointCache.y = chain[0].y;
    } else if (chain.length > 1) {
      // Выбираем случайный сегмент (две точки) на линии
      const randomIndex = this.pseudoRandom.randomInt(1, chain.length - 1);
      const pointA = chain[randomIndex - 1];
      const pointB = chain[randomIndex];

      // Вычисляем случайную точку между pointA и pointB
      const t = this.pseudoRandom.randomFloat(0, 1); // параметр от 0 до 1

      this.pointCache.x = pointA.x + (pointB.x - pointA.x) * t;
      this.pointCache.y = pointA.y + (pointB.y - pointA.y) * t;
    } else {
      this.pointCache.x = 0;
      this.pointCache.y = 0;
    }
  }
}
