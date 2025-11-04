import {Point2d} from '../../types';
import {PseudoRandom} from '../../utils/random/PseudoRandom';
import {NumberUtils} from '../../utils/NumberUtils';
import {SpawnChainShape, SpawnRectangleShape, SpawnShape, SpawnShapeType} from './spawn-shapes.types';
import {realRandom} from '../../utils/random/RealRandom';

const MAX_RANDOM_SEED = 100000;
const MIN_RANDOM_SEED = 1;

export class ShapePointGenerator {
  private readonly pseudoRandom: PseudoRandom;
  private pointCache: Point2d;

  constructor() {
    this.pseudoRandom = new PseudoRandom(realRandom.generateIntegerNumber(MIN_RANDOM_SEED, MAX_RANDOM_SEED));
    this.pointCache = {x: 0, y: 0};
  }

  public refresh(): void {
    this.pseudoRandom.init(realRandom.generateIntegerNumber(MIN_RANDOM_SEED, MAX_RANDOM_SEED));
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
    const radians = NumberUtils.degreesToRadians(this.pseudoRandom.generateFloatNumber(startAngle, endAngle));

    const [minRadius, maxRadius] = NumberUtils.getOrderedMinMax(innerRadius, outerRadius);

    // Generating a random radius value ranging from the inner to the outer radius
    const r = Math.sqrt(this.pseudoRandom.generateFloatNumber(minRadius * minRadius, maxRadius * maxRadius));

    // Calculating the coordinates of a point
    this.pointCache.x = x + r * Math.cos(radians);
    this.pointCache.y = y + r * Math.sin(radians);
  }

  private setSpawnPositionOfRectangle(shape: SpawnRectangleShape): void {
    this.pointCache.x = this.pseudoRandom.generateFloatNumber(shape.x, shape.x + shape.width);
    this.pointCache.y = this.pseudoRandom.generateFloatNumber(shape.y, shape.y + shape.height);
  }

  private setRandomPointOnChain(shape: SpawnChainShape): void {
    const chain = shape.chain;

    if (chain.length === 1) {
      this.pointCache.x = chain[0].x;
      this.pointCache.y = chain[0].y;
    } else if (chain.length > 1) {
      const endPointIndex = this.pseudoRandom.generateIntegerNumber(1, chain.length - 1);

      this.pointCache.x = this.pseudoRandom.generateFloatNumber(chain[endPointIndex - 1].x, chain[endPointIndex].x);
      this.pointCache.y = this.pseudoRandom.generateFloatNumber(chain[endPointIndex - 1].y, chain[endPointIndex].y);
    } else {
      this.pointCache.x = 0;
      this.pointCache.y = 0;
    }
  }
}
