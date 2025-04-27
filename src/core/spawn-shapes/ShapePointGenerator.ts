import {Point2d} from 'src/types';
import {PseudoRandom} from '../../utils/random/PseudoRandom';
import {NumberUtils} from '../../utils/NumberUtils';
import {
  Chain,
  SpawnPolygonalChainShape,
  SpawnRectangleShape,
  SpawnShapeBehavior,
  SpawnShapeType,
} from './spawn-shapes.types';
import {isSinglePolygonalChain} from './spawn-shapes.typeguards';
import {realRandom} from '../../utils/random/RealRandom';

export class ShapePointGenerator {
  private readonly pseudoRandom: PseudoRandom;
  private pointCache: Point2d;

  constructor() {
    this.pseudoRandom = new PseudoRandom(realRandom.generateIntegerNumber(1, 100000));
    this.pointCache = {x: 0, y: 0};
  }

  public refresh(): void {
    this.pseudoRandom.init(realRandom.generateIntegerNumber(1, 100000));
  }

  public reset(): void {
    this.pseudoRandom.reset();
  }

  public getShapeRandomPoint(spawnShape: SpawnShapeBehavior, relativePoint?: Point2d): Point2d {
    const shape = spawnShape.shape;

    switch (shape.type) {
      case SpawnShapeType.Point:
        this.pointCache.x = shape.x;
        this.pointCache.y = shape.y;
        break;

      case SpawnShapeType.Rectangle:
        this.setSpawnPositionOfRectangle(shape);
        break;

      case SpawnShapeType.Torus:
        this.setRandomPointFromTorus(
          shape.x,
          shape.y,
          shape.innerRadius || 0,
          shape.outerRadius,
          shape.startAngle || 0,
          shape.endAngle || 360,
        );
        break;

      case SpawnShapeType.Polygon:
        this.setSpawnPositionOfPolygonalShape(shape);
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

  private setRandomPointOnLine(pointA: Point2d, pointB: Point2d): void {
    // Calculating the coordinates of a random point between point and pointB
    this.pointCache.x = this.pseudoRandom.generateFloatNumber(pointA.x, pointB.x);
    this.pointCache.y = this.pseudoRandom.generateFloatNumber(pointA.y, pointB.y);
  }

  private setRandomPointOnChain(chain: Chain): void {
    if (chain.length === 1) {
      this.pointCache.x = chain[0].x;
      this.pointCache.y = chain[0].y;
    } else if (chain.length > 1) {
      const endPointIndex = this.pseudoRandom.generateIntegerNumber(1, chain.length - 1);
      const endPoint = {x: chain[endPointIndex].x, y: chain[endPointIndex].y};
      const startPoint = {x: chain[endPointIndex - 1].x, y: chain[endPointIndex - 1].y};

      this.setRandomPointOnLine(startPoint, endPoint);
    } else {
      this.pointCache.x = 0;
      this.pointCache.y = 0;
    }
  }

  private setSpawnPositionOfPolygonalShape(shape: SpawnPolygonalChainShape): void {
    const chain = shape.chain;

    if (chain.length > 0) {
      if (isSinglePolygonalChain(chain)) {
        this.setRandomPointOnChain(chain);
      } else {
        this.setRandomPointOnChain(this.pseudoRandom.choice(chain));
      }
    } else {
      this.pointCache.x = 0;
      this.pointCache.y = 0;
    }
  }
}
